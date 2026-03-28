"use client";

import { motion } from "framer-motion";
import { Brain, Code2, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";

const learningResources = [
    {
        id: 1,
        title: "Portfolio Source Repository",
        description: "The earlier public portfolio codebase that captures my background, legacy projects, and frontend implementation work.",
        icon: Brain,

        badge: "Portfolio",
        url: "https://github.com/soumanpaul/soumanpaul.github.io",

    },
    {
        id: 2,
        title: "Legacy Product Builds",
        description: "Selected older full-stack applications and experiments that show the product and frontend work behind my earlier portfolio.",
        icon: Code2,
        badge: "Projects",
        url: "https://github.com/soumanpaul/Video-streaming-web-app",
    },
];

import SectionContainer from "@/components/section-container";
import SectionHeader from "@/components/section-header";

export default function LearningSection() {
    return (
        <SectionContainer id="learning">
            <SectionHeader
                label="Resources"
                title="Learning & Systems"
                description="Curated collections of technical notes, shared repositories, and architectural explorations."
            />

            <div className="grid gap-6 md:grid-cols-2">
                {learningResources.map((resource, index) => {
                    const IconComponent = resource.icon;
                    return (
                        <Link
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <Card className="h-full p-6 bg-card border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <IconComponent className="w-5 h-5 text-primary/80" />
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="text-[10px] uppercase font-bold tracking-wider bg-primary/5 text-primary border-primary/10"
                                    >
                                        {resource.badge}
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                                        {resource.title}
                                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {resource.description}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </SectionContainer>
    );
}
