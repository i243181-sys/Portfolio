import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Database,
  FileCode2,
  Leaf,
  Route,
  ShieldCheck,
  TrafficCone,
} from "lucide-react";
import {
  additionalProjects,
  projects,
  type Project,
  type ProjectCategory,
} from "../data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Reveal, SectionHeading } from "./Reveal";
import { ProjectVisual } from "./ProjectVisual";
import { trackSpotlight } from "./Spotlight";

const visuals = {
  retrieval: {
    icon: FileCode2,
    label: "RETRIEVE → GROUND → DEBUG",
    code: "RAG",
    tone: "blue",
  },
  leaf: {
    icon: Leaf,
    label: "IMAGE → ANALYSIS → GUIDANCE",
    code: "AI",
    tone: "green",
  },
  database: {
    icon: Database,
    label: "DATA · ACCESS · COORDINATION",
    code: "SQL",
    tone: "purple",
  },
  route: {
    icon: Route,
    label: "GRAPHS → PATHS → PREFERENCES",
    code: "C++",
    tone: "cyan",
  },
  traffic: {
    icon: TrafficCone,
    label: "THREADS · PRIORITY · SYNCHRONIZATION",
    code: "IPC",
    tone: "amber",
  },
  shield: {
    icon: ShieldCheck,
    label: "COMPLAINTS → CASES → AUDIT",
    code: "RBAC",
    tone: "pink",
  },
} as const;
const categories: ("All projects" | ProjectCategory)[] = [
  "All projects",
  "AI & LLMs",
  "Web & Data",
  "Systems",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visual = visuals[project.visual];
  const Icon = visual.icon;
  return (
    <Reveal
      delay={Math.min((index % 3) * 0.06, 0.12)}
      className="project-wrapper"
    >
      <article
        className={`project-card spotlight tone-${visual.tone}`}
        onPointerMove={trackSpotlight}
      >
        <div className="project-art" aria-hidden="true">
          <div className="art-grid" />
          <span className="art-code">{visual.code}</span>
          <span className="project-sequence">
            0{projects.indexOf(project) + 1}
          </span>
          <ProjectVisual visual={project.visual} />
          <span className="art-caption">{visual.label}</span>
        </div>
        <div className="project-body">
          <div className="project-meta">
            <span>{project.category}</span>
            {project.inProgress && (
              <span className="in-progress">
                <span />
                In development
              </span>
            )}
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ul className="tag-list" aria-label="Project technologies">
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="project-detail-button"
                aria-label={`Explore ${project.title}`}
              >
                Explore project <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            </DialogTrigger>
            <DialogContent className={`project-dialog tone-${visual.tone}`}>
              <DialogHeader>
                <span className="dialog-project-icon">
                  <Icon size={27} aria-hidden="true" />
                </span>
                <span className="eyebrow">
                  {project.category}
                  {project.inProgress ? " / In development" : ""}
                </span>
                <DialogTitle>{project.title}</DialogTitle>
                <DialogDescription>{project.subtitle}</DialogDescription>
              </DialogHeader>
              <div className="dialog-details">
                <h4>Inside the project</h4>
                <ul>
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
              <ul className="tag-list" aria-label="Technologies">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All projects");
  const visible = projects.filter(
    (project) => category === "All projects" || project.category === category,
  );
  return (
    <section
      id="projects"
      className="section section-tinted"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <SectionHeading
          id="projects-title"
          label="02 / Selected work"
          title="Ideas, made into systems."
          tone="purple"
          description="A selection of AI applications, data-driven software, and systems built from the ground up."
        />
        <Reveal className="project-filters">
          <div role="group" aria-label="Filter featured projects">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>
        <p className="sr-only" role="status">
          {visible.length} featured projects shown
          {category !== "All projects" ? ` in ${category}` : ""}.
        </p>
        <div className="projects-grid">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <Reveal className="more-work">
          <details>
            <summary>
              <span>
                <BookOpen size={18} aria-hidden="true" />
                <span>
                  More things I’ve built
                  <small>
                    Local models, business software, containers, and games
                  </small>
                </span>
              </span>
              <ChevronDown size={21} aria-hidden="true" />
            </summary>
            <div className="additional-projects">
              {additionalProjects.map((project) => (
                <article key={project.title}>
                  <span className="additional-project-icon" aria-hidden="true">
                    <ArrowRight size={17} />
                  </span>
                  <div>
                    <h3>{project.title}</h3>
                    <span className="additional-tech">{project.tech}</span>
                    <p>{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
