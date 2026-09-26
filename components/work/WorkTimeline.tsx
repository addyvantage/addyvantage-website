"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";

type Entry = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
  href?: string;
  source?: string;
  demo?: string;
};

const experience: Entry[] = [
  {
    id: "american-express",
    eyebrow: "SEP 2026 — PRESENT · APPRENTICESHIP",
    title: "American Express",
    summary: "Apprentice in Credit and Fraud Risk.",
    detail: "Early in the role, learning and contributing to data, product, and workflow problems. Specific internal work is private.",
    tags: ["Data", "Product operations", "Workflows"],
  },
  {
    id: "nus",
    eyebrow: "2025 · TEAM ANALYTICS PROJECT",
    title: "NUS Global Immersion Programme",
    summary: "Airbnb data analysis and reporting with a five-person team.",
    detail: "Worked on data preprocessing, analysis, and reporting with tools including Power BI and Orange ML. No measured outcome is claimed here.",
    tags: ["Analytics", "Power BI", "Orange ML"],
  },
  {
    id: "sukrit",
    eyebrow: "DEC 2024 — JAN 2025 · INTERNSHIP",
    title: "Sukrit Technologies",
    summary: "Data Science Intern working on Python and SQL data cleaning.",
    detail: "Contributed to cleaning and reporting work. The scope is stated conservatively; no quantitative impact claim is made here.",
    tags: ["Python", "SQL", "Reporting"],
  },
];

const entries: Entry[] = [
  ...projects.map((project) => ({
    id: project.slug,
    eyebrow: `${project.kind.toUpperCase()} · ${project.status.toUpperCase()}`,
    title: project.name,
    summary: project.summary,
    detail: `${project.role} ${project.decision}`,
    tags: project.stack.slice(0, 4),
    href: `/work/${project.slug}`,
    source: project.source,
    demo: project.demo,
  })),
  ...experience,
];

export function WorkTimeline() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="work-timeline" aria-label="Selected work and experience">
      {entries.map((item, index) => {
        const isExpanded = expanded === item.id;
        const detailId = `timeline-detail-${item.id}`;
        return (
          <div className="timeline-step" key={item.id}>
            <span className="timeline-marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <article
              className={`timeline-card${isExpanded ? " is-expanded" : ""}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setExpanded(item.id);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") setExpanded((current) => current === item.id ? null : current);
              }}
            >
              <div className="timeline-card-topline"><span>{item.eyebrow}</span><span aria-hidden="true">↗</span></div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <button
                className="timeline-expand"
                type="button"
                aria-expanded={isExpanded}
                aria-controls={detailId}
                onClick={() => setExpanded(isExpanded ? null : item.id)}
              >{isExpanded ? "Hide details" : "Explore details"} <span aria-hidden="true">{isExpanded ? "−" : "+"}</span></button>
              <div className="timeline-detail" id={detailId} hidden={!isExpanded}>
                <p>{item.detail}</p>
                <div className="timeline-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              {(item.href || item.source || item.demo) && <div className="inline-links timeline-links">
                {item.href && <Link href={item.href}>Case study ↗</Link>}
                {item.source && <a href={item.source} target="_blank" rel="noopener noreferrer">Source ↗</a>}
                {item.demo && <a href={item.demo} target="_blank" rel="noopener noreferrer">Live prototype ↗</a>}
              </div>}
            </article>
          </div>
        );
      })}
    </div>
  );
}
