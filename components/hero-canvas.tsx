"use client";

import type { Mesh, MeshBasicMaterial } from "three";
import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) {
        return;
      }

      const mount = mountRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(44, mount.clientWidth / mount.clientHeight, 0.1, 120);
      camera.position.z = 7.2;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const laptop = new THREE.Group();
      laptop.position.set(1.28, -0.2, 0);
      laptop.rotation.set(-0.08, -0.14, 0.02);
      laptop.scale.setScalar(0.9);
      scene.add(laptop);

      const shellMaterial = new THREE.MeshStandardMaterial({
        color: 0x07111f,
        emissive: 0x0b2a42,
        emissiveIntensity: 0.38,
        metalness: 0.48,
        roughness: 0.34,
        transparent: true,
        opacity: 0.66,
      });
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x8ee6ff, transparent: true, opacity: 0.38 });
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x8ee6ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      const keyMaterial = new THREE.MeshBasicMaterial({ color: 0x5ef0b5, transparent: true, opacity: 0.34 });
      const trackpadMaterial = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.18 });

      const baseGeometry = new THREE.BoxGeometry(3.45, 0.14, 1.58);
      const base = new THREE.Mesh(baseGeometry, shellMaterial);
      base.position.set(0, -1.05, 0.2);
      base.rotation.x = 0.08;
      laptop.add(base);

      const baseEdges = new THREE.LineSegments(new THREE.EdgesGeometry(baseGeometry), edgeMaterial);
      baseEdges.position.copy(base.position);
      baseEdges.rotation.copy(base.rotation);
      laptop.add(baseEdges);

      const hingeGeometry = new THREE.CylinderGeometry(0.045, 0.045, 3.05, 18);
      const hinge = new THREE.Mesh(hingeGeometry, shellMaterial);
      hinge.position.set(0, -0.73, -0.52);
      hinge.rotation.z = Math.PI / 2;
      laptop.add(hinge);

      const lid = new THREE.Group();
      lid.position.set(0, -0.42, -0.55);
      lid.rotation.x = -0.18;
      laptop.add(lid);

      const screenGeometry = new THREE.BoxGeometry(3.08, 1.9, 0.1);
      const screen = new THREE.Mesh(screenGeometry, shellMaterial);
      screen.position.y = 0.98;
      lid.add(screen);

      const screenEdges = new THREE.LineSegments(new THREE.EdgesGeometry(screenGeometry), edgeMaterial);
      screenEdges.position.copy(screen.position);
      lid.add(screenEdges);

      const glowPlaneGeometry = new THREE.PlaneGeometry(2.72, 1.48);
      const glowPlane = new THREE.Mesh(glowPlaneGeometry, glowMaterial);
      glowPlane.position.set(0, 0.98, 0.062);
      lid.add(glowPlane);

      const codeLines: Mesh[] = [];
      const codeMaterials: MeshBasicMaterial[] = [];
      const lineWidths = [1.88, 1.12, 2.18, 1.52, 2.36, 0.92, 1.68, 2.04];
      lineWidths.forEach((width, index) => {
        const material = new THREE.MeshBasicMaterial({
          color: index % 3 === 1 ? 0x5ef0b5 : 0x8ee6ff,
          transparent: true,
          opacity: 0.22,
          side: THREE.DoubleSide,
        });
        const line = new THREE.Mesh(new THREE.PlaneGeometry(width, 0.035), material);
        line.position.set(-1.08 + width * 0.5, 1.52 - index * 0.17, 0.071);
        line.userData.phase = index * 0.7;
        line.userData.baseOpacity = material.opacity;
        codeLines.push(line);
        codeMaterials.push(material);
        lid.add(line);
      });

      const scanMaterial = new THREE.MeshBasicMaterial({ color: 0x5ef0b5, transparent: true, opacity: 0.24, side: THREE.DoubleSide });
      const scanLine = new THREE.Mesh(new THREE.PlaneGeometry(2.58, 0.018), scanMaterial);
      scanLine.position.set(0, 1.5, 0.074);
      lid.add(scanLine);

      const cursorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.56 });
      const cursor = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.2, 0.012), cursorMaterial);
      cursor.position.set(0.95, 0.55, 0.078);
      lid.add(cursor);

      const keyGeometry = new THREE.BoxGeometry(0.17, 0.028, 0.11);
      const keys: Mesh[] = [];
      for (let row = 0; row < 4; row++) {
        const count = row === 3 ? 8 : 11;
        const start = -((count - 1) * 0.22) / 2;
        for (let col = 0; col < count; col++) {
          const key = new THREE.Mesh(keyGeometry, keyMaterial);
          key.position.set(start + col * 0.22 + (row === 1 ? 0.05 : 0), -0.91, -0.22 + row * 0.18);
          key.rotation.x = 0.08;
          key.userData.phase = row * 0.8 + col * 0.2;
          keys.push(key);
          laptop.add(key);
        }
      }

      const trackpad = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.026, 0.36), trackpadMaterial);
      trackpad.position.set(0, -0.9, 0.66);
      trackpad.rotation.x = 0.08;
      laptop.add(trackpad);

      const positions = new Float32Array(320 * 3);
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 42;
        positions[i + 1] = (Math.random() - 0.5) * 26;
        positions[i + 2] = (Math.random() - 0.5) * 38;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.016,
        transparent: true,
        opacity: 0.46,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      scene.add(new THREE.AmbientLight(0xffffff, 0.68));
      const lightA = new THREE.PointLight(0x8ee6ff, 2.1);
      lightA.position.set(4, 3.4, 5.5);
      scene.add(lightA);
      const lightB = new THREE.PointLight(0xa78bfa, 0.9);
      lightB.position.set(-4, -1.8, -2.2);
      scene.add(lightB);

      const resize = () => {
        if (!mount.clientWidth || !mount.clientHeight) {
          return;
        }
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };

      const animate = () => {
        frame = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        laptop.rotation.y = -0.14 + Math.sin(time * 0.28) * 0.035;
        laptop.rotation.x = -0.08 + Math.sin(time * 0.22) * 0.018;
        glowMaterial.opacity = 0.1 + Math.sin(time * 1.1) * 0.035;
        scanLine.position.y = 1.53 - ((time * 0.32) % 1.42);
        scanMaterial.opacity = 0.14 + Math.sin(time * 1.7) * 0.06;
        cursorMaterial.opacity = Math.sin(time * 4.8) > 0 ? 0.54 : 0.18;

        codeLines.forEach((line) => {
          const material = line.material as MeshBasicMaterial;
          material.opacity = line.userData.baseOpacity + Math.sin(time * 1.2 + line.userData.phase) * 0.08;
        });
        keys.forEach((key) => {
          const pulse = 1 + Math.max(0, Math.sin(time * 1.4 + key.userData.phase)) * 0.08;
          key.scale.y = pulse;
        });
        particles.rotation.y = time * 0.018;
        particles.rotation.x = Math.sin(time * 0.16) * 0.025;
        renderer.render(scene, camera);
      };

      window.addEventListener("resize", resize);
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        baseGeometry.dispose();
        screenGeometry.dispose();
        hingeGeometry.dispose();
        glowPlaneGeometry.dispose();
        keyGeometry.dispose();
        trackpad.geometry.dispose();
        codeLines.forEach((line) => line.geometry.dispose());
        shellMaterial.dispose();
        edgeMaterial.dispose();
        glowMaterial.dispose();
        keyMaterial.dispose();
        trackpadMaterial.dispose();
        codeMaterials.forEach((material) => material.dispose());
        scanLine.geometry.dispose();
        scanMaterial.dispose();
        cursor.geometry.dispose();
        cursorMaterial.dispose();
        baseEdges.geometry.dispose();
        screenEdges.geometry.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    start();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
