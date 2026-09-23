import { useState } from "react";
import { domMax, LazyMotion, MotionConfig } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { NeuralBackground } from "./components/NeuralBackground";
import { Navigation } from "./components/Navigation";
import {
  MotionPreferencesProvider,
  useMotionPreferences,
} from "./components/MotionPreferences";

export default function App() {
  const [ambientPaused, setAmbientPaused] = useState(false);
  return (
    <LazyMotion features={domMax} strict>
      <MotionPreferencesProvider paused={ambientPaused}>
        <Portfolio
          ambientPaused={ambientPaused}
          onToggleAmbient={() => setAmbientPaused((value) => !value)}
        />
      </MotionPreferencesProvider>
    </LazyMotion>
  );
}

function Portfolio({
  ambientPaused,
  onToggleAmbient,
}: {
  ambientPaused: boolean;
  onToggleAmbient: () => void;
}) {
  const { disabled } = useMotionPreferences();
  const toggleLabel = ambientPaused ? "Resume animations" : "Pause animations";

  return (
    <MotionConfig
      reducedMotion={disabled ? "always" : "never"}
      transition={disabled ? { duration: 0 } : undefined}
    >
      <div
        className="portfolio"
        data-motion={disabled ? "paused" : "running"}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NeuralBackground paused={ambientPaused} />
        <Navigation />
        <main id="main" tabIndex={-1}>
          <Hero ambientPaused={ambientPaused} />
          <About />
          <Projects />
          <Experience />
          <TechStack />
          <Contact
            ambientPaused={ambientPaused}
            onToggleAmbient={onToggleAmbient}
          />
        </main>
        <button
          type="button"
          className="motion-toggle floating-motion-toggle"
          onClick={onToggleAmbient}
          aria-label={toggleLabel}
          aria-pressed={ambientPaused}
          title={toggleLabel}
        >
          {ambientPaused ? (
            <Play size={14} aria-hidden="true" />
          ) : (
            <Pause size={14} aria-hidden="true" />
          )}
          <span>{toggleLabel}</span>
        </button>
      </div>
    </MotionConfig>
  );
}
