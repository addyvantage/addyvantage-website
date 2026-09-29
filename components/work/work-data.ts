import { experience } from "@/data/experience";
import { firstSentence, projects } from "@/data/projects";

export type WorkTimelineItem = {
  id: string;
  dateLabel: string;
  tagline: string;
  heading: string;
  description: string;
  details?: string;
  facts?: { label: string; text: string }[];
  skills: string[];
  caseStudyUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
};

const dateLabels: Record<string, string> = { "hotel-pms": "PMS", pebblecode: "PEBBLE", tuku: "TUKU", "epistemic-audit-engine": "AUDIT" };

const projectItems: WorkTimelineItem[] = projects.map((project) => ({
  id: project.slug,
  dateLabel: dateLabels[project.slug] ?? project.name.toUpperCase(),
  tagline: `${project.kind} · ${project.credit}`,
  heading: project.name,
  description: project.summary,
  facts: [
    { label: "Role", text: project.role },
    { label: "Decision", text: firstSentence(project.decision) },
    { label: "Evidence", text: project.lesson.split(/(?<=\.)\s/)[1] ?? project.lesson },
  ],
  skills: project.stack,
  caseStudyUrl: `/work/${project.slug}`,
  liveUrl: project.demo,
  liveLabel: project.demoLabel,
  githubUrl: project.source,
}));

// The AxedStack engagement is shown through its project (Hotel PMS), so it is not repeated as a slide.
const [current, ...earlier] = experience.filter((item) => item.id !== "axedstack").map<WorkTimelineItem>((item) => ({
  id: item.id,
  dateLabel: item.dateLabel,
  tagline: `${item.period} · ${item.role}`,
  heading: item.org,
  description: item.summary,
  details: item.details,
  skills: item.skills,
}));

export const workTimelineData: WorkTimelineItem[] = [current, ...projectItems, ...earlier];
