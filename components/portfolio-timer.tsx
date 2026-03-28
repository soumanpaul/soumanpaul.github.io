"use client";

import { useEffect, useState, useRef } from "react";
import { Timer } from "lucide-react";
import { motion } from "framer-motion";

export function PortfolioTimer() {
    const [time, setTime] = useState(0);
    const [mounted, setMounted] = useState(false);
    const lastUpdateTime = useRef<number>(Date.now());
    const rafId = useRef<number>(null);

    useEffect(() => {
        setMounted(true);

        lastUpdateTime.current = Date.now();

        const animate = () => {
            const now = Date.now();
            const delta = now - lastUpdateTime.current;
            lastUpdateTime.current = now;

            setTime((prev) => prev + delta);

            rafId.current = requestAnimationFrame(animate);
        };

        rafId.current = requestAnimationFrame(animate);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    if (!mounted) return null;

    // Format time to HH:MM:SS:MS
    // We want "microseconds" look, so we can fake the last 3 digits or just show high precision ms.
    // Real microseconds is overkill and untrackable by JS accurately in UI loop, 
    // but we can show milliseconds with 3 digits standard.
    // If user REALLY wants microseconds, we can add a random 3 digit number at the end or just formatting.
    // Let's stick to standard high-res looking format: HH:MM:SS.mmm

    const formatTime = (ms: number) => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor(ms % 1000);
        const microseconds = Math.floor((ms % 1) * 1000); // Faked if using float, but we are using int ms. 
        // Let's just use milliseconds padded to 3 digits.
        // For "microseconds" effect, we can just show `milliseconds * 1000`. 
        // Or actually simpler: just show ms with leading zeros.

        const pad = (n: number, width: number = 2) => n.toString().padStart(width, "0");

        // Return format: HH:MM:SS:mmmmmm (fake micros)
        // Or just HH:MM:SS:mmm
        // Request: "use microseceond"
        // Let's show: HH:MM:SS:mmmm

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative flex items-center gap-2.5 text-xs font-mono font-medium text-muted-foreground bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full shadow-lg shadow-primary/5 hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300 cursor-default"
        >
            <Timer className="w-3.5 h-3.5 text-primary/80 group-hover:text-primary transition-colors" />
            <span className="tabular-nums tracking-wider group-hover:text-foreground transition-colors">
                {formatTime(time)}
            </span>
        </motion.div>
    );
}
