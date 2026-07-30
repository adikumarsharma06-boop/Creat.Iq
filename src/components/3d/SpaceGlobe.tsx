import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SpaceGlobeProps {
  interactive?: boolean;
  className?: string;
  onSelectNode?: (nodeName: string) => void;
}

export const SpaceGlobe: React.FC<SpaceGlobeProps> = ({
  className = '',
  onSelectNode
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activeNode, setActiveNode] = useState<string>('Tokyo Hub');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Create Procedural Earth Canvas Texture
    const createEarthTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Dark deep space ocean background
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#030712');
      grad.addColorStop(0.5, '#081028');
      grad.addColorStop(1, '#02040a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines (Latitude & Longitude)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Stylized Cyber Continents
      ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;

      const drawBlob = (cx: number, cy: number, rx: number, ry: number) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      };

      // North America
      drawBlob(250, 150, 90, 60);
      drawBlob(210, 200, 50, 40);
      // South America
      drawBlob(320, 320, 50, 80);
      // Europe
      drawBlob(520, 140, 60, 45);
      // Africa
      drawBlob(540, 260, 70, 85);
      // Asia
      drawBlob(720, 160, 130, 80);
      drawBlob(820, 220, 60, 50);
      // Australia
      drawBlob(840, 350, 55, 40);

      // City Light Glow Dots
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      const cityDots = [
        [240, 160], [280, 180], [310, 300], [520, 130], [550, 250],
        [700, 150], [750, 180], [800, 200], [850, 360], [220, 140]
      ];
      cityDots.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      return new THREE.CanvasTexture(canvas);
    };

    const earthTexture = createEarthTexture();

    // 3. Globe Mesh
    const globeRadius = 2.2;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.4,
      metalness: 0.6,
      emissive: new THREE.Color(0x0a1d42),
      emissiveIntensity: 0.6,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // 4. Atmosphere Glow Outer Mesh
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius + 0.12, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // 5. Rotating Glowing Orbit Rings
    const ringGroup = new THREE.Group();

    // Ring 1: Cyan Main Ring
    const ringGeo1 = new THREE.RingGeometry(globeRadius + 0.6, globeRadius + 0.68, 128);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    ringGroup.add(ring1);

    // Ring 2: Purple Outer Ring
    const ringGeo2 = new THREE.RingGeometry(globeRadius + 1.1, globeRadius + 1.15, 128);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    scene.add(ringGroup);

    // 6. Orbital Nodes & Connected Network Arcs
    const nodesGroup = new THREE.Group();
    const hubs = [
      { name: 'Tokyo Hub', lat: 35.6762, lng: 139.6503 },
      { name: 'San Francisco Hub', lat: 37.7749, lng: -122.4194 },
      { name: 'London Hub', lat: 51.5074, lng: -0.1278 },
      { name: 'Singapore Hub', lat: 1.3521, lng: 103.8198 },
      { name: 'Berlin Hub', lat: 52.5200, lng: 13.4050 },
      { name: 'Bengaluru Hub', lat: 12.9716, lng: 77.5946 }
    ];

    const latLngToVector3 = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const hubPositions: THREE.Vector3[] = [];

    hubs.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius + 0.05);
      hubPositions.push(pos);

      // Node Marker Mesh
      const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { name: hub.name };
      nodesGroup.add(nodeMesh);

      // Node Pulsing Ring
      const pulseGeo = new THREE.RingGeometry(0.08, 0.12, 32);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
      const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
      pulseRing.position.copy(pos);
      pulseRing.lookAt(new THREE.Vector3(0, 0, 0));
      nodesGroup.add(pulseRing);
    });

    globe.add(nodesGroup);

    // Connected Curved Network Lines between hubs
    const arcsGroup = new THREE.Group();
    for (let i = 0; i < hubPositions.length; i++) {
      const start = hubPositions[i];
      const end = hubPositions[(i + 1) % hubPositions.length];

      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(globeRadius + 0.8); // Arc height

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x06b6d4 : 0x8b5cf6,
        transparent: true,
        opacity: 0.65,
        linewidth: 2
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);
    }
    globe.add(arcsGroup);

    // 7. Starfield Particle Background & Space Nebula
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 80;

      // Color variation: Cyan, Purple, White
      const r = Math.random();
      if (r > 0.6) {
        starColors[i * 3] = 0.02; starColors[i * 3 + 1] = 0.71; starColors[i * 3 + 2] = 0.83; // cyan
      } else if (r > 0.3) {
        starColors[i * 3] = 0.54; starColors[i * 3 + 1] = 0.36; starColors[i * 3 + 2] = 0.96; // purple
      } else {
        starColors[i * 3] = 0.9; starColors[i * 3 + 1] = 0.95; starColors[i * 3 + 2] = 1.0; // white
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 8. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x22d3ee, 2.5);
    dirLight1.position.set(5, 3, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.8);
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    // 9. Drag & Interaction Logic
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      globe.rotation.y += deltaX * 0.005;
      globe.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    domElem.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('touchstart', handleMouseDown);
    domElem.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous rotation if not dragging
      if (!isDragging && isRotating) {
        globe.rotation.y += 0.003;
        ringGroup.rotation.z += 0.002;
        ringGroup.rotation.y += 0.001;
      }

      starField.rotation.y = elapsedTime * 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 500;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      domElem.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('touchstart', handleMouseDown);
      domElem.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <div className={`relative w-full h-[450px] md:h-[600px] flex items-center justify-center select-none ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Orbit Badge Floating Over Earth */}
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-3 md:p-4 text-xs text-slate-300 max-w-xs shadow-xl shadow-cyan-950/20">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="font-semibold text-cyan-300 uppercase tracking-wider text-[10px]">Global Creatiq Mesh</span>
        </div>
        <p className="text-slate-400 leading-snug">
          Connecting 140+ active hubs across Tokyo, SF, London & Singapore in real time.
        </p>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-1.5 flex gap-1 text-xs">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            isRotating ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          {isRotating ? '⏸ Orbit Active' : '▶ Orbit Paused'}
        </button>
      </div>
    </div>
  );
};
