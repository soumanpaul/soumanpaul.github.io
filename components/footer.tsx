"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/data";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [currentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="w-full py-16 mt-16">
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-12">
        {/* Quote Section */}
        <div className="relative w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-10">
          {/* Large Quote Mark */}
          <div className="absolute top-6 left-6 text-zinc-700 select-none">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="opacity-60"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
          </div>

          <div className="pl-12 md:pl-16">
            <p className="text-zinc-400 italic text-base md:text-lg leading-relaxed">
              "I like building systems where strong engineering, product
              thinking, and AI leverage all reinforce each other."
            </p>
            <p className="mt-4 text-zinc-300 font-medium text-sm md:text-base text-right">
              — <em className="text-zinc-200">{profileData.name}</em>
            </p>
          </div>
        </div>

        {siteConfig.features.visitorCount && (
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-zinc-900/80 border border-zinc-800">
            <Eye className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-400 text-sm">
              You are the <VisitorBadge /> visitor
            </span>
          </div>
        )}

        {/* Credits */}
        <div className="text-center space-y-1">
          <p className="text-sm text-zinc-500">
            Design & Developed by{" "}
            <span className="text-zinc-300 font-semibold">{profileData.name}</span>
          </p>
          <p className="text-xs text-zinc-600">
            © {currentYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function VisitorBadge() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCount() {
      try {
        const storageKey = "visitor_counted_footer";
        const lastVisit = localStorage.getItem(storageKey);
        const now = Date.now();
        const ONE_MINUTE = 60 * 1000;

        const sessionExpired = !lastVisit || (now - parseInt(lastVisit, 10)) > ONE_MINUTE;

        if (sessionExpired) {
          // Increment and fetch
          const res = await fetch("/api/visitors", { method: "POST" });
          if (!res.ok) throw new Error(`POST failed: ${res.status}`);
          const data = await res.json();
          if (data.views !== undefined) {
            setCount(data.views);
            localStorage.setItem(storageKey, now.toString());
          } else {
            throw new Error(data.error || "No views returned");
          }
        } else {
          // Just fetch current count
          const res = await fetch("/api/visitors");
          if (!res.ok) throw new Error(`GET failed: ${res.status}`);
          const data = await res.json();
          if (data.views !== undefined) {
            setCount(data.views);
          } else {
            throw new Error(data.error || "No views returned");
          }
        }
      } catch (e) {
        console.error("Failed to fetch visitor count:", e);
        setError(true);
      }
    }
    fetchCount();
  }, []);

  if (error) {
    return <span className="text-red-400 font-bold">—</span>;
  }

  if (count === null) {
    return <span className="text-zinc-300 font-bold animate-pulse">...</span>;
  }

  return (
    <span className="text-zinc-100 font-bold">
      {count.toLocaleString()}<sup className="text-xs">th</sup>
    </span>
  );
}
