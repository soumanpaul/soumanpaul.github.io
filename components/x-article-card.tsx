"use client";

import { Calendar, ExternalLink } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/components/ui/content-card";
import type { XArticle } from "@/data/x-articles";

interface XArticleCardProps {
    article: XArticle;
    index?: number;
    className?: string;
}

export default function XArticleCard({
    article,
    index = 0,
    className = "",
}: XArticleCardProps) {
    const footer = (
        <div className="flex items-center justify-between w-full gap-4 flex-wrap gap-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">
                        {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <FaXTwitter className="w-4 h-4" />
                    <span className="text-xs">X Article</span>
                </div>
            </div>
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
            >
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
    );

    const badges = (
        <Badge className="bg-zinc-800 text-zinc-200 border-zinc-700 flex items-center gap-1.5">
            <FaXTwitter className="w-3 h-3" />
            X Thread
        </Badge>
    );

    return (
        <ContentCard
            title={article.title}
            description={article.description}
            image={article.image}
            href={article.url}
            tags={article.tags}
            badges={badges}
            footer={footer}
            index={index}
            className={className}
            external
        />
    );
}
