import { ArrowUpRight, Brain, Code2, MapPin } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          label="01 / A little about me"
          title="Curiosity, put into practice."
        />
        <div className="about-grid">
          <Reveal className="about-art">
            <div className="monogram-orbit" aria-hidden="true">
              <div className="orbit-ring" />
              <span className="orbit-node orbit-node-one" />
              <span className="orbit-node orbit-node-two" />
              <div className="monogram-core">
                <span className="monogram">
                  MH<span>.</span>
                </span>
                <span className="monogram-label">
                  BUILD. UNDERSTAND. ITERATE.
                </span>
              </div>
              <span className="orbit-icon orbit-icon-code">
                <Code2 size={23} />
              </span>
              <span className="orbit-icon orbit-icon-brain">
                <Brain size={24} />
              </span>
            </div>
            <span className="location-label">
              <MapPin size={14} aria-hidden="true" /> Based in Pakistan
            </span>
          </Reveal>
          <Reveal delay={0.1} className="about-copy">
            <h3>
              Software foundations.
              <br />
              <span className="text-soft">An AI engineering mindset.</span>
            </h3>
            <p>
              I’m Mughees, a Software Engineering student at FAST–NUCES
              Islamabad, focused on AI engineering and practical intelligent
              systems.
            </p>
            <p>
              My work spans documentation-grounded RAG, image-based AI, and
              local language models, alongside databases, algorithms,
              concurrency, and low-level programming. I learn by turning those
              ideas into working applications.
            </p>
            <div className="focus-note">
              <span className="eyebrow">CURRENT FOCUS</span>
              <p>
                Building FixFlow AI: a debugging assistant grounded in official
                technical documentation.
              </p>
              <a href="#projects">
                Explore the project{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
