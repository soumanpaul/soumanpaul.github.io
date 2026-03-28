"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/section-container";
import { techIcons } from "@/lib/tech-icons";

const techStack = [
    { name: "TypeScript", icon: techIcons["TypeScript"], color: "#3178C6" },
    { name: "JavaScript", icon: techIcons["JavaScript"], color: "#F7DF1E" },
    { name: "Python", icon: techIcons["Python"], color: "#e9e338" },
    { name: "React.js", icon: techIcons["React.js"], color: "#61DAFB" },
    { name: "Next.js", icon: techIcons["Next.js"], color: "#fff" },
    { name: "Node.js", icon: techIcons["Node.js"], color: "#339933" },
    { name: "FastAPI", icon: techIcons["FastAPI"], color: "#009688" },
    { name: "Express.js", icon: techIcons["Express.js"], color: "#888" },
    { name: "PostgreSQL", icon: techIcons["PostgreSQL"], color: "#336791" },
    { name: "MongoDB", icon: techIcons["MongoDB"], color: "#47A248" },
    { name: "Docker", icon: techIcons["Docker"], color: "#2496ED" },
    { name: "Kubernetes", icon: techIcons["Kubernetes"], color: "#326CE5" },
    { name: "AWS", icon: techIcons["AWS"], color: "#FF9900" },
    // { name: "JWT", icon: techIcons["JWT"], color: "#F5F5F5" },
    // { name: "GraphQL", icon: techIcons["GraphQL"], color: "#E10098" },
    { name: "gRPC", icon: techIcons["gRPC"], color: "#2786eb" },
    { name: "PyTorch", icon: techIcons["PyTorch"], color: "#EE4C2C" },
    { name: "Transformers", icon: techIcons["Transformers"], color: "#FACC15" },
    { name: "Scikit-learn", icon: techIcons["Scikit-learn"], color: "#F59E0B" },
    { name: "OpenAI", icon: techIcons["OpenAI"], color: "#7C3AED" },
    { name: "LangChain", icon: techIcons["LangChain"], color: "#34D399" },
    { name: "Git", icon: techIcons["Git"], color: "#F05032" },
].filter((t) => t.icon); // filter out any undefined icons

export default function TechStackSection() {
    return (
        <SectionContainer className="py-6">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
            >
                <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                        Technologies that I have used
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Core tools, frameworks, and platforms I work with across product, platform, and AI systems.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {techStack.map((tech, index) => {
                        const IconComponent = tech.icon;
                        if (!IconComponent) return null;

                        return (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.25, delay: 0.02 * index }}
                                className="inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-card/80 px-4 py-3 text-sm font-medium text-muted-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-card hover:text-foreground"
                            >
                                <IconComponent
                                    className="h-4.5 w-4.5 shrink-0"
                                    style={{ color: tech.color }}
                                />
                                <span className="leading-none">{tech.name}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </SectionContainer>
    );
}
