"use client";
import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import SnowEffect from "./SnowEffect";

interface HeroProps {
  onOpenLocations: () => void;
}

export default function Hero({ onOpenLocations }: HeroProps) {
  return (
    <section 
      className="relative pt-32 pb-28 md:pt-48 md:pb-36 min-h-[90vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[length:180%_auto] sm:bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg-hero.jpg')" }}
    >
      
      {/* Overlay tipis agar teks tetap kontras, elegan, dan sangat jelas dibaca */}
      <div className="absolute inset-0 w-full h-full bg-white/40 md:bg-white/35 backdrop-blur-[0.3px] z-0" />

      {/* Efek Salju Turun Menyeluruh */}
      <SnowEffect />

      {/* Konten Utama (Badge, Heading, Sub-teks, & Tombol Lokasi) */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
        
        {/* Badge Studio Fotografi Terfavorit */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#FF6B8B] mb-6 border border-pink-200 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-xs md:text-sm font-semibold tracking-wide uppercase">
            STUDIO FOTOGRAFI TERFAVORIT
          </span>
        </motion.div>

        {/* Heading Utama */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#1A1A1A] tracking-tight leading-[1.1] mb-6 drop-shadow-sm"
        >
          Count to three, <br />
          <span className="text-[#FF6B8B]">pose, embrace.</span>
        </motion.h1>

        {/* Sub-teks */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-900 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-sm"
        >
          Abadikan momen terbaikmu bersama orang tersayang dengan frame custom unik dan pencahayaan studio profesional dari WITHCABOX.
        </motion.p>

        {/* Tombol Aksi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={onOpenLocations}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF6B8B] hover:bg-[#ff5277] text-white font-semibold text-sm md:text-base transition-all shadow-xl shadow-pink-500/30 cursor-pointer hover:scale-105"
          >
            <MapPin className="w-5 h-5" />
            Temukan Lokasi Kami
          </button>
        </motion.div>

      </div>
    </section>
  );
}