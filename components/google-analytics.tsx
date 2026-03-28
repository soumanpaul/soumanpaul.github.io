'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
function usePageTracking() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (!GA_TRACKING_ID || typeof window === 'undefined') return

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

        // @ts-ignore
        window.gtag?.('config', GA_TRACKING_ID, {
            page_path: url,
        })
    }, [pathname, searchParams])
}

function PageTracker() {
    usePageTracking()
    return null
}

export function GoogleAnalytics() {
    if (!GA_TRACKING_ID) {
        return null
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
                }}
            />
            <Suspense fallback={null}>
                <PageTracker />
            </Suspense>
        </>
    )
}

// Helper function to track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
    if (!GA_TRACKING_ID || typeof window === 'undefined') return

    // @ts-ignore
    window.gtag?.('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}

// Common event trackers
export const analytics = {
    // Track button clicks
    clickButton: (buttonName: string) => {
        trackEvent('click', 'button', buttonName)
    },

    // Track link clicks
    clickLink: (linkName: string, url: string) => {
        trackEvent('click', 'link', `${linkName}: ${url}`)
    },

    // Track project views
    viewProject: (projectName: string) => {
        trackEvent('view', 'project', projectName)
    },

    // Track blog post reads
    readBlogPost: (postTitle: string) => {
        trackEvent('read', 'blog_post', postTitle)
    },

    // Track contact form submissions
    submitContact: () => {
        trackEvent('submit', 'contact_form')
    },

    // Track resume downloads
    downloadResume: () => {
        trackEvent('download', 'resume')
    },

    // Track chat interactions
    chatInteraction: (messageType: string) => {
        trackEvent('chat', 'ai_assistant', messageType)
    },

    // Track scroll depth
    scrollDepth: (percentage: number) => {
        trackEvent('scroll', 'page', `${percentage}%`, percentage)
    },
}
