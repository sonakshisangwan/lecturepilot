"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const [annualBilling, setAnnualBilling] = useState(true);

  const freeFeatures = [
    "5 lecture uploads / month (up to 90 min each)",
    "Audio & PDF slide ingestion",
    "Executive summaries & key takeaways",
    "Basic flashcards generation",
    "15 AI Tutor chat queries per day",
    "Web & mobile access",
    "Community support",
  ];

  const proFeatures = [
    "Unlimited lecture uploads (video, audio, PDF, notes)",
    "Unlimited 24/7 Socratic AI Tutor chat",
    "Intelligent Spaced Repetition (SM-2) engine",
    "Export to Anki (.apkg), Notion & Obsidian",
    "Adaptive quiz generator with in-depth rationales",
    "Whiteboard diagram & LaTeX formula OCR",
    "Priority processing speed",
    "Semester-wide cross-lecture search",
    "Early access to new study features",
  ];

  return (
    <section id="pricing" className="relative scroll-mt-20 px-6 py-20 lg:px-8 lg:py-28 border-t border-[#F3E8EE] dark:border-[#35313B]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F3E8EE] dark:border-[#35313B] bg-white dark:bg-[#242129] px-3.5 py-1 text-xs font-medium text-[#6B6873] dark:text-[#C9C3CB]">
            <Sparkles className="h-3 w-3 text-[#F4B6C2] dark:text-[#D8A7B1]" />
            <span>Simple Pricing</span>
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#2D2A32] dark:text-[#FAF8FA] sm:text-4xl">
            Choose What Fits Your Semester
          </h2>

          <p className="mt-3.5 text-base leading-relaxed text-[#6B6873] dark:text-[#C9C3CB] sm:text-lg">
            Start for free. Upgrade when you need unlimited indexing for midterms, finals, or licensing exams.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-[#F3E8EE] dark:border-[#35313B] bg-white dark:bg-[#242129] p-1.5 shadow-xs">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                !annualBilling
                  ? "bg-[#FDF2F8] dark:bg-[#18161B] text-[#2D2A32] dark:text-[#FAF8FA] shadow-xs"
                  : "text-[#6B6873] dark:text-[#C9C3CB] hover:text-[#2D2A32] dark:hover:text-[#FAF8FA]"
              }`}
            >
              Monthly Billing
            </button>

            <button
              onClick={() => setAnnualBilling(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                annualBilling
                  ? "bg-[#FDF2F8] dark:bg-[#18161B] text-[#2D2A32] dark:text-[#FAF8FA] shadow-xs"
                  : "text-[#6B6873] dark:text-[#C9C3CB] hover:text-[#2D2A32] dark:hover:text-[#FAF8FA]"
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-[#F4B6C2]/20 dark:bg-[#D8A7B1]/20 px-2 py-0.5 text-[10px] font-bold text-[#2D2A32] dark:text-[#FAF8FA]">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* 2 Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          
          {/* FREE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-between rounded-3xl border border-[#F3E8EE] dark:border-[#35313B] bg-white dark:bg-[#242129] p-7 sm:p-9 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#2D2A32] dark:text-[#FAF8FA]">Free</h3>
                  <p className="mt-1 text-xs text-[#6B6873] dark:text-[#C9C3CB]">For individual courses and light revision</p>
                </div>
                <span className="rounded-full border border-[#F3E8EE] dark:border-[#35313B] bg-[#FFF9FB] dark:bg-[#18161B] px-3 py-1 text-xs font-medium text-[#6B6873] dark:text-[#C9C3CB]">
                  Starter
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-extrabold text-[#2D2A32] dark:text-[#FAF8FA]">$0</span>
                <span className="text-sm text-[#6B6873] dark:text-[#C9C3CB]">/ month</span>
              </div>

              <p className="mt-1 text-xs text-[#6B6873] dark:text-[#C9C3CB]">No credit card required.</p>

              {/* Feature list */}
              <div className="mt-6 pt-6 border-t border-[#F3E8EE] dark:border-[#35313B] space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6873] dark:text-[#C9C3CB]">
                  Included Features:
                </p>
                {freeFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#6B6873] dark:text-[#C9C3CB]">
                    <Check className="h-4 w-4 shrink-0 text-[#F4B6C2] dark:text-[#D8A7B1] mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href="/upload"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#F3E8EE] dark:border-[#35313B] bg-[#FFF9FB] dark:bg-[#18161B] py-3 text-sm font-semibold text-[#2D2A32] dark:text-[#FAF8FA] transition-colors hover:bg-[#FDF2F8] dark:hover:bg-[#201D24]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* PRO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="relative flex flex-col justify-between rounded-3xl border-2 border-[#F4B6C2] dark:border-[#D8A7B1] bg-white dark:bg-[#242129] p-7 sm:p-9 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#2D2A32] dark:text-[#FAF8FA]">Pro</h3>
                  <p className="mt-1 text-xs text-[#6B6873] dark:text-[#C9C3CB]">For intense semesters and deep retention</p>
                </div>
                <span className="rounded-full bg-[#F4B6C2] dark:bg-[#D8A7B1] px-3 py-1 text-xs font-semibold text-white dark:text-[#18161B]">
                  Most Popular
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-extrabold text-[#2D2A32] dark:text-[#FAF8FA]">
                  ${annualBilling ? "9" : "12"}
                </span>
                <span className="text-sm text-[#6B6873] dark:text-[#C9C3CB]">
                  / month {annualBilling ? "(billed annually)" : "(billed monthly)"}
                </span>
              </div>

              <p className="mt-1 text-xs text-[#6B6873] dark:text-[#C9C3CB]">
                7-day free trial included. Cancel anytime.
              </p>

              {/* Feature list */}
              <div className="mt-6 pt-6 border-t border-[#F3E8EE] dark:border-[#35313B] space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2D2A32] dark:text-[#FAF8FA]">
                  Everything in Free, plus:
                </p>
                {proFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2D2A32] dark:text-[#FAF8FA]">
                    <Check className="h-4 w-4 shrink-0 text-[#F4B6C2] dark:text-[#D8A7B1] mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href="/upload"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F4B6C2] hover:bg-[#EAA0AE] text-white dark:bg-[#D8A7B1] dark:hover:bg-[#C7929D] dark:text-[#18161B] py-3.5 text-sm font-semibold shadow-xs transition-colors"
              >
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Security / Guarantee Footer */}
        <div className="mt-10 text-center flex items-center justify-center gap-1.5 text-xs text-[#6B7280] dark:text-[#C9C3CB]">
          <ShieldCheck className="h-4 w-4 text-[#F4B6C2] dark:text-[#D8A7B1]" />
          <span>7-day free trial • Cancel anytime with 1 click • Student discount</span>
        </div>
      </div>
    </section>
  );
}
