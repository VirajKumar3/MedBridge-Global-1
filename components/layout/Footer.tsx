import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#080808] text-white pt-16 pb-12 mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-neutral-800">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black text-[11px] font-bold">
                MB
              </div>
              <span className="font-semibold text-[17px] tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-neutral-400 text-[13px] leading-relaxed max-w-sm">
              Connecting trusted medical specialists, diagnostics, and modern healthcare coordination for an elevated patient journey.
            </p>
            <div className="pt-2 text-[12px] text-neutral-400">
              <p>Email: <span className="text-neutral-200">contact@medbridgeglobal.care</span></p>
              <p>Direct: <span className="text-neutral-200">+1 (800) 415-CARE</span></p>
            </div>
          </div>

          {/* Nav columns */}
          {SITE_CONFIG.footer.columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-neutral-300">
                {col.title}
              </h3>
              <ul className="space-y-2 text-[13px] text-neutral-400">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[12px] text-neutral-500 gap-4">
          <p>© 2026 MedBridge Global Inc. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed with contemporary clinical excellence. Demonstrative healthcare platform.
          </p>
        </div>
      </div>
    </footer>
  );
}

