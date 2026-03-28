"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog-card";

interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
    featured?: boolean;
    readTime?: string;
    image?: string;
}

interface FeaturedBlogsProps {
    posts: BlogPost[];
}

import SectionContainer from "@/components/section-container";
import SectionHeader from "@/components/section-header";

export default function FeaturedBlogs({ posts }: FeaturedBlogsProps) {
    const featuredPosts = posts.filter((post) => post.featured);
    const visiblePosts = (featuredPosts.length > 0 ? featuredPosts : posts).slice(0, 2);

    return (
        <SectionContainer id="blogs">
            <SectionHeader
                label="Blogs"
                title="Latest Writing"
                description="Thoughts on software engineering, AI, and my journey as a developer."
            />

            {/* Blog Grid - 2 columns to match projects and reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visiblePosts.map((post, index) => (
                    <BlogCard
                        key={post.slug}
                        post={post}
                        index={index}
                        showFeaturedBadge={false}
                    />
                ))}
            </div>

            {/* View All Button */}
            {posts.length > 0 && (
                <div className="flex justify-center mt-12">
                    <Link href="/blog">
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 font-semibold px-8 border-border/50 hover:bg-muted/50 transition-all"
                        >
                            View All Blogs
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            )}
        </SectionContainer>
    );
}
