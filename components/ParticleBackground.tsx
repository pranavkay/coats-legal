import React, { useRef, useEffect } from 'react';

type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'cross' | 'chevron';

interface Particle {
  x: number; // World X
  y: number; // World Y
  z: number; // World Z (depth)
  initialX: number;
  initialY: number;
  initialZ: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: ShapeType;
  color: string;
  isFilled: boolean;
  opacity: number;
  isStructural: boolean; 
  vx: number;
  vy: number;
}

const COLORS = ['#FF3333', '#FF6666', '#FF9999', '#EF4444', '#333333', '#555555'];
const SHAPES: ShapeType[] = ['circle', 'square', 'triangle', 'hexagon', 'cross', 'chevron'];

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 }); 
  const smoothMouseRef = useRef({ x: 0, y: 0 }); 
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);

  // Constants
  const FOV = 600; // Field of view
  const TRIANGLE_RADIUS = 500; // Slightly larger structure
  const SPEED_Z = 1.5; // Faster fly-in for more impact

  // Helper to create a random particle
  const createParticle = (w: number, h: number, forceStructure: boolean): Particle => {
    let x, y, z;
    const isStructural = forceStructure;

    if (isStructural) {
      // Hollow Triangle Logic
      // Vertices relative to center (0,0)
      const r = TRIANGLE_RADIUS;
      const angle30 = Math.PI / 6;
      const v1 = { x: 0, y: -r };
      const v2 = { x: r * Math.cos(angle30), y: r * Math.sin(angle30) };
      const v3 = { x: -r * Math.cos(angle30), y: r * Math.sin(angle30) };

      // Pick one of the 3 edges
      const edge = Math.floor(Math.random() * 3);
      let start, end;
      switch (edge) {
        case 0: start = v1; end = v2; break; // Right edge
        case 1: start = v2; end = v3; break; // Bottom edge
        case 2: start = v3; end = v1; break; // Left edge
        default: start = v1; end = v2;
      }

      // Random position along the edge
      const t = Math.random();
      // Linear interpolation
      x = start.x + (end.x - start.x) * t;
      y = start.y + (end.y - start.y) * t;

      // Add scatter/noise
      // Reduced scatter slightly to keep lines defined despite higher count
      const scatter = 25; 
      x += (Math.random() - 0.5) * scatter;
      y += (Math.random() - 0.5) * scatter;

      // Structural particles sit at a specific depth range
      z = Math.random() * 200 + 400; // Z range 400-600

    } else {
      // Ambient dust - fill a 3D volume
      // Spread wide to cover screen when projected
      x = (Math.random() - 0.5) * w * 4;
      y = (Math.random() - 0.5) * h * 4;
      z = Math.random() * 1000; // Depth 0 to 1000
    }

    // Increased base sizes significantly
    const baseSize = isStructural ? (Math.random() * 12 + 4) : (Math.random() * 25 + 6);

    return {
      x,
      y,
      z,
      initialX: x,
      initialY: y,
      initialZ: z,
      size: baseSize,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      isFilled: isStructural ? Math.random() > 0.4 : Math.random() > 0.6,
      // Increased opacity
      opacity: isStructural ? (Math.random() * 0.6 + 0.4) : (Math.random() * 0.5 + 0.2),
      isStructural,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    };
  };

  const drawShape = (ctx: CanvasRenderingContext2D, p: Particle, scale: number) => {
    ctx.beginPath();
    const s = p.size * scale; // Scale size by perspective
    
    if (s < 0.5) return; // Cull too small

    switch (p.type) {
      case 'circle':
        ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
        break;
      case 'square':
        ctx.rect(-s / 2, -s / 2, s, s);
        break;
      case 'triangle':
        ctx.moveTo(0, -s / 2);
        ctx.lineTo(s / 2, s / 2);
        ctx.lineTo(-s / 2, s / 2);
        ctx.closePath();
        break;
      case 'hexagon':
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = (s / 2) * Math.cos(angle);
          const py = (s / 2) * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      case 'cross': {
        const w = s / 3;
        ctx.rect(-w / 2, -s / 2, w, s);
        ctx.rect(-s / 2, -w / 2, s, w);
        break;
      }
      case 'chevron':
        ctx.moveTo(-s / 2, -s / 4);
        ctx.lineTo(0, s / 4);
        ctx.lineTo(s / 2, -s / 4);
        if (p.isFilled) {
             ctx.lineTo(s / 2, 0); 
             ctx.lineTo(0, s / 2);
             ctx.lineTo(-s / 2, 0);
             ctx.closePath();
        } else {
             ctx.lineWidth = Math.max(2, s / 6);
             ctx.strokeStyle = p.color;
             ctx.stroke();
             return; 
        }
        break;
    }

    if (p.isFilled) {
      ctx.fillStyle = p.color;
      ctx.fill();
    } else {
      ctx.lineWidth = Math.max(2, s / 8);
      ctx.strokeStyle = p.color;
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize & Init
    const initParticles = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      // Set mouse center init
      mouseRef.current = { x: w/2, y: h/2 };
      smoothMouseRef.current = { x: w/2, y: h/2 };

      // High Density: Divide total pixels by a smaller number to get MORE particles
      const particleCount = Math.min(Math.floor((w * h) / 900), 1000); 
      
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        // 50% structure, 50% ambient fly-in
        const forceStructure = i < (particleCount * 0.50);
        particles.current.push(createParticle(w, h, forceStructure));
      }
    };

    initParticles();
    
    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', initParticles);

    // Animation Loop
    const render = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Smooth Mouse Lerp
      const lerpFactor = 0.05;
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerpFactor;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerpFactor;

      // Camera Offset based on mouse (Parallax)
      const cameraX = (smoothMouseRef.current.x - cx) * 0.6; // Increased parallax effect
      const cameraY = (smoothMouseRef.current.y - cy) * 0.6;

      const time = Date.now() * 0.001;
      const structRotation = time * 0.15; // Slow rotation for the structure

      particles.current.forEach((p) => {
        p.rotation += p.rotationSpeed;

        if (p.isStructural) {
            // Structural Triangle Logic
            const breathingScale = 1 + Math.sin(time * 0.8) * 0.08; 
            const bx = p.initialX * breathingScale;
            const by = p.initialY * breathingScale;

            p.x = bx * Math.cos(structRotation) - by * Math.sin(structRotation);
            p.y = bx * Math.sin(structRotation) + by * Math.cos(structRotation);
            
            p.x += Math.sin(time * 3 + p.initialY) * 3;
            p.y += Math.cos(time * 3 + p.initialX) * 3;
            p.z = p.initialZ; 
        } else {
            // Ambient Fly-In Logic
            p.z -= SPEED_Z;
            // Reset if passed camera
            if (p.z < 10) {
                p.z = 1000; 
                p.x = (Math.random() - 0.5) * w * 4;
                p.y = (Math.random() - 0.5) * h * 4;
            }
        }

        // 3D Projection
        const effectiveZ = p.z; 
        
        // Safety check to avoid division by zero or extreme scaling
        if (effectiveZ <= 1) return;

        const scale = FOV / effectiveZ;

        const px = (p.x - cameraX) * scale + cx;
        const py = (p.y - cameraY) * scale + cy;

        // Render
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.rotation);
        
        // Depth Fade
        let alpha = p.opacity;
        if (effectiveZ < 100) alpha *= (effectiveZ / 100); // Fade in as it hits camera
        if (effectiveZ > 800) alpha *= (1 - (effectiveZ - 800) / 200); // Fade out in distance
        
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        
        drawShape(ctx, p, scale);
        ctx.restore();
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', initParticles);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
