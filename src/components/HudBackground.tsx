import { useEffect, useRef } from 'react';

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
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isMouseActive = mouseX > -500 && mouseX < width + 500 && mouseY > -500 && mouseY < height + 500;

      const gridSize = 44;
      const highlightRadius = 230;

      // Warm ambient grid
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(201, 180, 143, 0.04)';
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
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, highlightRadius);
        gradient.addColorStop(0, 'rgba(234, 88, 12, 0.30)');
        gradient.addColorStop(0.35, 'rgba(234, 88, 12, 0.10)');
        gradient.addColorStop(0.8, 'rgba(234, 88, 12, 0.01)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Intersection nodes near the pointer
        for (let x = startX; x <= endX; x += gridSize) {
          for (let y = startY; y <= endY; y += gridSize) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < highlightRadius) {
              const alpha = (1 - dist / highlightRadius) * 0.5;
              ctx.fillStyle = `rgba(234, 88, 12, ${alpha})`;
              ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
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
      {/* Base textures */}
      <div className="absolute inset-0 hud-grid-bg opacity-40" />
      <div className="absolute inset-0 hud-dots opacity-[0.5]" />
      <div className="absolute inset-0 crt-scanlines opacity-[0.04]" />

      {/* Warm vignette so edges fall into shadow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% 0%, rgba(234,88,12,0.05), transparent 55%), radial-gradient(100% 100% at 50% 100%, rgba(0,0,0,0.55), transparent 60%)' }} />

      {/* Interactive grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80 pointer-events-none" />

      {/* Framing rule + registration corners */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-line/60" />
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-brand-orange/70" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-brand-orange/70" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-brand-orange/70" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-brand-orange/70" />

      {/* Registration cross-marks */}
      {[
        'top-3 left-1/2 -translate-x-1/2',
        'bottom-3 left-1/2 -translate-x-1/2',
        'left-3 top-1/2 -translate-y-1/2',
        'right-3 top-1/2 -translate-y-1/2'
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} text-brand-tan/30 hidden lg:block`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M7 1v12M1 7h12" />
            <circle cx="7" cy="7" r="3" />
          </svg>
        </div>
      ))}

      {/* Oversized registered-trademark watermark, à la UDC */}
      <div className="absolute -bottom-24 -right-16 text-brand-line/40 select-none hidden md:block" style={{ fontFamily: 'var(--font-display)' }}>
        <span className="text-[26rem] leading-none">®</span>
      </div>

      {/* Soft brand glow */}
      <div className="absolute top-10 left-[-160px] w-[620px] h-[620px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, var(--color-brand-orange), transparent 65%)' }} />
    </div>
  );
}
