import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const blogPostsPath = path.join(process.cwd(), "data", "blog-posts.json");

interface BlogPostRecord {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  image?: string;
  contentBlocks: string[];
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  image?: string;
  content: string;
}

function readBlogPosts(): BlogPostRecord[] {
  const fileContents = fs.readFileSync(blogPostsPath, "utf8");
  return JSON.parse(fileContents) as BlogPostRecord[];
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = readBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    author: post.author,
    description: post.description,
    tags: post.tags,
    featured: post.featured,
    readTime: post.readTime,
    image: post.image,
    content: post.contentBlocks.join("\n\n"),
  }));

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function compileMDXContent(source: string) {
  return await compileMDX({
    source,
  });
}
