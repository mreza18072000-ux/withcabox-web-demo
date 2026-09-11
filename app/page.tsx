"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Frames from "@/components/Frames";
import InteractiveGallery from "@/components/InteractiveGallery";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAFA] selection:bg-[#FF6B8B]/30 selection:text-[#1A1A1A] scroll-smooth">
      {/* Navbar dengan fungsi membuka pop-up lokasi */}
      <Navbar onOpenLocations={() => setIsLocationsOpen(true)} />
      
      {/* Hero dengan tombol lokasi */}
      <Hero onOpenLocations={() => setIsLocationsOpen(true)} />
      
      {/* Modal Pop-up Lokasi */}
      <Locations isOpen={isLocationsOpen} onClose={() => setIsLocationsOpen(false)} />

      <Frames />

      {/* Seksi Galeri 3D Interaktif & Foto Bergerak */}
      <InteractiveGallery />

      {/* Seksi Events */}
      <Events />

      <Footer />
    </main>
  );
}