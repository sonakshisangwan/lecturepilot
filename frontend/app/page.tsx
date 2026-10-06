"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Features from "@/components/ui/Features";
import HowItWorks from "@/components/ui/HowItWorks";
import UseCases from "@/components/ui/UseCases";
import Testimonials from "@/components/ui/Testimonials";
import FAQ from "@/components/ui/FAQ";
import CTASection from "@/components/ui/CTASection";
import Footer from "@/components/ui/Footer";
import DemoModal from "@/components/ui/DemoModal";

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleOpenDemo = () => setDemoModalOpen(true);
  const handleCloseDemo = () => setDemoModalOpen(false);

  return (
    <div className="min-h-screen bg-[#121114] text-[#F5F3ED] transition-colors duration-200">
      {/* Sticky Navigation */}
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* Main Landing Flow */}
      <main className="relative">
        {/* Hero Section with Interactive Mini-Cockpit */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* 6 Core Features */}
        <Features />

        {/* 3-Step Process & Timeline */}
        <HowItWorks />

        {/* Real Student Use Cases (STEM, Pre-Med, Law, Cramming) */}
        <UseCases />

        {/* Student Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Final CTA Banner */}
        <CTASection onOpenDemo={handleOpenDemo} />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Interactive Walkthrough Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={handleCloseDemo} />
    </div>
  );
}