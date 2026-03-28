"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { techIcons } from "@/lib/tech-icons";

import SectionContainer from "@/components/section-container";
import SectionHeader from "@/components/section-header";

// Show top 4 featured projects (mix of AI and fullstack)
const featuredProjects = projects.slice(0, 4);

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = activeTab === "all"
    ? featuredProjects
    : projects.filter((project) => project.type === activeTab).slice(0, 4);

  return (
    <SectionContainer id="projects">
      <SectionHeader
        label="Projects"
        title="Featured Projects"
        description="Selected work spanning enterprise platforms, AI systems, and full-stack product builds."
      />

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="mb-8 flex flex-wrap h-auto p-1 bg-muted/50 max-w-[400px] mx-auto">
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

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * index }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg hover:border-primary/20 transition-all duration-300 group bg-card border-border/40">
                  {/* Image */}
                  {project.image && (
                    <div className="h-40 overflow-hidden relative w-full shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Action icons overlay */}
                      <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-primary/80 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                          </a>
                        )}
                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-primary/80 transition-colors"
                            title="Source Code"
                          >
                            <Github className="w-3.5 h-3.5 text-white" />
                          </a>
                        )}
                      </div>

                      {/* Type Badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase font-bold tracking-wider bg-black/50 backdrop-blur-sm text-white border-white/20 px-2 py-0.5 rounded-full"
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
                    </div>
                  )}

                  <CardContent className="p-4 flex-1 flex flex-col gap-2">
                    <h3 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tech icons */}
                    <TooltipProvider delayDuration={0}>
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                        {project.technologies.slice(0, 5).map((tech) => {
                          const IconComponent = techIcons[tech];
                          return (
                            <Tooltip key={tech}>
                              <TooltipTrigger asChild>
                                <div className="w-6 h-6 rounded bg-muted/50 border border-border/30 flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all duration-150 cursor-default">
                                  {IconComponent ? (
                                    <IconComponent className="w-3.5 h-3.5 text-muted-foreground" />
                                  ) : (
                                    <span className="text-[8px] font-bold text-muted-foreground uppercase leading-none">
                                      {tech.slice(0, 2)}
                                    </span>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p className="text-xs">{tech}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                        {project.technologies.length > 5 && (
                          <div className="w-6 h-6 rounded bg-muted/50 border border-border/30 flex items-center justify-center">
                            <span className="text-[9px] text-muted-foreground font-medium">
                              +{project.technologies.length - 5}
                            </span>
                          </div>
                        )}
                      </div>
                    </TooltipProvider>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* View More */}
      <div className="flex justify-center mt-10">
        <Link href="/projects">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 font-semibold px-6 border-border/50 hover:bg-muted/50 rounded-full"
          >
            View All Projects
            <Layers className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
