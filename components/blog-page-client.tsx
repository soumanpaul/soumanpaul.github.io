"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenLine } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import BlogCard from "@/components/blog-card";
import XArticleCard from "@/components/x-article-card";
import { xArticles } from "@/data/x-articles";
import FadeIn from "@/components/animations/fade-in";

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

interface BlogPageClientProps {
    posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
    return (
        <FadeIn>
            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-8 bg-muted/50 p-1">
                    <TabsTrigger
                        value="personal"
                        className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-background"
                    >
                        <PenLine className="w-4 h-4" />
                        Personal Blog
                    </TabsTrigger>
                    <TabsTrigger
                        value="x"
                        className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-background"
                    >
                        <FaXTwitter className="w-4 h-4" />
                        X Articles
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    {posts.length === 0 ? (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-semibold mb-3 text-muted-foreground">
                                No Blog Posts Yet
                            </h3>
                            <p className="text-muted-foreground">
                                Blog posts will appear here once they are added.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post, index) => (
                                <BlogCard
                                    key={post.slug}
                                    post={post}
                                    index={index}
                                    showFeaturedBadge={true}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="x">
                    {xArticles.length === 0 ? (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-semibold mb-3 text-muted-foreground">
                                No X Articles Yet
                            </h3>
                            <p className="text-muted-foreground">
                                X articles will appear here once they are added.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {xArticles.map((article, index) => (
                                <XArticleCard
                                    key={article.id}
                                    article={article}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </FadeIn>
    );
}
