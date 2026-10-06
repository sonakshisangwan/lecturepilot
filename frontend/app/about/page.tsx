"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import {
  Heart,
  Cpu,
  ArrowRight,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { NvidiaIcon, NebiusIcon } from "@/components/ui/icons/BrandIcons";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF9FB] dark:bg-[#121014] text-[#2D2A32] dark:text-[#FAF8FA] transition-colors duration-200 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl w-full px-5 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F4B6C2]/30 dark:border-[#F4B6C2]/20 bg-[#FDF2F8] dark:bg-[#1A181E] px-3.5 py-1 text-xs font-medium text-[#D99AA9] dark:text-[#F4B6C2] shadow-xs">
            <Heart className="h-3 w-3" />
            <span>Nebius × NVIDIA Hackathon Project 🌸</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2D2A32] dark:text-[#FAF8FA]">
            Studying should feel peaceful, not punishing.
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[#6B6873] dark:text-[#C8BAC3]">
            LecturePilot was created to replace chaotic late-night cramming with a calm, aesthetic,
            and scientifically grounded study experience.
          </p>
        </div>

        {/* The Problem & Our Mission */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] p-7 space-y-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D99AA9]">
              The Problem
            </span>
            <h2 className="text-xl font-bold text-[#2D2A32] dark:text-[#FAF8FA]">
              70% of study time is lost just searching for answers
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6873] dark:text-[#C8BAC3] leading-relaxed">
              Students spend hours rewinding 2-hour lecture videos, copying down slide equations,
              and guessing what will be on the exam. Passive re-reading leads to rapid forgetting
              and unnecessary stress.
            </p>
          </div>

          <div className="rounded-3xl border border-[#F4B6C2]/30 dark:border-[#F4B6C2]/20 bg-[#FDF2F8] dark:bg-[#221F27] p-7 space-y-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D99AA9] dark:text-[#F4B6C2]">
              The Solution
            </span>
            <h2 className="text-xl font-bold text-[#2D2A32] dark:text-[#FAF8FA]">
              Grounded multimodal intelligence with active recall 🌸
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6873] dark:text-[#C8BAC3] leading-relaxed">
              LecturePilot ingests PDFs, videos, and handwritten notes, tying every concept to exact
              slide citations. It transforms material into Socratic chat, spaced-repetition flashcards,
              and adaptive quizzes in a cozy, calming environment.
            </p>
          </div>
        </div>

        {/* Technical Architecture for Judges */}
        <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] p-8 sm:p-10 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F3E8EE] dark:border-[#2C2630]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#D99AA9] dark:text-[#F4B6C2]">
                Technical Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A32] dark:text-[#FAF8FA] mt-0.5">
                How Nebius & NVIDIA NIM Power LecturePilot
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 border border-[#82A792]/30 dark:border-[#9ABAA4]/30 text-[#82A792] dark:text-[#9ABAA4] px-3 py-1 text-xs font-medium flex items-center gap-1.5">
                <NvidiaIcon className="h-3.5 w-3.5" />
                NVIDIA NIM
              </span>
              <span className="rounded-full bg-[#FDF2F8] dark:bg-[#1A181E] border border-[#F4B6C2]/30 dark:border-[#F4B6C2]/20 text-[#D99AA9] dark:text-[#F4B6C2] px-3 py-1 text-xs font-medium flex items-center gap-1.5">
                <NebiusIcon className="h-3.5 w-3.5" />
                Nebius Cloud
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#2C2630] bg-[#FFF9FB] dark:bg-[#221F27] p-5 space-y-2 shadow-xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDF2F8] dark:bg-[#1A181E] text-[#D99AA9] dark:text-[#F4B6C2] border border-[#F4B6C2]/20 mb-3">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#2D2A32] dark:text-[#FAF8FA]">1. Multimodal Parsing</h3>
              <p className="text-xs text-[#6B6873] dark:text-[#C8BAC3] leading-relaxed">
                Extracts text, formulas, visual graphs, and synchronized audio speech from slides and MP4 video recordings.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#2C2630] bg-[#FFF9FB] dark:bg-[#221F27] p-5 space-y-2 shadow-xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDF2F8] dark:bg-[#1A181E] text-[#D99AA9] dark:text-[#E2CCEA] border border-[#F4B6C2]/20 mb-3">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#2D2A32] dark:text-[#FAF8FA]">2. NVIDIA NIM Retrieval</h3>
              <p className="text-xs text-[#6B6873] dark:text-[#C8BAC3] leading-relaxed">
                NVIDIA NeMo Retriever embeds cross-modal chunks on Nebius GPU clusters, indexing concepts with sub-second latency.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#2C2630] bg-[#FFF9FB] dark:bg-[#221F27] p-5 space-y-2 shadow-xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 text-[#82A792] dark:text-[#9ABAA4] border border-[#82A792]/20 mb-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#2D2A32] dark:text-[#FAF8FA]">3. Socratic Study Engine</h3>
              <p className="text-xs text-[#6B6873] dark:text-[#C8BAC3] leading-relaxed">
                Nemotron LLM generates grounded answers, SM-2 flashcard decks, adaptive exam quizzes, and executive notes.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-6">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#1F1A23] px-7 py-3.5 text-sm font-semibold transition shadow-xs"
          >
            <span>Launch Study Workspace</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
