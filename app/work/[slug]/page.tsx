import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/arrow";
import { ProjectMedia } from "@/components/project-media";
import { AppleStyleDock } from "@/components/ui/demo";
import { CAL_URL } from "@/data/contact";
import { getProject, projects, type CaseSection } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> { const {slug}=await params; const project=getProject(slug); if (!project) return {}; return { title: project.name, description: project.summary, alternates: {canonical: `/work/${slug}`}, openGraph: {title: `${project.name} · Aditya Singh`, description: project.summary, url: `/work/${slug}`, images: project.image ? [{url: project.image, alt: project.imageAlt}] : ["/opengraph-image"]} }; }

function Section({ section }: { section: CaseSection }) {
  return (
    <section className="case-section">
      <span className="section-index">{section.label}</span>
      <div>
        <h2>{section.heading}</h2>
        {section.body?.map((p) => <p key={p}>{p}</p>)}
        {section.points && (
          <dl className="case-points">
            {section.points.map((point) => <div key={point.title}><dt>{point.title}</dt><dd>{point.text}</dd></div>)}
          </dl>
        )}
        {section.flows?.map((flow) => (
          <div className="case-flow" key={flow.title}>
            <h3>{flow.title}</h3>
            <span className="label">{flow.roles}</span>
            <ol>{flow.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ProjectPage({params}: Props) {
  const {slug}=await params; const project=getProject(slug); if(!project) notFound();
  const index = projects.indexOf(project);
  const nextProject = projects[(index + 1) % projects.length];
  const detail = project.detailImage && <figure className="case-image"><Image alt={project.detailImage.alt} height={project.detailImage.height} sizes="(max-width: 1100px) 100vw, 1080px" src={project.detailImage.src} width={project.detailImage.width} /><figcaption className="label">{project.detailImage.caption}</figcaption></figure>;
  return <main id="main-content" className="portfolio-page"><div className="page-shell">
    <header className="eyebrow-row label"><Link className="inline-flex items-center gap-2" href="/work"><Arrow dir="left" /> All work</Link><span>Case study / {project.kind}</span></header>
    <article className="case-study">
      <div className="page-intro"><p className="eyebrow">{project.status} · {project.period}</p><h1>{project.name}</h1><p>{project.summary}</p>
        {(project.source || project.demo) && <div className="action-row">{project.source && <a className="button-primary" href={project.source} target="_blank" rel="noopener noreferrer">View source <Arrow dir="up-right" /></a>}{project.demo && <a className="button-secondary" href={project.demo} target="_blank" rel="noopener noreferrer">Open {project.demoLabel?.toLowerCase()} <Arrow dir="up-right" /></a>}</div>}
      </div>
      <div className="case-facts"><div><span className="label">My role</span><p>{project.role}</p></div><div><span className="label">Status</span><p>{project.status}, {project.period}</p></div><div><span className="label">Stack</span><p>{project.stack.join(" · ")}</p></div></div>
      <div className="case-image"><ProjectMedia detailed priority project={project} sizes="(max-width: 1100px) 100vw, 1080px" /></div>
      {project.stats && <dl className="case-stats">{project.stats.map((stat) => <div key={stat.label}><dt>{stat.value}</dt><dd>{stat.label}</dd></div>)}</dl>}
      {project.sections ? project.sections.map((section) => <Section key={section.label} section={section} />) : <>
        <section className="case-section"><span className="section-index">01 / Problem</span><div><h2>What needed to work</h2><p>{project.problem}</p></div></section>
        <section className="case-section"><span className="section-index">02 / Approach</span><div><h2>How I approached it</h2>{project.approach.map(p => <p key={p}>{p}</p>)}</div></section>
        {detail}
        <section className="case-section"><span className="section-index">03 / Decision</span><div><h2>A meaningful tradeoff</h2><p>{project.decision}</p></div></section>
        <section className="case-section"><span className="section-index">04 / Evidence</span><div><h2>What this demonstrates</h2><p>{project.lesson}</p><h3>What I would do next</h3><p>{project.next}</p></div></section>
      </>}
      <div className="case-end"><Link className="text-link" href={`/work/${nextProject.slug}`}>Next: {nextProject.name} <Arrow /></Link><span className="link-row case-contact"><a className="text-link" href="mailto:build@addyvantage.me">Email about this project <Arrow dir="up-right" /></a><a className="text-link" href={CAL_URL} rel="noopener noreferrer" target="_blank">Book a conversation <Arrow dir="up-right" /></a></span></div>
    </article>
  </div><AppleStyleDock /></main>;
}
