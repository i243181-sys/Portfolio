import { useState } from "react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { NeuralBackground } from "./components/NeuralBackground";
import { Navigation } from "./components/Navigation";

export default function App() {
  const [ambientPaused, setAmbientPaused] = useState(false);
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div
          className="portfolio"
          data-motion={ambientPaused ? "paused" : "running"}
        >
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <NeuralBackground paused={ambientPaused} />
          <Navigation />
          <main id="main" tabIndex={-1}>
            <Hero />
            <About />
            <Projects />
            <Experience />
            <TechStack />
            <Contact
              ambientPaused={ambientPaused}
              onToggleAmbient={() => setAmbientPaused((value) => !value)}
            />
          </main>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
