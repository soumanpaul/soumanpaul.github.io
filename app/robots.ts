import { MetadataRoute } from 'next'
import { siteConfig } from '@/data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
