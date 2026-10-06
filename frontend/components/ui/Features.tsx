"use client";

import { motion } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Layers,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Video,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function Features() {
  const features = [
    {
      icon: Video,
      title: "Multimodal Lecture Ingestion",
      tag: "All Course Formats 🌸",
      description:
        "Upload lecture slide PDFs, textbook readings, cute handwritten notes, or MP4 class recordings. LecturePilot synchronizes audio transcripts with visual slide content.",
      badgeColor: "text-[#D99AA9] dark:text-[#F4B6C2] bg-[#FDF2F8] dark:bg-[#202024] border-[#F4B6C2]/35",
    },
    {
      icon: MessageSquare,
      title: "Grounded Socratic AI Chat",
      tag: "Zero Hallucination ✨",
      description:
        "Ask questions and get crystal-clear answers where every claim links directly to the exact slide number or lecture recording timestamp. Zero guessing.",
      badgeColor: "text-[#82A792] dark:text-[#9ABAA4] bg-[#F4F9F6] dark:bg-[#152319] border-[#82A792]/35",
    },
    {
      icon: Layers,
      title: "Spaced Repetition Flashcards",
      tag: "SM-2 Active Recall 🪷",
      description:
        "Automatically generated 3D flip cards targeting key definitions, proofs, and mechanisms. Study with scientifically backed spaced repetition intervals.",
      badgeColor: "text-[#B695A6] dark:text-[#E2CCEA] bg-[#F8F2FA] dark:bg-[#202024] border-[#E2CCEA]/40",
    },
    {
      icon: CheckCircle2,
      title: "Adaptive Exam Quiz Generator",
      tag: "Exam Simulation 🎀",
      description:
        "Simulate midterm and final exam questions. Get immediate explanations of why correct choices work and why wrong options are tricky distractor traps.",
      badgeColor: "text-[#82A792] dark:text-[#9ABAA4] bg-[#F4F9F6] dark:bg-[#152319] border-[#82A792]/35",
    },
    {
      icon: FileText,
      title: "Executive & Deep Summaries",
      tag: "3-Min Scan 🌷",
      description:
        "Choose between an ultra-fast 3-minute high-yield summary for pre-class review, or a comprehensive structured chapter breakdown with formulas.",
      badgeColor: "text-[#D99AA9] dark:text-[#F4B6C2] bg-[#FFF0F4] dark:bg-[#202024] border-[#D99AA9]/35",
    },
    {
      icon: Bookmark,
      title: "High-Yield Key Points Extractor",
      tag: "Exam Traps & Formulas 🤍",
      description:
        "Isolate must-know formulas, common misconceptions professors test on, and core definitions tagged by high, medium, and critical exam probability.",
      badgeColor: "text-[#8F7F8A] dark:text-[#A1A1AA] bg-[#F9F6F8] dark:bg-[#202024] border-[#B695A6]/30",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F3E8EE] dark:border-[#27272A] bg-[#FDF2F8] dark:bg-[#18181B] px-3.5 py-1 text-xs font-medium text-[#2D2A32] dark:text-[#F4F4F5]">
            <Sparkles className="h-3 w-3 text-[#F4B6C2]" />
            <span>Comprehensive Learning Toolkit 🌸</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#2D2A32] dark:text-[#F4F4F5] sm:text-4xl">
            Everything you need to master tough courses.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B6873] dark:text-[#A1A1AA] leading-relaxed">
            Designed for students who want deep conceptual understanding without spending late
            nights drowning in 80-page slide decks.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="group relative rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-6 hover:border-[#F4B6C2] dark:hover:border-[#F4B6C2]/40 transition-all duration-200 hover:translate-y-[-2px] flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#202024] border border-[#F3E8EE] dark:border-[#27272A] text-[#2D2A32] dark:text-[#F4F4F5] group-hover:text-[#F4B6C2] transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${feature.badgeColor}`}
                    >
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#2D2A32] dark:text-[#F4F4F5] group-hover:text-[#F4B6C2] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#6B6873] dark:text-[#A1A1AA] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F3E8EE] dark:border-[#27272A] flex items-center justify-between text-xs text-[#9A949F] dark:text-[#71717A] group-hover:text-[#2D2A32] dark:group-hover:text-[#F4F4F5] transition-colors">
                  <span>Explore in workspace</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform text-[#F4B6C2]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hackathon Callout Strip */}
        <div className="mt-14 rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FDF2F8] dark:bg-[#18181B] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-[#2D2A32] dark:text-[#F4F4F5] flex items-center gap-2 justify-center sm:justify-start">
              <span>Ready to test these study tools on real course slides?</span>
              <Heart className="h-4 w-4 text-[#F4B6C2] fill-[#F4B6C2]/20" />
            </h4>
            <p className="text-xs sm:text-sm text-[#6B6873] dark:text-[#A1A1AA]">
              Try our pre-loaded Stanford CS229 or Biology 101 lectures with one click.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/upload"
              className="rounded-2xl bg-[#F4B6C2] hover:bg-[#EAA0AE] text-[#2D2A32] dark:text-[#0D0D0E] px-5 py-2.5 text-xs sm:text-sm font-semibold transition"
            >
              Upload Your Material
            </Link>
            <Link
              href="/study"
              className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#0D0D0E] hover:bg-[#FDF2F8] dark:hover:bg-[#202024] text-[#2D2A32] dark:text-[#F4F4F5] px-4 py-2.5 text-xs sm:text-sm font-medium transition"
            >
              Browse Tools
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}