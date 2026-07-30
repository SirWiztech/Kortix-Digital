"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

const PAD = 0;

const SIZES = {
  sm: "text-[0.85rem] px-[22px] py-[10px]",
  md: "text-[1rem] px-[30px] py-[14px]",
  lg: "text-[1.15rem] px-10 py-[18px]",
};

function hexToRGB(hex: string): [number, number, number] {
  const c = hex.replace("#", "").padEnd(6, "0");
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ];
}

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float roundedBox(vec2 p, vec2 halfSize, float r) {
  vec2 d = abs(p) - halfSize + r;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

void main() {
  vec2 uv = gl_FragCoord.xy - uCenter;
  float dist = roundedBox(uv, uHalfSize, uRadius);
  float border = abs(dist + uBaseWidth * 0.5) - uThickness * 0.5 * uPx;
  float baseMask = 1.0 - smoothstep(0.0, uPx * 2.0, max(dist, 0.0));

  float sh = sin(uAngle) * uShineSize * 20.0;
  float shine = 1.0 - smoothstep(0.0, uShineFade * uPx, abs(uv.x * 0.5 + uv.y * 1.2 + sh));
  shine *= uIntensity;

  float line = 1.0 - smoothstep(0.0, uPx * 2.0, abs(border));
  vec3 col = mix(uBaseColor, uLineColor, line);
  col += shine * uLineColor * 0.5;
  col *= baseMask;

  fragColor = vec4(col, baseMask);
}
`;

interface SpecularButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  as?: "button" | "a";
}

export default function SpecularButton({
  children,
  size = "md",
  radius = 18,
  tint = "#070707",
  tintOpacity = 0,
  blur = 0,
  textColor = "#f5f5f5",
  lineColor = "#23F855",
  baseColor = "#080908",
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  className = "",
  onClick,
  href,
  target,
  rel,
  disabled,
  as = "button",
}: SpecularButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const angleRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;

    async function init() {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || cancelled) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      let ogl: typeof import("ogl");
      try {
        ogl = await import("ogl");
      } catch {
        return;
      }

      if (cancelled) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = (rect.width + PAD * 2) * dpr;
      canvas.height = (rect.height + PAD * 2) * dpr;
      canvas.style.width = `${rect.width + PAD * 2}px`;
      canvas.style.height = `${rect.height + PAD * 2}px`;

      let renderer: import("ogl").Renderer;
      try {
        renderer = new ogl.Renderer({
          canvas,
          width: canvas.width,
          height: canvas.height,
          dpr: 1,
        });
      } catch {
        return;
      }

      if (cancelled) return;

      const gl = renderer.gl;
      const halfW = ((rect.width + PAD * 2) / 2) * dpr;
      const halfH = ((rect.height + PAD * 2) / 2) * dpr;

      const uniforms = {
        uCenter: { value: [halfW, halfH] },
        uHalfSize: { value: [halfW - PAD, halfH - PAD] },
        uRadius: { value: radius },
        uAngle: { value: 0 },
        uPx: { value: 1 },
        uLineColor: { value: hexToRGB(lineColor) },
        uBaseColor: { value: hexToRGB(baseColor) },
        uIntensity: { value: intensity },
        uShineSize: { value: shineSize },
        uShineFade: { value: shineFade },
        uThickness: { value: thickness },
        uBaseWidth: { value: 4 },
      };

      const program = new ogl.Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms,
        transparent: true,
      });

      const mesh = new ogl.Mesh(gl, { geometry: new ogl.Triangle(gl), program });
      renderer.render({ scene: mesh });

      let animId: number;
      const startTime = performance.now();

      function animate(time: number) {
        if (cancelled) return;
        const elapsed = (time - startTime) / 1000;
        angleRef.current = elapsed * speed;
        uniforms.uAngle.value = angleRef.current;

        if (followMouse) {
          const dx = mouseRef.current.x - 0.5;
          const dy = mouseRef.current.y - 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < proximity / 500) {
            uniforms.uAngle.value += dx * 0.5;
          }
        }

        renderer.render({ scene: mesh });
        animId = requestAnimationFrame(animate);
      }

      if (autoAnimate || !followMouse) {
        animId = requestAnimationFrame(animate);
      }

      function handleMouseMove(e: MouseEvent) {
        const r = container!.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - r.left) / r.width,
          y: (e.clientY - r.top) / r.height,
        };
        if (followMouse && !autoAnimate) {
          if (!animId) animId = requestAnimationFrame(animate);
        }
      }

      function handleResize() {
        if (cancelled) return;
        const cvs = canvasRef.current;
        if (!cvs) return;
        const r = container!.getBoundingClientRect();
        const newDpr = Math.min(window.devicePixelRatio, 2);
        cvs.width = (r.width + PAD * 2) * newDpr;
        cvs.height = (r.height + PAD * 2) * newDpr;
        cvs.style.width = `${r.width + PAD * 2}px`;
        cvs.style.height = `${r.height + PAD * 2}px`;
        const newHalfW = ((r.width + PAD * 2) / 2) * newDpr;
        const newHalfH = ((r.height + PAD * 2) / 2) * newDpr;
        uniforms.uCenter.value = [newHalfW, newHalfH];
        uniforms.uHalfSize.value = [newHalfW - PAD, newHalfH - PAD];
        renderer.setSize(cvs.width, cvs.height);
      }

      if (followMouse) {
        window.addEventListener("mousemove", handleMouseMove);
      }
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    const cleanupPromise = init();
    return () => {
      cancelled = true;
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, [mounted, radius, lineColor, baseColor, intensity, shineSize, shineFade, thickness, speed, followMouse, proximity, autoAnimate]);

  const Tag = as === "a" ? "a" : "button";
  const finalTarget = target || (href?.startsWith("http") ? "_blank" : undefined);
  const finalRel = rel || (href?.startsWith("http") ? "noopener noreferrer" : undefined);
  const linkProps = as === "a" ? { href, target: finalTarget, rel: finalRel } : {};

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: baseColor, borderRadius: radius }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <Tag
        {...(linkProps as any)}
        onClick={onClick}
        disabled={disabled}
        className={`relative z-10 cursor-pointer font-medium transition-all duration-200 inline-flex items-center justify-center gap-2 ${disabled ? "opacity-50 pointer-events-none" : ""} ${SIZES[size] || SIZES.md}`}
        style={{
          color: textColor,
          background: baseColor,
          backdropFilter: blur ? `blur(${blur}px)` : "none",
          borderRadius: radius,
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
