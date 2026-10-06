"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Video,
  MessageSquare,
  Brain,
  Layers,
  CheckCircle2,
  Check,
  RotateCcw,
  Sparkles,
  Clock,
  Heart,
} from "lucide-react";
import { NvidiaIcon, NebiusIcon } from "./icons/BrandIcons";

interface HeroProps {
  onOpenDemo?: () => void;
}

export default function Hero({ onOpenDemo }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "flashcard" | "quiz" | "summary">("chat");
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(1);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  const quizOptions = [
    { id: 0, text: "A. It requires calculating only first-order gradients", correct: false },
    { id: 1, text: "B. High dimensions are dominated by saddle points which trap second-order updates", correct: true },
    { id: 2, text: "C. It is impossible to invert matrices in software", correct: false },
    { id: 3, text: "D. The learning rate is permanently zero", correct: false },
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Delicate, soft blush ambient glow (calm, cozy, never harsh neon) */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[340px] bg-[#F4B6C2]/[0.12] dark:bg-[#F4B6C2]/[0.08] blur-[130px] rounded-full" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-6 text-center lg:text-left">
            {/* Cute Feminine Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] px-3.5 py-1.5 shadow-xs"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#F4B6C2]" />
              <span className="text-xs font-medium text-[#2D2A32] dark:text-[#F4F4F5]">
                A prettier, calmer way to study 🌸
              </span>
              <span className="text-xs text-[#9A949F] dark:text-[#71717A]">•</span>
              <span className="text-xs text-[#6B6873] dark:text-[#A1A1AA] font-medium flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[#F4B6C2]" />
                Nebius × NVIDIA NIM
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="mt-6 text-3xl font-extrabold tracking-tight text-[#2D2A32] dark:text-[#F4F4F5] sm:text-5xl md:text-5xl lg:text-[52px] lg:leading-[1.18]"
            >
              Turn dense lectures into{" "}
              <span className="text-[#F4B6C2] underline decoration-[#F4B6C2]/35 underline-offset-8">
                effortless clarity.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="mt-5 text-sm sm:text-base leading-relaxed text-[#6B6873] dark:text-[#A1A1AA] lg:max-w-xl"
            >
              Upload 2-hour lecture recordings, complex PDFs, and handwritten notes.
              LecturePilot transforms them into grounded Socratic chat, smart flashcards,
              adaptive exam quizzes, and high-yield summaries in a soft, cozy space.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 lg:justify-start"
            >
              <Link
                href="/upload"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F4B6C2] hover:bg-[#EAA0AE] text-[#2D2A32] dark:text-[#0D0D0E] px-6 py-3.5 text-sm font-semibold shadow-xs transition-all hover:translate-y-[-1px]"
              >
                <span>Upload Lecture Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] hover:bg-[#FDF2F8] dark:hover:bg-[#202024] px-5 py-3.5 text-sm font-semibold text-[#2D2A32] dark:text-[#F4F4F5] transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-[#F4B6C2]" />
                <span>Try AI Chat</span>
              </Link>

              {onOpenDemo && (
                <button
                  onClick={onOpenDemo}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-medium text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#F4B6C2]" />
                  <span>Interactive Walkthrough</span>
                </button>
              )}
            </motion.div>

            {/* Delicate Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-10 pt-6 border-t border-[#F3E8EE] dark:border-[#27272A] flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs text-[#6B6873] dark:text-[#A1A1AA]"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#82A792] dark:bg-[#9ABAA4]" />
                <span className="text-[#2D2A32] dark:text-[#F4F4F5] font-semibold">100% Grounded</span>
                <span>Exact slide & video citations</span>
              </div>

              <div className="h-3.5 w-px bg-[#F3E8EE] dark:border-[#27272A] hidden sm:block" />

              <div className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-[#F4B6C2]" />
                <span>Zero hallucinations • Active recall ready</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Live Study Cockpit Demo */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="relative mx-auto w-full max-w-[580px]"
            >
              {/* Main Card Container */}
              <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FDF2F8]/70 dark:bg-[#18181B] p-4 sm:p-5 shadow-sm">
                
                {/* Header with Lecture Info and Tab Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-[#F3E8EE] dark:border-[#27272A]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white dark:bg-[#0D0D0E] text-[#F4B6C2] border border-[#F3E8EE] dark:border-[#27272A]">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#2D2A32] dark:text-[#F4F4F5] leading-none">
                        CS 229: Gradient Descent & Optimization
                      </p>
                      <p className="text-[10px] text-[#6B6873] dark:text-[#A1A1AA] mt-1">42 slides • Stanford CS • Notes ready</p>
                    </div>
                  </div>

                  {/* Interactive Tab Switcher */}
                  <div className="flex items-center gap-1 rounded-2xl bg-white dark:bg-[#0D0D0E] p-1 border border-[#F3E8EE] dark:border-[#27272A] text-xs">
                    <button
                      onClick={() => setActiveTab("chat")}
                      className={`rounded-xl px-2.5 py-1 transition-all text-xs font-medium ${
                        activeTab === "chat"
                          ? "bg-[#F4B6C2] text-[#2D2A32] dark:text-[#0D0D0E] font-semibold"
                          : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                      }`}
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => setActiveTab("flashcard")}
                      className={`rounded-xl px-2.5 py-1 transition-all text-xs font-medium ${
                        activeTab === "flashcard"
                          ? "bg-[#F4B6C2] text-[#2D2A32] dark:text-[#0D0D0E] font-semibold"
                          : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                      }`}
                    >
                      Cards
                    </button>
                    <button
                      onClick={() => setActiveTab("quiz")}
                      className={`rounded-xl px-2.5 py-1 transition-all text-xs font-medium ${
                        activeTab === "quiz"
                          ? "bg-[#F4B6C2] text-[#2D2A32] dark:text-[#0D0D0E] font-semibold"
                          : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                      }`}
                    >
                      Quiz
                    </button>
                    <button
                      onClick={() => setActiveTab("summary")}
                      className={`rounded-xl px-2.5 py-1 transition-all text-xs font-medium ${
                        activeTab === "summary"
                          ? "bg-[#F4B6C2] text-[#2D2A32] dark:text-[#0D0D0E] font-semibold"
                          : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                      }`}
                    >
                      Summary
                    </button>
                  </div>
                </div>

                {/* TAB 1: Grounded AI Chat */}
                {activeTab === "chat" && (
                  <div className="space-y-3">
                    {/* Student Query */}
                    <div className="flex items-start gap-2.5 text-xs">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDF2F8] dark:bg-[#202024] text-[11px] font-bold text-[#2D2A32] dark:text-[#F4F4F5] border border-[#F3E8EE] dark:border-[#27272A]">
                        S
                      </div>
                      <div className="rounded-2xl bg-white dark:bg-[#0D0D0E] p-3 text-[#2D2A32] dark:text-[#F4F4F5] border border-[#F3E8EE] dark:border-[#27272A] max-w-[90%] shadow-2xs">
                        Why does Newton&apos;s method fail on high-dimensional non-convex neural network losses?
                      </div>
                    </div>

                    {/* AI Response with Citations */}
                    <div className="flex items-start gap-2.5 text-xs">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDF2F8] dark:bg-[#202024] text-[#F4B6C2] border border-[#F3E8EE] dark:border-[#27272A]">
                        <Brain className="h-3.5 w-3.5" />
                      </div>
                      <div className="rounded-2xl bg-white dark:bg-[#0D0D0E] p-3.5 text-[#2D2A32] dark:text-[#F4F4F5] border border-[#F3E8EE] dark:border-[#27272A] space-y-2.5 shadow-2xs">
                        <p className="leading-relaxed text-xs text-[#6B6873] dark:text-[#A1A1AA]">
                          In high dimensions, <span className="text-[#2D2A32] dark:text-[#F4F4F5] font-medium">saddle points</span> vastly outnumber local minima. Newton&apos;s method seeks points where &nabla;J(&theta;) = 0, causing updates to gravitate straight into saddle points where eigenvalues are mixed.
                        </p>

                        {/* Grounded Citations Chips */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#F3E8EE] dark:border-[#27272A]">
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDF2F8] dark:bg-[#18181B] px-2 py-0.5 text-[10px] font-medium text-[#2D2A32] dark:text-[#F4F4F5] border border-[#F3E8EE] dark:border-[#27272A]">
                            <FileText className="h-2.5 w-2.5 text-[#F4B6C2]" />
                            Slide 29: Saddle Points
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDF2F8] dark:bg-[#18181B] px-2 py-0.5 text-[10px] text-[#6B6873] dark:text-[#A1A1AA] border border-[#F3E8EE] dark:border-[#27272A]">
                            <Video className="h-2.5 w-2.5 text-[#82A792] dark:text-[#9ABAA4]" />
                            Video 44:18 (Andrew Ng)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Suggested follow-up prompt pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-[#9A949F] dark:text-[#71717A] self-center">Try:</span>
                      <button
                        onClick={() => setActiveTab("quiz")}
                        className="rounded-full bg-white dark:bg-[#0D0D0E] hover:bg-[#FDF2F8] dark:hover:bg-[#202024] px-2.5 py-1 text-[10px] text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] border border-[#F3E8EE] dark:border-[#27272A] transition"
                      >
                        🌸 Make quiz questions from this
                      </button>
                      <button
                        onClick={() => setActiveTab("flashcard")}
                        className="rounded-full bg-white dark:bg-[#0D0D0E] hover:bg-[#FDF2F8] dark:hover:bg-[#202024] px-2.5 py-1 text-[10px] text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] border border-[#F3E8EE] dark:border-[#27272A] transition"
                      >
                        ✨ Convert to flashcard
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: Interactive Flashcard */}
                {activeTab === "flashcard" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#6B6873] dark:text-[#A1A1AA]">
                      <span className="flex items-center gap-1.5 font-medium text-[#2D2A32] dark:text-[#F4F4F5]">
                        <Layers className="h-3 w-3 text-[#F4B6C2]" />
                        Flashcard (1 of 5)
                      </span>
                      <span className="text-[11px] bg-white dark:bg-[#0D0D0E] px-2 py-0.5 rounded-md border border-[#F3E8EE] dark:border-[#27272A]">
                        Spaced Repetition: SM-2
                      </span>
                    </div>

                    {/* The Interactive Flip Card */}
                    <div
                      onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                      className="cursor-pointer rounded-2xl bg-white dark:bg-[#0D0D0E] hover:border-[#F4B6C2] p-5 border border-[#F3E8EE] dark:border-[#27272A] transition-all text-center select-none min-h-[140px] flex flex-col justify-center items-center shadow-2xs"
                    >
                      <div className="text-[10px] font-semibold text-[#F4B6C2] uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                        <RotateCcw className="h-3 w-3" />
                        {flashcardFlipped ? "Answer (Click to flip back)" : "Question (Click to reveal answer)"}
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-[#2D2A32] dark:text-[#F4F4F5] leading-relaxed">
                        {flashcardFlipped
                          ? "κ = λ_max / λ_min. When κ is high, the loss surface forms a narrow valley. Gradient descent bounces between steep walls rather than moving smoothly down the floor."
                          : "What is the condition number κ of a Hessian matrix, and how does it affect convergence?"}
                      </p>
                    </div>

                    {/* Active Recall Response Buttons */}
                    <div className="grid grid-cols-4 gap-1.5 text-[11px]">
                      <button className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#0D0D0E] py-1.5 text-[#D99AA9] hover:bg-[#FDF2F8] dark:hover:bg-[#18181B] transition font-medium text-center">
                        Again (&lt;1m)
                      </button>
                      <button className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#0D0D0E] py-1.5 text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition font-medium text-center">
                        Hard (10m)
                      </button>
                      <button className="rounded-xl border border-[#F4B6C2] bg-[#FDF2F8] dark:bg-[#202024] py-1.5 text-[#2D2A32] dark:text-[#F4F4F5] transition font-medium text-center">
                        Good (1d)
                      </button>
                      <button className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#0D0D0E] py-1.5 text-[#82A792] dark:text-[#9ABAA4] hover:bg-[#FDF2F8] dark:hover:bg-[#18181B] transition font-medium text-center">
                        Easy (4d)
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 3: Interactive Exam Quiz */}
                {activeTab === "quiz" && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-[#6B6873] dark:text-[#A1A1AA]">
                      <span className="flex items-center gap-1.5 font-medium text-[#82A792] dark:text-[#9ABAA4]">
                        <CheckCircle2 className="h-3 w-3" />
                        Adaptive Question 1 of 4
                      </span>
                      <span className="text-[11px] text-[#2D2A32] dark:text-[#F4F4F5] font-medium">Score: 1 / 1 (100%)</span>
                    </div>

                    <p className="text-xs font-semibold text-[#2D2A32] dark:text-[#F4F4F5]">
                      Why is standard Newton&apos;s method problematic for high-dimensional non-convex optimization?
                    </p>

                    <div className="space-y-1.5">
                      {quizOptions.map((opt) => {
                        const isSelected = selectedQuizOption === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedQuizOption(opt.id)}
                            className={`w-full text-left rounded-xl px-3 py-2 text-xs transition flex items-center justify-between ${
                              isSelected && opt.correct
                                ? "bg-[#FDF2F8] dark:bg-[#152319] border border-[#82A792] dark:border-[#9ABAA4] text-[#2D2A32] dark:text-[#F4F4F5]"
                                : isSelected && !opt.correct
                                ? "bg-[#FFF0F0] dark:bg-[#251719] border border-[#D99AA9] text-[#2D2A32] dark:text-[#F4F4F5]"
                                : "bg-white dark:bg-[#0D0D0E] border border-[#F3E8EE] dark:border-[#27272A] text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                            }`}
                          >
                            <span>{opt.text}</span>
                            {isSelected && opt.correct && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#82A792] dark:text-[#9ABAA4] shrink-0 ml-1.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedQuizOption === 1 && (
                      <div className="rounded-xl bg-[#FDF2F8] dark:bg-[#152319] p-2.5 border border-[#82A792]/40 dark:border-[#9ABAA4]/40 text-[11px] text-[#2D2A32] dark:text-[#F4F4F5] flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#82A792] dark:text-[#9ABAA4]" />
                        <span><strong>Correct!</strong> Saddle points have gradient zero with negative curvature, pulling second-order updates into traps.</span>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: Executive Summary */}
                {activeTab === "summary" && (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-[#6B6873] dark:text-[#A1A1AA]">
                      <span className="flex items-center gap-1 font-medium text-[#2D2A32] dark:text-[#F4F4F5]">
                        <Clock className="h-3 w-3 text-[#F4B6C2]" />
                        3-Minute High-Yield Summary
                      </span>
                      <span className="text-[10px] bg-white dark:bg-[#0D0D0E] px-2 py-0.5 rounded border border-[#F3E8EE] dark:border-[#27272A]">
                        Exam Weight: High
                      </span>
                    </div>

                    <div className="rounded-xl bg-white dark:bg-[#0D0D0E] p-3 border border-[#F3E8EE] dark:border-[#27272A] space-y-2 text-[#6B6873] dark:text-[#A1A1AA]">
                      <p className="text-[#2D2A32] dark:text-[#F4F4F5] font-semibold text-xs">Core Principles:</p>
                      <ul className="space-y-1.5 pl-4 list-disc text-[11px]">
                        <li>
                          <strong className="text-[#2D2A32] dark:text-[#F4F4F5]">Batch vs Mini-Batch:</strong> Mini-batch SGD (32-256) yields parallel Tensor Core execution without sample variance blowup.
                        </li>
                        <li>
                          <strong className="text-[#2D2A32] dark:text-[#F4F4F5]">Momentum:</strong> Adds velocity dampening (v_t = &beta; v_(t-1) + &alpha; &nabla;J) across high-curvature ravine walls.
                        </li>
                        <li>
                          <strong className="text-[#2D2A32] dark:text-[#F4F4F5]">Stability Criterion:</strong> Learning rate &alpha; must stay below 2 / &lambda;_max to prevent divergence.
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <Link href="/study" className="text-[#F4B6C2] hover:underline font-medium">
                        Open Full Study Hub →
                      </Link>
                      <span className="text-[#9A949F] dark:text-[#71717A]">Generated in 1.4s</span>
                    </div>
                  </div>
                )}

                {/* Bottom Card Footer */}
                <div className="mt-3.5 pt-2.5 border-t border-[#F3E8EE] dark:border-[#27272A] flex items-center justify-between text-[11px] text-[#6B6873] dark:text-[#A1A1AA]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-[#F4B6C2]" />
                    <span>Synchronized Lecture Materials</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#9A949F] dark:text-[#71717A]">
                    <NvidiaIcon className="h-3 w-3 text-[#82A792] dark:text-[#9ABAA4]" />
                    <span>NVIDIA NIM</span>
                    <span>•</span>
                    <NebiusIcon className="h-3 w-3 text-[#F4B6C2]" />
                    <span>Nebius Cluster</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}