"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/fade-in";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExternalLink, Github, Layers } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data";


export default function ProjectsSectionFull() {
    const [activeTab, setActiveTab] = useState("all");

    const filteredProjects = activeTab === "all"
        ? projects
        : projects.filter((project) => project.type === activeTab);

    return (
        <section id="projects" className="py-16">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Projects Header */}
                <FadeIn>
                    <div className="flex items-center gap-2 mb-2">
                        <Layers className="h-6 w-6 text-slate-600" />
                        <h2 className="text-3xl font-bold">All Projects</h2>
                    </div>
                    <p className="text-muted-foreground mb-12">
                        Enterprise systems and product work across full-stack, SaaS, and AI-focused builds.
                    </p>
                </FadeIn>

                {/* Category Tabs */}
                <Tabs
                    defaultValue="all"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full mb-8"
                >
                    <TabsList className="mb-8 flex flex-wrap h-auto p-1 bg-muted/50">
                        <TabsTrigger
                            value="all"
                            className="flex-1 data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="fullstack"
                            className="flex-1 data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                        >
                            Fullstack
                        </TabsTrigger>

                        <TabsTrigger
                            value="ai"
                            className="flex-1 data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                        >
                            AI/ML
                        </TabsTrigger>

                        <TabsTrigger
                            value="saas"
                            className="flex-1 data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                        >
                            SaaS
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map(
                                (project, index) => (
                                    <FadeIn key={index} delay={0.05 * index} direction="up">
                                        <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:border-slate-200/30 group">
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <CardContent className="p-6 flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-semibold group-hover:text-slate-600 transition-colors line-clamp-1">
                                                        {project.title}
                                                    </h3>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs whitespace-nowrap ml-2 bg-slate-600/10 text-slate-600 border-slate-600/30"
                                                    >
                                                        {project.type === "fullstack"
                                                            ? "Full Stack"
                                                            : project.type === "ai"
                                                                ? "AI/ML"
                                                                : project.type === "saas"
                                                                    ? "SaaS"
                                                                    : "Mobile"}
                                                    </Badge>
                                                </div>
                                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                                    {project.technologies.map((tech, i) => (
                                                        <Badge key={i} variant="secondary" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                            {(project.demoUrl || project.codeUrl) && (
                                                <CardFooter className="p-6 pt-0 flex gap-2">
                                                    {project.demoUrl && (
                                                        <Link href={project.demoUrl} className="flex-1" target="_blank">
                                                            <Button variant="default" size="sm" className="w-full gap-2 text-xs">
                                                                <ExternalLink className="h-3 w-3" />
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                    )}
                                                    {project.codeUrl && (
                                                        <Link href={project.codeUrl} className="flex-1" target="_blank">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="w-full gap-2 text-xs border-slate-600/30 hover:bg-slate-600/10"
                                                            >
                                                                <Github className="h-3 w-3" />
                                                                Code
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </CardFooter>
                                            )}
                                        </Card>
                                    </FadeIn>
                                )
                            )}
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No projects found in this category.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </section >
    );
}
