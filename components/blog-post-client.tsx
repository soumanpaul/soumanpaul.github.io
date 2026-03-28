"use client";

import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { TableOfContentsEnhanced } from '@/components/table-of-contents-enhanced';
import { ReadingProgressBar } from '@/components/reading-progress-bar';
import { ReadingTime } from '@/components/reading-time';
import type { Post } from '@/lib/mdx';
import { ReactNode } from 'react';

interface BlogPostClientProps {
    post: Post;
    allPosts: Post[];
    headings: Array<{ level: number; text: string; id: string }>;
    slug: string;
    children: ReactNode;
}

export function BlogPostClient({ post, allPosts, headings, slug, children }: BlogPostClientProps) {
    return (
        <div className="min-h-screen">
            {/* Reading Progress Bar */}
            <ReadingProgressBar />

            <div className="w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 mt-20 sm:mt-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-8 lg:gap-12">

                    {/* LEFT SIDEBAR: Blog List */}
                    <aside className="hidden lg:block">
                        <motion.div
                            className="sticky top-28 space-y-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div className="glass rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    All Articles
                                </h2>
                                <ul className="space-y-3">
                                    {allPosts.map((p, index) => (
                                        <motion.li
                                            key={p.slug}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                                        >
                                            <Link
                                                href={`/blog/${p.slug}`}
                                                className={`group block p-3 rounded-lg transition-all duration-200 ${p.slug === slug
                                                    ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-1'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="line-clamp-2 text-sm leading-relaxed">
                                                        {p.title}
                                                    </span>
                                                    {p.slug === slug && (
                                                        <motion.div
                                                            className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"
                                                            layoutId="active-post-indicator"
                                                        />
                                                    )}
                                                </div>
                                                {p.date && (
                                                    <span className="text-xs text-muted-foreground mt-1 block">
                                                        {new Date(p.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                )}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <motion.article
                        className="w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <header className="mb-8 sm:mb-12">
                            {/* Breadcrumb */}
                            <nav className="mb-6">
                                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link href="/" className="hover:text-foreground transition-colors">
                                            Home
                                        </Link>
                                    </motion.li>
                                    <li>/</li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link href="/blog" className="hover:text-foreground transition-colors">
                                            Blog
                                        </Link>
                                    </motion.li>
                                    <li>/</li>
                                    <li className="text-foreground font-medium truncate max-w-[200px]">
                                        {post.title}
                                    </li>
                                </ol>
                            </nav>

                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gradient-brand"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                {post.title}
                            </motion.h1>

                            {/* Enhanced Metadata */}
                            <motion.div
                                className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-6 p-4 bg-muted/30 rounded-lg"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                {post.date && (
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Calendar className="w-4 h-4 text-primary" />
                                        </motion.div>
                                        <time dateTime={post.date} className="font-medium">
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </div>
                                )}
                                <ReadingTime content={post.content} />
                                {post.author && (
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <User className="w-4 h-4 text-primary" />
                                        </motion.div>
                                        <span className="font-medium">{post.author}</span>
                                    </div>
                                )}
                                {post.readTime && (
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 180 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Clock className="w-4 h-4 text-primary" />
                                        </motion.div>
                                        <span className="font-medium">{post.readTime}</span>
                                    </div>
                                )}
                            </motion.div>

                            {/* Enhanced Tags */}
                            {Array.isArray(post?.tags) && post?.tags.length > 0 && (
                                <motion.div
                                    className="flex flex-wrap gap-2 mb-8"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                >
                                    {post.tags.map((tag: string, index) => (
                                        <motion.span
                                            key={tag}
                                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-brand/10 text-primary border border-primary/20 hover:bg-gradient-brand/20 transition-all duration-300 cursor-default"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            )}

                            {/* Enhanced Description */}
                            {post.description && (
                                <motion.p
                                    className="text-lg text-muted-foreground leading-relaxed p-6 bg-muted/20 rounded-xl border border-border/50"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.5 }}
                                >
                                    {post.description}
                                </motion.p>
                            )}

                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />
                        </header>

                        {/* Mobile TOC */}
                        {headings.length > 0 && (
                            <motion.div
                                className="xl:hidden mb-8 glass rounded-xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <details className="group">
                                    <summary className="cursor-pointer list-none flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors">
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                                            Table of Contents
                                        </span>
                                    </summary>
                                    <motion.div
                                        className="mt-4 max-h-[60vh] overflow-y-auto"
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <TableOfContentsEnhanced headings={headings} />
                                    </motion.div>
                                </details>
                            </motion.div>
                        )}

                        {/* Enhanced MDX Content */}
                        <motion.div
                            className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                        >
                            {children}
                        </motion.div>
                    </motion.article>

                    {/* RIGHT SIDEBAR: TOC (Desktop) */}
                    {headings.length > 0 && (
                        <aside className="hidden xl:block">
                            <motion.div
                                className="sticky top-28"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <TableOfContentsEnhanced headings={headings} />
                            </motion.div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
