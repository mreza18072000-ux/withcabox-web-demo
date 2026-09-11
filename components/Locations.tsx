"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ExternalLink } from "lucide-react";

interface LocationsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Locations({ isOpen, onClose }: LocationsProps) {
  const locationList = [
    {
      id: 1,
      city: "Jakarta Selatan",
      name: "WITHCABOX Blok M Square",
      address: "Blok M Square, Lantai GF, Turun tangga dibawah Pintu Zamrud 1, Sebelah Kiri Pintu GF Melawai 9-1 Jl. Melawai 9, Jakarta Selatan",
      mapUrl: "https://maps.app.goo.gl/rbZEKPFXzFfZ9Sp97",
    },
    {
      id: 2,
      city: "Balikpapan",
      name: "WITHCABOX Balikpapan",
      address: "Jl. Kapten Piere Tendean No.6, Gunung pasir, Kec. Balikpapan Kota, Kota Balikpapan",
      mapUrl: "https://maps.app.goo.gl/76KkKNFsAzgSfCeT9",
    },
    {
      id: 3,
      city: "Samarinda (Bukit Alaya)",
      name: "WITHCABOX Bukit Alaya Samarinda",
      address: "G5MF+8R4, Jl. Bukit Alaya, Sungai Pinang Dalam, Kec. Sungai Pinang, Kota Samarinda",
      mapUrl: "https://maps.app.goo.gl/SN9M8vr1HHKZRTyr7",
    },
    {
      id: 4,
      city: "Samarinda (Ahmad Yani)",
      name: "WITHCABOX Ahmad Yani Samarinda",
      address: "Jl. Jenderal Ahmad Yani I No.22A, Temindung Permai, Kec. Sungai Pinang, Kota Samarinda",
      mapUrl: "https://maps.app.goo.gl/7Q2vJw8d4BQDmSPi9",
    },
    {
      id: 5,
      city: "Surabaya",
      name: "WITHCABOX Ps. Tunjungan",
      address: "Ps. Tunjungan, Jl. Tunjungan No.30, Genteng, Kec. Genteng, Surabaya",
      mapUrl: "https://maps.app.goo.gl/GjGQXmaxykCpQ9r7A",
    },
    {
      id: 6,
      city: "Yogyakarta",
      name: "WITHCABOX Demangan Yogyakarta",
      address: "Jl. Cenderawasih No.32 B, Mrican, Demangan, Kec. Depok, Kabupaten Sleman, Yogyakarta",
      mapUrl: "https://maps.app.goo.gl/QEWrRnXobV8dJtrn6",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10 p-6 md:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-[#FF6B8B] hover:text-white text-gray-700 transition-all cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 text-[#FF6B8B] mb-3 border border-pink-100">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wide uppercase">Outlet Resmi</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A]">
                Temukan Lokasi <span className="text-[#FF6B8B]">WITHCABOX</span>
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Kunjungi booth kami terdekat di kotamu dan abadikan momen serumu!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locationList.map((loc) => (
                <div
                  key={loc.id}
                  className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-pink-200 hover:bg-pink-50/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-base">{loc.name}</h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-100 text-[#FF6B8B]">
                        {loc.city}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {loc.address}
                    </p>
                  </div>

                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#FF6B8B] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    <span>Lihat di Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}