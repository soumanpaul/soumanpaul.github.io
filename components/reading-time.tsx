"use client";

import { Clock } from "lucide-react";
import { calculateReadingTime, formatReadingTime } from "@/hooks/use-reading-time";

interface ReadingTimeProps {
  content: string;
  className?: string;
}

export function ReadingTime({ content, className = "" }: ReadingTimeProps) {
  const minutes = calculateReadingTime(content);
  const formattedTime = formatReadingTime(minutes);

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Clock className="h-4 w-4" />
      <span>{formattedTime}</span>
    </div>
  );
}
