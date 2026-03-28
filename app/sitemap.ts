import { MetadataRoute } from 'next'
import { siteConfig } from '@/data'
import { getAllPosts } from '@/lib/mdx'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get all blog posts
    const posts = await getAllPosts()

    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ]

    if (posts.length > 0) {
        staticPages.push({
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
        })
    }

    return [...staticPages, ...blogUrls]
}
