"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContentCardProps {
    title: string;
    description: string;
    image?: string;
    href?: string;
    tags?: string[];
    tagIcons?: Record<string, React.ComponentType<{ className?: string }>>;
    badges?: ReactNode;
    footer?: ReactNode;
    className?: string;
    index?: number;
    imageClassName?: string;
    onClick?: () => void;
    enableEntryAnimation?: boolean;
    external?: boolean;
}

export function ContentCard({
    title,
    description,
    image,
    href,
    tags,
    tagIcons,
    badges,
    footer,
    className,
    index = 0,
    imageClassName,
    onClick,
    enableEntryAnimation = true,
    external = false,
}: ContentCardProps) {
    return (
        <motion.div
            initial={enableEntryAnimation ? { opacity: 0, y: 20 } : undefined}
            animate={enableEntryAnimation ? { opacity: 1, y: 0 } : undefined}
            transition={enableEntryAnimation ? { duration: 0.5, delay: 0.1 * index } : undefined}
            whileHover={{ y: -8, scale: 1.02 }}
            className={cn("h-full", className)}
            onClick={onClick}
        >
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:border-primary/20 group bg-card border-muted/40 shadow-sm">
                {href ? (
                    external ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="grouped-card-link flex h-full flex-col flex-1">
                            <CardContentInner
                                title={title}
                                description={description}
                                image={image}
                                tags={tags}
                                tagIcons={tagIcons}
                                badges={badges}
                                imageClassName={imageClassName}
                            />
                        </a>
                    ) : (
                        <Link href={href} className="grouped-card-link flex h-full flex-col flex-1">
                            <CardContentInner
                                title={title}
                                description={description}
                                image={image}
                                tags={tags}
                                tagIcons={tagIcons}
                                badges={badges}
                                imageClassName={imageClassName}
                            />
                        </Link>
                    )
                ) : (
                    <div className="h-full flex flex-col flex-1">
                        <CardContentInner
                            title={title}
                            description={description}
                            image={image}
                            tags={tags}
                            tagIcons={tagIcons}
                            badges={badges}
                            imageClassName={imageClassName}
                        />
                    </div>
                )}

                {footer && (
                    <CardFooter className="p-6 pt-0 mt-auto border-t border-border/50 bg-muted/5 w-full">
                        {footer}
                    </CardFooter>
                )}
            </Card>
        </motion.div>
    );
}

function CardContentInner({
    title,
    description,
    image,
    tags,
    tagIcons,
    badges,
    imageClassName,
}: Pick<ContentCardProps, "title" | "description" | "image" | "tags" | "tagIcons" | "badges" | "imageClassName">) {
    return (
        <>
            {image ? (
                <div className="h-48 overflow-hidden relative w-full shrink-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={cn(
                            "object-cover transition-transform duration-500 group-hover:scale-110",
                            imageClassName
                        )}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {badges && (
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            {badges}
                        </div>
                    )}
                </div>
            ) : (
                badges && (
                    <div className="p-4 pb-0 flex justify-end">
                        <div className="flex gap-2">
                            {badges}
                        </div>
                    </div>
                )
            )}

            <CardContent className="p-6 flex-1 flex flex-col gap-3 w-full min-h-0">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {tags.slice(0, 5).map((tag) => {
                            const Icon = tagIcons?.[tag];
                            return (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-[10px] px-1.5 py-0.5 bg-primary/5 text-primary border-primary/10 flex items-center gap-1"
                                >
                                    {Icon && <Icon className="w-2.5 h-2.5" />}
                                    {tag}
                                </Badge>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </>
    );
}
