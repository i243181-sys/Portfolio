import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
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
        {title}
      </h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}
