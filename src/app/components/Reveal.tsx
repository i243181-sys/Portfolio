import type { ReactNode } from "react";
import { m } from "motion/react";
import { AnimatedWords } from "./MotionDetails";
import { useMotionPreferences } from "./MotionPreferences";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { disabled: reduceMotion } = useMotionPreferences();
  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.985 }}
      animate={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  );
}

export function SectionHeading({
  id,
  label,
  title,
  description,
  tone = "blue",
}: {
  id: string;
  label: string;
  title: string;
  description?: string;
  tone?: string;
}) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow">{label}</span>
      <h2 id={id} className={`gradient-text gradient-${tone}`}>
        <AnimatedWords text={title} gradient />
      </h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}
