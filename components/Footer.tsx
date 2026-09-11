"use client";

interface FooterProps {
  onOpenLocations: () => void;
}

export default function Footer({ onOpenLocations }: FooterProps) {
  return (
    <footer className="bg-[#FAFAFA] border-t border-gray-200 py-16">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Logo Resmi WITHCABOX di Footer */}
        <div className="mb-4">
          <img 
            src="/logo.png" 
            alt="WITHCABOX Logo" 
            className="h-12 w-auto object-contain mx-auto" 
          />
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Count to three, pose, embrace 📸
        </p>

        {/* Link Media Sosial & Lokasi */}
        <div className="flex items-center gap-6 text-sm font-semibold text-[#1A1A1A] mb-8">
          <a 
            href="https://instagram.com/withcabox" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[#FF6B8B] transition-colors"
          >
            Instagram
          </a>
          <span>•</span>
          <a 
            href="https://tiktok.com" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[#FF6B8B] transition-colors"
          >
            TikTok
          </a>
          <span>•</span>
          <button 
            onClick={onOpenLocations} 
            className="hover:text-[#FF6B8B] transition-colors cursor-pointer"
          >
            Lokasi
          </button>
        </div>

        <div className="text-xs text-gray-400">
          © 2026 WITHCABOX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}