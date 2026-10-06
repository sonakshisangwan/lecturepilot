"use client";

import { motion } from "framer-motion";
import { Code, Stethoscope, Scale, Flame, ArrowRight, Check, Heart } from "lucide-react";
import Link from "next/link";

export default function UseCases() {
  const useCases = [
    {
      icon: Code,
      title: "Computer Science & Engineering",
      subtitle: "Algorithms, Systems & Machine Learning",
      description:
        "Parse complex code walkthroughs, mathematical proofs, and system diagrams. Get step-by-step explanations of gradient descent, memory layouts, or cache coherence.",
      highlights: [
        "Equation & LaTeX breakdown",
        "Code complexity & edge cases",
        "Diagram & slide synchronization",
      ],
      tag: "STEM",
      accent: "text-[#2D2A32] dark:text-[#FAF8FA] border-[#F4B6C2]/40 bg-[#FDF2F8] dark:bg-[#25202B]",
    },
    {
      icon: Stethoscope,
      title: "Medicine & Life Sciences",
      subtitle: "Anatomy, Biochemistry & Pharmacology",
      description:
        "Tackle dense 100+ slide presentations with pathways, enzyme names, and physiological mechanisms. Extract Anki-ready flashcards and memorize high-yield facts.",
      highlights: [
        "Biochemical pathway steps",
        "Drug interactions & side effects",
        "Active recall spaced repetition",
      ],
      tag: "Pre-Med",
      accent: "text-[#82A792] dark:text-[#9ABAA4] border-[#82A792]/40 bg-[#FDF2F8] dark:bg-[#25202B]",
    },
    {
      icon: Scale,
      title: "Law & Humanities",
      subtitle: "Case Law, Statutes & Policy Analysis",
      description:
        "Distill 50-page legal opinions, constitutional case briefs, and historical arguments. Identify core holdings, procedural history, and testable legal frameworks.",
      highlights: [
        "Case holdings & precedents",
        "Statutory interpretation notes",
        "Exam-ready issue spotters",
      ],
      tag: "Law & Arts",
      accent: "text-[#D99AA9] border-[#D99AA9]/40 bg-[#FDF2F8] dark:bg-[#25202B]",
    },
    {
      icon: Flame,
      title: "Night-Before Exam Crunch",
      subtitle: "When Midterms are Tomorrow at 9 AM",
      description:
        "Don't spend 6 hours re-watching 14 lecture videos at 2x speed. Get instant executive summaries, drill the most probable quiz questions, and lock down testable formulas.",
      highlights: [
        "3-minute high-yield scans",
        "Common professor exam traps",
        "Instant adaptive quiz practice",
      ],
      tag: "Cramming",
      accent: "text-[#2D2A32] dark:text-[#FAF8FA] border-[#F4B6C2]/40 bg-[#FDF2F8] dark:bg-[#25202B]",
    },
  ];

  return (
    <section id="use-cases" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F3E8EE] dark:border-[#2C2630] bg-[#FDF2F8] dark:bg-[#1A181E] px-3.5 py-1 text-xs font-medium text-[#2D2A32] dark:text-[#FAF8FA]">
            <Heart className="h-3 w-3 text-[#F4B6C2]" />
            <span>Tailored For Real Students 🌸</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#2D2A32] dark:text-[#FAF8FA] sm:text-4xl">
            Built for any demanding course load.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B6873] dark:text-[#C8C1C5] leading-relaxed">
            Whether you&apos;re preparing for a brutal engineering final or memorizing 200 medical terms,
            LecturePilot adapts to your curriculum.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="rounded-3xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] p-7 hover:border-[#F4B6C2] dark:hover:border-[#F4B6C2]/40 transition flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${uc.accent}`}>
                        <Icon className="h-5 w-5 text-[#F4B6C2]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-[#2D2A32] dark:text-[#FAF8FA]">
                          {uc.title}
                        </h3>
                        <p className="text-xs text-[#6B6873] dark:text-[#C8C1C5]">{uc.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-[#6B6873] dark:text-[#C8C1C5] bg-[#FDF2F8] dark:bg-[#25202B] px-2.5 py-1 rounded-full border border-[#F3E8EE] dark:border-[#2C2630]">
                      {uc.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B6873] dark:text-[#C8C1C5] leading-relaxed mb-5">
                    {uc.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#F3E8EE] dark:border-[#2C2630]">
                    {uc.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#2D2A32] dark:text-[#FAF8FA]">
                        <Check className="h-3.5 w-3.5 text-[#82A792] dark:text-[#9ABAA4] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F3E8EE] dark:border-[#2C2630] flex items-center justify-between">
                  <Link
                    href="/upload"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4B6C2] hover:underline"
                  >
                    <span>Try with this subject</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
