import { useEffect, type PointerEvent } from "react";
import {
  m,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "motion/react";
import portrait from "../../assets/mughees.png";
import { profile } from "../data/portfolio";
import { useMotionPreferences } from "./MotionPreferences";

export function Portrait({ paused }: { paused: boolean }) {
  const preferences = useMotionPreferences();
  const disabled = preferences.disabled || paused;
  const pointerX = useSpring(0, { stiffness: 170, damping: 24 });
  const pointerY = useSpring(0, { stiffness: 170, damping: 24 });
  const rotateX = useTransform(pointerY, [-1, 1], [6, -6]);
  const rotateY = useTransform(pointerX, [-1, 1], [-7, 7]);
  const photoX = useTransform(pointerX, [-1, 1], [-5, 5]);
  const photoY = useTransform(pointerY, [-1, 1], [-5, 5]);
  const lightX = useTransform(pointerX, [-1, 1], [0, 100]);
  const lightY = useTransform(pointerY, [-1, 1], [0, 100]);
  const light = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(196, 182, 255, 0.22), transparent 65%)`;

  useEffect(() => {
    if (disabled) {
      pointerX.jump(0);
      pointerY.jump(0);
    }
  }, [disabled, pointerX, pointerY]);

  function reset() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      disabled ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    // Measure the stationary outer frame so the tilt never feeds back into itself.
    const bounds = event.currentTarget.getBoundingClientRect();
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    pointerX.set(clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    pointerY.set(clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1));
  }

  return (
    <div
      className="portrait-stage"
      data-interactive={!disabled}
      onPointerMove={followPointer}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <div className="portrait-halo" aria-hidden="true" />
      <div className="portrait-outline" aria-hidden="true" />
      <m.div
        className="portrait-card"
        style={{ rotateX: disabled ? 0 : rotateX, rotateY: disabled ? 0 : rotateY }}
      >
        <div className="portrait-photo-wrap">
          <m.img
            className="portrait-photo"
            src={portrait}
            alt={`${profile.name}, aspiring AI engineer`}
            width={1122}
            height={1402}
            loading="eager"
            decoding="async"
            draggable={false}
            style={{ x: disabled ? 0 : photoX, y: disabled ? 0 : photoY }}
          />
          <div className="portrait-shade" aria-hidden="true" />
          <m.div
            className="portrait-light"
            style={{ background: light }}
            aria-hidden="true"
          />
        </div>
        <div className="portrait-caption" aria-hidden="true">
          <span className="portrait-caption-line" />
          <span>Curiosity. Code. Intelligence.</span>
        </div>
        <div className="portrait-badge" aria-hidden="true">
          <span className="status-dot" />
          <span>{profile.role}</span>
        </div>
      </m.div>
    </div>
  );
}
