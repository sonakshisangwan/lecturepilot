"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import {
  FileText,
  Layers,
  Brain,
  Bookmark,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle2,
  Check,
  X,
  Copy,
  Download,
  Sparkles,
  ChevronDown,
  LayoutGrid,
  Maximize2,
  Heart,
} from "lucide-react";
import { MOCK_LECTURES } from "@/lib/mockLectures";
import { LectureData, Flashcard, KeyPoint } from "@/types/study";

type StudyTab = "summary" | "flashcards" | "quiz" | "keypoints";

function StudyHubContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as StudyTab) || "flashcards";

  const [activeTab, setActiveTab] = useState<StudyTab>(initialTab);
  const [selectedLecture, setSelectedLecture] = useState<LectureData>(MOCK_LECTURES[0]);

  // Flashcards State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardViewMode, setFlashcardViewMode] = useState<"single" | "grid">("single");
  const [cardsList, setCardsList] = useState<Flashcard[]>(selectedLecture.flashcards);
  const [, setReviewedCards] = useState<Record<string, string>>({});

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState(0);

  // Summary State
  const [summaryMode, setSummaryMode] = useState<"brief" | "full">("full");
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Key Points State
  const [keyPointsList, setKeyPointsList] = useState<KeyPoint[]>(selectedLecture.keyPoints);

  // Update data when lecture changes
  const handleSelectLecture = (lecture: LectureData) => {
    setSelectedLecture(lecture);
    setCardsList(lecture.flashcards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSelectedAnswers({});
    setCurrentQuizQuestionIndex(0);
    setKeyPointsList(lecture.keyPoints);
    setReviewedCards({});
  };

  // Flashcard controls
  const currentCard = cardsList[currentCardIndex] || cardsList[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % cardsList.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + cardsList.length) % cardsList.length);
  };

  const handleShuffleCards = () => {
    setIsFlipped(false);
    const shuffled = [...cardsList].sort(() => Math.random() - 0.5);
    setCardsList(shuffled);
    setCurrentCardIndex(0);
  };

  const handleGradeCard = (grade: "Again" | "Hard" | "Good" | "Easy") => {
    setReviewedCards((prev) => ({ ...prev, [currentCard.id]: grade }));
    handleNextCard();
  };

  // Quiz controls
  const currentQuizItem = selectedLecture.quiz[currentQuizQuestionIndex] || selectedLecture.quiz[0];
  const correctCount = Object.entries(selectedAnswers).filter(
    ([id, ansIdx]) => {
      const q = selectedLecture.quiz.find((item) => item.id === id);
      return q && q.answerIndex === ansIdx;
    }
  ).length;

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuizQuestionIndex(0);
  };

  // Key Points controls
  const handleToggleKeyPoint = (id: string) => {
    setKeyPointsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, mastered: !item.mastered } : item))
    );
  };

  const masteredPointsCount = keyPointsList.filter((kp) => kp.mastered).length;

  // Copy Summary
  const handleCopySummary = () => {
    const text = summaryMode === "brief" ? selectedLecture.summaryBrief : selectedLecture.summaryFull;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Header: Title and Active Lecture Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#F3E8EE] dark:border-[#27272A]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F4B6C2]/30 dark:border-[#F4B6C2]/20 bg-[#FDF2F8] dark:bg-[#18181B] px-3 py-1 text-xs font-medium text-[#D99AA9] dark:text-[#F4B6C2] mb-2 shadow-xs">
            <Heart className="h-3 w-3" />
            <span>Active Study Tools 🌸</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A32] dark:text-[#F4F4F5]">
            Study Cockpit
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6873] dark:text-[#A1A1AA] mt-1">
            Active recall flashcards, adaptive quiz simulator, summaries, and high-yield points.
          </p>
        </div>

        {/* Active Course Selector */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs text-[#9A949F] dark:text-[#71717A] hidden md:inline">Course:</span>
          <div className="relative">
            <select
              value={selectedLecture.id}
              onChange={(e) => {
                const match = MOCK_LECTURES.find((l) => l.id === e.target.value);
                if (match) handleSelectLecture(match);
              }}
              className="appearance-none rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] px-3.5 py-2 pr-8 text-xs font-semibold text-[#2D2A32] dark:text-[#F4F4F5] focus:outline-none focus:border-[#F4B6C2] shadow-xs"
            >
              {MOCK_LECTURES.map((l) => (
                <option key={l.id} value={l.id} className="bg-white dark:bg-[#202024] text-[#2D2A32] dark:text-[#F4F4F5]">
                  {l.title}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-[#9A949F] dark:text-[#71717A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4 Core Tools Tab Navigation */}
      <div className="flex border-b border-[#F3E8EE] dark:border-[#27272A] mb-8 overflow-x-auto gap-2 pb-1">
        {[
          { id: "flashcards" as StudyTab, label: "Flashcards", icon: Layers, count: cardsList.length },
          { id: "quiz" as StudyTab, label: "Quiz Generator", icon: Brain, count: selectedLecture.quiz.length },
          { id: "summary" as StudyTab, label: "Summary Generator", icon: FileText },
          { id: "keypoints" as StudyTab, label: "Key Points Extractor", icon: Bookmark, count: keyPointsList.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#FDF2F8] dark:bg-[#202024] text-[#D99AA9] dark:text-[#F4B6C2] border border-[#F4B6C2]/30 shadow-xs"
                  : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] hover:bg-white dark:hover:bg-[#18181B]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-[#F4B6C2]/25 text-[#D99AA9] dark:text-[#F4B6C2]"
                      : "bg-[#F3E8EE] dark:bg-white/[0.06] text-[#9A949F] dark:text-[#71717A]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TOOL 1: FLASHCARDS GENERATOR
         ========================================================================= */}
      {activeTab === "flashcards" && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* View Mode & Shuffle Header */}
          <div className="flex items-center justify-between text-xs text-[#6B6873] dark:text-[#A1A1AA]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#2D2A32] dark:text-[#F4F4F5]">
                Card {currentCardIndex + 1} of {cardsList.length}
              </span>
              <span className="text-[#9A949F] dark:text-[#71717A]">•</span>
              <span className="text-[11px] text-[#D99AA9] dark:text-[#F4B6C2] bg-[#FDF2F8] dark:bg-[#F4B6C2]/15 px-2 py-0.5 rounded-md border border-[#F4B6C2]/30 font-medium">
                {currentCard.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffleCards}
                className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] px-3 py-1.5 text-xs text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition flex items-center gap-1.5 shadow-xs"
              >
                <Shuffle className="h-3 w-3" />
                <span>Shuffle Deck</span>
              </button>

              <button
                onClick={() => setFlashcardViewMode(flashcardViewMode === "single" ? "grid" : "single")}
                className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] px-3 py-1.5 text-xs text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition flex items-center gap-1.5 shadow-xs"
              >
                {flashcardViewMode === "single" ? (
                  <>
                    <LayoutGrid className="h-3 w-3" />
                    <span>Grid View</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-3 w-3" />
                    <span>Card Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SINGLE CARD INTERACTIVE FLIP MODE */}
          {flashcardViewMode === "single" && (
            <div className="space-y-5">
              {/* 3D Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[260px] sm:min-h-[300px] rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] hover:border-[#F4B6C2]/40 p-8 text-center flex flex-col justify-between items-center transition-all shadow-md select-none relative group"
              >
                {/* Card Header Hint */}
                <div className="w-full flex items-center justify-between text-xs text-[#9A949F] dark:text-[#71717A]">
                  <span className="text-[11px] font-mono">Difficulty: {currentCard.difficulty}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#D99AA9] dark:text-[#F4B6C2] font-medium">
                    <RotateCcw className="h-3 w-3" />
                    {isFlipped ? "Answer Side (Click to flip)" : "Question Side (Click to reveal)"}
                  </span>
                </div>

                {/* Card Content */}
                <div className="my-auto py-4 max-w-lg">
                  <p className="text-base sm:text-xl font-medium text-[#2D2A32] dark:text-[#F4F4F5] leading-relaxed">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </p>
                </div>

                {/* Card Footer Status */}
                <div className="w-full flex items-center justify-between text-[11px] text-[#9A949F] dark:text-[#71717A] pt-3 border-t border-[#F3E8EE] dark:border-[#27272A]">
                  <span>SM-2 Interval: 4 days</span>
                  <span className="text-[#6B6873] dark:text-[#A1A1AA]">Click card or press Space to flip 🌸</span>
                </div>
              </div>

              {/* SM-2 Spaced Repetition Grading Buttons */}
              <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-3 space-y-2 shadow-xs">
                <div className="text-center text-[11px] text-[#9A949F] dark:text-[#71717A]">
                  Rate your active recall ease:
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-center">
                  <button
                    onClick={() => handleGradeCard("Again")}
                    className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] py-2 text-[#D99AA9] hover:bg-[#D99AA9]/15 transition"
                  >
                    Again (&lt;1m)
                  </button>
                  <button
                    onClick={() => handleGradeCard("Hard")}
                    className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] py-2 text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition"
                  >
                    Hard (10m)
                  </button>
                  <button
                    onClick={() => handleGradeCard("Good")}
                    className="rounded-xl border border-[#F4B6C2]/40 bg-[#F4B6C2]/15 dark:bg-[#F4B6C2]/20 py-2 text-[#D99AA9] dark:text-[#F4B6C2] hover:bg-[#F4B6C2]/30 transition"
                  >
                    Good (1d)
                  </button>
                  <button
                    onClick={() => handleGradeCard("Easy")}
                    className="rounded-xl border border-[#82A792]/40 dark:border-[#9ABAA4]/30 bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 py-2 text-[#82A792] dark:text-[#9ABAA4] hover:bg-[#82A792]/25 dark:hover:bg-[#9ABAA4]/25 transition"
                  >
                    Easy (4d)
                  </button>
                </div>
              </div>

              {/* Prev / Next Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevCard}
                  className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] px-4 py-2.5 text-xs font-medium text-[#2D2A32] dark:text-[#F4F4F5] transition flex items-center gap-2 shadow-xs"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous Card</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {cardsList.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === currentCardIndex ? "w-6 bg-[#F4B6C2]" : "w-2 bg-[#EADCE4] dark:bg-white/[0.12]"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextCard}
                  className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] px-4 py-2.5 text-xs font-medium text-[#2D2A32] dark:text-[#F4F4F5] transition flex items-center gap-2 shadow-xs"
                >
                  <span>Next Card</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* GRID VIEW MODE */}
          {flashcardViewMode === "grid" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {cardsList.map((card, idx) => (
                <div
                  key={card.id}
                  className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-5 flex flex-col justify-between space-y-4 shadow-xs hover:border-[#F4B6C2]/40 transition"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#9A949F] dark:text-[#71717A] mb-2">
                      <span className="font-mono text-[#D99AA9] dark:text-[#F4B6C2]">Card #{idx + 1}</span>
                      <span>{card.category}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#2D2A32] dark:text-[#F4F4F5] mb-3">{card.front}</p>
                    <div className="rounded-xl bg-[#FFF9FB] dark:bg-[#202024] p-3 border border-[#F3E8EE] dark:border-white/[0.06] text-xs text-[#6B6873] dark:text-[#A1A1AA] leading-relaxed">
                      <span className="text-[#82A792] dark:text-[#9ABAA4] font-medium block mb-1">Answer:</span>
                      {card.back}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TOOL 2: QUIZ GENERATOR
         ========================================================================= */}
      {activeTab === "quiz" && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Quiz Header & Live Score Tracker */}
          <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D99AA9] dark:text-[#F4B6C2]">
                Active Recall Assessment 🌸
              </span>
              <h2 className="text-lg font-bold text-[#2D2A32] dark:text-[#F4F4F5] mt-0.5">
                {selectedLecture.title}
              </h2>
              <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">
                Exam simulation based on slide concepts and professor exam traps.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="rounded-xl bg-[#FFF9FB] dark:bg-[#202024] border border-[#F3E8EE] dark:border-[#27272A] px-4 py-2 text-center shadow-xs">
                <span className="text-[10px] text-[#9A949F] dark:text-[#71717A] uppercase block">Score</span>
                <span className="font-mono text-base font-bold text-[#82A792] dark:text-[#9ABAA4]">
                  {correctCount} / {selectedLecture.quiz.length}
                </span>
              </div>

              <button
                onClick={handleResetQuiz}
                className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] p-2.5 text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition shadow-xs"
                title="Reset Quiz"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Question Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {selectedLecture.quiz.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCorrect = isAnswered && selectedAnswers[q.id] === q.answerIndex;
              const isCurrent = idx === currentQuizQuestionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuizQuestionIndex(idx)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition flex items-center gap-1.5 ${
                    isCurrent
                      ? "bg-[#F4B6C2] text-[#18181B] shadow-xs"
                      : isAnswered
                      ? isCorrect
                        ? "bg-[#82A792]/20 dark:bg-[#9ABAA4]/20 text-[#82A792] dark:text-[#9ABAA4] border border-[#82A792]/40 dark:border-[#9ABAA4]/40"
                        : "bg-[#D99AA9]/20 text-[#D99AA9] border border-[#D99AA9]/40"
                      : "bg-white dark:bg-[#202024] text-[#6B6873] dark:text-[#A1A1AA] border border-[#F3E8EE] dark:border-[#27272A]"
                  }`}
                >
                  <span>Q{idx + 1}</span>
                  {isAnswered && (isCorrect ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />)}
                </button>
              );
            })}
          </div>

          {/* Current Question Card */}
          <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#9A949F] dark:text-[#71717A]">
              <span>Question {currentQuizQuestionIndex + 1} of {selectedLecture.quiz.length}</span>
              <span className="text-[#D99AA9] dark:text-[#F4B6C2] font-medium">{currentQuizItem.source}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#2D2A32] dark:text-[#F4F4F5] leading-snug">
              {currentQuizItem.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuizItem.options.map((optionText, optIdx) => {
                const isSelected = selectedAnswers[currentQuizItem.id] === optIdx;
                const hasAnswered = selectedAnswers[currentQuizItem.id] !== undefined;
                const isCorrect = currentQuizItem.answerIndex === optIdx;

                let optionStyle = "bg-[#FFF9FB] dark:bg-[#202024] border-[#F3E8EE] dark:border-[#27272A] text-[#2D2A32] dark:text-[#F4F4F5] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734]";
                if (hasAnswered) {
                  if (isCorrect) {
                    optionStyle = "bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 border-[#82A792] dark:border-[#9ABAA4] text-[#2D2A32] dark:text-[#F4F4F5]";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-[#D99AA9]/15 border-[#D99AA9] text-[#2D2A32] dark:text-[#F4F4F5]";
                  } else {
                    optionStyle = "bg-[#FFF9FB] dark:bg-[#202024] border-[#F3E8EE] dark:border-white/[0.04] text-[#9A949F] dark:text-[#71717A]";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectQuizOption(currentQuizItem.id, optIdx)}
                    className={`w-full text-left rounded-2xl border p-4 text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#F3E8EE] dark:bg-black/20 text-xs font-bold text-[#6B6873] dark:text-[#A1A1AA]">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{optionText}</span>
                    </div>

                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-[#82A792] dark:text-[#9ABAA4] shrink-0" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <X className="h-5 w-5 text-[#D99AA9] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pedagogical Explanation Box */}
            {selectedAnswers[currentQuizItem.id] !== undefined && (
              <div className="rounded-2xl border border-[#F4B6C2]/30 dark:border-[#F4B6C2]/20 bg-[#FFF9FB] dark:bg-[#202024] p-5 space-y-2 text-xs sm:text-sm leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-[#82A792] dark:text-[#9ABAA4]">
                  <Sparkles className="h-4 w-4" />
                  <span>Pedagogical Analysis & Source Proof</span>
                </div>
                <p className="text-[#6B6873] dark:text-[#A1A1AA]">
                  {currentQuizItem.explanation}
                </p>
                <p className="text-[11px] text-[#9A949F] dark:text-[#71717A] pt-1">
                  Grounded in: {currentQuizItem.source}
                </p>
              </div>
            )}

            {/* Navigation Between Quiz Questions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F3E8EE] dark:border-[#27272A]">
              <button
                disabled={currentQuizQuestionIndex === 0}
                onClick={() => setCurrentQuizQuestionIndex((prev) => prev - 1)}
                className="rounded-xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 text-xs font-medium text-[#2D2A32] dark:text-[#F4F4F5] transition flex items-center gap-1.5 shadow-xs"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>

              {currentQuizQuestionIndex < selectedLecture.quiz.length - 1 ? (
                <button
                  onClick={() => setCurrentQuizQuestionIndex((prev) => prev + 1)}
                  className="rounded-xl bg-[#F4B6C2] text-[#18181B] px-4 py-2 text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
                >
                  <span>Next Question</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleResetQuiz}
                  className="rounded-xl bg-[#82A792] dark:bg-[#9ABAA4] text-white dark:text-[#18181B] px-4 py-2 text-xs font-semibold transition shadow-xs"
                >
                  Retake Full Quiz 🌸
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOOL 3: SUMMARY GENERATOR
         ========================================================================= */}
      {activeTab === "summary" && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Mode & Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center rounded-2xl bg-[#FDF2F8] dark:bg-[#18181B] border border-[#F3E8EE] dark:border-[#27272A] p-1">
              <button
                onClick={() => setSummaryMode("full")}
                className={`rounded-xl px-3.5 py-1.5 font-medium transition ${
                  summaryMode === "full"
                    ? "bg-[#F4B6C2] text-[#18181B] font-semibold shadow-xs"
                    : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                }`}
              >
                Comprehensive Study Notes
              </button>
              <button
                onClick={() => setSummaryMode("brief")}
                className={`rounded-xl px-3.5 py-1.5 font-medium transition ${
                  summaryMode === "brief"
                    ? "bg-[#F4B6C2] text-[#18181B] font-semibold shadow-xs"
                    : "text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                }`}
              >
                Executive 3-Minute Scan
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] px-3.5 py-2 text-xs text-[#2D2A32] dark:text-[#F4F4F5] transition flex items-center gap-1.5 shadow-xs"
              >
                {copiedSummary ? <Check className="h-3.5 w-3.5 text-[#82A792] dark:text-[#9ABAA4]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedSummary ? "Copied!" : "Copy Markdown"}</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] px-3.5 py-2 text-xs text-[#2D2A32] dark:text-[#F4F4F5] transition flex items-center gap-1.5 shadow-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Summary Paper View */}
          <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-6 sm:p-10 space-y-6 shadow-sm">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#D99AA9] dark:text-[#F4B6C2]">
                {summaryMode === "brief" ? "Executive 3-Minute Scan" : "Deep Chapter Breakdown 🌸"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5] mt-1">
                {selectedLecture.title}
              </h2>
              <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA] mt-1">{selectedLecture.course}</p>
            </div>

            {/* Formatted Markdown Content */}
            <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-[#4A4650] dark:text-[#A1A1AA] space-y-4 border-t border-[#F3E8EE] dark:border-[#27272A] pt-6 font-sans">
              {summaryMode === "brief" ? selectedLecture.summaryBrief : selectedLecture.summaryFull}
            </div>

            <div className="pt-6 border-t border-[#F3E8EE] dark:border-[#27272A] flex items-center justify-between text-xs text-[#9A949F] dark:text-[#71717A]">
              <span>Synthesized by NVIDIA NIM NeMo Retriever on Nebius GPU</span>
              <span>Verified against 42 course slides 🌸</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOOL 4: KEY POINTS EXTRACTOR
         ========================================================================= */}
      {activeTab === "keypoints" && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D99AA9] dark:text-[#F4B6C2]">
                High-Yield Exam Extraction 🌸
              </span>
              <h2 className="text-lg font-bold text-[#2D2A32] dark:text-[#F4F4F5] mt-0.5">
                Critical Concepts & Professor Traps
              </h2>
              <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">
                Mark items as mastered to track your pre-exam readiness.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FFF9FB] dark:bg-[#202024] border border-[#F3E8EE] dark:border-[#27272A] px-4 py-2 text-center shrink-0 shadow-xs">
              <span className="text-[10px] text-[#9A949F] dark:text-[#71717A] uppercase block">Mastered</span>
              <span className="font-mono text-base font-bold text-[#82A792] dark:text-[#9ABAA4]">
                {masteredPointsCount} / {keyPointsList.length}
              </span>
            </div>
          </div>

          {/* List of High-Yield Key Points */}
          <div className="space-y-3.5">
            {keyPointsList.map((kp) => (
              <div
                key={kp.id}
                onClick={() => handleToggleKeyPoint(kp.id)}
                className={`cursor-pointer rounded-2xl border p-5 transition flex items-start gap-4 shadow-xs ${
                  kp.mastered
                    ? "border-[#82A792]/40 dark:border-[#9ABAA4]/40 bg-[#82A792]/10 dark:bg-[#9ABAA4]/10"
                    : "border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] hover:border-[#F4B6C2]/40"
                }`}
              >
                {/* Checkbox */}
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition ${
                    kp.mastered
                      ? "bg-[#82A792] dark:bg-[#9ABAA4] border-[#82A792] dark:border-[#9ABAA4] text-white dark:text-[#18181B]"
                      : "border-[#F4B6C2]/40 dark:border-[#F4B6C2]/30 bg-[#FFF9FB] dark:bg-[#202024]"
                  }`}
                >
                  {kp.mastered && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#2D2A32] dark:text-[#F4F4F5]">
                      {kp.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-[#D99AA9] dark:text-[#F4B6C2] bg-[#FDF2F8] dark:bg-[#F4B6C2]/15 px-2.5 py-0.5 rounded-full border border-[#F4B6C2]/30">
                        {kp.category}
                      </span>
                      <span className="text-[10px] text-[#D99AA9] dark:text-[#F4B6C2]">
                        {"♥".repeat(kp.examWeight)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B6873] dark:text-[#A1A1AA] leading-relaxed">
                    {kp.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-[#FFF9FB] dark:bg-[#0D0D0E] text-[#2D2A32] dark:text-[#F4F4F5] transition-colors duration-200 flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-1 p-10 text-center text-xs text-[#6B6873] dark:text-[#A1A1AA]">Loading study hub...</div>}>
        <StudyHubContent />
      </Suspense>
      <Footer />
    </div>
  );
}