import { QdrantClient } from "@qdrant/js-client-rest";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { experiences, projects, skillCategories, profileData } from "../data";
import "dotenv/config";

const { GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY } = process.env;

// Validate environment variables
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const qdrantClient = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY || undefined,
});

const COLLECTION_NAME = "prince_portfolio";
const VECTOR_SIZE = 768;
const CHUNK_SIZE = 500;

// Prepare local data as context
function prepareLocalData(): string {
  const contextData = {
    profile: profileData,
    experiences: experiences.map((exp) => ({
      company: exp.company,
      role: exp.role,
      type: exp.type,
      duration: exp.duration,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      achievements: exp.achievements || [],
      technologies: exp.technologies || [],
      logo: exp.logo,
    })),
    projects: projects.map((project) => ({
      title: project.title,
      description: project.description,
      type: project.type,
      technologies: project.technologies,
      demoUrl: project.demoUrl,
      codeUrl: project.codeUrl,
    })),
    skills: skillCategories.map((category) => ({
      title: category.title,
      skills: category.skills,
    })),
  };

  return JSON.stringify(contextData, null, 2);
}

// Helper function to split text into chunks
function splitIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  const sentences = text.split(". ");

  let currentChunk = "";

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length < chunkSize) {
      currentChunk += sentence + ". ";
    } else {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = sentence + ". ";
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Generate UUID v4
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16).padStart(1, '0');
  });
}

// Sleep helper
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Check or create collection
const checkOrCreateCollection = async (): Promise<void> => {
  try {
    console.log(`\n🔍 Checking collection: ${COLLECTION_NAME}`);

    try {
      const collection = await qdrantClient.getCollection(COLLECTION_NAME);
      console.log(
        `✅ Collection exists with ${collection.points_count} points`
      );

      // Ask user if they want to recreate
      console.log(`⚠️  Deleting existing collection to reload fresh data...`);
      await qdrantClient.deleteCollection(COLLECTION_NAME);
      console.log(`✅ Deleted existing collection`);
    } catch (error) {
      console.log(`ℹ️  Collection doesn't exist, will create new one`);
    }

    // Create collection
    await qdrantClient.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_SIZE,
        distance: "Cosine",
      },
    });
    console.log(`✅ Collection created successfully`);
  } catch (error) {
    console.error("❌ Error in collection setup:", error);
    throw error;
  }
};

