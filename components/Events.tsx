"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageSquare, X, Upload, Eye, Image as ImageIcon } from "lucide-react";
import TiltCard from "./TiltCard";
import { 
  EventItem, 
  getStoredEvents, 
  saveStoredEvents 
} from "@/lib/contentStorage";

const defaultEvents: EventItem[] = Array.from({ length: 28 }, (_, index) => ({
  id: String(index + 1),
  title: `WITHCABOX Event Moment #${index + 1}`,
  date: index % 2 === 0 ? "Brand Activation" : "Exhibition & Party",
  image: `/event${index + 1}.jpg`,
  description: "Keseruan event photobox bersama WITHCABOX.",
}));

const ADMIN_PASSWORD = "123";

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const loadedEvents = getStoredEvents(defaultEvents);
    setEvents(loadedEvents);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= events.length ? 0 : prev + itemsPerPage
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, events.length]);

  const visibleEvents = events.slice(currentIndex, currentIndex + itemsPerPage);

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

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImage) return;

    const newEvent: EventItem = {
      id: Date.now().toString(),
      title: newTitle,
      date: newDate || 'Event Spesial',
      description: newDescription || 'Keseruan event bersama WITHCABOX',
      image: newImage,
    };

    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    saveStoredEvents(updatedEvents);

    setNewTitle("");
    setNewDate("");
    setNewDescription("");
    setNewImage("");
    setPreviewImage("");
    setIsAddModalOpen(false);
  };

  return (
    <section id="events" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-[#FF6B8B] mb-4 border border-pink-100 shadow-sm">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">WITHCABOX on Location</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">
            Our Exciting <span className="text-[#FF6B8B]">Events</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Jelajahi berbagai keseruan dan momen terbaik saat WITHCABOX hadir meramaikan acara spesial! Klik foto untuk memperbesar.
          </p>

          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-gray-800 text-white font-medium text-xs transition-all shadow-md cursor-pointer hover:scale-105"
          >
            Event Baru
          </button>
        </div>

        {/* Grid List Events dengan Ukuran Lebih Ringkas & Tidak Pecah di HP */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {visibleEvents.map((item, index) => (
                <TiltCard key={item.id} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
                    onClick={() => setSelectedEvent(item)}
                    className="group relative rounded-2xl overflow-hidden shadow-md bg-gray-100 h-64 md:h-72 cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                      
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                          <Eye className="w-4 h-4" /> Perbesar
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FF6B8B] mb-2 inline-block shadow-sm">
                          {item.date}
                        </span>
                        <h3 className="text-base font-bold leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Modal PIN Admin */}
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
                  Masukkan PIN untuk menambahkan event baru.
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

        {/* Modal Form Tambah Event */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative text-left"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading text-xl font-bold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#FF6B8B]" />
                    Tambah Event Baru
                  </h3>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Nama Event
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Contoh: WITHCABOX Event Moment #29"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B8B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Kategori / Tanggal
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="Contoh: Brand Activation"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B8B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Pilih Foto dari Galeri HP/Laptop
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden relative">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                          <Upload className="w-6 h-6 mb-2 text-[#FF6B8B]" />
                          <p className="text-xs font-medium">Klik untuk pilih foto dari galeri</p>
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
                      Simpan Event
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal Zoom Foto Event */}
        <AnimatePresence>
          {selectedEvent && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative p-4 text-center"
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative max-h-[65vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 flex items-center justify-center">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="max-h-[60vh] w-auto object-contain mx-auto rounded-xl"
                  />
                </div>

                <span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-[#FF6B8B] text-xs font-semibold mb-1">
                  {selectedEvent.date}
                </span>
                <h3 className="font-heading text-xl font-extrabold text-gray-900 mb-1">
                  {selectedEvent.title}
                </h3>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Call to Action Booking */}
        <div className="bg-pink-50 border border-pink-100 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-4">
            Tertarik Mengajak WITHCABOX di Acaramu?
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto font-medium">
            Kami menyediakan paket sewa photobox lengkap dengan custom frame, operator, dan aksesoris seru untuk memeriahkan acaramu.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20WITHCABOX,%20saya%20tertarik%20mau%20booking%20photobox%20untuk%20acara%20saya."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF6B8B] hover:bg-[#ff5277] text-white font-semibold transition-all shadow-lg shadow-pink-500/25 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" /> Konsultasi & Booking Event
          </a>
        </div>

      </div>
    </section>
  );
}