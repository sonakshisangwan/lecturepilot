"use client";

import { motion } from "framer-motion";
import { 
  Check, 
  X, 
  Clock, 
  UserCheck, 
  Zap, 
  Brain, 
  Bot, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function WhyLecturePilot() {
  const comparisonPoints = [
    {
      feature: "Time Efficiency",
      traditional: "Scrubbing through 2-hour lectures at 1.5x speed just to find a 3-minute explanation.",
      lecturepilot: "Instant semantic jumps directly to the exact second and slide where the concept is taught.",
      icon: Clock,
      stat: "12+ hrs saved weekly",
    },
    {
      feature: "Personalized Learning",
      traditional: "One-size-fits-all professor pace with zero adaptation to your knowledge gaps.",
      lecturepilot: "Socratic AI adjusts explanations to your exact level—from intuitive analogies to advanced derivations.",
      icon: UserCheck,
      stat: "Tailored to your background",
    },
    {
      feature: "Instant Answers",
      traditional: "Waiting days for weekly office hours or scrolling through confusing online forums.",
      lecturepilot: "Sub-second answers grounded in your course materials, available 24/7 before your exam.",
      icon: Zap,
      stat: "Sub-second response time",
    },
    {
      feature: "Better Revision & Retention",
      traditional: "Passive rereading of highlighter-filled notes with an 80% forgetting curve after 48 hours.",
      lecturepilot: "Active recall quizzes and automated SM-2 spaced repetition flashcards that lock concepts into memory.",
      icon: Brain,
      stat: "94% long-term retention",
    },
    {
      feature: "AI Study Assistant",
      traditional: "Scattered notes across Apple Notes, Google Docs, textbook margins, and voice memos.",
      lecturepilot: "A unified workspace that indexes your entire semester across all courses and formats.",
      icon: Bot,
      stat: "Unified semester knowledge",
    },
  ];

  const metrics = [
    { label: "Average Study Hours Saved", value: "12.5h", sub: "per week / student" },
    { label: "Midterm Prep Speedup", value: "3.4x", sub: "faster comprehensive review" },
    { label: "Spaced Repetition Recall", value: "94%", sub: "average retention after 30 days" },
    { label: "Timestamp Citation Precision", value: "98.7%", sub: "grounded in audio & slides" },
  ];

  return (
    <section id="why-lecturepilot" className="relative scroll-mt-20 px-6 py-20 lg:px-8 lg:py-28 border-t border-[#F3E8EE] dark:border-[#35313B]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F3E8EE] dark:border-[#35313B] bg-white dark:bg-[#242129] px-3.5 py-1 text-xs font-medium text-[#6B6873] dark:text-[#C9C3CB]">
            <Sparkles className="h-3 w-3 text-[#F4B6C2] dark:text-[#D8A7B1]" />
            <span>Why Students Love Us</span>
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#2D2A32] dark:text-[#F4F4F5] sm:text-4xl">
            A Better Way to Learn
          </h2>

          <p className="mt-3.5 text-base leading-relaxed text-[#6B6873] dark:text-[#C9C3CB] sm:text-lg">
            Traditional studying was never built for modern academic workloads. See how LecturePilot brings ease back to learning.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-3xl border border-[#F3E8EE] dark:border-[#35313B] bg-white dark:bg-[#242129] p-6 text-center shadow-xs"
            >
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-[#2D2A32] dark:text-[#F4F4F5] tracking-tight">
                {m.value}
              </p>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-[#F4B6C2] dark:text-[#D8A7B1]">
                {m.label}
              </p>
              <p className="mt-1 text-[11px] text-[#6B6873] dark:text-[#C9C3CB]">
                {m.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-[#F3E8EE] dark:border-[#35313B] bg-white dark:bg-[#242129] shadow-xs">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#F3E8EE] dark:border-[#35313B] bg-[#FFF9FB] dark:bg-[#18161B] p-5 text-sm font-semibold">
            <div className="md:col-span-4 text-[#2D2A32] dark:text-[#F4F4F5]">Study Experience</div>
            <div className="hidden md:block md:col-span-4 text-[#6B6873] dark:text-[#C9C3CB]">
              Traditional Studying
            </div>
            <div className="hidden md:block md:col-span-4 text-[#2D2A32] dark:text-[#F4F4F5] font-bold">
              With LecturePilot
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#F3E8EE] dark:divide-[#35313B]">
            {comparisonPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 hover:bg-[#FDF2F8]/40 dark:hover:bg-[#2B2630] transition-colors"
                >
                  {/* Feature Title */}
                  <div className="md:col-span-4 flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FDF2F8] dark:bg-[#18161B] text-[#F4B6C2] dark:text-[#D8A7B1] border border-[#F3E8EE] dark:border-[#35313B]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2D2A32] dark:text-[#F4F4F5]">{item.feature}</p>
                      <p className="text-[11px] text-[#6B6873] dark:text-[#C9C3CB] mt-0.5">{item.stat}</p>
                    </div>
                  </div>

                  {/* Traditional Studying */}
                  <div className="md:col-span-4 flex items-start gap-2 text-xs text-[#6B6873] dark:text-[#C9C3CB] p-2 md:p-0">
                    <X className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                    <span className="leading-relaxed">{item.traditional}</span>
                  </div>

                  {/* LecturePilot */}
                  <div className="md:col-span-4 flex items-start gap-2 text-xs text-[#2D2A32] dark:text-[#F4F4F5] font-medium p-2 md:p-0">
                    <Check className="h-4 w-4 shrink-0 text-[#F4B6C2] dark:text-[#D8A7B1] mt-0.5" />
                    <span className="leading-relaxed">{item.lecturepilot}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Table Bottom Callout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#FFF9FB] dark:bg-[#18161B] border-t border-[#F3E8EE] dark:border-[#35313B]">
            <span className="text-xs text-[#6B6873] dark:text-[#C9C3CB]">
              Transform your notes in your very next lecture.
            </span>

            <Link
              href="/upload"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D2A32] dark:text-[#F4F4F5] hover:text-[#F4B6C2] dark:hover:text-[#D8A7B1] transition-colors"
            >
              <span>Upload your first file</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
