import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

export default function HudBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isMouseActive = mouseX > -500 && mouseX < width + 500 && mouseY > -500 && mouseY < height + 500;

      const gridSize = 45; // Sized grid/checkerboard cells
      const highlightRadius = 240;

      // Dynamic color palette based on mode
      const ambientGridColor = 'rgba(63, 63, 70, 0.035)';
      const accentRedOuter = 'rgba(239, 68, 68, 0.12)';
      const accentRedInner = 'rgba(239, 68, 68, 0.32)';

      // 1. Draw static/ambient faint checkered grid line background
      ctx.beginPath();
      ctx.strokeStyle = ambientGridColor;
      ctx.lineWidth = 0.8;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Show dynamic radial glowing checkered highlight near pointer
      if (isMouseActive) {
        const startX = Math.max(0, Math.floor((mouseX - highlightRadius) / gridSize) * gridSize);
        const endX = Math.min(width, Math.ceil((mouseX + highlightRadius) / gridSize) * gridSize);
        const startY = Math.max(0, Math.floor((mouseY - highlightRadius) / gridSize) * gridSize);
        const endY = Math.min(height, Math.ceil((mouseY + highlightRadius) / gridSize) * gridSize);

        ctx.beginPath();
        for (let x = startX; x <= endX; x += gridSize) {
          ctx.moveTo(x, startY);
          ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
          ctx.moveTo(startX, y);
          ctx.lineTo(endX, y);
        }

        // Beautiful smooth radial gradient from red accent to absolute transparent
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, highlightRadius);
        gradient.addColorStop(0, accentRedInner); // Gentle red center glow 
        gradient.addColorStop(0.35, accentRedOuter); // Falloff
        gradient.addColorStop(0.8, 'rgba(239, 68, 68, 0.01)'); // Fade boundary
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // 3. Highlight grid intersection points for a premium tech HUD touch
        for (let x = startX; x <= endX; x += gridSize) {
          for (let y = startY; y <= endY; y += gridSize) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < highlightRadius) {
              const alpha = (1 - dist / highlightRadius) * 0.45;
              ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
              ctx.fillRect(x - 1, y - 1, 2, 2);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Visual base textures */}
      <div className="absolute inset-0 hud-grid-bg opacity-30" />
      <div className="absolute inset-0 hud-dots opacity-20" />
      <div className="absolute inset-0 crt-scanlines opacity-[0.02]" />

      {/* Interactive responsive background lines canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" />

      {/* Cybernetic HUD Frame Borders */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-zinc-900/40 border-dashed" />
      
      {/* Corner Bracket Elements */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand-red/65" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-brand-red/65" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-brand-red/65" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand-red/65" />

      {/* Decorative vertical scale markers */}
      <div className="absolute left-6 top-1/3 -translate-y-1/2 flex flex-col items-center gap-1 opacity-25 hidden xl:flex">
        <span className="text-[8px] font-mono text-zinc-400">1.003</span>
        <span className="w-4 h-[1px] bg-zinc-600" />
        <span className="w-2 h-[1px] bg-zinc-600" />
        <span className="w-2 h-[1px] bg-zinc-600" />
        <span className="w-3 h-[1px] bg-brand-red" />
        <span className="w-2 h-[1px] bg-zinc-600" />
        <span className="w-2 h-[1px] bg-zinc-600" />
        <span className="w-4 h-[1px] bg-zinc-600" />
        <span className="text-[8px] font-mono text-zinc-400">1.002</span>
      </div>

      <div className="absolute right-6 top-1/3 -translate-y-1/2 flex flex-col items-center gap-1 opacity-25 hidden xl:flex">
        <span className="text-[8px] font-mono text-zinc-400">00</span>
        <span className="w-4 h-[1px] bg-zinc-600" />
        <span className="w-2 h-[1px] bg-zinc-600" />
        <span className="w-3 h-[1px] bg-brand-yellow" />
        <span className="w-2 h-[1px] bg-zinc-600" />
        <span className="w-4 h-[1px] bg-zinc-600" />
        <span className="text-[8px] font-mono text-zinc-400">01</span>
      </div>

      {/* Ambient background glowing geometric triangles */}
      <div className="absolute bottom-20 right-[-100px] w-[500px] h-[500px] opacity-[0.02] border-r border-t border-brand-red rotate-45 pointer-events-none" />
      <div className="absolute top-20 left-[-150px] w-[600px] h-[600px] border border-brand-yellow rounded-full opacity-[0.015] pointer-events-none" />
    </div>
  );
}
