"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const getCodeString = (node: React.ReactNode): string => {
        if (typeof node === "string") return node;
        if (Array.isArray(node)) return node.map(getCodeString).join("");
        if (node && typeof node === "object" && "props" in node) {
            const nodeProps = (node as any).props;
            return getCodeString(nodeProps.children);
        }
        return "";
    };

    const codeString = getCodeString(children);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="relative group my-6">
            <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 bg-muted/80 hover:bg-muted backdrop-blur-sm"
                    onClick={copyToClipboard}
                    aria-label={copied ? "Copied!" : "Copy code"}
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-xs">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4 mr-1" />
                            <span className="text-xs">Copy</span>
                        </>
                    )}
                </Button>
            </div>
            <pre
                className={`overflow-x-auto rounded-xl p-4 bg-muted/50 dark:bg-muted/30 border border-border scrollbar-thin ${className || ""}`}
                {...props}
            >
                {children}
            </pre>
        </div>
    );
}
