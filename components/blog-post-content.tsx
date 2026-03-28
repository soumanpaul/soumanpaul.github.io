"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { TableOfContentsEnhanced } from "@/components/table-of-contents-enhanced";
import { ReadingProgressBar } from "@/components/reading-progress-bar";
import { ReadingTime } from "@/components/reading-time";
import { ViewCounter } from "@/components/view-counter";
import { ReactNode } from "react";
import { profileData, siteConfig } from "@/data";

interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
    author?: string;
    readTime?: string;
    image?: string;
    content: string;
}

interface BlogPostContentProps {
    post: BlogPost;
    allPosts: BlogPost[];
    headings: any[];
    children: ReactNode;
}

export default function BlogPostContent({
    post,
    allPosts,
    headings,
    children,
}: BlogPostContentProps) {
    const showViewCounts = siteConfig.features.viewCounts;

    return (
        <div className="min-h-screen">
            {/* Reading Progress Bar */}
            <ReadingProgressBar />

            <div className="w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 mt-20 sm:mt-24">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
                    {/* MAIN CONTENT */}
                    <motion.article
                        className="w-full min-w-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <header className="mb-10">
                            {/* Breadcrumb */}
                            <nav className="mb-8">
                                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link
                                            href="/"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Home
                                        </Link>
                                    </motion.li>
                                    <li>/</li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link
                                            href="/blog"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Blog
                                        </Link>
                                    </motion.li>
                                </ol>
                            </nav>

                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tight text-foreground"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                {post.title}
                            </motion.h1>

                            {/* Minimalist Metadata */}
                            <motion.div
                                className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 border-b border-border pb-8"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Author Avatar Placeholder or Icon */}
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                        <User className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-foreground">{post.author || profileData.name}</span>
                                        <div className="flex items-center gap-2 text-xs">
                                            {post.date && (
                                                <time dateTime={post.date}>
                                                    {new Date(post.date).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </time>
                                            )}
                                            <span>·</span>
                                            <ReadingTime content={post.content} />
                                            {showViewCounts && (
                                                <>
                                                    <span>·</span>
                                                    <ViewCounter slug={post.slug} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tags - Minimal */}
                            {Array.isArray(post?.tags) && post?.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {post.image && (
                                <motion.div
                                    className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/20 shadow-sm"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45, duration: 0.5 }}
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={1600}
                                        height={900}
                                        className="h-auto w-full object-cover"
                                        priority
                                    />
                                </motion.div>
                            )}
                        </header>

                        {/* Mobile TOC */}
                        {headings.length > 0 && (
                            <div className="lg:hidden mb-10 p-4 bg-muted/30 rounded-lg">
                                <details className="group">
                                    <summary className="cursor-pointer list-none flex items-center justify-between font-medium text-foreground">
                                        <span>Table of Contents</span>
                                    </summary>
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <TableOfContentsEnhanced headings={headings} />
                                    </div>
                                </details>
                            </div>
                        )}

                        {/* Content */}
                        <motion.div
                            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            {children}
                        </motion.div>
                    </motion.article>

                    {/* RIGHT SIDEBAR: TOC (Desktop) */}
                    {headings.length > 0 && (
                        <aside className="hidden lg:block relative">
                            <motion.div
                                className="sticky top-32"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                                    On this page
                                </div>
                                <TableOfContentsEnhanced headings={headings} />
                            </motion.div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
