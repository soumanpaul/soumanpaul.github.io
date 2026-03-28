import { Metadata } from 'next';
import FadeIn from '@/components/animations/fade-in';
import { getAllPosts } from '@/lib/mdx';
import BlogPageClient from '@/components/blog-page-client';
import { profileData } from '@/data';

export const metadata: Metadata = {
    title: `Writing | ${profileData.name}`,
    description:
        'Writing archive for technical notes, long-form articles, and future project breakdowns.',
};

export default async function BlogPage() {
    const allPosts = await getAllPosts();
    const blogPosts = allPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="min-h-screen pt-4 pb-6">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-20">
                <FadeIn>
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Writing
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Technical notes, project breakdowns, and longer-form articles.
                        </p>
                    </div>
                </FadeIn>

                <BlogPageClient posts={blogPosts} />
            </div>
        </div>
    );
}
