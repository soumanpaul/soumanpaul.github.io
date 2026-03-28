"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Heading {
  text: string;
  id: string;
  level: number;
  children?: Heading[];
}

interface TOCProps {
  headings: { text: string; id: string; level?: number }[];
}

// Build a tree structure from flat headings array
function buildHeadingTree(
  flatHeadings: { text: string; id: string; level?: number }[]
): Heading[] {
  const tree: Heading[] = [];
  const stack: Heading[] = [];

  flatHeadings.forEach((heading) => {
    const node: Heading = {
      text: heading.text,
      id: heading.id,
      level: heading.level || 2,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(node);
    } else {
      stack[stack.length - 1].children?.push(node);
    }

    stack.push(node);
  });

  return tree;
}

export function TableOfContentsEnhanced({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const headingTree = buildHeadingTree(headings);

  // Initialize all H2 sections as expanded
  useEffect(() => {
    const allH2Ids = new Set(headings.filter((h) => h.level === 2).map((h) => h.id));
    setExpandedSections(allH2Ids);
  }, [headings]);

  // Enhanced Intersection Observer with improved accuracy
  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find all visible entries
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Sort by distance from top of viewport
        const sortedEntries = visibleEntries.sort((a, b) => {
          const aTop = Math.abs(a.boundingClientRect.top);
          const bTop = Math.abs(b.boundingClientRect.top);
          return aTop - bTop;
        });

        const topEntry = sortedEntries[0];
        const newActiveId = topEntry.target.id;

        if (newActiveId !== activeId) {
          setActiveId(newActiveId);

          // Auto-expand parent section for nested headings
          const activeHeading = headings.find((h) => h.id === newActiveId);
          if (activeHeading && activeHeading.level === 3) {
            const currentIndex = headings.findIndex((h) => h.id === newActiveId);
            for (let i = currentIndex - 1; i >= 0; i--) {
              if (headings[i].level === 2) {
                setExpandedSections((prev) => new Set(prev).add(headings[i].id));
                break;
              }
            }
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    // Observe all heading elements
    const elements: Element[] = [];
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    });

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [headings, activeId]);

  const toggleSection = useCallback((id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();

      const element = document.getElementById(id);
      if (element) {
        // Update active state immediately
        setActiveId(id);

        // Calculate scroll position with offset for fixed header
        const navbarHeight = 100; // Adjust based on your navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL hash without jumping
        window.history.pushState(null, "", `#${id}`);
      }
    },
    []
  );

  const renderHeading = (heading: Heading, depth: number = 0) => {
    const isActive = activeId === heading.id;
    const hasChildren = heading.children && heading.children.length > 0;
    const isExpanded = expandedSections.has(heading.id);
    const isH2 = heading.level === 2;

    return (
      <div key={heading.id} className={cn(depth > 0 && "ml-4")}>
        <div className="flex items-start gap-1">
          {isH2 && hasChildren && (
            <button
              onClick={() => toggleSection(heading.id)}
              className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isExpanded ? "Collapse section" : "Expand section"}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </button>
          )}

          <a
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={cn(
              "flex-1 py-1.5 px-2 rounded-md text-sm transition-all duration-200 hover:bg-muted/50",
              isActive
                ? "text-primary font-semibold bg-primary/10 border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground",
              isH2 && !hasChildren && "ml-5"
            )}
          >
            <span className="line-clamp-2 leading-snug">{heading.text}</span>
          </a>
        </div>

        {/* Render children */}
        {hasChildren && (
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-1 mt-1">
                  {heading.children?.map((child) => renderHeading(child, depth + 1))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin"
      aria-label="Table of contents"
    >
      <div className="glass rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">On This Page</h2>
        </div>

        <div className="space-y-1">
          {headingTree.map((heading) => renderHeading(heading))}
        </div>
      </div>
    </nav>
  );
}
