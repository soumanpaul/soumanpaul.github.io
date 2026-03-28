"use client";

import { cn } from "@/lib/utils";
import FadeIn from "./animations/fade-in";

interface SectionContainerProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default function SectionContainer({
    children,
    className,
    id,
    delay = 0
}: SectionContainerProps) {
    return (
        <section
            id={id}
            className={cn("w-full max-w-2xl mx-auto px-6 py-6 md:py-8", className)}
        >
            <FadeIn delay={delay}>
                {children}
            </FadeIn>
        </section>
    );
}
