"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    label: string;
    title: string;
    description?: string;
    className?: string;
}

export default function SectionHeader({
    label,
    title,
    description,
    className
}: SectionHeaderProps) {
    return (
        <div className={cn("mb-8 space-y-2", className)}>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
                {label}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {title}
            </h2>
            {description && (
                <p className="text-muted-foreground text-sm max-w-xl">
                    {description}
                </p>
            )}
        </div>
    );
}
