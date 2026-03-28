export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "1",
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL"]
  },
  {
    id: "2",
    title: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "Redux", "HTML", "CSS"]
  },
  {
    id: "3",
    title: "Backend",
    skills: ["Node.js", "Express.js", "Python", "FastAPI", "AsyncIO", "SQLAlchemy ORM", "REST APIs", "BFF Architecture"]
  },
  {
    id: "4",
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "DynamoDB", "Schema Design", "Query Optimization", "Transactions"]
  },
  {
    id: "5",
    title: "Architecture & Cloud",
    skills: ["Microservices", "Event-Driven Systems", "Distributed Systems", "AWS Lambda", "SQS", "Docker", "Kubernetes", "Jenkins CI/CD"]
  },
  {
    id: "6",
    title: "Monitoring & AI",
    skills: ["Datadog", "ELK Stack", "Prompt Engineering", "GenAI Integrations", "LLM Workflows", "Git", "Postman", "JIRA"]
  }
];
