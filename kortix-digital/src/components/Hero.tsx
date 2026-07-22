"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import SpecularButton from "./ui/SpecularButton";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = "rgba(35, 248, 85, 0.6)";
        ctx!.fill();
      }

      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particles.length = 0;
      const count = Math.floor((canvas!.height * canvas!.width) / 12000);
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.5 + 1;
        const x = Math.random() * canvas!.width;
        const y = Math.random() * canvas!.height;
        const directionX = (Math.random() - 0.5) * 0.6;
        const directionY = (Math.random() - 0.5) * 0.6;
        particles.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    function resizeCanvas() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;
          const threshold = (canvas!.width / 7) * (canvas!.height / 7);

          if (distance < threshold) {
            const opacity = 1 - distance / (canvas!.width * canvas!.height / 50);
            const nearMouse =
              mouse.x !== null &&
              mouse.y !== null &&
              Math.sqrt((particles[a].x - mouse.x) ** 2 + (particles[a].y - mouse.y) ** 2) < mouse.radius;

            ctx!.strokeStyle = nearMouse
              ? `rgba(35, 248, 85, ${opacity * 0.8})`
              : `rgba(35, 248, 85, ${opacity * 0.3})`;
            ctx!.lineWidth = nearMouse ? 1.5 : 0.8;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fadeUp = (i: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 + 0.3, duration: 0.7, ease: "easeOut" as const },
    },
  });

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-kortix-darker/60 via-kortix-darker/40 to-kortix-darker/80 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          custom={0}
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kortix-green/10 border border-kortix-green/20 text-kortix-green text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-kortix-green animate-pulse-green" />
            Digital Agency &amp; Mentorship Platform
          </span>
        </motion.div>

        <div className="mb-8 flex flex-wrap items-baseline justify-center gap-x-4">
          <motion.h1
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-foreground"
          >
            We Build.
          </motion.h1>
          <motion.h1
            variants={fadeUp(1)}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-foreground"
          >
            We Teach.
          </motion.h1>
          <motion.h1
            variants={fadeUp(2)}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-kortix-green to-kortix-green/60 green-glow-text"
          >
            We Transform.
          </motion.h1>
        </div>

        <motion.p
          custom={2}
          variants={fadeUp(2)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg text-kortix-text-secondary mb-10 leading-relaxed"
        >
          Professional digital agency services paired with intensive mentorship
          cohorts — everything you need to succeed in the digital economy.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp(3)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          <SpecularButton
            as="a"
            href="/services"
            size="lg"
          >
            Explore Services
          </SpecularButton>
          <SpecularButton
            as="a"
            href="/cohorts"
            size="lg"
            baseColor="#0a0a0a"
            thickness={0.5}
          >
            Join a Cohort
          </SpecularButton>
        </motion.div>
      </div>
    </section>
  );
}
