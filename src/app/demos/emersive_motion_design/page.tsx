"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function EmersiveMotionDesignPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<HTMLDivElement | null>(null);
  const playOverlayRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    const inIframe = typeof window !== "undefined" && window.self !== window.top;
    setIsInIframe(inIframe);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const progressBar = progressBarRef.current;
    const timerEl = timerRef.current;
    const playOverlay = playOverlayRef.current;

    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let dpr = 1;
    const DURATION = 150;
    let startTime: number | null = null;
    let elapsed = 0;
    let running = false;
    let animationFrameId = 0;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      cy = H / 2;
    }

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = () => {
      // Ambient mouse tracking if needed
    };
    window.addEventListener("mousemove", handleMouseMove);

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v));
    }
    function map(v: number, a: number, b: number, c: number, d: number) {
      return c + ((v - a) / (b - a)) * (d - c);
    }
    function easeInOut(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function easeIn(t: number) {
      return t * t * t;
    }
    function easeOutElastic(t: number) {
      if (t === 0 || t === 1) return t;
      return Math.pow(2, -10 * t) * Math.sin(((t * 10 - 0.75) * (2 * Math.PI)) / 3) + 1;
    }
    function easeOutBack(t: number) {
      const c = 1.70158;
      return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
    }

    function sceneProgress(sceneStart: number, sceneDuration: number) {
      const t = (elapsed - sceneStart) / sceneDuration;
      return clamp(t, 0, 1);
    }

    function isActive(start: number, dur: number) {
      return elapsed >= start && elapsed < start + dur;
    }

    function fadeInOut(t: number, fadeIn = 0.15, fadeOut = 0.15) {
      if (t < fadeIn) return easeOut(t / fadeIn);
      if (t > 1 - fadeOut) return easeOut((1 - t) / fadeOut);
      return 1;
    }

    // Scene 1: The Void (0 to 12s)
    function drawScene1() {
      if (!ctx || !isActive(0, 12)) return;
      const t = sceneProgress(0, 12);
      const alpha = fadeInOut(t, 0.01, 0.2);

      const dotSize = easeOutElastic(clamp(t * 3, 0, 1)) * 6;
      const pulseSize = dotSize + Math.sin(elapsed * 4) * 2;

      ctx.save();
      ctx.globalAlpha = alpha;

      const ringCount = Math.floor(lerp(0, 8, easeOut(clamp(t * 2 - 0.3, 0, 1))));
      for (let i = 0; i < ringCount; i++) {
        const delay = i * 0.08;
        const rt = clamp((t - 0.15 - delay) * 3, 0, 1);
        const radius = (easeOut(rt) * Math.min(W, H) * 0.4 * (i + 1)) / ringCount;
        const ringAlpha = (1 - rt) * 0.3;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${ringAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      if (t > 0.2) {
        const particleT = clamp((t - 0.2) / 0.8, 0, 1);
        const count = Math.floor(particleT * 60);
        for (let i = 0; i < count; i++) {
          const angle = (i / 60) * Math.PI * 2 + elapsed * 0.2;
          const dist = easeOut(particleT) * Math.min(W, H) * 0.35 * (0.3 + (0.7 * ((i * 7 + 13) % 17)) / 17);
          const px = cx + Math.cos(angle) * dist;
          const py = cy + Math.sin(angle) * dist;
          const size = 1 + ((i * 3 + 7) % 5) * 0.4;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.1 + 0.4 * particleT})`;
          ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.arc(cx, cy, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      if (t > 0.6) {
        const textAlpha = easeOut(clamp((t - 0.6) / 0.2, 0, 1)) * alpha;
        ctx.globalAlpha = textAlpha * 0.4;
        ctx.font = `300 11px 'Space Grotesk'`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("A MOTION EXPERIENCE", cx, cy + 60);
      }

      ctx.restore();
    }

    // Scene 2: Constellation (10 to 25s)
    const constellationParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      phase: number;
    }> = [];
    for (let i = 0; i < 200; i++) {
      constellationParticles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        size: 1 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    function drawScene2() {
      if (!ctx || !isActive(10, 15)) return;
      const t = sceneProgress(10, 15);
      const alpha = fadeInOut(t, 0.15, 0.15);

      ctx.save();
      ctx.globalAlpha = alpha;

      constellationParticles.forEach((p) => {
        p.x += p.vx + Math.sin(elapsed * 0.5 + p.phase) * 0.00005;
        p.y += p.vy + Math.cos(elapsed * 0.3 + p.phase) * 0.00005;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
      });

      const connectionDist = 0.12;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < constellationParticles.length; i++) {
        const a = constellationParticles[i];
        for (let j = i + 1; j < constellationParticles.length; j++) {
          const b = constellationParticles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.strokeStyle = `rgba(255,255,255,${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      const entryT = easeOut(clamp(t * 4, 0, 1));
      constellationParticles.forEach((p, i) => {
        if (i / constellationParticles.length > entryT) return;
        const flicker = 0.5 + 0.5 * Math.sin(elapsed * 2 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.size * flicker, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + flicker * 0.5})`;
        ctx.fill();
      });

      ctx.restore();
    }

    // Scene 3: Kinetic Typography (22 to 38s)
    function drawScene3() {
      if (!ctx || !isActive(22, 16)) return;
      const t = sceneProgress(22, 16);
      const alpha = fadeInOut(t, 0.1, 0.15);

      ctx.save();
      ctx.globalAlpha = alpha;

      const letters = "EMERSIVE".split("");
      const fontSize = Math.min(W * 0.14, 160);
      ctx.font = `800 ${fontSize}px 'Syne'`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const totalWidth = ctx.measureText("EMERSIVE").width;
      const startX = cx - totalWidth / 2;

      letters.forEach((letter, i) => {
        const delay = i * 0.06;
        const lt = clamp((t - delay) / 0.15, 0, 1);
        const entryT = easeOutElastic(lt);

        const originY = (i % 2 === 0 ? -1 : 1) * H * 0.5;
        const originX = Math.sin(i * 12.345) * W * 0.4;

        let lx: number;
        let ly: number;
        if (t < 0.35) {
          const measured = ctx.measureText(letters.slice(0, i).join("")).width;
          lx = lerp(cx + originX * 0.3, startX + measured + ctx.measureText(letter).width / 2, entryT);
          ly = lerp(cy + originY, cy, entryT);
        } else if (t < 0.65) {
          const breathT = (t - 0.35) / 0.3;
          const measured = ctx.measureText(letters.slice(0, i).join("")).width;
          lx = startX + measured + ctx.measureText(letter).width / 2;
          ly = cy + Math.sin(breathT * Math.PI * 2 + i * 0.5) * 8;
        } else {
          const exitT = easeIn(clamp((t - 0.65) / 0.35, 0, 1));
          const angle = (i / letters.length) * Math.PI * 2 - Math.PI / 2;
          const measured = ctx.measureText(letters.slice(0, i).join("")).width;
          const baseX = startX + measured + ctx.measureText(letter).width / 2;
          lx = lerp(baseX, baseX + Math.cos(angle) * W * 0.6, exitT);
          ly = lerp(cy, cy + Math.sin(angle) * H * 0.6, exitT);
        }

        ctx.save();
        ctx.translate(lx, ly);
        const scale = t < 0.35 ? entryT : t > 0.65 ? 1 - easeIn(clamp((t - 0.65) / 0.35, 0, 1)) * 0.5 : 1;
        ctx.scale(scale, scale);

        ctx.shadowColor = "rgba(255,255,255,0.3)";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(letter, 0, 0);
        ctx.shadowBlur = 0;

        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;
        ctx.strokeText(letter, 0, 0);

        ctx.restore();
      });

      if (t > 0.3 && t < 0.7) {
        const subAlpha = fadeInOut(map(t, 0.3, 0.7, 0, 1)) * 0.4;
        ctx.globalAlpha = subAlpha * alpha;
        ctx.font = `300 14px 'Space Grotesk'`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("MOTION   DESIGN   EXPERIENCE", cx, cy + fontSize * 0.6 + 20);
      }

      ctx.restore();
    }

    // Scene 4: Morphing Geometry (35 to 50s)
    function drawScene4() {
      if (!ctx || !isActive(35, 15)) return;
      const t = sceneProgress(35, 15);
      const alpha = fadeInOut(t, 0.12, 0.12);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);

      const maxRadius = Math.min(W, H) * 0.3;
      const sides = [64, 3, 4, 6, 5, 8, 64];
      const shapeIdx = Math.floor(t * (sides.length - 1));
      const shapeLerp = (t * (sides.length - 1)) % 1;
      const currentSides = Math.round(
        lerp(sides[Math.min(shapeIdx, sides.length - 1)], sides[Math.min(shapeIdx + 1, sides.length - 1)], easeInOut(shapeLerp))
      );

      for (let layer = 0; layer < 5; layer++) {
        const layerScale = 1 - layer * 0.15;
        const rotation = elapsed * (0.3 + layer * 0.15) * (layer % 2 === 0 ? 1 : -1);
        const layerAlpha = 0.8 - layer * 0.15;

        ctx.save();
        ctx.rotate(rotation);
        ctx.globalAlpha = layerAlpha * alpha;

        const r = maxRadius * layerScale;
        const n = Math.max(3, currentSides);

        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        if (layer === 0) {
          ctx.fillStyle = `rgba(255,255,255,0.03)`;
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.6 - layer * 0.1})`;
        ctx.lineWidth = 1.5 - layer * 0.2;
        ctx.stroke();

        for (let i = 0; i < n; i++) {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          ctx.beginPath();
          ctx.arc(px, py, 3 - layer * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.globalAlpha = alpha * 0.35;
      ctx.font = `300 12px 'Space Grotesk'`;
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      const shapeNames = ["Circle", "Triangle", "Square", "Hexagon", "Pentagon", "Octagon", "Circle"];
      ctx.fillText(shapeNames[Math.min(shapeIdx, shapeNames.length - 1)]?.toUpperCase() || "", 0, maxRadius + 40);

      ctx.restore();
    }

    // Scene 5: Grid Wave (47 to 62s)
    function drawScene5() {
      if (!ctx || !isActive(47, 15)) return;
      const t = sceneProgress(47, 15);
      const alpha = fadeInOut(t, 0.1, 0.15);

      ctx.save();
      ctx.globalAlpha = alpha;

      const cols = 30;
      const rows = 20;
      const cellW = W / cols;
      const cellH = H / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * cellW;
          const by = r * cellH;
          const centerDist = Math.sqrt(Math.pow((c - cols / 2) / cols, 2) + Math.pow((r - rows / 2) / rows, 2));

          const wave = Math.sin(c * 0.3 + elapsed * 2) * Math.cos(r * 0.4 + elapsed * 1.5) * 15;
          const wave2 = Math.sin(centerDist * 10 - elapsed * 3) * 10;

          const dx = wave * easeOut(clamp(t * 3, 0, 1));
          const dy = wave2 * easeOut(clamp(t * 3, 0, 1));

          const sizeMod = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(centerDist * 8 - elapsed * 2));
          const dotSize = Math.min(cellW, cellH) * 0.15 * sizeMod;

          const stagger = (c + r) * 0.005;
          const entryT = clamp((t - stagger) * 5, 0, 1);
          if (entryT <= 0) continue;

          const dotAlpha = 0.2 + 0.6 * sizeMod;
          ctx.beginPath();
          ctx.arc(bx + cellW / 2 + dx, by + cellH / 2 + dy, dotSize * easeOutBack(entryT), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${dotAlpha})`;
          ctx.fill();
        }
      }

      ctx.restore();
    }

    // Scene 6: Flowing Ribbons (59 to 74s)
    function drawScene6() {
      if (!ctx || !isActive(59, 15)) return;
      const t = sceneProgress(59, 15);
      const alpha = fadeInOut(t, 0.12, 0.12);

      ctx.save();
      ctx.globalAlpha = alpha;

      const ribbonCount = 7;
      for (let r = 0; r < ribbonCount; r++) {
        const ribbonT = clamp((t - r * 0.04) * 2, 0, 1);
        if (ribbonT <= 0) continue;

        const yOffset = H * (0.15 + (r / ribbonCount) * 0.7);
        const amplitude = 40 + r * 15;
        const frequency = 0.008 + r * 0.002;
        const speed = elapsed * (0.8 + r * 0.2);
        const ribbonAlpha = (0.15 + (r / ribbonCount) * 0.25) * ribbonT;

        ctx.beginPath();
        const points = Math.floor(W * ribbonT);
        for (let x = 0; x <= points; x += 2) {
          const y =
            yOffset +
            Math.sin(x * frequency + speed) * amplitude +
            Math.sin(x * frequency * 2.3 + speed * 0.7) * amplitude * 0.3 +
            Math.cos(x * frequency * 0.5 + speed * 1.3) * amplitude * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, W, 0);
        gradient.addColorStop(0, `rgba(255,255,255,0)`);
        gradient.addColorStop(0.2, `rgba(255,255,255,${ribbonAlpha})`);
        gradient.addColorStop(0.8, `rgba(255,255,255,${ribbonAlpha})`);
        gradient.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 + r * 0.3;
        ctx.stroke();
      }

      if (t > 0.2 && t < 0.8) {
        const labelAlpha = fadeInOut(map(t, 0.2, 0.8, 0, 1)) * 0.5;
        ctx.globalAlpha = labelAlpha;
        ctx.font = `600 ${Math.min(W * 0.06, 72)}px 'Syne'`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("FLOW", cx, cy);
        ctx.font = `200 12px 'Space Grotesk'`;
        ctx.fillText("Organic movement, crafted with precision", cx, cy + 40);
      }

      ctx.restore();
    }

    // Scene 7: Circle Packing (71 to 86s)
    const packedCircles: Array<{ x: number; y: number; r: number; phase: number; delay: number }> = [];
    function generatePackedCircles() {
      packedCircles.length = 0;
      for (let i = 0; i < 120; i++) {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
          const r = 8 + Math.random() * 50;
          const x = r + Math.random() * (Math.max(100, W) - 2 * r);
          const y = r + Math.random() * (Math.max(100, H) - 2 * r);
          let overlaps = false;
          for (const c of packedCircles) {
            const dx = c.x - x;
            const dy = c.y - y;
            if (Math.sqrt(dx * dx + dy * dy) < c.r + r + 4) {
              overlaps = true;
              break;
            }
          }
          if (!overlaps) {
            packedCircles.push({ x, y, r, phase: Math.random() * Math.PI * 2, delay: i * 0.008 });
            placed = true;
          }
          attempts++;
        }
      }
    }
    generatePackedCircles();

    function drawScene7() {
      if (!ctx || !isActive(71, 15)) return;
      const t = sceneProgress(71, 15);
      const alpha = fadeInOut(t, 0.1, 0.15);

      ctx.save();
      ctx.globalAlpha = alpha;

      packedCircles.forEach((c) => {
        const entryT = easeOutElastic(clamp((t - c.delay) * 3, 0, 1));
        if (entryT <= 0) return;

        const breathe = 1 + Math.sin(elapsed * 1.5 + c.phase) * 0.05;
        const r = c.r * entryT * breathe;

        ctx.beginPath();
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.02 + (c.r / 60) * 0.04})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(255,255,255,${0.15 + (c.r / 60) * 0.3})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      ctx.restore();
    }

    // Scene 8: Three Dimensional Wireframe Cube (83 to 98s)
    function project3D(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number) {
      const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
      const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);

      const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

      const x2 = x1 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
      const y2 = x1 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

      const fov = 500;
      const scale = fov / (fov + z2);
      return { x: x2 * scale, y: y2 * scale, z: z2, scale };
    }

    function drawScene8() {
      if (!ctx || !isActive(83, 15)) return;
      const t = sceneProgress(83, 15);
      const alpha = fadeInOut(t, 0.12, 0.12);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);

      const size = Math.min(W, H) * 0.22;
      const rotX = elapsed * 0.4;
      const rotY = elapsed * 0.6;
      const rotZ = elapsed * 0.2;

      const verts = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ].map((v) => project3D(v[0] * size, v[1] * size, v[2] * size, rotX, rotY, rotZ));

      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];

      const entryScale = easeOutElastic(clamp(t * 3, 0, 1));

      edges.forEach(([a, b], i) => {
        const edgeT = clamp((t - i * 0.01) * 4, 0, 1);
        if (edgeT <= 0) return;

        const va = verts[a];
        const vb = verts[b];
        const avgZ = (va.z + vb.z) / 2;
        const depthAlpha = map(avgZ, -size, size, 0.6, 0.15);

        ctx.beginPath();
        ctx.moveTo(va.x * entryScale, va.y * entryScale);
        ctx.lineTo(vb.x * entryScale, vb.y * entryScale);
        ctx.strokeStyle = `rgba(255,255,255,${depthAlpha * edgeT})`;
        ctx.lineWidth = map(avgZ, -size, size, 2, 0.5);
        ctx.stroke();
      });

      verts.forEach((v) => {
        const dotSize = map(v.z, -size, size, 4, 1.5) * entryScale;
        const dotAlpha = map(v.z, -size, size, 0.9, 0.2);
        ctx.beginPath();
        ctx.arc(v.x * entryScale, v.y * entryScale, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${dotAlpha})`;
        ctx.fill();
      });

      const innerSize = size * 0.4;
      const innerVerts = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ].map((v) => project3D(v[0] * innerSize, v[1] * innerSize, v[2] * innerSize, -rotX * 1.5, -rotY * 1.2, rotZ * 0.8));

      edges.forEach(([a, b]) => {
        const va = innerVerts[a];
        const vb = innerVerts[b];
        ctx.beginPath();
        ctx.moveTo(va.x * entryScale, va.y * entryScale);
        ctx.lineTo(vb.x * entryScale, vb.y * entryScale);
        ctx.strokeStyle = `rgba(255,255,255,0.15)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      ctx.globalAlpha = alpha * 0.3;
      ctx.font = `300 11px 'Space Grotesk'`;
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.fillText("DIMENSION", 0, size + 50);

      ctx.restore();
    }

    // Scene 9: Terrain Field (95 to 110s)
    function noise2D(x: number, y: number) {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const hash = (a: number, b: number) => (Math.sin(a * 127.1 + b * 311.7) * 43758.5453123) % 1;
      const n00 = hash(xi, yi);
      const n10 = hash(xi + 1, yi);
      const n01 = hash(xi, yi + 1);
      const n11 = hash(xi + 1, yi + 1);
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v);
    }

    function drawScene9() {
      if (!ctx || !isActive(95, 15)) return;
      const t = sceneProgress(95, 15);
      const alpha = fadeInOut(t, 0.12, 0.15);

      ctx.save();
      ctx.globalAlpha = alpha;

      const lines = 40;
      const resolution = 3;

      for (let line = 0; line < lines; line++) {
        const lineDelay = line * 0.005;
        const lineT = clamp((t - lineDelay) * 3, 0, 1);
        if (lineT <= 0) continue;

        const baseY = (line / lines) * H;
        const lineAlpha = 0.1 + 0.3 * (line / lines);

        ctx.beginPath();
        const pointCount = Math.floor((W / resolution) * lineT);
        for (let i = 0; i <= pointCount; i++) {
          const x = i * resolution;
          const noiseVal = noise2D(x * 0.005 + elapsed * 0.3, line * 0.3 + elapsed * 0.1);
          const y = baseY + (noiseVal - 0.5) * 60;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, W, 0);
        gradient.addColorStop(0, `rgba(255,255,255,0)`);
        gradient.addColorStop(0.3, `rgba(255,255,255,${lineAlpha})`);
        gradient.addColorStop(0.7, `rgba(255,255,255,${lineAlpha})`);
        gradient.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      if (t > 0.25 && t < 0.75) {
        const labelAlpha = fadeInOut(map(t, 0.25, 0.75, 0, 1)) * 0.6;
        ctx.globalAlpha = labelAlpha;
        ctx.font = `600 ${Math.min(W * 0.05, 60)}px 'Syne'`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText("TERRAIN", cx, cy);
      }

      ctx.restore();
    }

    // Scene 10: Staggered Text (107 to 122s)
    function drawScene10() {
      if (!ctx || !isActive(107, 15)) return;
      const t = sceneProgress(107, 15);
      const alpha = fadeInOut(t, 0.05, 0.15);

      ctx.save();
      ctx.globalAlpha = alpha;

      const words = [
        { text: "MOTION", size: 0.12, y: 0.2, weight: "800" },
        { text: "DESIGN", size: 0.1, y: 0.32, weight: "200" },
        { text: "CREATIVE", size: 0.08, y: 0.43, weight: "600" },
        { text: "DIRECTION", size: 0.11, y: 0.55, weight: "300" },
        { text: "VISUAL", size: 0.09, y: 0.67, weight: "700" },
        { text: "IDENTITY", size: 0.13, y: 0.8, weight: "100" },
      ];

      words.forEach((word, i) => {
        const delay = i * 0.08;
        const wt = clamp((t - delay) / 0.12, 0, 1);
        const exitT = clamp((t - 0.7 - i * 0.03) / 0.15, 0, 1);

        if (wt <= 0) return;

        const fontSize = Math.min(W * word.size, 140);
        ctx.font = `${word.weight} ${fontSize}px 'Syne'`;
        ctx.textAlign = "center";

        const slideX = lerp(W * 0.3, 0, easeOut(wt));
        const exitX = lerp(0, -W * 0.4, easeIn(exitT));

        const x = cx + slideX + exitX;
        const y = H * word.y;

        const revealWidth = easeOut(wt) * W;
        ctx.save();
        ctx.beginPath();
        ctx.rect(cx - revealWidth / 2, y - fontSize, revealWidth, fontSize * 1.5);
        ctx.clip();

        const wordAlpha = (1 - exitT) * 0.8;
        ctx.globalAlpha = wordAlpha * alpha;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(word.text, x, y);

        ctx.restore();
      });

      ctx.restore();
    }

    // Scene 11: Color Explosion (119 to 134s)
    function drawScene11() {
      if (!ctx || !isActive(119, 15)) return;
      const t = sceneProgress(119, 15);
      const alpha = fadeInOut(t, 0.1, 0.15);

      ctx.save();
      ctx.globalAlpha = alpha;

      const rayCount = 72;
      const maxLen = Math.sqrt(W * W + H * H) * 0.55;
      const entryT = easeOut(clamp(t * 2.5, 0, 1));

      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + elapsed * 0.1;
        const hue = (i / rayCount) * 360 + elapsed * 30;
        const len = maxLen * entryT * (0.6 + 0.4 * Math.sin(i * 0.5 + elapsed * 2));
        const width = Math.max(1, ((Math.PI * 2 * maxLen * entryT) / rayCount) * 0.7);

        const x1 = cx + Math.cos(angle) * 20;
        const y1 = cy + Math.sin(angle) * 20;
        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0)`);
        gradient.addColorStop(0.3, `hsla(${hue}, 80%, 60%, 0.5)`);
        gradient.addColorStop(0.7, `hsla(${hue}, 70%, 50%, 0.3)`);
        gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = width;
        ctx.stroke();
      }

      const centerSize = 30 * entryT + Math.sin(elapsed * 3) * 5;
      ctx.beginPath();
      ctx.arc(cx, cy, centerSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.9 * entryT})`;
      ctx.fill();

      if (t > 0.2) {
        const pCount = 50;
        for (let i = 0; i < pCount; i++) {
          const angle = (i / pCount) * Math.PI * 2 + elapsed * 0.5;
          const dist = 60 + Math.sin(i * 2 + elapsed) * 30 + i * 3;
          const hue = (i / pCount) * 360 + elapsed * 20;
          const px = cx + Math.cos(angle) * dist;
          const py = cy + Math.sin(angle) * dist;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 90%, 70%, 0.6)`;
          ctx.fill();
        }
      }

      if (t > 0.3 && t < 0.85) {
        const textAlpha = fadeInOut(map(t, 0.3, 0.85, 0, 1));
        ctx.globalAlpha = textAlpha * 0.7 * alpha;
        ctx.font = `700 ${Math.min(W * 0.04, 48)}px 'Syne'`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("SPECTRUM", cx, cy + Math.min(W, H) * 0.35);
      }

      ctx.restore();
    }

    // Scene 12: Grand Finale (131 to 150s)
    function drawScene12() {
      if (!ctx || !isActive(131, 19)) return;
      const t = sceneProgress(131, 19);
      const alpha = fadeInOut(t, 0.15, 0.05);

      ctx.save();
      ctx.globalAlpha = alpha;

      if (t < 0.5) {
        const convergeT = easeInOut(clamp(t / 0.5, 0, 1));
        const pCount = 100;
        for (let i = 0; i < pCount; i++) {
          const startAngle = (i / pCount) * Math.PI * 2;
          const startDist = Math.min(W, H) * 0.5;
          const px = lerp(cx + Math.cos(startAngle) * startDist, cx, convergeT);
          const py = lerp(cy + Math.sin(startAngle) * startDist, cy - 20, convergeT);
          const dotAlpha = lerp(0.1, 0.6, convergeT);
          const size = lerp(1, 2, convergeT);
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${dotAlpha})`;
          ctx.fill();
        }
      }

      if (t > 0.25) {
        const logoT = easeOutElastic(clamp((t - 0.25) / 0.3, 0, 1));
        const logoSize = Math.min(W * 0.08, 80) * logoT;

        ctx.save();
        ctx.translate(cx, cy - 30);

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffffff";
        ctx.lineCap = "round";

        const drawLine = (x1: number, y1: number, x2: number, y2: number, delay: number) => {
          const lineT = clamp((logoT - delay) * 3, 0, 1);
          if (lineT <= 0) return;
          ctx.beginPath();
          ctx.moveTo(x1 * logoSize, y1 * logoSize);
          ctx.lineTo(lerp(x1, x2, easeOut(lineT)) * logoSize, lerp(y1, y2, easeOut(lineT)) * logoSize);
          ctx.stroke();
        };

        drawLine(-0.5, -0.8, -0.5, 0.8, 0);
        drawLine(-0.5, -0.8, 0.5, -0.8, 0.1);
        drawLine(-0.5, 0, 0.3, 0, 0.2);
        drawLine(-0.5, 0.8, 0.5, 0.8, 0.3);

        ctx.restore();
      }

      if (t > 0.45) {
        const nameT = easeOut(clamp((t - 0.45) / 0.2, 0, 1));
        ctx.font = `700 ${Math.min(W * 0.06, 72)}px 'Syne'`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const nameY = lerp(cy + 60, cy + 50, nameT);
        ctx.globalAlpha = nameT * alpha;
        ctx.fillStyle = "#ffffff";
        ctx.fillText("EMERSIVE", cx, nameY);
      }

      if (t > 0.55) {
        const tagT = easeOut(clamp((t - 0.55) / 0.2, 0, 1));
        ctx.globalAlpha = tagT * 0.4 * alpha;
        ctx.font = `300 ${Math.min(W * 0.012, 14)}px 'Space Grotesk'`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("MOTION   DESIGN   EXPERIENCE", cx, cy + 90);
      }

      if (t > 0.7) {
        const creditT = easeOut(clamp((t - 0.7) / 0.15, 0, 1));
        ctx.globalAlpha = creditT * 0.2 * alpha;
        ctx.font = `300 11px 'Space Grotesk'`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("© 2026", cx, cy + 140);
      }

      if (t > 0.6) {
        const ambientAlpha = ((t - 0.6) / 0.4) * 0.2;
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI * 2 + elapsed * 0.15;
          const dist = 120 + Math.sin(i * 3 + elapsed * 0.5) * 40;
          const px = cx + Math.cos(angle) * dist;
          const py = cy + Math.sin(angle) * dist;
          ctx.beginPath();
          ctx.arc(px, py, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${ambientAlpha})`;
          ctx.fill();
        }
      }

      ctx.restore();
    }

    function drawAmbientNoise() {
      if (!ctx) return;
      if (elapsed % 0.05 < 0.017) {
        ctx.save();
        ctx.globalAlpha = 0.015;
        for (let i = 0; i < 80; i++) {
          const x = Math.random() * W;
          const y = Math.random() * H;
          const size = Math.random() * 1.5;
          ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
          ctx.fillRect(x, y, size, size);
        }
        ctx.restore();
      }
    }

    function drawCornerMarks() {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.5;
      const m = 20;
      const l = 15;

      ctx.beginPath();
      ctx.moveTo(m, m + l);
      ctx.lineTo(m, m);
      ctx.lineTo(m + l, m);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(W - m - l, m);
      ctx.lineTo(W - m, m);
      ctx.lineTo(W - m, m + l);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(m, H - m - l);
      ctx.lineTo(m, H - m);
      ctx.lineTo(m + l, H - m);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(W - m - l, H - m);
      ctx.lineTo(W - m, H - m);
      ctx.lineTo(W - m, H - m - l);
      ctx.stroke();

      ctx.restore();
    }

    function drawTransitions() {
      if (!ctx) return;
      const transitions = [10, 22, 35, 47, 59, 71, 83, 95, 107, 119, 131];

      transitions.forEach((time) => {
        const dt = elapsed - time;
        if (dt > 0 && dt < 0.8) {
          const tt = dt / 0.8;
          ctx.save();
          ctx.globalAlpha = (1 - tt) * 0.06;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, W * (1 - easeOut(tt)), H);
          ctx.restore();
        }
      });
    }

    function render(timestamp: number) {
      if (!running || !ctx) return;

      if (!startTime) startTime = timestamp;
      elapsed = (timestamp - startTime) / 1000;

      if (elapsed >= DURATION) {
        elapsed = DURATION;
      }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      drawScene1();
      drawScene2();
      drawScene3();
      drawScene4();
      drawScene5();
      drawScene6();
      drawScene7();
      drawScene8();
      drawScene9();
      drawScene10();
      drawScene11();
      drawScene12();

      drawTransitions();
      drawCornerMarks();
      drawAmbientNoise();

      if (progressBar) {
        const progress = (elapsed / DURATION) * 100;
        progressBar.style.width = progress + "%";
      }

      if (timerEl) {
        const mins = Math.floor(elapsed / 60);
        const secs = Math.floor(elapsed % 60);
        timerEl.textContent = `${mins}:${secs.toString().padStart(2, "0")} / 2:30`;
      }

      if (elapsed < DURATION) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    const startShowreel = () => {
      if (running) return;
      if (playOverlay) {
        playOverlay.style.transition = "opacity 0.8s ease";
        playOverlay.style.opacity = "0";
        setTimeout(() => {
          if (playOverlay) playOverlay.style.display = "none";
        }, 800);
      }
      running = true;
      setIsPlaying(true);
      animationFrameId = requestAnimationFrame(render);
    };

    if (playOverlay) {
      playOverlay.addEventListener("click", startShowreel);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !running) {
        e.preventDefault();
        startShowreel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // If loaded inside iframe preview, auto start showreel smoothly
    let iframeTimer: NodeJS.Timeout | null = null;
    if (inIframe) {
      iframeTimer = setTimeout(() => {
        startShowreel();
      }, 300);
    }

    return () => {
      running = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (iframeTimer) clearTimeout(iframeTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleKeyDown);
      if (playOverlay) {
        playOverlay.removeEventListener("click", startShowreel);
      }
    };
  }, []);

  return (
    <div className="emersive-container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
      />

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #0a0a0a;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .emersive-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #0a0a0a;
        }

        canvas#main {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        #overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 10;
        }

        #progress-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #fff, #888);
          z-index: 100;
          transition: width 0.1s linear;
        }

        #timer {
          position: fixed;
          bottom: 16px;
          right: 24px;
          color: rgba(255, 255, 255, 0.3);
          font-family: 'Space Grotesk', monospace;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 2px;
          z-index: 100;
        }

        #play-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
          flex-direction: column;
          gap: 32px;
        }

        #play-overlay .brand {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          letter-spacing: 8px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
        }

        #play-overlay .play-btn {
          width: 80px;
          height: 80px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        #play-overlay .play-btn:hover {
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.1);
        }

        #play-overlay .play-btn svg {
          fill: rgba(255, 255, 255, 0.5);
          margin-left: 4px;
          transition: fill 0.3s;
        }

        #play-overlay .play-btn:hover svg {
          fill: rgba(255, 255, 255, 0.9);
        }

        #play-overlay .hint {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.15);
        }

        .back-nav-btn {
          position: fixed;
          top: 24px;
          left: 24px;
          z-index: 1100;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }

        .back-nav-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }
      `}</style>

      {!isInIframe && (
        <Link href="/" className="back-nav-btn">
          Portfolio
        </Link>
      )}

      <div id="play-overlay" ref={playOverlayRef}>
        <div className="brand">Emersive</div>
        <div className="play-btn">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </div>
        <div className="hint">Click to experience (or press Space)</div>
      </div>

      <canvas id="main" ref={canvasRef}></canvas>
      <div id="overlay"></div>
      <div id="progress-bar" ref={progressBarRef}></div>
      <div id="timer" ref={timerRef}>
        0:00 / 2:30
      </div>
    </div>
  );
}
