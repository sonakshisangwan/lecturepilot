"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import {
  UploadCloud,
  FileText,
  Video,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Brain,
  Layers,
  CheckCircle2,
  Clock,
  Trash2,
  RefreshCw,
  FolderOpen,
  Link as LinkIcon,
  BookOpen,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { MOCK_LECTURES } from "@/lib/mockLectures";
import { LectureData } from "@/types/study";
import { NvidiaIcon, NebiusIcon } from "@/components/ui/icons/BrandIcons";

type UploadState = "idle" | "uploading" | "success";

export default function UploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeLecture, setActiveLecture] = useState<LectureData>(MOCK_LECTURES[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<LectureData[]>(MOCK_LECTURES);

  const processingSteps = [
    "Uploading & extracting slides, diagrams, and transcripts...",
    "Running NVIDIA NIM embeddings on Nebius Cloud GPUs...",
    "Generating Socratic index, SM-2 flashcards & exam quiz...",
  ];

  const handleStartUpload = (fileData?: LectureData) => {
    const lectureToUse = fileData || MOCK_LECTURES[0];
    setActiveLecture(lectureToUse);
    setUploadState("uploading");
    setUploadProgress(10);
    setCurrentStep(0);

    // Simulate multi-stage upload & GPU processing
    const t1 = setTimeout(() => {
      setUploadProgress(45);
      setCurrentStep(1);
    }, 1200);

    const t2 = setTimeout(() => {
      setUploadProgress(85);
      setCurrentStep(2);
    }, 2400);

    const t3 = setTimeout(() => {
      setUploadProgress(100);
      setUploadState("success");
      // Add to uploaded list if not present
      if (!uploadedFiles.some((f) => f.id === lectureToUse.id)) {
        setUploadedFiles([lectureToUse, ...uploadedFiles]);
      }
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handlePreloadLecture = (lecture: LectureData) => {
    handleStartUpload(lecture);
  };

  const handleReset = () => {
    setUploadState("idle");
    setUploadProgress(0);
    setCurrentStep(0);
  };

  const handleDelete = (id: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] dark:bg-[#0D0D0E] text-[#2D2A32] dark:text-[#F4F4F5] transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Workspace Title & Intro */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F4B6C2]/30 dark:border-[#F4B6C2]/20 bg-[#FDF2F8] dark:bg-[#18181B] px-3 py-1 text-xs font-medium text-[#D99AA9] dark:text-[#F4B6C2] mb-3 shadow-xs">
            <Heart className="h-3 w-3" />
            <span>Multimodal Ingestion 🌸</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2D2A32] dark:text-[#F4F4F5]">
            Lecture Workspace
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#6B6873] dark:text-[#A1A1AA]">
            Upload lecture slide PDFs, cute study notes, or MP4 class recordings. LecturePilot
            turns them into an interactive active-recall study session.
          </p>
        </div>

        {/* =========================================================================
            STATE 1: IDLE / EMPTY STATE
           ========================================================================= */}
        {uploadState === "idle" && (
          <div className="space-y-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleStartUpload();
              }}
              className={`rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all ${
                isDragging
                  ? "border-[#F4B6C2] bg-[#FDF2F8] dark:bg-[#202024]/80 scale-[1.01]"
                  : "border-[#F4B6C2]/35 dark:border-[#27272A] bg-white dark:bg-[#18181B] hover:border-[#F4B6C2] dark:hover:border-[#F4B6C2]/40"
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FDF2F8] dark:bg-[#202024] border border-[#F4B6C2]/30 text-[#D99AA9] dark:text-[#F4B6C2] shadow-xs">
                <UploadCloud className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">
                Drop your lecture files here
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#6B6873] dark:text-[#A1A1AA] max-w-md mx-auto">
                Drag and drop your course materials, or browse files from your computer.
                All diagrams, math formulas, and spoken transcripts are parsed.
              </p>

              {/* Supported formats pills */}
              <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs">
                <span className="rounded-xl bg-[#FFF9FB] dark:bg-[#202024] px-3 py-1 border border-[#F3E8EE] dark:border-[#27272A] flex items-center gap-1.5 text-[#2D2A32] dark:text-[#F4F4F5]">
                  <FileText className="h-3.5 w-3.5 text-[#F4B6C2]" /> PDF Slides & Notes
                </span>
                <span className="rounded-xl bg-[#FFF9FB] dark:bg-[#202024] px-3 py-1 border border-[#F3E8EE] dark:border-[#27272A] flex items-center gap-1.5 text-[#2D2A32] dark:text-[#F4F4F5]">
                  <Video className="h-3.5 w-3.5 text-[#D99AA9] dark:text-[#E2CCEA]" /> MP4 / MOV Video
                </span>
                <span className="rounded-xl bg-[#FFF9FB] dark:bg-[#202024] px-3 py-1 border border-[#F3E8EE] dark:border-[#27272A] flex items-center gap-1.5 text-[#2D2A32] dark:text-[#F4F4F5]">
                  <Clock className="h-3.5 w-3.5 text-[#82A792] dark:text-[#9ABAA4]" /> Audio Transcripts
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleStartUpload()}
                  className="rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] px-6 py-3 text-xs sm:text-sm font-semibold transition shadow-xs"
                >
                  Select File from Computer
                </button>

                <div className="flex items-center gap-2 rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] px-4 py-2 text-xs">
                  <LinkIcon className="h-3.5 w-3.5 text-[#9A949F] dark:text-[#71717A]" />
                  <input
                    type="text"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="Paste YouTube or Zoom URL..."
                    className="bg-transparent text-xs text-[#2D2A32] dark:text-[#F4F4F5] placeholder-[#9A949F] dark:placeholder-[#71717A] focus:outline-none w-48 sm:w-60"
                  />
                  <button
                    onClick={() => handleStartUpload()}
                    className="text-[#D99AA9] dark:text-[#F4B6C2] font-semibold hover:underline"
                  >
                    Fetch
                  </button>
                </div>
              </div>

              {/* One-click Demo Preloader */}
              <div className="mt-8 pt-6 border-t border-[#F3E8EE] dark:border-[#27272A] max-w-lg mx-auto">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9A949F] dark:text-[#71717A] mb-3">
                  Or test immediately with demo hackathon course materials:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handlePreloadLecture(MOCK_LECTURES[0])}
                    className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#27272A] px-3 py-1.5 text-xs text-[#2D2A32] dark:text-[#F4F4F5] flex items-center gap-1.5 transition shadow-xs"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-[#F4B6C2]" />
                    <span>CS 229: Gradient Descent (PDF)</span>
                  </button>
                  <button
                    onClick={() => handlePreloadLecture(MOCK_LECTURES[1])}
                    className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#27272A] px-3 py-1.5 text-xs text-[#2D2A32] dark:text-[#F4F4F5] flex items-center gap-1.5 transition shadow-xs"
                  >
                    <Video className="h-3.5 w-3.5 text-[#D99AA9] dark:text-[#E2CCEA]" />
                    <span>BIO 101: ATP Synthase (Video)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 2: UPLOADING & GPU PROCESSING STATE
           ========================================================================= */}
        {uploadState === "uploading" && (
          <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FDF2F8] dark:bg-[#202024] border border-[#F4B6C2]/40 text-[#D99AA9] dark:text-[#F4B6C2] shadow-xs">
              <RefreshCw className="h-9 w-9 animate-spin text-[#F4B6C2]" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">
                Processing & Indexing Lecture 🌸
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#6B6873] dark:text-[#A1A1AA]">
                {activeLecture.title}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-xs text-[#6B6873] dark:text-[#A1A1AA]">
                <span>Progress</span>
                <span className="font-mono text-[#D99AA9] dark:text-[#F4B6C2] font-semibold">{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#F3E8EE] dark:bg-[#202024]">
                <div
                  className="h-full bg-[#F4B6C2] transition-all duration-500 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>

            {/* Processing Steps Checklist */}
            <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] p-4 text-left space-y-3 max-w-md mx-auto text-xs">
              {processingSteps.map((step, idx) => {
                const isDone = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={step} className="flex items-start gap-2.5">
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-[#82A792] dark:text-[#9ABAA4] shrink-0 mt-0.5" />
                    ) : isCurrent ? (
                      <RefreshCw className="h-4 w-4 text-[#F4B6C2] animate-spin shrink-0 mt-0.5" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-[#EADCE4] dark:border-white/20 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        isDone
                          ? "text-[#2D2A32] dark:text-[#F4F4F5] font-medium"
                          : isCurrent
                          ? "text-[#D99AA9] dark:text-[#F4B6C2] font-semibold"
                          : "text-[#9A949F] dark:text-[#71717A]"
                      }
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-3 text-xs text-[#9A949F] dark:text-[#71717A] pt-2">
              <span className="flex items-center gap-1 text-[#82A792] dark:text-[#9ABAA4] font-medium">
                <NvidiaIcon className="h-3 w-3" />
                NVIDIA NIM Embedding
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#D99AA9] dark:text-[#F4B6C2] font-medium">
                <NebiusIcon className="h-3 w-3" />
                Nebius GPU Cluster
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 3: SUCCESS STATE
           ========================================================================= */}
        {uploadState === "success" && (
          <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-7 sm:p-10 space-y-8 shadow-sm">
            
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F3E8EE] dark:border-[#27272A]">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#202024] border border-[#F4B6C2]/40 text-[#D99AA9] dark:text-[#F4B6C2] shadow-xs">
                  <FileCheck2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#FDF2F8] dark:bg-[#202024] text-[#D99AA9] dark:text-[#F4B6C2] px-2.5 py-0.5 text-[11px] font-semibold border border-[#F4B6C2]/30">
                      Ready for Study 🌸
                    </span>
                    <span className="text-xs text-[#9A949F] dark:text-[#71717A]">Generated in 3.6s</span>
                  </div>
                  <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">
                    {activeLecture.title}
                  </h2>
                  <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">{activeLecture.course}</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="self-start sm:self-center rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#27272A] px-3.5 py-2 text-xs font-medium text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition shadow-xs"
              >
                Upload Another Lecture
              </button>
            </div>

            {/* Generated Study Assets Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] p-4 text-center">
                <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-xl bg-[#FDF2F8] dark:bg-[#202024] text-[#D99AA9] dark:text-[#F4B6C2] mb-2 border border-[#F4B6C2]/20">
                  <Layers className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">{activeLecture.flashcards.length}</p>
                <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">Flashcards Ready</p>
              </div>

              <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] p-4 text-center">
                <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-xl bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 text-[#82A792] dark:text-[#9ABAA4] mb-2 border border-[#82A792]/20">
                  <Brain className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">{activeLecture.quiz.length}</p>
                <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">Exam Quiz Questions</p>
              </div>

              <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] p-4 text-center">
                <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-xl bg-[#FDF2F8] dark:bg-[#202024] text-[#D99AA9] mb-2 border border-[#D99AA9]/20">
                  <FileText className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">{activeLecture.pages || 36}</p>
                <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">Slides Indexed</p>
              </div>

              <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] p-4 text-center">
                <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-xl bg-[#FDF2F8] dark:bg-[#202024] text-[#D99AA9] dark:text-[#E2CCEA] mb-2 border border-[#D99AA9]/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">{activeLecture.keyPoints.length}</p>
                <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">High-Yield Points</p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B6873] dark:text-[#A1A1AA]">
                Where would you like to begin?
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/chat"
                  className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] hover:bg-white dark:hover:bg-[#202024] hover:border-[#F4B6C2]/40 p-4 transition group flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-xs text-[#D99AA9] dark:text-[#F4B6C2] font-semibold">Grounded Tutor</span>
                    <h4 className="text-sm font-bold text-[#2D2A32] dark:text-[#F4F4F5] mt-1 group-hover:text-[#D99AA9] dark:group-hover:text-[#F4B6C2] transition-colors">
                      Ask Socratic AI
                    </h4>
                    <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                      Ask clarifying questions with exact slide citations.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#D99AA9] dark:text-[#F4B6C2] font-medium">
                    Open Chat <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>

                <Link
                  href="/study?tab=flashcards"
                  className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] hover:bg-white dark:hover:bg-[#202024] hover:border-[#F4B6C2]/40 p-4 transition group flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-xs text-[#D99AA9] dark:text-[#E2CCEA] font-semibold">Spaced Repetition</span>
                    <h4 className="text-sm font-bold text-[#2D2A32] dark:text-[#F4F4F5] mt-1 group-hover:text-[#D99AA9] dark:group-hover:text-[#E2CCEA] transition-colors">
                      Review Flashcards
                    </h4>
                    <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                      3D flip cards with SM-2 algorithm recall intervals.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#D99AA9] dark:text-[#E2CCEA] font-medium">
                    Review Cards <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>

                <Link
                  href="/study?tab=quiz"
                  className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] hover:bg-white dark:hover:bg-[#202024] hover:border-[#F4B6C2]/40 p-4 transition group flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-xs text-[#82A792] dark:text-[#9ABAA4] font-semibold">Exam Simulation</span>
                    <h4 className="text-sm font-bold text-[#2D2A32] dark:text-[#F4F4F5] mt-1 group-hover:text-[#82A792] dark:group-hover:text-[#9ABAA4] transition-colors">
                      Take Adaptive Quiz
                    </h4>
                    <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                      Multiple choice test with instant explanations.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#82A792] dark:text-[#9ABAA4] font-medium">
                    Start Quiz <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>

                <Link
                  href="/study?tab=summary"
                  className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] hover:bg-white dark:hover:bg-[#202024] hover:border-[#F4B6C2]/40 p-4 transition group flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-xs text-[#D99AA9] font-semibold">High-Yield Notes</span>
                    <h4 className="text-sm font-bold text-[#2D2A32] dark:text-[#F4F4F5] mt-1 group-hover:text-[#D99AA9] transition-colors">
                      Read Summary
                    </h4>
                    <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                      Executive 3-minute scan and deep chapter breakdown.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#D99AA9] font-medium">
                    Open Summary <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            LIBRARY OF UPLOADED LECTURES
           ========================================================================= */}
        <div className="mt-14 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-[#D99AA9] dark:text-[#F4B6C2]" />
              <h2 className="text-lg font-bold text-[#2D2A32] dark:text-[#F4F4F5]">
                My Lecture Library ({uploadedFiles.length})
              </h2>
            </div>
            <span className="text-xs text-[#9A949F] dark:text-[#71717A]">Persistent Coursework</span>
          </div>

          <div className="space-y-3">
            {uploadedFiles.map((lecture) => (
              <div
                key={lecture.id}
                className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#F4B6C2]/40 transition shadow-xs"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#202024] border border-[#F4B6C2]/30 text-[#D99AA9] dark:text-[#F4B6C2]">
                    {lecture.type === "video" ? <Video className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#2D2A32] dark:text-[#F4F4F5]">
                        {lecture.title}
                      </h3>
                      <span className="rounded-full bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 border border-[#82A792]/30 dark:border-[#9ABAA4]/30 text-[#82A792] dark:text-[#9ABAA4] px-2 py-0.5 text-[10px] font-medium">
                        Ready 🌸
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA] mt-0.5">
                      {lecture.course} • {lecture.pages ? `${lecture.pages} slides` : lecture.duration} • {lecture.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Link
                    href="/chat"
                    className="rounded-xl bg-[#FFF9FB] dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#27272A] text-[#2D2A32] dark:text-[#F4F4F5] px-3.5 py-1.5 text-xs font-medium border border-[#F3E8EE] dark:border-[#27272A] transition shadow-xs"
                  >
                    Chat
                  </Link>
                  <Link
                    href="/study"
                    className="rounded-xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] px-3.5 py-1.5 text-xs font-semibold transition shadow-xs"
                  >
                    Study Hub
                  </Link>
                  <button
                    onClick={() => handleDelete(lecture.id)}
                    className="rounded-xl p-2 text-[#9A949F] dark:text-[#71717A] hover:text-[#D99AA9] hover:bg-[#FDF2F8] dark:hover:bg-[#202024] transition"
                    title="Delete lecture"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}