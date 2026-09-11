"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenLocations: () => void;
}

export default function Navbar({ onOpenLocations }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between py-3 md:py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="WITHCABOX Logo" 
            className="h-12 md:h-16 w-auto object-contain mix-blend-multiply filter contrast-125" 
          />
        </Link>

        {/* Menu Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1A1A1A]">
          <button 
            type="button"
            onClick={onOpenLocations} 
            className="hover:text-[#FF6B8B] transition-colors cursor-pointer"
          >
            Lokasi
          </button>
          <a href="#gallery" className="hover:text-[#FF6B8B] transition-colors">
            Gallery
          </a>
          <a href="#events" className="hover:text-[#FF6B8B] transition-colors">
            Events
          </a>
        </nav>

        {/* Tombol Follow Us Desktop */}
        <div className="hidden md:flex items-center">
          <a 
            href="https://instagram.com/withcabox" 
            target="_blank" 
            rel="noreferrer" 
            className="px-5 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#FF6B8B] text-white text-sm font-semibold transition-all shadow-md"
          >
            Follow Us
          </a>
        </div>

        {/* Tombol Hamburger Menu untuk HP */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-gray-800 hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Dropdown Mobile (Saat Hamburger Diklik di HP) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-xl py-5 px-6 flex flex-col gap-4 text-center">
          <button 
            type="button"
            onClick={() => { onOpenLocations(); setIsOpen(false); }}
            className="py-2 text-sm font-semibold text-gray-800 hover:text-[#FF6B8B]"
          >
            Lokasi
          </button>
          <a 
            href="#gallery" 
            onClick={() => setIsOpen(false)}
            className="py-2 text-sm font-semibold text-gray-800 hover:text-[#FF6B8B]"
          >
            Gallery
          </a>
          <a 
            href="#events" 
            onClick={() => setIsOpen(false)}
            className="py-2 text-sm font-semibold text-gray-800 hover:text-[#FF6B8B]"
          >
            Events
          </a>
          <a 
            href="https://instagram.com/withcabox" 
            target="_blank" 
            rel="noreferrer" 
            className="mt-2 py-2.5 rounded-full bg-[#FF6B8B] text-white text-sm font-semibold shadow-md text-center"
          >
            Follow Us
          </a>
        </div>
      )}
    </header>
  );
}