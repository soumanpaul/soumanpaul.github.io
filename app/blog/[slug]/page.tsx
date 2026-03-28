import { notFound } from 'next/navigation'
import { extractHeadings } from '@/lib/extract-headings'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import BlogPostContent from '@/components/blog-post-content'
import { MdxContent } from '@/components/mdx-content'

interface BlogPageProps {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage(props: BlogPageProps) {
    const params = await props.params
    const { slug } = params

    // Find post using next-mdx-remote based utility
    const post = await getPostBySlug(slug)

    if (!post) notFound()

    // Get all posts for related posts feature
    const allPostsData = (await getAllPosts()).map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        author: p.author,
        description: p.description,
        tags: p.tags,
        featured: p.featured,
        readTime: p.readTime,
        image: p.image,
        content: p.content,
    }))

    const headings = extractHeadings(post.content)

    return (
        <BlogPostContent post={post} allPosts={allPostsData} headings={headings}>
            <MdxContent source={post.content} />
        </BlogPostContent>
    )
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({ slug: post.slug }))
}
