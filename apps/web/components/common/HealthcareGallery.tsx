import React from "react";
import Image from "next/image";

export default function HealthcareGallery() {
  const images = [
    {
      src: "/images/gallery-consultation.webp",
      alt: "Doctor providing compassionate consultation with patient",
      caption: "Patient-Centered Dialogue",
      tag: "Clinical Consultation",
      className: "md:col-span-8 md:row-span-2 aspect-[16/10] md:aspect-auto",
    },
    {
      src: "/images/gallery-teamwork.webp",
      alt: "Healthcare specialists collaborating on diagnosis",
      caption: "Multi-Disciplinary Team",
      tag: "Collaboration",
      className: "md:col-span-4 aspect-[4/3] md:aspect-auto",
    },
    {
      src: "/images/gallery-technology.webp",
      alt: "Modern diagnostic equipment in clinical suite",
      caption: "Advanced Diagnostics",
      tag: "Technology",
      className: "md:col-span-4 aspect-[4/3] md:aspect-auto",
    },
    {
      src: "/images/gallery-patient-care.webp",
      alt: "Doctor supporting patient through recovery milestone",
      caption: "Empathetic Follow-up",
      tag: "Continuous Care",
      className: "md:col-span-6 aspect-[16/10] md:aspect-[16/9]",
    },
    {
      src: "/images/gallery-clinic.webp",
      alt: "Serene, modern healthcare pavilion environment",
      caption: "Calm Healing Spaces",
      tag: "Facility",
      className: "md:col-span-6 aspect-[16/10] md:aspect-[16/9]",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-500 block mb-2">
            EDITORIAL PERSPECTIVE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold tracking-tight text-[#080808]">
            Care That Puts People First
          </h2>
          <p className="text-sm text-neutral-600 mt-2.5">
            Every clinical decision, diagnostic test, and recovery pathway is built around human empathy and medical rigor.
          </p>
        </div>

        {/* Asymmetric Bento-Style Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 auto-rows-[240px] md:auto-rows-[280px]">
          {images.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-[26px] overflow-hidden bg-neutral-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] ${item.className}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Minimal Text Overlays */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white pointer-events-none">
                <div>
                  <span className="inline-block text-[10px] font-bold tracking-[0.16em] uppercase text-neutral-300 mb-1">
                    {item.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-tight">
                    {item.caption}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

