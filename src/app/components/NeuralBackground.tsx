import { useEffect, useRef } from "react";
import { useMotionPreferences } from "./MotionPreferences";

// A quiet version of the template's neural field. No pointer listeners or layout work per frame.
export function NeuralBackground({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { disabled } = useMotionPreferences();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0,
      height = 0,
      frame = 0,
      previous = 0;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const isStatic = disabled || paused;

    function paint(delta = 0) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node, index) => {
        node.x = (node.x + node.vx * delta + width) % width;
        node.y = (node.y + node.vy * delta + height) % height;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(115, 151, 235, 0.38)";
        ctx.fill();
        for (let next = index + 1; next < nodes.length; next++) {
          const other = nodes[next];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance > 165) continue;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(103, 135, 214, ${0.16 * (1 - distance / 165)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });
    }

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: width < 768 ? 20 : 44 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.009,
        vy: (Math.random() - 0.5) * 0.009,
      }));
      paint();
    }

    function animate(now: number) {
      if (now - previous >= 1000 / 24) {
        paint(previous ? Math.min(now - previous, 80) : 0);
        previous = now;
      }
      frame = requestAnimationFrame(animate);
    }

    function syncVisibility() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!document.hidden && !isStatic) frame = requestAnimationFrame(animate);
    }
    resize();
    syncVisibility();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, [disabled, paused]);

  return (
    <canvas ref={canvasRef} className="neural-background" aria-hidden="true" />
  );
}
