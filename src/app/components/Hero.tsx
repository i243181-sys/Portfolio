import { useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  Cpu,
  Download,
  Layers3,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { Button } from "./ui/button";
import { focusAreas, profile } from "../data/portfolio";

const icons = { brain: Brain, cpu: Cpu, layers: Layers3 };

export function Hero() {
  const [selectedFocus, setSelectedFocus] = useState(0);
  const focus = focusAreas[selectedFocus];
  const reduced = useReducedMotion();
  const entrance = (delay: number) => ({
    initial: reduced ? (false as const) : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay },
  });
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-orbits" aria-hidden="true">
        <span />
        <span />
        <i />
        <i />
      </div>
      <div className="container hero-content">
        <m.div {...entrance(0)} className="hero-kicker">
          <span className="status-dot" />
          Software Engineering · FAST–NUCES
        </m.div>
        <m.h1
          {...entrance(0.08)}
          id="hero-title"
          className="gradient-text hero-name"
        >
          {profile.name.toUpperCase()}
          <span className="sr-only"> — Aspiring AI Engineer</span>
        </m.h1>
        <m.p {...entrance(0.17)} className="hero-role">
          Building intelligent systems.
        </m.p>
        <m.p {...entrance(0.24)} className="hero-description">
          Aspiring AI Engineer turning software fundamentals into practical
          <br className="desktop-break" /> RAG, LLM, and intelligent software
          applications.
        </m.p>
        <m.div {...entrance(0.31)} className="hero-focus-picker">
          <div
            className="hero-disciplines"
            role="group"
            aria-label="Explore my engineering focus"
          >
            {focusAreas.map(({ icon, label }, index) => {
              const Icon = icons[icon];
              return (
                <button
                  key={label}
                  type="button"
                  className="discipline"
                  aria-label={`Explore ${label} focus`}
                  aria-pressed={selectedFocus === index}
                  aria-controls="focus-preview"
                  onClick={() => setSelectedFocus(index)}
                >
                  <span className="discipline-icon">
                    <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          <div
            id="focus-preview"
            className={`focus-preview tone-${focus.tone}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <m.div
              key={focus.project}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
            >
              <span className="focus-context">
                <span />
                {focus.context}
              </span>
              <h2>{focus.project}</h2>
              <p>{focus.detail}</p>
            </m.div>
            <a
              href="#projects"
              aria-label={`See projects including ${focus.project}`}
            >
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </m.div>
        <m.div {...entrance(0.38)} className="hero-actions">
          <Button asChild className="action-button primary-button">
            <a href="#projects">
              Explore my work <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="action-button secondary-button"
          >
            <a href={profile.cv} download>
              <Download size={17} aria-hidden="true" /> Download CV
            </a>
          </Button>
        </m.div>
        <m.div {...entrance(0.46)} className="hero-footnote">
          <span>{profile.location}</span>
          <span aria-hidden="true">/</span>
          <span>BS Software Engineering · Expected 2028</span>
        </m.div>
      </div>
      <a className="scroll-cue" href="#about">
        <span>Discover more</span>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
