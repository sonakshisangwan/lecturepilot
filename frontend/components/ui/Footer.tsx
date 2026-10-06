"use client";

import Link from "next/link";
import { BookOpen, Mail, ArrowUpRight, Heart } from "lucide-react";
import { GithubIcon, NvidiaIcon, NebiusIcon } from "./icons/BrandIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#0D0D0E] text-[#6B6873] dark:text-[#A1A1AA] transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#18181B] border border-[#F4B6C2]/40 text-[#F4B6C2]">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-[#2D2A32] dark:text-[#F4F4F5]">
                  LecturePilot
                </span>
                <span className="rounded-full border border-[#F3E8EE] dark:border-[#27272A] bg-[#FDF2F8] dark:bg-[#18181B] px-2.5 py-0.5 text-[10px] font-medium text-[#2D2A32] dark:text-[#F4F4F5]">
                  cozy study assistant 🌸
                </span>
              </div>
            </Link>

            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#6B6873] dark:text-[#A1A1AA] max-w-md">
              A calm, pretty, student-first learning assistant. Turn long lectures, dense slides, and audio into
              grounded Socratic chat, spaced-repetition flashcards, adaptive quizzes, and high-yield summaries.
            </p>

            {/* Hackathon Badge in Footer */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] px-3.5 py-1 text-xs text-[#2D2A32] dark:text-[#F4F4F5]">
              <span className="flex h-2 w-2 rounded-full bg-[#82A792] dark:bg-[#9ABAA4]" />
              <span>Built for Nebius × NVIDIA Hackathon 2026</span>
            </div>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://github.com/sonakshisangwan/lecturepilot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors"
                title="LecturePilot on GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href="mailto:team@lecturepilot.ai"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors"
                title="Email Support"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            
            {/* Column 1: Study Tools */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2D2A32] dark:text-[#F4F4F5]">
                Study Cockpit
              </p>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/upload" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors flex items-center gap-1">
                    <span>Upload Workspace</span>
                    <ArrowUpRight className="h-3 w-3 text-[#F4B6C2]" />
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors flex items-center gap-1">
                    <span>Grounded AI Chat</span>
                    <ArrowUpRight className="h-3 w-3 text-[#F4B6C2]" />
                  </Link>
                </li>
                <li>
                  <Link href="/study?tab=flashcards" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors">
                    Flashcard Generator
                  </Link>
                </li>
                <li>
                  <Link href="/study?tab=quiz" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors">
                    Quiz Generator
                  </Link>
                </li>
                <li>
                  <Link href="/study?tab=summary" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors">
                    Summary Generator
                  </Link>
                </li>
                <li>
                  <Link href="/study?tab=keypoints" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors">
                    Key Points Extractor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Technology */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2D2A32] dark:text-[#F4F4F5]">
                Technology
              </p>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/about" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors flex items-center gap-1">
                    <span>About & Architecture</span>
                  </Link>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors">
                    Use Cases
                  </a>
                </li>
                <li>
                  <span className="text-[#9A949F] dark:text-[#71717A] flex items-center gap-1">
                    <NvidiaIcon className="h-3 w-3 text-[#82A792] dark:text-[#9ABAA4]" />
                    NVIDIA NIM microservices
                  </span>
                </li>
                <li>
                  <span className="text-[#9A949F] dark:text-[#71717A] flex items-center gap-1">
                    <NebiusIcon className="h-3 w-3 text-[#F4B6C2]" />
                    Nebius Cloud Compute
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2D2A32] dark:text-[#F4F4F5]">
                Security & Privacy
              </p>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                <li>
                  <span className="text-[#6B6873] dark:text-[#A1A1AA]">Zero Data Sale</span>
                </li>
                <li>
                  <span className="text-[#6B6873] dark:text-[#A1A1AA]">AES-256 Encryption</span>
                </li>
                <li>
                  <span className="text-[#6B6873] dark:text-[#A1A1AA]">Student-First Privacy</span>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Subfooter */}
        <div className="mt-12 pt-6 border-t border-[#F3E8EE] dark:border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9A949F] dark:text-[#71717A]">
          <p>© {currentYear} LecturePilot. Built with care for the Nebius × NVIDIA Hackathon.</p>

          <div className="flex items-center gap-2">
            <Heart className="h-3.5 w-3.5 text-[#F4B6C2] fill-[#F4B6C2]/20" />
            <span className="text-[#6B6873] dark:text-[#A1A1AA]">Soft, pretty, distraction-free study space 🌸</span>
          </div>
        </div>

      </div>
    </footer>
  );
}