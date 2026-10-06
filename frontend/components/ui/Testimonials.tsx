"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2, Heart } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Alex Rivera",
      role: "MD Candidate",
      school: "Stanford School of Medicine",
      initials: "AR",
      quote:
        "Medical school pharmacology is pure memorization overload. LecturePilot converted 60 hours of cardiovascular lectures into high-yield Anki flashcards and timestamped summaries. It cut my review time in half and I scored in the top 4% on shelf exams.",
      badge: "Top 4% Shelf Exam Score",
      accent: "text-[#82A792] dark:text-[#9ABAA4] bg-[#FDF2F8] dark:bg-[#25202B] border-[#82A792]/40",
    },
    {
      name: "Maya Chen",
      role: "Computer Science & AI",
      school: "UC Berkeley",
      initials: "MC",
      quote:
        "My algorithms professor writes rapid proofs on chalkboard that used to take hours to decipher. LecturePilot transcribed the video, extracted dynamic programming recurrence relations, and quizzed me until I actually understood it. It feels like having a sweet senior TA on call 24/7.",
      badge: "A+ in Algorithms (CS 170)",
      accent: "text-[#2D2A32] dark:text-[#FAF8FA] bg-[#FDF2F8] dark:bg-[#25202B] border-[#F4B6C2]/40",
    },
    {
      name: "Julian Vance",
      role: "Law & Economics",
      school: "Columbia University",
      initials: "JV",
      quote:
        "The semantic search across 14 weeks of antitrust legal lectures is incredible. I can query a vague concept like 'bundling in digital platforms' and it instantly takes me to the exact 45-second segment where the professor answered a student question about it.",
      badge: "Columbia Law Review",
      accent: "text-[#D99AA9] bg-[#FDF2F8] dark:bg-[#25202B] border-[#D99AA9]/40",
    },
  ];

  return (
    <section className="relative px-5 py-20 lg:px-8 lg:py-28 border-t border-[#F3E8EE] dark:border-[#2C2630]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F3E8EE] dark:border-[#2C2630] bg-[#FDF2F8] dark:bg-[#1A181E] px-3.5 py-1 text-xs font-medium text-[#2D2A32] dark:text-[#FAF8FA]">
            <Heart className="h-3 w-3 text-[#F4B6C2]" />
            <span>Student Stories 🌸</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#2D2A32] dark:text-[#FAF8FA] sm:text-4xl">
            Trusted by students facing intense courses.
          </h2>

          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#6B6873] dark:text-[#C8C1C5]">
            From engineering problem sets to USMLE medical preparation, see how students cut hours of study frustration.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="relative flex flex-col justify-between rounded-3xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] p-7 shadow-2xs hover:border-[#F4B6C2] dark:hover:border-[#F4B6C2]/40 transition"
            >
              <div>
                {/* Stars and Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#F4B6C2]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>

                  <Quote className="h-5 w-5 text-[#F3E8EE] dark:text-[#2C2630]" />
                </div>

                {/* Quote Text */}
                <p className="mt-5 text-xs sm:text-sm leading-relaxed text-[#2D2A32] dark:text-[#FAF8FA]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Highlight Badge */}
                <div className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${t.accent}`}>
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#82A792] dark:text-[#9ABAA4]" />
                  <span>{t.badge}</span>
                </div>
              </div>

              {/* Student Bio */}
              <div className="mt-6 pt-5 border-t border-[#F3E8EE] dark:border-[#2C2630] flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#25202B] text-xs font-bold text-[#2D2A32] dark:text-[#FAF8FA] border border-[#F3E8EE] dark:border-[#2C2630]">
                  {t.initials}
                </div>

                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-[#2D2A32] dark:text-[#FAF8FA] truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#6B6873] dark:text-[#C8C1C5] truncate">{t.role}</p>
                  <p className="text-[11px] text-[#F4B6C2] font-medium truncate">{t.school}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
