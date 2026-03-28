"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { motion } from "framer-motion";

export function ReadingProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-16 left-0 right-0 h-1 bg-border/30 z-40"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
    </div>
  );
}
