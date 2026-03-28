export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  resume?: string;
  calLink?: string;
  yearsOfExperience?: string;
  availability?: string;
  heroRoles?: string[];
  focusAreas?: string[];
  socialLinks: SocialLink[];
}

export const profileData: ProfileData = {
  name: "Souman Paul",
  tagline: "Full Stack Engineer | AI Engineer | Platform Engineer",
  // bio: "Senior full stack engineer with 6+ years of experience building secure, scalable, and high-performance products across fintech and enterprise domains. I work across TypeScript/Node.js and Python/FastAPI stacks, and build AI-integrated workflows, backend systems, and product experiences that ship reliably.",
  bio: "I build fast, interactive web apps and AI agents designed for real-world impact. Passionate about pushing Gen AI, scalable systems, and next-gen developer tooling forward.",
  email: "paul1729blr@gmail.com",
  phone: "+91 70413 7924",
  location: "Bengaluru, India",
  avatar: "/profile.png",
  resume: "/Souman-Paul-Resume.pdf",
  yearsOfExperience: "6+ years experience",
  availability: "Open to senior product and platform engineering conversations",
  heroRoles: [
    "Full Stack Engineer",
    "AI Product Builder",
    "GenAI Systems Builder",
    "Platform Engineer",
  ],
  focusAreas: [
    "Reactjs & Next.js",
    "TypeScript & Node.js",
    "Python & FastAPI",
    "GenAI/AgenticAI/LLMs",
    "Distributed Systems",
  ],
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/soumanpaul",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/souman",
      icon: "linkedin",
    },
    {
      platform: "X",
      url: "https://x.com/iamsouman",
      icon: "twitter",
    },
    {
      platform: "Email",
      url: "mailto:paul1729blr@gmail.com",
      icon: "mail",
    },
  ],
};
