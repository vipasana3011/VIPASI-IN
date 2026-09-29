'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  vRot: number;
  type: 'dust' | 'petal';
}

export default function KarigarParticles({ count = 36 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isVisible = true;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || 600;
    };
    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const particles: Particle[] = [];
    const actualCount = Math.min(count, 40);

    for (let i = 0; i < actualCount; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1000),
        y: Math.random() * (canvas.height || 600),
        vx: (Math.random() - 0.4) * 0.4,
        vy: 0.3 + Math.random() * 0.6,
        size: Math.random() > 0.65 ? 3 + Math.random() * 3 : 1.5 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.03,
        type: Math.random() > 0.6 ? 'petal' : 'dust',
      });
    }

    const render = () => {
      if (isVisible && ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.vRot;

          if (p.y > canvas.height + 20) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -20) p.x = canvas.width + 10;
          if (p.x > canvas.width + 20) p.x = -10;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          if (p.type === 'petal') {
            // Auspicious Marigold Petal
            ctx.fillStyle = `rgba(235, 138, 48, ${p.alpha})`;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Inner warm gold highlight
            ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha * 0.7})`;
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Gold Karigar Dust Shimmer
            ctx.fillStyle = `rgba(223, 193, 155, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      aria-hidden="true"
    />
  );
}
