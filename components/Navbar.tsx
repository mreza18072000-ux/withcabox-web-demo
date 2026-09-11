"use client";
import Link from "next/link";

interface NavbarProps {
  onOpenLocations: () => void;
}

export default function Navbar({ onOpenLocations }: NavbarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm transition-all">
      <div className="container mx-auto px-6 flex items-center justify-between py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="WITHCABOX Logo" 
            className="h-16 md:h-20 w-auto object-contain mix-blend-multiply filter contrast-125" 
          />
        </Link>

        {/* Menu Navigasi */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1A1A1A]">
          {/* Tombol Lokasi (Memicu Pop-up) */}
          <button 
            type="button"
            onClick={onOpenLocations} 
            className="hover:text-[#FF6B8B] transition-colors cursor-pointer drop-shadow-sm"
          >
            Lokasi
          </button>
          
          {/* Menu Gallery (Murni Link Anchor ke bagian #gallery) */}
          <a 
            href="#gallery" 
            className="hover:text-[#FF6B8B] transition-colors drop-shadow-sm"
          >
            Gallery
          </a>
          
          {/* Menu Events */}
          <a 
            href="#events" 
            className="hover:text-[#FF6B8B] transition-colors drop-shadow-sm"
          >
            Events
          </a>
        </nav>

        {/* Tombol Follow Us */}
        <div className="hidden md:flex items-center">
          <a 
            href="https://instagram.com/withcabox" 
            target="_blank" 
            rel="noreferrer" 
            className="px-5 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#FF6B8B] text-white text-xs md:text-sm font-semibold transition-all shadow-md"
          >
            Follow Us
          </a>
        </div>
      </div>
    </header>
  );
}