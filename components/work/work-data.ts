import { projects } from "@/data/projects";

export type WorkTimelineItem = {
  id: string;
  dateLabel: string;
  tagline: string;
  heading: string;
  description: string;
  details: string;
  skills: string[];
  caseStudyUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
};

const projectItems: WorkTimelineItem[] = projects.map((project) => ({
  id: project.slug,
  dateLabel: project.slug === "epistemic-audit-engine" ? "AUDIT" : project.slug === "pebblecode" ? "PEBBLE" : "TUKU",
  tagline: `${project.kind} · ${project.status}`,
  heading: project.name,
  description: project.summary,
  details: `${project.role} ${project.decision} ${project.lesson}`,
  skills: project.stack,
  caseStudyUrl: `/work/${project.slug}`,
  liveUrl: project.demo,
  githubUrl: project.source,
}));

export const workTimelineData: WorkTimelineItem[] = [
  {
    id: "american-express",
    dateLabel: "NOW",
    tagline: "Sep 2026 — present · Apprenticeship",
    heading: "American Express",
    description: "Apprentice in Credit and Fraud Risk, learning and contributing to data, product, and workflow problems.",
    details: "This is a new role. Specific internal projects, systems, and outcomes remain private; no deployed contribution is claimed here.",
    skills: ["Data", "Product operations", "Workflows"],
  },
  ...projectItems,
  {
    id: "nus-data-analytics",
    dateLabel: "2025",
    tagline: "2025 · Team analytics project",
    heading: "NUS Global Immersion Programme",
    description: "Airbnb data analysis and reporting with a five-person team.",
    details: "Worked on preprocessing, analysis, and reporting with tools including Power BI and Orange ML. A measured impact has not been verified for this project.",
    skills: ["Data analysis", "Power BI", "Orange ML"],
  },
  {
    id: "sukrit-data-science",
    dateLabel: "2024–25",
    tagline: "Dec 2024 — Jan 2025 · Internship",
    heading: "Sukrit Technologies",
    description: "Data Science Intern working on Python and SQL data cleaning and reporting.",
    details: "Contributed to cleaning and reporting work during a short internship. No quantitative impact or unverified deployment is claimed.",
    skills: ["Python", "SQL", "Reporting"],
  },
];
