"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Sun,
  Moon,
  Sparkles,
  UploadCloud,
  MessageSquare,
  GraduationCap,
  Info,
} from "lucide-react";
import { GithubIcon, NvidiaIcon, NebiusIcon } from "./icons/BrandIcons";
import { useTheme } from "./ThemeProvider";

interface NavbarProps {
  onOpenDemo?: () => void;
}

export default function Navbar({ onOpenDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Workspace", href: "/upload", icon: UploadCloud },
    { name: "AI Chat", href: "/chat", icon: MessageSquare },
    { name: "Study Tools", href: "/study", icon: GraduationCap },
    { name: "Features", href: "/#features", icon: Sparkles },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#FFF9FB]/90 dark:bg-[#0D0D0E]/90 backdrop-blur-md border-b border-[#F3E8EE] dark:border-[#27272A] shadow-xs"
          : "bg-[#FFF9FB]/70 dark:bg-[#0D0D0E]/70 backdrop-blur-xs border-b border-[#F3E8EE]/60 dark:border-[#27272A]/60"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Cute Soft Pill */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#18181B] border border-[#F4B6C2]/40 text-[#F4B6C2] transition-transform duration-200 group-hover:scale-105 shadow-xs">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-[#2D2A32] dark:text-[#F4F4F5]">
                  LecturePilot
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#F3E8EE] dark:border-[#27272A] bg-[#FDF2F8] dark:bg-[#18181B] px-2.5 py-0.5 text-[10px] font-medium text-[#6B6873] dark:text-[#A1A1AA]">
                  <Sparkles className="h-2.5 w-2.5 text-[#F4B6C2]" />
                  <span>cozy study 🌸</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Hackathon Pill */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#141416] px-3 py-1 text-[11px] text-[#6B6873] dark:text-[#A1A1AA]">
            <span className="flex items-center gap-1 text-[#82A792] dark:text-[#9ABAA4] font-medium">
              <NvidiaIcon className="h-3 w-3" />
              NVIDIA
            </span>
            <span className="text-[#9A949F] dark:text-[#71717A]">×</span>
            <span className="flex items-center gap-1 text-[#F4B6C2] font-medium">
              <NebiusIcon className="h-3 w-3" />
              Nebius Hackathon
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#FDF2F8] dark:bg-[#18181B] text-[#2D2A32] dark:text-[#F4F4F5] border border-[#F4B6C2]/40 font-semibold"
                    : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] hover:bg-[#FDF2F8] dark:hover:bg-[#18181B]"
                }`}
              >
                <Icon className="h-3.5 w-3.5 opacity-80" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden items-center gap-2.5 md:flex">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#6B6873] dark:text-[#A1A1AA] transition-colors hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] hover:border-[#F4B6C2]"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-[#F4B6C2]" />
            ) : (
              <Moon className="h-4 w-4 text-[#6B6873]" />
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/sonakshisangwan/lecturepilot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#6B6873] dark:text-[#A1A1AA] transition-colors hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] hover:border-[#F4B6C2]"
            title="GitHub Repository"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          {/* Interactive Demo Trigger */}
          {onOpenDemo && (
            <button
              onClick={onOpenDemo}
              className="px-3 py-2 text-xs font-medium text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition-colors"
            >
              Tour Demo
            </button>
          )}

          {/* Primary Girly Blush CTA */}
          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 rounded-2xl bg-[#F4B6C2] hover:bg-[#EAA0AE] text-[#2D2A32] dark:text-[#0D0D0E] px-4.5 py-2 text-xs sm:text-sm font-semibold transition-all shadow-xs hover:translate-y-[-1px]"
          >
            <span>Upload Lecture</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu & Theme Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#6B6873] dark:text-[#A1A1AA]"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5 text-[#F4B6C2]" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-[#6B6873]" />
            )}
          </button>

          <Link
            href="/upload"
            className="rounded-xl bg-[#F4B6C2] px-3 py-1.5 text-xs font-semibold text-[#2D2A32] dark:text-[#0D0D0E]"
          >
            Upload
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#2D2A32] dark:text-[#F4F4F5]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] md:hidden px-5 py-4"
          >
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#FDF2F8] dark:bg-[#18181B] text-[#2D2A32] dark:text-[#F4F4F5] border border-[#F4B6C2]/40"
                        : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] hover:bg-[#FDF2F8] dark:hover:bg-[#18181B]"
                    }`}
                  >
                    <Icon className="h-4 w-4 opacity-80" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              <div className="pt-3 mt-3 border-t border-[#F3E8EE] dark:border-[#27272A] flex flex-col gap-2">
                <Link
                  href="/upload"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#F4B6C2] text-[#2D2A32] dark:text-[#0D0D0E] py-2.5 text-xs font-semibold"
                >
                  <span>Launch Study Workspace</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}