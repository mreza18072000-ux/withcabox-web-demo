"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Snowflake {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      left: Math.random() * 100, // Menyebar acak dari 0% sampai 100%
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-1 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            opacity: [0, flake.opacity, flake.opacity, 0],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "easeInOut",
          }}
          style={{
            width: flake.size,
            height: flake.size,
            left: `${flake.left}%`, // Posisi horizontal diatur per titik salju
          }}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
        />
      ))}
    </div>
  );
}