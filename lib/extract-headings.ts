// lib/extractHeadings.ts
import Slug from "github-slugger";

export function extractHeadings(source: string) {
  // Match ## headings (H2) and ### headings (H3) in markdown
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { text: string; id: string; level: number }[] = [];
  const slugInstance = new Slug(); // Create a new instance of Slug
  let match;

  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length; // Count the # symbols
    const text = match[2]
      .trim()
      .replace(/\*\*/g, "") // Remove bold markers
      .replace(/`/g, ""); // Remove code markers

    // Create slug-friendly ID using github-slugger to match rehype-slug
    const id = slugInstance.slug(text);

    headings.push({ text, id, level });
  }

  return headings;
}