// Load local data into Qdrant
const loadLocalData = async (): Promise<void> => {
  try {
    console.log(`\n📥 Starting data loading process...`);

    // Prepare data
    const localContext = prepareLocalData();
    console.log(`📊 Local data prepared (${localContext.length} characters)`);

    // Split into chunks
    const chunks = splitIntoChunks(localContext, CHUNK_SIZE);
    console.log(`✂️  Split into ${chunks.length} chunks`);

    // Initialize embedding model
    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });

    let successCount = 0;
    let failureCount = 0;

    // Process chunks with proper error handling
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const chunkId = i; // Use simple integer ID

      try {
        console.log(`\n[${i + 1}/${chunks.length}] Processing chunk...`);
        console.log(`  📝 Chunk preview: ${chunk.substring(0, 100)}...`);

        // Generate embedding with retry logic
        let embedding: number[] | undefined;
        let retries = 3;

        while (retries > 0) {
          try {
            const result = await embeddingModel.embedContent(chunk);
            embedding = result.embedding.values;

            // Validate embedding
            if (!embedding || embedding.length !== VECTOR_SIZE) {
              throw new Error(`Invalid embedding size: ${embedding?.length}`);
            }

            console.log(
              `  ✅ Generated embedding (${embedding.length} dimensions)`
            );
            break;
          } catch (error) {
            retries--;
            if (retries === 0) throw error;
            console.log(`  ⚠️  Retry ${3 - retries}/3...`);
            await sleep(2000);
          }
        }

        // Ensure embedding is defined before uploading
        if (!embedding) {
          throw new Error("Failed to generate embedding after retries");
        }

        // Upload to Qdrant
        await qdrantClient.upsert(COLLECTION_NAME, {
          wait: true,
          points: [
            {
              id: chunkId, // Use integer ID
              vector: embedding,
              payload: {
                text: chunk,
                chunk_index: i,
                total_chunks: chunks.length,
                source: "portfolio_data",
                timestamp: new Date().toISOString(),
              },
            },
          ],
        });

        successCount++;
        console.log(
          `  ✅ Uploaded successfully (${successCount}/${chunks.length})`
        );

        // Rate limiting - wait between requests
        if (i < chunks.length - 1) {
          await sleep(1500);
        }
      } catch (error) {
        failureCount++;
        console.error(`  ❌ Failed to process chunk ${i + 1}:`, error);
        console.log(`  ⚠️  Continuing with next chunk...`);

        // Wait longer on error
        await sleep(3000);
      }
    }

    // Summary
    console.log(`\n${"=".repeat(50)}`);
    console.log(`📊 LOADING SUMMARY`);
    console.log(`${"=".repeat(50)}`);
    console.log(`✅ Successful: ${successCount}/${chunks.length}`);
    console.log(`❌ Failed: ${failureCount}/${chunks.length}`);

    if (failureCount > 0) {
      console.log(`⚠️  Warning: ${failureCount} chunks failed to load`);
    }

    // Verify final state
    const collectionInfo = await qdrantClient.getCollection(COLLECTION_NAME);
    console.log(`\n📈 Final collection state:`);
    console.log(`   Points in collection: ${collectionInfo.points_count}`);
    console.log(`   Expected points: ${chunks.length}`);

    if (collectionInfo.points_count === chunks.length) {
      console.log(`\n🎉 SUCCESS! All data loaded correctly!`);
    } else {
      console.log(`\n⚠️  WARNING: Point count mismatch!`);
    }
  } catch (error) {
    console.error("\n❌ Fatal error during data loading:", error);
    throw error;
  }
};

// Test the loaded data
const testSearch = async (): Promise<void> => {
  try {
    console.log(`\n🧪 Testing search functionality...`);

    const testQuery = "What are Souman's technical skills?";
    console.log(`   Query: "${testQuery}"`);

    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });

    const result = await embeddingModel.embedContent(testQuery);
    const queryVector = result.embedding.values;

    const searchResults = await qdrantClient.search(COLLECTION_NAME, {
      vector: queryVector,
      limit: 3,
      with_payload: true,
    });

    console.log(`\n📊 Search Results (${searchResults.length} found):`);
    searchResults.forEach((result, idx) => {
      const text = (result.payload as any)?.text || "";
      console.log(`\n   [${idx + 1}] Score: ${result.score?.toFixed(4)}`);
      console.log(`   Preview: ${text.substring(0, 150)}...`);
    });

    if (searchResults.length > 0) {
      console.log(`\n✅ Search test passed!`);
    } else {
      console.log(
        `\n⚠️  No results found - data might not be loaded correctly`
      );
    }
  } catch (error) {
    console.error("\n❌ Search test failed:", error);
  }
};

// Main execution
const main = async () => {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`🚀 QDRANT DATA LOADER`);
  console.log(`${"=".repeat(50)}`);

  try {
    // Step 1: Setup collection
    await checkOrCreateCollection();

    // Step 2: Load data
    await loadLocalData();

    // Step 3: Test search
    await testSearch();

    console.log(`\n${"=".repeat(50)}`);
    console.log(`✅ ALL OPERATIONS COMPLETED SUCCESSFULLY`);
    console.log(`${"=".repeat(50)}\n`);
  } catch (error) {
    console.error(`\n${"=".repeat(50)}`);
    console.error(`❌ SCRIPT FAILED`);
    console.error(`${"=".repeat(50)}`);
    console.error(error);
    process.exit(1);
  }
};

// Run the script
main();
