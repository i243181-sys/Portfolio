import { Brain, Code2, GraduationCap, Leaf } from "lucide-react";
import { coursework } from "../data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

const experience = [
  {
    icon: Brain,
    label: "AI & intelligent systems",
    title: "Grounding AI in practical applications",
    description:
      "Developing documentation-aware debugging with FixFlow AI, building image-based plant analysis with LeafScan AI, and experimenting with open-source models locally through Ollama.",
    tags: ["RAG & LLMs", "Image-based AI", "Local inference"],
  },
  {
    icon: Code2,
    label: "Software & systems",
    title: "Building beyond the interface",
    description:
      "Applying database design, access control, custom algorithms, and concurrency to full-stack and systems projects. Testing software quality through functional testing and SonarQube analysis.",
    tags: ["Full-stack applications", "Concurrency", "Software quality"],
  },
  {
    icon: Leaf,
    label: "Community-based work · Civics course project",
    title: "Wildlife preservation & awareness",
    description:
      "Completed field-based community work at Islamabad Wildlife Park through FAST–NUCES. Documented species at risk, researched conservation threats, and prepared practical policy recommendations.",
    tags: ["Field work", "Conservation research", "Public awareness"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-title"
    >
      <div className="container experience-container">
        <SectionHeading
          id="experience-title"
          label="03 / Experience & education"
          title="Learning through building."
          tone="green"
          description="Project-based experience, software engineering foundations, and work beyond the classroom."
        />
        <div className="experience-timeline">
          <Reveal className="timeline-entry education-entry">
            <span className="timeline-dot" aria-hidden="true" />
            <article className="timeline-card education-card" id="education">
              <div className="timeline-top">
                <span className="small-icon">
                  <GraduationCap size={22} aria-hidden="true" />
                </span>
                <span className="eyebrow">EDUCATION</span>
                <span className="education-date">Expected 2028</span>
              </div>
              <h3>BS Software Engineering</h3>
              <p className="institution">FAST–NUCES · Islamabad</p>
              <p>National University of Computer and Emerging Sciences</p>
              <div className="coursework">
                <h4>Academic foundations</h4>
                <ul className="tag-list">
                  {coursework.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
          {experience.map(
            ({ icon: Icon, label, title, description, tags }, index) => (
              <Reveal
                key={title}
                className={`timeline-entry ${index % 2 === 0 ? "timeline-right" : "timeline-left"}`}
              >
                <span className="timeline-dot" aria-hidden="true" />
                <article className="timeline-card">
                  <div className="timeline-top">
                    <span className="small-icon">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <span className="timeline-label">{label}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul className="tag-list">
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
