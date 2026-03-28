"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experiences";
import { ExternalLink, Calendar, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { techIcons } from "@/lib/tech-icons";

import SectionContainer from "@/components/section-container";
import SectionHeader from "@/components/section-header";

// Color accents for each experience card
const accentColors = [
    "border-l-blue-500",
    "border-l-emerald-500",
    "border-l-purple-500",
    "border-l-orange-500",
];

const ExperienceSection = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <SectionContainer id="experience">
            <SectionHeader
                label="Experience"
                title="Professional Journey"
                description="My work background in software engineering, AI, and full-stack development."
            />

            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.08 * index }}
                        onClick={() => toggleExpand(index)}
                        className={`border border-border/40 border-l-[3px] ${accentColors[index % accentColors.length]} rounded-xl overflow-hidden bg-card hover:border-primary/30 cursor-pointer transition-all duration-300 shadow-sm`}
                    >
                        <div className="p-4 space-y-3">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    {exp.logo && (
                                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0 border border-border/30">
                                            <img
                                                src={exp.logo}
                                                alt={exp.company}
                                                className="w-7 h-7 rounded object-contain"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
                                            {exp.company}
                                            {exp.link && (
                                                <a
                                                    href={exp.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink className="w-3 h-3 text-muted-foreground/50 hover:text-primary transition-colors" />
                                                </a>
                                            )}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {exp.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                                    <Calendar className="w-3 h-3" />
                                    <span className="font-medium">{exp.duration}</span>
                                    <ChevronDown
                                        className={`w-4 h-4 ml-2 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden space-y-3"
                                    >
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {/* Key achievements - compact bullet list */}
                                        {exp.achievements && exp.achievements.length > 0 && (
                                            <ul className="space-y-1">
                                                {exp.achievements.slice(0, 3).map((achievement, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-xs text-muted-foreground/80 pl-4 relative leading-relaxed"
                                                    >
                                                        <span className="absolute left-1 top-1.5 w-1 h-1 bg-primary/40 rounded-full" />
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Technologies */}
                                        {exp.technologies && exp.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {exp.technologies.map((tech, idx) => {
                                                    const Icon = techIcons[tech];
                                                    return (
                                                        <Badge
                                                            key={idx}
                                                            variant="secondary"
                                                            className="text-[10px] px-1.5 py-0.5 font-medium bg-primary/5 text-primary/80 border-primary/10 flex items-center gap-1"
                                                        >
                                                            {Icon && <Icon className="w-2.5 h-2.5" />}
                                                            {tech}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default ExperienceSection;
