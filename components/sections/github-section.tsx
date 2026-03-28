"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import SectionContainer from "@/components/section-container";
import { githubConfig } from "@/data/github";

import { ActivityCalendar } from "react-activity-calendar";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

export default function GitHubSection() {
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchContributions = useCallback(async () => {
        try {
            const now = new Date();
            const currentYear = now.getFullYear();
            const previousYear = currentYear - 1;

            // Fetch both years to cover March-to-March range
            const [resCurrent, resPrevious] = await Promise.all([
                fetch(`${githubConfig.apiUrl}/${githubConfig.username}.json?y=${currentYear}`),
                fetch(`${githubConfig.apiUrl}/${githubConfig.username}.json?y=${previousYear}`),
            ]);

            if (!resCurrent.ok || !resPrevious.ok) throw new Error("Failed to fetch");

            const [dataCurrent, dataPrevious] = await Promise.all([
                resCurrent.json(),
                resPrevious.json(),
            ]);

            const levelMap: Record<string, number> = {
                NONE: 0,
                FIRST_QUARTILE: 1,
                SECOND_QUARTILE: 2,
                THIRD_QUARTILE: 3,
                FOURTH_QUARTILE: 4,
            };

            const flatten = (contributions: { date: string; contributionCount: number; contributionLevel: string }[][]) =>
                contributions
                    .flat()
                    .map((c) => ({
                        date: c.date,
                        count: c.contributionCount,
                        level: levelMap[c.contributionLevel] ?? 0,
                    }));

            const allContributions: ContributionDay[] = [
                ...flatten(dataPrevious.contributions),
                ...flatten(dataCurrent.contributions),
            ];

            // Filter to May previous year – March current year
            const startDate = `${previousYear}-05-01`;
            const endDate = `${currentYear}-03-31`;

            // Deduplicate by date (prefer later entry) and filter range
            const dateMap = new Map<string, ContributionDay>();
            for (const c of allContributions) {
                if (c.date >= startDate && c.date <= endDate) {
                    dateMap.set(c.date, c);
                }
            }

            // Sort by date and set
            const filtered = Array.from(dateMap.values()).sort(
                (a, b) => a.date.localeCompare(b.date)
            );

            setContributions(filtered);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContributions();
    }, [fetchContributions]);

    return (
        <SectionContainer className="py-6">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
            >
                {/* Contribution Graph */}
                <a
                    href={`https://github.com/${githubConfig.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl bg-card border border-border/40 p-4 overflow-hidden hover:border-border/80 transition-colors cursor-pointer"
                >
                    {loading ? (
                        <div className="h-28 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
                            Loading contributions...
                        </div>
                    ) : error ? (
                        <div className="h-28 flex flex-col items-center justify-center gap-2">
                            <p className="text-sm text-muted-foreground">Unable to load contributions</p>
                            <a
                                href={`https://github.com/${githubConfig.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline"
                            >
                                View on GitHub →
                            </a>
                        </div>
                    ) : contributions.length === 0 ? (
                        <div className="h-28 flex flex-col items-center justify-center gap-2">
                            <p className="text-sm text-muted-foreground">No contribution data available</p>
                            <a
                                href={`https://github.com/${githubConfig.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline"
                            >
                                View on GitHub →
                            </a>
                        </div>
                    ) : (
                        <ActivityCalendar
                            data={contributions}
                            blockSize={githubConfig.blockSize}
                            blockMargin={githubConfig.blockMargin}
                            fontSize={githubConfig.fontSize}
                            maxLevel={githubConfig.maxLevel as 1 | 2 | 3 | 4}
                            theme={{
                                dark: githubConfig.theme.dark,
                                light: githubConfig.theme.light,
                            }}
                            labels={{
                                totalCount: `{{count}} contributions in the last year`,
                            }}
                        />
                    )}
                </a>

            </motion.div>
        </SectionContainer >
    );
}
