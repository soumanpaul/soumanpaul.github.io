import HeroSection from "@/components/sections/hero-section";
import GitHubSection from "@/components/sections/github-section";
import TechStackSection from "@/components/sections/tech-stack-section";
import ProjectsSection from "@/components/sections/projects-section";
import ExperienceSection from "@/components/sections/experience-section-new";
import FeaturedBlogs from "@/components/sections/featured-blogs";
import ContactSection from "@/components/sections/contact-section";
import FloatingNav from "@/components/floating-nav";
import { getAllPosts } from "@/lib/mdx";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <GitHubSection />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection />
      <FeaturedBlogs posts={posts} />
      <ContactSection />
      <FloatingNav />
    </main>
  );
}
