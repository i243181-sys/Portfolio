import { useEffect, useState, type PointerEvent } from "react";
import { AnimatePresence, m, useIsPresent, useSpring } from "motion/react";
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
import { useMotionPreferences } from "./MotionPreferences";

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

function ProjectCard({ project }: { project: Project }) {
  const { disabled } = useMotionPreferences();
  const isPresent = useIsPresent();
  const rotateX = useSpring(0, { stiffness: 180, damping: 24, mass: 0.65 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 24, mass: 0.65 });
  const visual = visuals[project.visual];
  const Icon = visual.icon;

  useEffect(() => {
    if (disabled) {
      rotateX.jump(0);
      rotateY.jump(0);
    }
  }, [disabled, rotateX, rotateY]);

  function moveArtwork(event: PointerEvent<HTMLElement>) {
    if (
      disabled ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) return;
    trackSpotlight(event);
    const bounds = event.currentTarget.getBoundingClientRect();
    rotateX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
    rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 10);
  }

  function resetArtwork() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <article
      className={`project-card spotlight tone-${visual.tone}`}
      aria-hidden={!isPresent || undefined}
      onPointerMove={moveArtwork}
      onPointerLeave={resetArtwork}
      onPointerCancel={resetArtwork}
    >
      <div className="project-art" aria-hidden="true">
        <div className="art-grid" />
        <span className="art-code">{visual.code}</span>
        <span className="project-sequence">
          0{projects.indexOf(project) + 1}
        </span>
        <span className="project-cover-mark">
          <Icon size={54} strokeWidth={1.25} />
        </span>
        <m.div
          className="project-art-plane"
          style={{ rotateX, rotateY, transformPerspective: 700 }}
        >
          <ProjectVisual visual={project.visual} />
        </m.div>
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
              disabled={!isPresent}
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
  );
}

export function Projects() {
  const { disabled } = useMotionPreferences();
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
                {category === item && (
                  <m.span
                    className="project-filter-indicator"
                    layoutId={disabled ? undefined : "project-filter-active"}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span className="project-filter-label">{item}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <p className="sr-only" role="status">
          {visible.length} featured projects shown
          {category !== "All projects" ? ` in ${category}` : ""}.
        </p>
        <m.div className="projects-grid" layout={disabled ? false : "position"}>
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <m.div
                key={project.id}
                className="project-wrapper"
                layout={disabled ? false : "position"}
                initial={disabled ? false : { opacity: 0, y: 22, scale: 0.98 }}
                animate={disabled ? { opacity: 1, y: 0, scale: 1 } : undefined}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.08 }}
                exit={{
                  opacity: 0,
                  scale: disabled ? 1 : 0.97,
                  transition: { duration: disabled ? 0 : 0.18 },
                }}
                transition={{
                  duration: disabled ? 0 : 0.48,
                  delay: disabled ? 0 : Math.min((index % 3) * 0.06, 0.12),
                  ease: [0.22, 1, 0.36, 1],
                  layout: { type: "spring", stiffness: 300, damping: 32 },
                }}
              >
                <ProjectCard project={project} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
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
