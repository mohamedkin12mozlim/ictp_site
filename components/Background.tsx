
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 40; // Reduced for more premium feel

    // Palette shades adjusted for contrast
    const lightPalette = [
      'rgba(0, 45, 156, ',  // Royal Blue
      'rgba(41, 98, 255, ',  // Cobalt Blue
      'rgba(0, 145, 234, ',  // Cerulean
      'rgba(0, 67, 206, ',  // Sapphire Blue
    ];

    const darkPalette = [
      'rgba(56, 189, 248, ', // Sky 400
      'rgba(96, 165, 250, ', // Blue 400
      'rgba(0, 184, 212, ',   // Turquoise
      'rgba(14, 165, 233, ',   // Sky 500
    ];

    const currentPalette = theme === 'dark' ? darkPalette : lightPalette;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      colorBase: string;
      floatOffset: number;
      floatSpeed: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.15; // Slower movement
        this.vy = (Math.random() - 0.5) * 0.15;
        this.size = Math.random() * 2 + 0.5; // Smaller dots
        this.opacity = theme === 'dark' ? Math.random() * 0.05 + 0.02 : Math.random() * 0.1 + 0.03;
        this.colorBase = currentPalette[Math.floor(Math.random() * currentPalette.length)];
        this.floatOffset = Math.random() * Math.PI * 2;
        this.floatSpeed = Math.random() * 0.01 + 0.005;
      }

      update(w: number, h: number, time: number) {
        // Subtle floating motion using sine/cosine
        const floatX = Math.sin(time * this.floatSpeed + this.floatOffset) * 0.1;
        const floatY = Math.cos(time * this.floatSpeed + this.floatOffset) * 0.1;
        
        this.x += this.vx + floatX;
        this.y += this.vy + floatY;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorBase}${this.opacity})`;
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;
      
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineOpacity = theme === 'dark' ? 0.03 : 0.06;
            const lineColor = theme === 'dark' ? `rgba(56, 189, 248, ${lineOpacity * (1 - dist / 250)})` : `rgba(0, 45, 156, ${lineOpacity * (1 - dist / 250)})`;
            ctx.strokeStyle = lineColor;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update(canvas.width, canvas.height, time);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{ opacity: 0.5 }}
      />
      {/* Cinematic Blur Blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] mix-blend-screen opacity-[0.07] animate-pulse ${
          theme === 'dark' ? 'bg-blue-600' : 'bg-blue-300'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] mix-blend-screen opacity-[0.07] animate-pulse delay-1000 ${
          theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-300'
        }`} />
      </div>
    </>
  );
};

export default Background;
