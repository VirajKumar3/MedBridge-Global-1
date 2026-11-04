import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SpecialtiesSection from "@/components/sections/SpecialtiesSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AppointmentCTASection from "@/components/sections/AppointmentCTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#080808] flex flex-col selection:bg-neutral-200">
      {/* Pill Floating Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Carousel */}
      <ServicesSection />

      {/* Specialties Grid */}
      <SpecialtiesSection />

      {/* Why MedBridge Global - Benefits */}
      <BenefitsSection />

      {/* Coordinated Care Continuum - How It Works */}
      <HowItWorksSection />

      {/* Appointment CTA Form & Consultation Intake */}
      <AppointmentCTASection />

      {/* Comprehensive Footer */}
      <Footer />
    </main>
  );
}
