"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data";

interface ViewCounterProps {
    slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
    if (!siteConfig.features.viewCounts) {
        return null;
    }

    const [views, setViews] = useState<number | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!slug) return;

        const trackView = async () => {
            try {
                const storageKey = `viewed_post_${slug}`;
                const lastView = localStorage.getItem(storageKey);
                const now = Date.now();
                const ONE_MINUTE = 60 * 1000; // 1 minute in milliseconds

                // Check if session expired (more than 1 minute since last view)
                const sessionExpired = !lastView || (now - parseInt(lastView, 10)) > ONE_MINUTE;

                if (sessionExpired) {
                    // Increment view count
                    const res = await fetch("/api/blog-views", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ slug }),
                    });

                    if (!res.ok) throw new Error(`POST failed: ${res.status}`);

                    const data = await res.json();
                    if (data.views !== undefined) {
                        setViews(data.views);
                        localStorage.setItem(storageKey, now.toString());
                    } else {
                        throw new Error(data.error || "No views returned");
                    }
                } else {
                    // Session still active, just fetch
                    const getRes = await fetch(`/api/blog-views?slug=${slug}`);
                    if (!getRes.ok) throw new Error(`GET failed: ${getRes.status}`);

                    const data = await getRes.json();
                    if (data.views !== undefined) {
                        setViews(data.views);
                    } else {
                        throw new Error(data.error || "No views returned");
                    }
                }
            } catch (err) {
                console.error("Error in ViewCounter:", err);
                setError(true);
            }
        };

        trackView();
    }, [slug]);

    if (error) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>-- views</span>
            </div>
        );
    }

    if (views === null) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                <Eye className="w-4 h-4" />
                <span>...</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground" title="Total views">
            <Eye className="w-4 h-4" />
            <span>{views.toLocaleString()} views</span>
        </div>
    );
}
