"use client";

const row1Photos = [
  "/foto1.jpg", "/foto2.jpg", "/foto3.jpg", "/foto4.jpg", "/foto5.jpg", 
  "/foto6.jpg", "/foto7.jpg", "/foto8.jpg", "/foto9.jpg", "/foto10.jpg", "/foto11.jpg"
];

const row2Photos = [
  "/foto12.jpg", "/foto13.jpg", "/foto14.jpg", "/foto15.jpg", "/foto16.jpg", 
  "/foto17.jpg", "/foto18.jpg", "/foto19.jpg", "/foto20.jpg", "/foto21.jpg", "/foto22.jpg"
];

export default function InteractiveGallery() {
  return (
    <section id="gallery" className="py-24 bg-[#FAFAFA] border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]">Our Best Moments</h2>
        <p className="text-gray-600">Ribuan momen telah diabadikan di WITHCABOX.</p>
      </div>

      <div className="flex w-max animate-scroll gap-6 mb-6 hover:[animation-play-state:paused]">
        {[...row1Photos, ...row1Photos].map((src, index) => (
          <div 
            key={`row1-${index}`} 
            className="w-64 h-80 md:w-72 md:h-96 rounded-2xl flex-shrink-0 shadow-md relative overflow-hidden group cursor-pointer bg-gray-200"
          >
            <img 
              src={src} 
              alt="WITHCABOX Moment" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
          </div>
        ))}
      </div>

      <div className="flex w-max animate-scroll-reverse gap-6 hover:[animation-play-state:paused]">
        {[...row2Photos, ...row2Photos].map((src, index) => (
          <div 
            key={`row2-${index}`} 
            className="w-64 h-80 md:w-72 md:h-96 rounded-2xl flex-shrink-0 shadow-md relative overflow-hidden group cursor-pointer bg-gray-200"
          >
            <img 
              src={src} 
              alt="WITHCABOX Moment" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
}