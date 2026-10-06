"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { NvidiaIcon, NebiusIcon } from "./icons/BrandIcons";

interface CTASectionProps {
  onOpenDemo?: () => void;
}

export default function CTASection({ onOpenDemo }: CTASectionProps) {
  return (
    <section className="relative px-5 py-16 lg:px-8 lg:py-24 border-t border-[#F3E8EE] dark:border-[#27272A]">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FDF2F8]/80 dark:bg-[#18181B] p-8 sm:p-12 lg:p-16 text-center shadow-xs"
        >
          {/* Subtle soft blush glow inside card */}
          <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#F4B6C2]/[0.15] dark:bg-[#F4B6C2]/[0.10] blur-[90px] rounded-full" />

          <div className="relative mx-auto max-w-2xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#0D0D0E] px-3.5 py-1 text-xs font-medium text-[#2D2A32] dark:text-[#F4F4F5]">
              <Sparkles className="h-3 w-3 text-[#F4B6C2]" />
              <span>Nebius × NVIDIA Hackathon Ready 🌸</span>
            </div>

            {/* Headline */}
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#2D2A32] dark:text-[#F4F4F5] sm:text-4xl lg:text-5xl">
              Stop re-watching 2-hour lectures. <br className="hidden sm:inline" />
              <span className="text-[#F4B6C2]">Start retaining.</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-xs sm:text-base leading-relaxed text-[#6B6873] dark:text-[#A1A1AA]">
              Upload your syllabus, slide decks, or lecture videos. In under 30 seconds, LecturePilot equips you with Socratic chat, spaced-repetition flashcards, and adaptive exam quizzes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/upload"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F4B6C2] hover:bg-[#EAA0AE] text-[#2D2A32] dark:text-[#0D0D0E] px-6 py-3.5 text-sm font-semibold shadow-xs transition-all hover:translate-y-[-1px]"
              >
                <span>Launch Workspace Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              {onOpenDemo && (
                <button
                  onClick={onOpenDemo}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#0D0D0E] hover:bg-[#FDF2F8] dark:hover:bg-[#1F1C24] px-5 py-3.5 text-sm font-semibold text-[#2D2A32] dark:text-[#F4F4F5] transition-colors"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FDF2F8] dark:bg-[#202024] text-[#F4B6C2]">
                    <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                  </div>
                  <span>Tour Live Demo</span>
                </button>
              )}
            </div>

            {/* Guarantee checkmarks */}
            <div className="mt-8 pt-6 border-t border-[#F3E8EE] dark:border-[#27272A] flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#6B6873] dark:text-[#A1A1AA]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#82A792] dark:text-[#9ABAA4]" />
                <span>Instant upload processing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#82A792] dark:text-[#9ABAA4]" />
                <span>Zero hallucinations guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-[#F4B6C2]" />
                <span>Cozy & student-first</span>
              </div>
            </div>

            {/* Hackathon credit footer strip */}
            <div className="mt-6 flex items-center justify-center gap-3 text-[11px] text-[#9A949F] dark:text-[#71717A]">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
