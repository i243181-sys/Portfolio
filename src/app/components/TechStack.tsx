import { Brain, Code2, Database, Sparkles, Terminal } from "lucide-react";
import { skillGroups } from "../data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";
import { trackSpotlight } from "./Spotlight";

const icons = {
  brain: Brain,
  code: Code2,
  database: Database,
  terminal: Terminal,
};

export function TechStack() {
  return (
    <section
      id="skills"
      className="section section-tinted"
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeading
          id="skills-title"
          label="04 / The toolkit"
          title="Tools behind the work."
          tone="pink"
          description="The languages, concepts, and tools I use to bring intelligent software to life."
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.icon];
            return (
              <Reveal key={group.title} delay={(index % 2) * 0.07}>
                <article
                  className="skill-card spotlight"
                  onPointerMove={trackSpotlight}
                >
                  <div className="skill-heading">
                    <span className="small-icon">
                      <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h3>{group.title}</h3>
                    <span className="skill-index" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  <ul className="skill-tags">
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <div className="learning-strip">
            <Sparkles size={19} aria-hidden="true" />
            <span>Currently learning</span>
            <span className="learning-divider" aria-hidden="true" />
            <p>Embeddings & vector databases</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
