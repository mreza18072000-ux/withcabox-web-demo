"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Image as ImageIcon, Upload, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  CustomFrameItem, 
  getStoredFrames, 
  saveStoredFrames 
} from "@/lib/contentStorage";

const initialDefaultFrames: CustomFrameItem[] = [
  { id: '1', title: 'Minimalist White', image: '/frame-1.jpg', category: 'Minimalist' },
  { id: '2', title: 'Romantic Pink', image: '/frame-2.jpg', category: 'Romantic' },
  { id: '3', title: 'Vintage Classic', image: '/frame-3.jpg', category: 'Classic' },
];

const ADMIN_PASSWORD = "123"; 

export default function Frames() {
  const [frames, setFrames] = useState<CustomFrameItem[]>(initialDefaultFrames);
  
  // State Modal PIN & Form
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // State Zoom & Slider Index
  const [selectedFrame, setSelectedFrame] = useState<CustomFrameItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadedFrames = getStoredFrames(initialDefaultFrames);
    setFrames(loadedFrames);
  }, []);

  // Efek Slider Otomatis berganti setiap 4 detik jika foto banyak
  useEffect(() => {
    if (frames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [frames.length]);

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setPasswordError(false);
      setPasswordInput("");
      setIsPasswordModalOpen(false);
      setIsAddModalOpen(true);
    } else {
      setPasswordError(true);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setNewImage(result);
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFrame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImage) return;

    const newFrame: CustomFrameItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory || 'General',
      image: newImage,
    };

    const updatedFrames = [newFrame, ...frames];
    setFrames(updatedFrames);
    saveStoredFrames(updatedFrames);

    setNewTitle("");
    setNewCategory("");
    setNewImage("");
    setPreviewImage("");
    setIsAddModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % frames.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + frames.length) % frames.length);
  };

  return (
    <section className="py-20 px-4 md:px-6 bg-[#FAF6F2] relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#FF6B8B] mb-3 border border-pink-200 shadow-sm text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Koleksi Eksklusif
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[#1A1A1A] mb-3">
            Custom <span className="text-[#FF6B8B]">Frames</span>
          </h2>
          <p className="text-gray-600 text-xs md:text-sm max-w-lg mx-auto mb-5">
            Pilih berbagai bingkai foto menarik. Klik pada foto untuk melihat detail lebih dekat.
          </p>

          {/* Tombol Frames Baru (Bersih tanpa gembok, tetap terlindung PIN) */}
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-gray-800 text-white font-medium text-xs transition-all shadow-md cursor-pointer hover:scale-105"
          >
            Frames Baru
          </button>
        </div>

        {/* Carousel / Slider Container yang Lebih Ringkas & Dinamis */}
        <div className="relative max-w-xl mx-auto px-4">
          <div className="overflow-hidden rounded-2xl shadow-lg bg-white border border-pink-100">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {frames.map((frame) => (
                <div key={frame.id} className="w-full flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedFrame(frame)}
                    className="relative h-56 sm:h-72 bg-gray-100 cursor-pointer group"
                  >
                    <img
                      src={frame.image}
                      alt={frame.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#FF6B8B]">
                      {frame.category}
                    </span>

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                        <Eye className="w-3.5 h-3.5" /> Perbesar
                      </span>
                    </div>
                  </motion.div>
                  <div className="p-3 text-center bg-white">
                    <h3 className="font-bold text-gray-800 text-sm md:text-base">{frame.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Navigasi Kiri & Kanan Slider */}
          {frames.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-9 h-9 rounded-full bg-white shadow-md hover:bg-gray-50 flex items-center justify-center text-gray-700 cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-9 h-9 rounded-full bg-white shadow-md hover:bg-gray-50 flex items-center justify-center text-gray-700 cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Indikator Titik Slider */}
          <div className="flex justify-center gap-1.5 mt-4">
            {frames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? 'bg-[#FF6B8B] w-5' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* 1. MODAL PASSWORD */}
        <AnimatePresence>
          {isPasswordModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center"
              >
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">
                  Akses Admin
                </h3>
                <p className="text-gray-500 text-xs mb-4">
                  Masukkan PIN untuk menambahkan frame baru.
                </p>

                <form onSubmit={handleVerifyPassword} className="space-y-3">
                  <input
                    type="password"
                    required
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="PIN (Default: 123)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B8B] text-center text-sm tracking-widest"
                  />
                  {passwordError && (
                    <p className="text-xs text-red-500 font-medium">PIN salah!</p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => { setIsPasswordModalOpen(false); setPasswordInput(""); setPasswordError(false); }}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#FF6B8B] hover:bg-[#ff5277] text-white font-semibold text-xs shadow-md cursor-pointer"
                    >
                      Masuk
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 2. MODAL FORM TAMBAH FRAME */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading text-xl font-bold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#FF6B8B]" />
                    Tambah Frame Baru
                  </h3>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddFrame} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Nama Frame
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Contoh: Gold Elegant"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B8B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Kategori
                    </label>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Contoh: Minimalist, Romantic"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B8B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Pilih Foto dari Galeri
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden relative">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                          <Upload className="w-6 h-6 mb-2 text-[#FF6B8B]" />
                          <p className="text-xs font-medium">Klik untuk pilih foto</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        required 
                        onChange={handleImageChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-[#FF6B8B] hover:bg-[#ff5277] text-white font-semibold text-sm shadow-lg shadow-pink-500/25 cursor-pointer"
                    >
                      Simpan Frame
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 3. MODAL ZOOM FOTO */}
        <AnimatePresence>
          {selectedFrame && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
              onClick={() => setSelectedFrame(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative p-4 text-center"
              >
                <button
                  onClick={() => setSelectedFrame(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative max-h-[65vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 flex items-center justify-center">
                  <img
                    src={selectedFrame.image}
                    alt={selectedFrame.title}
                    className="max-h-[60vh] w-auto object-contain mx-auto rounded-xl"
                  />
                </div>

                <span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-[#FF6B8B] text-xs font-semibold mb-1">
                  {selectedFrame.category}
                </span>
                <h3 className="font-heading text-xl font-extrabold text-gray-900">
                  {selectedFrame.title}
                </h3>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}