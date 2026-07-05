"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const mount = mountRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(44, mount.clientWidth / mount.clientHeight, 0.1, 120);
      camera.position.z = 9;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      group.position.set(1.1, 0, 0);
      scene.add(group);

      // Neural network nodes arranged in layers
      const layers = [3, 5, 5, 3];
      const nodePositions: THREE.Vector3[] = [];
      const layerSpacing = 1.5;
      const nodeSpacing = 1.1;

      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x8ee6ff, transparent: true, opacity: 0.9 });
      const nodeGeometry = new THREE.SphereGeometry(0.07, 10, 8);

      layers.forEach((count, li) => {
        const xOff = (li - (layers.length - 1) / 2) * layerSpacing;
        for (let ni = 0; ni < count; ni++) {
          const yOff = (ni - (count - 1) / 2) * nodeSpacing;
          const pos = new THREE.Vector3(xOff, yOff, (Math.random() - 0.5) * 0.4);
          nodePositions.push(pos);
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.copy(pos);
          group.add(node);
        }
      });

      // Edges connecting adjacent layers
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x5ef0b5, transparent: true, opacity: 0.18 });
      let nodeOffset = 0;
      for (let li = 0; li < layers.length - 1; li++) {
        const aCount = layers[li];
        const bCount = layers[li + 1];
        const aStart = nodeOffset;
        const bStart = nodeOffset + aCount;
        for (let a = 0; a < aCount; a++) {
          for (let b = 0; b < bCount; b++) {
            const pts = [nodePositions[aStart + a], nodePositions[bStart + b]];
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            group.add(new THREE.Line(geo, edgeMaterial));
          }
        }
        nodeOffset += aCount;
      }

      // Outer bounding box wireframe (cube) — data structure feel
      const boxGeo = new THREE.BoxGeometry(5.8, 4.2, 1.2);
      const boxEdges = new THREE.EdgesGeometry(boxGeo);
      const boxMat = new THREE.LineBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.12 });
      const box = new THREE.LineSegments(boxEdges, boxMat);
      group.add(box);

      // Orbiting accent ring (represents data flow loop)
      const ringGeo = new THREE.TorusGeometry(2.6, 0.009, 6, 120);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x8ee6ff, transparent: true, opacity: 0.22, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(1.2, 0.1, -0.2);
      group.add(ring);

      // Floating code particles
      const particleCount = 200;
      const pPositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < pPositions.length; i += 3) {
        pPositions[i] = (Math.random() - 0.5) * 40;
        pPositions[i + 1] = (Math.random() - 0.5) * 24;
        pPositions[i + 2] = (Math.random() - 0.5) * 30;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
      const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.38 });
      scene.add(new THREE.Points(particleGeo, particleMat));

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const light = new THREE.PointLight(0x8ee6ff, 1.8);
      light.position.set(4, 3, 5);
      scene.add(light);

      const resize = () => {
        if (!mount.clientWidth || !mount.clientHeight) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };

      const animate = () => {
        frame = requestAnimationFrame(animate);
        const t = performance.now() * 0.001;
        group.rotation.y = t * 0.12;
        group.rotation.x = Math.sin(t * 0.2) * 0.08;
        ring.rotation.z = -0.2 + Math.sin(t * 0.5) * 0.04;
        ringMat.opacity = 0.18 + Math.sin(t * 0.8) * 0.05;
        renderer.render(scene, camera);
      };

      window.addEventListener("resize", resize);
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        nodeGeometry.dispose();
        nodeMaterial.dispose();
        boxGeo.dispose();
        boxEdges.dispose();
        boxMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    start();
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
