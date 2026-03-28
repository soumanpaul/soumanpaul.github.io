import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import ChatInterfaceWrapper from "@/components/chat-interface-wrapper";
import { GoogleAnalytics } from "@/components/google-analytics";
import { profileData, siteConfig } from "@/data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;
const socialUrls = profileData.socialLinks
  .map((link) => link.url)
  .filter((url) => url.startsWith("http"));
const avatarPath = profileData.avatar || "/profile.jpg";

export const metadata: Metadata = {
  title: {
    default: `${profileData.name} | ${profileData.tagline}`,
    template: `%s | ${profileData.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  category: "Portfolio",
  metadataBase: new URL(siteUrl),
  keywords: siteConfig.keywords,
  authors: [{ name: profileData.name, url: siteUrl }],
  creator: profileData.name,
  publisher: profileData.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profileData.name} | ${profileData.tagline}`,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.siteName,
    images: [
      {
        url: avatarPath,
        alt: `${profileData.name} profile photo`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} | ${profileData.tagline}`,
    description: siteConfig.description,
    images: [avatarPath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.siteName,
        description: siteConfig.description,
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profileData.name,
        url: siteUrl,
        image: `${siteUrl}${avatarPath}`,
        jobTitle: profileData.tagline,
        description: profileData.bio,
        sameAs: socialUrls,
        knowsAbout: siteConfig.keywords.slice(1),
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${profileData.name} RSS Feed`}
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content" className="relative z-10 min-h-screen">
            {children}
          </main>

          <ChatInterfaceWrapper />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
