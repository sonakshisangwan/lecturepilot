"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Layers,
  Brain,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const lectures = [
    { title: "CS 229: Gradient Descent & Optimization", progress: "85%", tag: "In Progress", duration: "1h 18m", subject: "Computer Science" },
    { title: "BIO 101: Cellular Respiration & ATP", progress: "60%", tag: "Review Ready", duration: "52m", subject: "Biology" },
    { title: "PHYS 140: Quantum Wave-Particle Duality", progress: "30%", tag: "Just Started", duration: "1h 05m", subject: "Physics" },
  ];

  const stats = [
    { label: "Study Time This Week", value: "6h 40m", icon: Clock },
    { label: "Flashcards Mastered", value: "48 cards", icon: Layers },
    { label: "Quizzes Completed", value: "12 / 12", icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9FB] dark:bg-[#0D0D0E] text-[#2D2A32] dark:text-[#F4F4F5] transition-colors duration-200 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-6xl w-full px-5 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Welcome Header */}
        <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F4B6C2]/30 dark:border-[#F4B6C2]/20 bg-[#FDF2F8] dark:bg-[#18181B] px-3 py-1 text-xs font-medium text-[#D99AA9] dark:text-[#F4B6C2] mb-3 shadow-xs">
              <Heart className="h-3 w-3" />
              <span>Study Space 🌸</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A32] dark:text-[#F4F4F5]">
              Welcome back, Scholar ✨
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6873] dark:text-[#A1A1AA] mt-1">
              You&apos;re making steady progress. Your next active recall review is ready.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/study?tab=flashcards"
              className="rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] px-5 py-2.5 text-xs sm:text-sm font-semibold transition shadow-xs"
            >
              Continue Studying 🌸
            </Link>
            <Link
              href="/upload"
              className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] px-4 py-2.5 text-xs sm:text-sm font-medium text-[#2D2A32] dark:text-[#F4F4F5] transition shadow-xs"
            >
              Upload Lecture
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-6 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">{stat.label}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FDF2F8] dark:bg-[#202024] border border-[#F4B6C2]/20 text-[#D99AA9] dark:text-[#F4B6C2]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Active Lectures & Suggestions Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Recent Lectures */}
          <section className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-6 sm:p-7 lg:col-span-2 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#2D2A32] dark:text-[#F4F4F5]">Recent Lectures</h2>
                <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">Pick up where you left off</p>
              </div>
              <Link href="/upload" className="text-xs text-[#D99AA9] dark:text-[#F4B6C2] hover:underline font-semibold">
                View all →
              </Link>
            </div>

            <div className="space-y-3.5">
              {lectures.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] p-4.5 hover:border-[#F4B6C2]/40 transition space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-[#2D2A32] dark:text-[#F4F4F5]">{item.title}</h3>
                      <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA] mt-0.5">{item.subject} • {item.duration}</p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#D99AA9] dark:text-[#F4B6C2]">{item.progress}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 w-full rounded-full bg-[#F3E8EE] dark:bg-[#141416]">
                    <div
                      className="h-full rounded-full bg-[#F4B6C2]"
                      style={{ width: item.progress }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Tutor Next Step Suggestion */}
          <aside className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-6 sm:p-7 space-y-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D99AA9] dark:text-[#F4B6C2]">
                <Sparkles className="h-4 w-4" />
                <span>Today&apos;s Recommended Step</span>
              </div>

              <h3 className="text-base font-bold text-[#2D2A32] dark:text-[#F4F4F5]">
                Review 5 SM-2 Flashcards
              </h3>

              <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA] leading-relaxed">
                You studied Optimization yesterday. A quick 3-minute active recall review will solidify
                Hessian condition numbers before your memory curve decays.
              </p>
            </div>

            <Link
              href="/study?tab=flashcards"
              className="rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] py-2.5 px-4 text-xs font-semibold text-center transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Start 3-Min Drill</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </aside>

        </div>

      </main>

      <Footer />
    </div>
  );
}