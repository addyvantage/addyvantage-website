import Image from "next/image";
import { SystemMap } from "@/components/system-map";
import type { Project } from "@/data/projects";

/** The project's primary visual: a 16:9 product capture, or a terminal tile for CLI work. Same frame and caption everywhere. */
export function ProjectMedia({ project, sizes, priority, detailed }: { project: Project; sizes: string; priority?: boolean; detailed?: boolean }) {
  return (
    <figure className="project-media">
      {project.map ? (
        <SystemMap detailed={detailed} />
      ) : project.image ? (
        <Image alt={project.imageAlt ?? ""} height={810} priority={priority} sizes={sizes} src={project.image} width={1440} />
      ) : (
        <pre aria-label={`${project.name} command flow`} className="terminal">
          {project.excerpt?.split("\n").map((line) => <span key={line}>{line}</span>)}
        </pre>
      )}
      <figcaption className="label">{project.imageCaption ?? "Command flow from the public README"}</figcaption>
    </figure>
  );
}
