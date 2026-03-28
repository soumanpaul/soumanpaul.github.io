export interface Experience {
  id: string;
  company: string;
  link?: string;
  role: string;
  type: "fulltime" | "intern" | "contract";
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Altimetrik",
    role: "Senior Engineer, Product and Platform Engineering",
    type: "fulltime",
    duration: "Aug 2023 - Present",
    startDate: "2023-08",
    endDate: "present",
    description:
      "Building AI-integrated enterprise platforms across insurance, fintech, and internal operations with TypeScript, Node.js, Python, React, Next.js, and data-heavy backend systems.",
    achievements: [
      "Designed and delivered an AI assets portal for secure discovery and reuse of enterprise AI assets and workflows.",
      "Built Node.js and Python services for document orchestration, summarization, semantic search, and metadata retrieval.",
      "Contributed to distributed internal tooling for reporting and analytics across eBay and PayPal client programs.",
      "Implemented compliance-sensitive backend flows, transaction-safe database operations, and production monitoring with Datadog.",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Python",
      "FastAPI",
      "React",
      "Next.js",
      "PostgreSQL",
      "MongoDB",
      "DynamoDB",
      "Docker",
      "AWS",
      "Datadog",
    ],
  },
  {
    id: "2",
    company: "ACL Digital",
    role: "Senior Fullstack Developer",
    type: "fulltime",
    duration: "Aug 2022 - Aug 2023",
    startDate: "2022-08",
    endDate: "2023-08",
    description:
      "Worked on an enterprise service monitoring system with backend adapters, event-driven processing, operational dashboards, and centralized logging.",
    achievements: [
      "Designed backend adapter layers that integrated multiple enterprise services into a single monitoring workflow.",
      "Implemented PostgreSQL transaction handling for reliable and atomic operational data updates.",
      "Built AWS Lambda schedulers and SQS-backed event handlers for asynchronous backend processing.",
      "Developed dashboards and logging pipelines with ELK for real-time visibility into service behavior.",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS Lambda",
      "SQS",
      "ELK",
      "Docker",
    ],
  },
  {
    id: "3",
    company: "AppZoy Technologies Pvt. Ltd",
    role: "Senior Full Stack Engineer",
    type: "fulltime",
    duration: "Feb 2020 - Aug 2022",
    startDate: "2020-02",
    endDate: "2022-08",
    description:
      "Built full-stack web applications and backend services with a strong focus on API design, schema modeling, performance, and engineering delivery standards.",
    achievements: [
      "Designed and implemented RESTful services using Node.js and Python for product-facing applications.",
      "Optimized PostgreSQL queries and schema design, improving response time by roughly 20 percent.",
      "Built scalable React-based interfaces integrated with backend APIs and operational workflows.",
      "Established engineering practices around coding standards, CI/CD, and maintainable feature delivery.",
    ],
    technologies: [
      "Node.js",
      "React",
      "Python",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "CI/CD",
    ],
  },
];
