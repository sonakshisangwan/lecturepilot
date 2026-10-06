"use client";

import { motion } from "framer-motion";
import { UploadCloud, Cpu, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { NvidiaIcon, NebiusIcon } from "./icons/BrandIcons";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UploadCloud,
      title: "Drop Your Lecture Materials",
      description:
        "Drag & drop PDF slide decks, handwritten notes, syllabus readings, or MP4 recordings. LecturePilot parses slides, equations, and speech transcripts in seconds.",
      accent: "text-[#2D2A32] dark:text-[#FAF8FA] bg-[#FDF2F8] dark:bg-[#25202B] border-[#F4B6C2]/40",
    },
    {
      step: "02",
      icon: Cpu,
      title: "NVIDIA NIM & Nebius Processing",
      description:
        "Powered by NVIDIA NIM microservices on Nebius Cloud. Our engine aligns slides with speech timestamps, builds a semantic knowledge graph, and indexes core formulas.",
      accent: "text-[#2D2A32] dark:text-[#FAF8FA] bg-[#FDF2F8] dark:bg-[#25202B] border-[#F4B6C2]/40",
    },
    {
      step: "03",
      icon: Sparkles,
      title: "Master Through Active Recall",
      description:
        "Engage with Socratic chat with exact citation proofs, test your knowledge with adaptive quizzes, drill spaced-repetition flashcards, and review key points.",
      accent: "text-[#D99AA9] bg-[#FDF2F8] dark:bg-[#25202B] border-[#D99AA9]/40",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#FDF2F8]/60 dark:bg-[#17151A] relative border-y border-[#F3E8EE] dark:border-[#2C2630]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] px-3.5 py-1 text-xs font-medium text-[#2D2A32] dark:text-[#FAF8FA]">
            <Sparkles className="h-3 w-3 text-[#F4B6C2]" />
            <span>How It Works ✨</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#2D2A32] dark:text-[#FAF8FA] sm:text-4xl">
            From lecture chaos to exam confidence in 3 steps.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B6873] dark:text-[#C8C1C5] leading-relaxed">
            No complex setup. Simply drop your lecture materials and get a peaceful, ready-to-study interactive hub.
          </p>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="grid gap-8 md:grid-cols-3 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="relative rounded-3xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] p-7 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${item.accent}`}>
                      <Icon className="h-6 w-6 text-[#F4B6C2]" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-[#9A949F] dark:text-[#8E8691]">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#2D2A32] dark:text-[#FAF8FA]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#6B6873] dark:text-[#C8C1C5] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {idx === 1 && (
                  <div className="mt-6 pt-4 border-t border-[#F3E8EE] dark:border-[#2C2630] flex items-center gap-3 text-[11px] text-[#6B6873] dark:text-[#C8C1C5]">
                    <span className="flex items-center gap-1 text-[#82A792] dark:text-[#9ABAA4]">
                      <NvidiaIcon className="h-3.5 w-3.5" />
                      NVIDIA NIM
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#F4B6C2]">
                      <NebiusIcon className="h-3.5 w-3.5" />
                      Nebius Cloud
                    </span>
                  </div>
                )}

                {idx !== 1 && (
                  <div className="mt-6 pt-4 border-t border-[#F3E8EE] dark:border-[#2C2630] flex items-center gap-1 text-[11px] text-[#9A949F] dark:text-[#8E8691]">
                    <span>Takes &lt; 30 seconds 🌸</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#F4B6C2] hover:bg-[#EAA0AE] text-[#2D2A32] dark:text-[#121014] px-6 py-3.5 text-sm font-semibold transition shadow-xs"
          >
            <span>Launch Upload Workspace</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}