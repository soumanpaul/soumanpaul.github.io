import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react";
import React from "react";
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { CodeBlock } from './mdx-code-block';

// Callout component for special notices
interface CalloutProps {
    type?: "info" | "warning" | "success" | "error";
    children: React.ReactNode;
}

const Callout = ({ type = "info", children }: CalloutProps) => {
    const styles = {
        info: {
            bg: "bg-blue-50 dark:bg-blue-950/30",
            border: "border-blue-200 dark:border-blue-800",
            icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
        },
        warning: {
            bg: "bg-yellow-50 dark:bg-yellow-950/30",
            border: "border-yellow-200 dark:border-yellow-800",
            icon: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
        },
        success: {
            bg: "bg-green-50 dark:bg-green-950/30",
            border: "border-green-200 dark:border-green-800",
            icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
        },
        error: {
            bg: "bg-red-50 dark:bg-red-950/30",
            border: "border-red-200 dark:border-red-800",
            icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
        },
    };

    const style = styles[type];

    return (
        <div className={`my-6 p-4 rounded-xl border-l-4 ${style.bg} ${style.border}`}>
            <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
                <div className="flex-1 prose-sm dark:prose-invert">{children}</div>
            </div>
        </div>
    );
};

const mdxComponents = {
    // Headings
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="scroll-mt-24 text-4xl md:text-5xl font-bold mb-6 mt-10 leading-tight text-foreground" {...props} />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="scroll-mt-24 text-3xl md:text-4xl font-bold mb-5 mt-12 pb-2 border-b border-border leading-snug text-foreground" {...props} />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="scroll-mt-24 text-2xl md:text-3xl font-semibold mb-4 mt-10 leading-snug text-foreground" {...props} />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="scroll-mt-24 text-xl md:text-2xl font-semibold mb-3 mt-8 text-foreground" {...props} />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className="scroll-mt-24 text-lg md:text-xl font-semibold mb-2 mt-6 text-foreground" {...props} />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className="scroll-mt-24 text-base md:text-lg font-semibold mb-2 mt-4 text-foreground" {...props} />
    ),

    // Paragraphs
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="text-lg md:text-xl leading-8 md:leading-9 mb-8 text-foreground/90 font-serif tracking-wide" {...props} />
    ),

    // Lists
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc pl-6 mb-8 space-y-3 text-lg text-foreground/90 marker:text-primary" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal pl-6 mb-8 space-y-3 text-lg text-foreground/90 marker:text-primary" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-8" {...props} />,

    // Blockquotes
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className="border-l-[3px] border-primary pl-6 py-2 my-10 italic text-xl md:text-2xl text-muted-foreground font-serif leading-relaxed" {...props} />
    ),

    // Code
    code: (props: React.HTMLAttributes<HTMLElement>) => {
        const { children, className, ...rest } = props;
        const isInline = !className;

        if (isInline) {
            return (
                <code className="px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono text-primary border border-border" {...rest}>
                    {children}
                </code>
            );
        }

        return (
            <code className={className} {...rest}>
                {children}
            </code>
        );
    },

    pre: CodeBlock,

    // Images
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
        const { alt, src, ...rest } = props;
        return (
            <figure className="my-8 -mx-4 sm:mx-0">
                <div className="relative w-full overflow-hidden rounded-lg border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src || ""} alt={alt || ""} className="w-full h-auto object-cover" loading="lazy" {...rest} />
                </div>
                {alt && <figcaption className="text-sm text-muted-foreground mt-3 text-center italic">{alt}</figcaption>}
            </figure>
        );
    },

    // Links
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const { href, children, ...rest } = props;
        const isExternal = href?.startsWith("http");

        return (
            <a
                href={href}
                className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 transition-colors font-medium"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...rest}
            >
                {children}
            </a>
        );
    },

    hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-12 border-border" {...props} />,

    // Tables
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-8 w-full overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-sm" {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead className="bg-muted" {...props} />,
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody className="divide-y divide-border" {...props} />,
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="border-b border-border hover:bg-muted/50 transition-colors" {...props} />
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border" {...props} />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td className="px-4 py-3 text-sm text-foreground/90" {...props} />,

    strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-foreground" {...props} />,
    em: (props: React.HTMLAttributes<HTMLElement>) => <em className="italic text-foreground" {...props} />,
    del: (props: React.HTMLAttributes<HTMLElement>) => <del className="line-through text-muted-foreground" {...props} />,
    ins: (props: React.HTMLAttributes<HTMLElement>) => <ins className="no-underline bg-green-100 dark:bg-green-900/30 px-0.5" {...props} />,

    // Custom components
    Callout,
    Badge,
    Card,
    CardContent,
};

interface MdxContentProps {
    source: string;
}

// Server component using next-mdx-remote/rsc for React 19 compatibility
export async function MdxContent({ source }: MdxContentProps) {
    const { content } = await compileMDX({
        source,
        components: mdxComponents,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                ],
            },
        },
    });

    return <div className="mdx-content">{content}</div>;
}
