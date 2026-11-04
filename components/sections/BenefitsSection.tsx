import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { ShieldCheck, Clock, Layers, Users } from "lucide-react";

const icons = [Layers, Users, ShieldCheck, Clock];

export default function BenefitsSection() {
  return (
    <section id="why-us" className="w-full py-16 md:py-24 bg-[#FAFAFA] border-t border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-2 block">
            THE MEDBRIDGE ADVANTAGE
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-[#080808]">
            Why Patients Choose MedBridge Global
          </h2>
          <p className="text-[13px] sm:text-[14px] text-neutral-600 mt-2">
            Bridging fragmented clinical systems into a synchronized, empathetic healthcare journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.benefits.map((benefit, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={benefit.title}
                className="p-7 rounded-[18px] bg-white border border-neutral-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:border-neutral-400/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-5 text-neutral-800">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-neutral-500 mb-2">
                    {benefit.badge}
                  </span>
                  <h3 className="text-[16px] font-semibold text-[#080808] mb-2 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-[13px] text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

