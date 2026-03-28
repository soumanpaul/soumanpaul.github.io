export interface Project {
  title: string;
  description: string;
  type: "fullstack" | "ai" | "saas";
  technologies: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    title: "AI Assets Portal",
    description:
      "Internal enterprise platform for discovering, governing, and reusing AI assets, with secure metadata search and async document workflows.",
    type: "ai",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "DynamoDB",
      "Docker",
    ],
    image: "/project/ai-assets-portal.svg",
  },
  {
    title: "LLM Document Workflows",
    description:
      "AI-assisted backend workflows for summarization, semantic search, and asynchronous document processing inside enterprise product flows.",
    type: "ai",
    technologies: [
      "Python",
      "FastAPI",
      "AsyncIO",
      "Prompt Engineering",
      "LLM Workflows",
      "PostgreSQL",
    ],
    image: "/project/llm-workflows.svg",
  },
  {
    title: "Enterprise Service Monitoring System",
    description:
      "Monitoring platform with backend adapter layers, event-driven schedulers, analytics dashboards, and centralized logging for enterprise operations.",
    type: "saas",
    technologies: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS Lambda",
      "SQS",
      "ELK",
      "Docker",
    ],
    image: "/project/service-monitoring.svg",
  },
  {
    title: "Media Streaming Platform",
    description:
      "Media streaming application inspired by Netflix and YouTube, with content upload flows for providers and real-time viewing experiences for users.",
    type: "fullstack",
    technologies: ["Angular", "TypeScript", "C#"],
    image: "/project/media-streaming.png",
    codeUrl: "https://github.com/soumanpaul/Video-streaming-web-app",
  },
  {
    title: "Online Store",
    description:
      "Marketplace application covering seller accounts, product listings, shopping cart flows, and the core customer purchase journey.",
    type: "saas",
    technologies: ["Angular", "TypeScript", "C#"],
    image: "/project/online-store.png",
    codeUrl: "https://github.com/soumanpaul/E-commerce-web-app",
  },
  {
    title: "Restaurant Booking App",
    description:
      "Full-stack restaurant platform for discovery and reservations, built with React, Redux, Node.js, Express, MongoDB, and REST APIs.",
    type: "fullstack",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "REST APIs"],
    image: "/project/restaurant-booking.gif",
    codeUrl: "https://github.com/soumanpaul/FoodZone-web-app",
  },
  {
    title: "Social Network App",
    description:
      "Social networking application for connecting users, building profiles, and managing community interactions on a MERN-style stack.",
    type: "fullstack",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    image: "/project/social-network.gif",
    codeUrl: "https://github.com/soumanpaul/Social-Network-web-app",
  },
  {
    title: "Movie Collection App",
    description:
      "Movie discovery and collection app for browsing and managing media selections in a fast React-based interface.",
    type: "fullstack",
    technologies: ["React", "JavaScript", "Bootstrap", "CSS"],
    image: "/project/movie-collection.gif",
    codeUrl: "https://github.com/soumanpaul/moviesearch",
  },
];
