import type { PointerEvent } from "react";

// CSS handles the lighting; pointer movement never triggers React renders.
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  element.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
  element.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
}
