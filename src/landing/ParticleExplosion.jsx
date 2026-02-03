import React, { useEffect, useRef } from "react";

// Radially spread shooting stars effect
const PARTICLE_COUNT = 10; // Number of stars per burst
const PARTICLE_SIZE = 14; // Star size
const ANIMATION_DURATION = 1800; // Duration of shooting
const LOOP_INTERVAL = 220; // How often to spawn a new burst (ms)
const SHOOT_RADIUS = 260; // How far stars shoot from center

function randomColor() {
  // White/yellow/gold for stars
  const colors = ["#fff", "#ffe066", "#ffd700", "#fffbe7", "#ffecb3"];
  return colors[Math.floor(Math.random() * colors.length)];
}


export default function ParticleExplosion({ triggerKey = "default" }) {
  const containerRef = useRef(null);
  // For continuous animation, use a timer
  useEffect(() => {
    let running = true;
    const container = containerRef.current;
    if (!container) return;
    // Helper to spawn a single shooting star
    function spawnShootingStar() {
      if (!running) return;
      const centerX = 210;
      const centerY = 210;
      const angle = Math.random() * 2 * Math.PI;
      const xEnd = centerX + Math.cos(angle) * SHOOT_RADIUS;
      const yEnd = centerY + Math.sin(angle) * SHOOT_RADIUS;
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.left = `${centerX - PARTICLE_SIZE / 2}px`;
      particle.style.top = `${centerY - PARTICLE_SIZE / 2}px`;
      particle.style.width = `${PARTICLE_SIZE}px`;
      particle.style.height = `${PARTICLE_SIZE}px`;
      particle.style.borderRadius = "50%";
      particle.style.background = randomColor();
      particle.style.boxShadow = "0 0 16px 4px #fff8, 0 0 4px 1px #ffd700";
      particle.style.opacity = "0.95";
      particle.style.pointerEvents = "none";
      particle.style.transition = `all ${ANIMATION_DURATION}ms cubic-bezier(.7,0,.3,1)`;
      // Animate after mount
      setTimeout(() => {
        particle.style.left = `${xEnd - PARTICLE_SIZE / 2}px`;
        particle.style.top = `${yEnd - PARTICLE_SIZE / 2}px`;
        particle.style.opacity = "0.1";
        particle.style.transform = "scale(0.7)";
      }, 30);
      // Remove after animation
      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, ANIMATION_DURATION + 400);
      container.appendChild(particle);
    }
    // Looping: spawn several shooting stars per interval
    const interval = setInterval(() => {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        spawnShootingStar();
      }
    }, LOOP_INTERVAL);
    return () => {
      running = false;
      clearInterval(interval);
      if (container) container.innerHTML = "";
    };
  }, [triggerKey]);

  // The container overlays the badge
  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 420,
        height: 420,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
