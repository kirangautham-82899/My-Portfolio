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

      const planet = new THREE.Group();
      planet.position.set(1.32, -0.12, 0);
      planet.rotation.set(-0.18, -0.24, 0.08);
      scene.add(planet);

      const surfaceGeometry = new THREE.IcosahedronGeometry(1.58, 4);
      const surfaceMaterial = new THREE.MeshStandardMaterial({
        color: 0x273a34,
        emissive: 0x10281f,
        emissiveIntensity: 0.26,
        metalness: 0.08,
        roughness: 0.86,
      });
      const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
      planet.add(surface);

      const wireMaterial = new THREE.LineBasicMaterial({ color: 0x8ee6ff, transparent: true, opacity: 0.22 });
      const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(surfaceGeometry), wireMaterial);
      planet.add(wireframe);

      const atmosphereGeometry = new THREE.SphereGeometry(1.76, 48, 32);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x8ee6ff,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide,
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      planet.add(atmosphere);

      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x5ef0b5,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
      });
      const outerRingGeometry = new THREE.TorusGeometry(2.28, 0.011, 8, 160);
      const outerRing = new THREE.Mesh(outerRingGeometry, ringMaterial);
      outerRing.rotation.set(1.17, 0.16, -0.22);
      planet.add(outerRing);

      const innerRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xa78bfa,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      });
      const innerRingGeometry = new THREE.TorusGeometry(1.96, 0.008, 8, 140);
      const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
      innerRing.rotation.copy(outerRing.rotation);
      innerRing.rotation.z -= 0.08;
      planet.add(innerRing);

      const crackMaterial = new THREE.LineBasicMaterial({ color: 0xefd6a1, transparent: true, opacity: 0.42 });
      const crackGeometry = new THREE.BufferGeometry();
      const crackPoints = [
        -0.52, 1.08, 1.02, -0.3, 0.9, 1.2, -0.15, 0.68, 1.34, 0.1, 0.52, 1.38,
        0.72, 0.42, 1.26, 0.54, 0.22, 1.42, 0.76, 0.04, 1.38, 0.62, -0.18, 1.42,
        -0.92, -0.18, 1.2, -0.64, -0.3, 1.32, -0.44, -0.56, 1.24, -0.16, -0.66, 1.22,
        0.18, -0.88, 1.1, 0.44, -1.02, 0.92, 0.68, -0.92, 0.86, 0.82, -0.68, 1.0,
        -1.28, 0.34, 0.74, -1.08, 0.16, 0.98, -1.22, -0.04, 0.86, -1.02, -0.2, 1.02,
      ];
      crackGeometry.setAttribute("position", new THREE.Float32BufferAttribute(crackPoints, 3));
      const cracks = new THREE.LineSegments(crackGeometry, crackMaterial);
      planet.add(cracks);

      const capMaterial = new THREE.MeshBasicMaterial({ color: 0xd6f8ff, transparent: true, opacity: 0.38, side: THREE.DoubleSide });
      const capGeometry = new THREE.CircleGeometry(0.46, 28);
      const northCap = new THREE.Mesh(capGeometry, capMaterial);
      northCap.position.set(0.08, 1.5, 0.44);
      northCap.rotation.set(1.32, -0.05, 0.18);
      planet.add(northCap);

      const southCap = new THREE.Mesh(capGeometry, capMaterial);
      southCap.position.set(-0.18, -1.43, -0.32);
      southCap.rotation.set(-1.12, 0.25, -0.12);
      southCap.scale.setScalar(0.72);
      planet.add(southCap);

      const moonGeometry = new THREE.IcosahedronGeometry(0.18, 2);
      const moonMaterial = new THREE.MeshStandardMaterial({
        color: 0xefd6a1,
        emissive: 0x2d2114,
        emissiveIntensity: 0.18,
        roughness: 0.78,
      });
      const moonPivot = new THREE.Group();
      const moon = new THREE.Mesh(moonGeometry, moonMaterial);
      moon.position.set(2.68, 0.16, 0);
      moonPivot.rotation.set(0.45, 0.2, -0.14);
      moonPivot.add(moon);
      planet.add(moonPivot);

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
        planet.rotation.y = -0.24 + time * 0.08;
        planet.rotation.x = -0.18 + Math.sin(time * 0.24) * 0.035;
        surface.rotation.y = time * 0.075;
        wireframe.rotation.y = surface.rotation.y;
        cracks.rotation.y = surface.rotation.y;
        northCap.rotation.z = time * 0.05;
        southCap.rotation.z = -time * 0.04;
        atmosphereMaterial.opacity = 0.1 + Math.sin(time * 1.05) * 0.035;
        ringMaterial.opacity = 0.22 + Math.sin(time * 0.9) * 0.05;
        innerRingMaterial.opacity = 0.14 + Math.sin(time * 0.7 + 1.2) * 0.04;
        outerRing.rotation.z = -0.22 + Math.sin(time * 0.18) * 0.04;
        innerRing.rotation.z = outerRing.rotation.z - 0.08;
        moonPivot.rotation.y = time * 0.22;
        moon.rotation.y = time * 0.32;
        particles.rotation.y = time * 0.018;
        particles.rotation.x = Math.sin(time * 0.16) * 0.025;
        renderer.render(scene, camera);
      };

      window.addEventListener("resize", resize);
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        surfaceGeometry.dispose();
        surfaceMaterial.dispose();
        wireframe.geometry.dispose();
        wireMaterial.dispose();
        atmosphereGeometry.dispose();
        atmosphereMaterial.dispose();
        outerRingGeometry.dispose();
        ringMaterial.dispose();
        innerRingGeometry.dispose();
        innerRingMaterial.dispose();
        crackGeometry.dispose();
        crackMaterial.dispose();
        capGeometry.dispose();
        capMaterial.dispose();
        moonGeometry.dispose();
        moonMaterial.dispose();
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
