import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables - try .env.local first, then .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { getAllPosts } from "../lib/blog";

async function seedDummyData() {
   
    const { setViews } = await import("../lib/db");

    try {
        console.log("🚀 Starting to seed dummy data...");
        console.log(`📌 SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}`);
        console.log(`📌 SUPABASE_ANON_KEY: ${process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}`);

        // 1. Seed Blog Views
        const posts = getAllPosts();
        console.log(`📝 Found ${posts.length} blog posts.`);

        for (const post of posts) {
            const slug = post.slug;
            // Generate random view count under 500 (e.g., 50 to 499)
            const randomViews = Math.floor(Math.random() * (499 - 50 + 1)) + 50;
            await setViews(slug, randomViews);
            console.log(`✅ Seeded views for blog [${slug}]: ${randomViews}`);
        }

        // 2. Seed Unique Visitors (portfolio-home)
        const visitorSlug = "portfolio-home";
        // Fixed value of 1,000 as requested
        const fixedVisitors = 1000;
        await setViews(visitorSlug, fixedVisitors);
        console.log(`✅ Seeded visitor count for [${visitorSlug}]: ${fixedVisitors}`);

        console.log("\n✨ Data seeding completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding dummy data:", error);
        process.exit(1);
    }
}

seedDummyData();
