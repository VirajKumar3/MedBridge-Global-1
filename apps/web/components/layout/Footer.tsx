import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { Globe, Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#121212] text-neutral-300 pt-12 pb-8 border-t border-neutral-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-neutral-800/80">
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link href="/" className="inline-flex items-center" aria-label="MedBridge Home">
              <Image
                src="/images/medbridge-logo-white.png"
                alt="MedBridge"
                width={927}
                height={193}
                className="h-7 sm:h-8 md:h-[32px] w-auto object-contain"
              />
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Connecting trusted medical specialists, diagnostics, and modern healthcare coordination for an elevated patient journey.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                Global Network
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-neutral-500" />
                HIPAA Aligned
              </span>
            </div>
          </div>

          {/* Column 2: Platform (2-3 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              Platform
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#specialties" className="hover:text-white transition-colors">
                  Specialties
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-white transition-colors">
                  Doctors Directory
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-white transition-colors">
                  Patient Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialties (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              Specialties
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <Link href="/specialties/internal-medicine" className="hover:text-white transition-colors">
                  Internal Medicine
                </Link>
              </li>
              <li>
                <Link href="/specialties/cardiology" className="hover:text-white transition-colors">
                  Cardiology & Vascular
                </Link>
              </li>
              <li>
                <Link href="/specialties/orthopedics" className="hover:text-white transition-colors">
                  Orthopedics & Spine
                </Link>
              </li>
              <li>
                <Link href="/specialties/neurology" className="hover:text-white transition-colors">
                  Neurology & Brain Health
                </Link>
              </li>
              <li>
                <Link href="/specialties/dermatology" className="hover:text-white transition-colors">
                  Dermatology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Organization (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              Organization
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <Link href="/#why-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors">
                  Schedule Consultation
                </Link>
              </li>
              <li>
                <span className="text-neutral-500">contact@medbridgeglobal.care</span>
              </li>
              <li>
                <span className="text-neutral-500">+1 (800) 415-CARE</span>
              </li>
              <li>
                <span className="text-neutral-500 text-[11px]">MedBridge Global Health Pavilion</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Compact & Clean */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
          <p>© 2026 MedBridge Global Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <span className="text-neutral-500">Demonstrative Clinical Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
