export type Experience = {
  id: string;
  org: string;
  role: string;
  period: string;
  dateLabel: string;
  summary: string;
  details: string;
  skills: string[];
};

// Owner-supplied context; see CONTENT_REVIEW.md before strengthening any claim.
export const experience: Experience[] = [
  {
    id: "american-express",
    org: "American Express",
    role: "Apprentice, Credit and Fraud Risk",
    period: "Sep 2026 to present",
    dateLabel: "NOW",
    summary: "A new apprenticeship in Credit and Fraud Risk, learning and contributing to data, product, and workflow problems.",
    details: "I started in September 2026 and am early in the role. Internal systems, projects, and outcomes are confidential, so none are described here.",
    skills: ["Data", "Product operations", "Workflows"],
  },
  {
    id: "axedstack",
    org: "AxedStack",
    role: "Freelance software engineer",
    period: "Jul 2026 to present",
    dateLabel: "2026",
    summary: "Freelance engineering on a hotel property management system for an AxedStack client, built with Avi Mehta and Shrey Singh.",
    details: "My part covered integrations, accounting posting, tenant-isolation fixes, operator screens, and backups. The client and commercial terms stay private; the case study describes the system and what I built.",
    skills: ["Laravel", "PostgreSQL", "Integrations"],
  },
  {
    id: "nus-data-analytics",
    org: "NUS Global Immersion Programme",
    role: "Team analytics project",
    period: "2025",
    dateLabel: "2025",
    summary: "Airbnb data analysis and reporting with a five-person team.",
    details: "Worked on preprocessing, analysis, and reporting with tools including Power BI and Orange ML. A measured impact has not been verified for this project.",
    skills: ["Data analysis", "Power BI", "Orange ML"],
  },
  {
    id: "sukrit-data-science",
    org: "Sukrit Technologies",
    role: "Data Science Intern",
    period: "Dec 2024 to Jan 2025",
    dateLabel: "2024–25",
    summary: "Python and SQL data cleaning and reporting during a short internship.",
    details: "Contributed to cleaning and reporting work. No quantitative impact or deployment is claimed.",
    skills: ["Python", "SQL", "Reporting"],
  },
];

export const education = [
  { org: "KIIT", detail: "B.Tech, Computer Science & Systems Engineering", period: "Class of 2026" },
  { org: "Modern School, Barakhamba Road", detail: "School education, New Delhi", period: "2022" },
];
