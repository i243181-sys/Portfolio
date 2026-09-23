import { Fragment, useEffect, type PointerEvent, type ReactNode } from "react";
import { m, useSpring } from "motion/react";
import { useMotionPreferences } from "./MotionPreferences";

const ease = [0.22, 1, 0.36, 1] as const;

export function AnimatedWords({
  text,
  gradient = false,
  delay = 0,
}: {
  text: string;
  gradient?: boolean;
  delay?: number;
}) {
  const { disabled } = useMotionPreferences();
  const visible = { y: "0%", rotate: 0, opacity: 1 };
  const words = text.split(" ");
  return (
    <span className="animated-words">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <m.span
              className="word-mask"
              initial={disabled ? false : "hidden"}
              animate={disabled ? "visible" : undefined}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <m.span
                className={gradient ? "word-reveal gradient-text" : "word-reveal"}
                variants={{ hidden: { y: "115%", rotate: 5, opacity: 0 }, visible }}
                transition={{
                  duration: disabled ? 0 : 0.85,
                  delay: disabled ? 0 : delay + index * 0.085,
                  ease,
                }}
              >
                {word}
              </m.span>
            </m.span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}

export function Magnetic({ children }: { children: ReactNode }) {
  const { disabled } = useMotionPreferences();
  const x = useSpring(0, { stiffness: 230, damping: 19, mass: 0.6 });
  const y = useSpring(0, { stiffness: 230, damping: 19, mass: 0.6 });

  useEffect(() => {
    if (disabled) {
      x.jump(0);
      y.jump(0);
    }
  }, [disabled, x, y]);

  function reset() {
    x.set(0);
    y.set(0);
  }

  function follow(event: PointerEvent<HTMLDivElement>) {
    if (disabled || event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(Math.max(-7, Math.min(7, (event.clientX - rect.left - rect.width / 2) * 0.13)));
    y.set(Math.max(-5, Math.min(5, (event.clientY - rect.top - rect.height / 2) * 0.18)));
  }

  return (
    <div className="magnetic-target" onPointerMove={follow} onPointerLeave={reset} onPointerCancel={reset} onFocusCapture={reset}>
      <m.div className="magnetic-content" style={{ x: disabled ? 0 : x, y: disabled ? 0 : y }}>
        {children}
      </m.div>
    </div>
  );
}

const disciplines = ["Artificial intelligence", "Thoughtful software", "Systems thinking", "Always learning"];

export function ExpertiseRibbon() {
  return (
    <div className="expertise-ribbon" aria-hidden="true">
      <div className="expertise-track">
        {[0, 1].map(copy => (
          <div className="expertise-group" key={copy}>
            {disciplines.map(discipline => (
              <span className="expertise-item" key={discipline}>
                <span className="ribbon-star">✳</span>
                {discipline}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
