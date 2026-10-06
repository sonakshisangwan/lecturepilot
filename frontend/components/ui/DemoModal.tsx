"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  Video,
  MessageSquare,
  Brain,
  Layers,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { NvidiaIcon, NebiusIcon } from "./icons/BrandIcons";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "video" | "chat" | "quiz" | "flashcard";

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(1);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "user",
      text: "How does backpropagation relate to the chain rule of calculus?",
    },
    {
      sender: "ai",
      text: "Backpropagation is essentially a recursive application of the chain rule. At each layer, we compute the gradient of the loss with respect to weights by multiplying the incoming upstream gradient by the local gradient of the activation function.",
      timestamp: "Video 22:15",
      slide: "Slide 29",
    },
  ]);
  const [userQuery, setUserQuery] = useState("");

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    const newMsg = { sender: "user", text: userQuery };
    setChatMessages((prev) => [...prev, newMsg]);
    setUserQuery("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `In this lecture (at 18:40), the professor highlights that caching forward activations prevents repeated recomputation during the backward pass.`,
        },
      ]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F3E8EE] dark:border-[#27272A] px-6 py-4 bg-[#FFF9FB] dark:bg-[#141416]">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#202024] text-[#D99AA9] dark:text-[#F4B6C2] border border-[#F4B6C2]/30">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2D2A32] dark:text-[#F4F4F5]">
                  LecturePilot Live Walkthrough: CS 229 Machine Learning 🌸
                </h3>
                <p className="text-xs text-[#6B6873] dark:text-[#A1A1AA]">
                  Stanford University • Optimization & Gradient Descent
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/upload"
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] px-3.5 py-1.5 text-xs font-semibold shadow-xs transition"
              >
                <span>Upload Lecture</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition shadow-xs"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Navigation Bar inside Demo */}
          <div className="flex border-b border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] px-6 py-2 overflow-x-auto gap-2">
            {[
              { id: "chat" as TabType, label: "AI Socratic Chat", icon: MessageSquare },
              { id: "flashcard" as TabType, label: "Flashcards (SM-2)", icon: Layers },
              { id: "quiz" as TabType, label: "Adaptive Quiz", icon: Brain },
              { id: "video" as TabType, label: "Video Sync", icon: Video },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#F4B6C2] text-[#18181B] font-semibold shadow-xs"
                      : "text-[#6B6873] dark:text-[#A1A1AA] hover:bg-white dark:hover:bg-[#202024] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="p-6 max-h-[65vh] overflow-y-auto bg-white dark:bg-[#18181B]">
            {/* TAB 1: AI Chat */}
            {activeTab === "chat" && (
              <div className="flex flex-col h-[380px]">
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 text-xs ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "ai" && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#202024] text-[#D99AA9] dark:text-[#F4B6C2] border border-[#F4B6C2]/30 font-bold">
                          AI
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] rounded-3xl p-3 ${
                          msg.sender === "user"
                            ? "bg-[#F4B6C2] text-[#18181B] font-medium shadow-xs"
                            : "bg-[#FFF9FB] dark:bg-[#202024] text-[#2D2A32] dark:text-[#F4F4F5] border border-[#F3E8EE] dark:border-[#27272A] shadow-xs"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        {msg.timestamp && (
                          <div className="mt-2 pt-2 border-t border-[#F3E8EE] dark:border-[#27272A] flex items-center gap-2">
                            <span className="rounded-md bg-white dark:bg-[#141416] px-2 py-0.5 text-[10px] font-mono text-[#D99AA9] dark:text-[#F4B6C2] border border-[#F4B6C2]/20">
                              {msg.timestamp}
                            </span>
                            <span className="rounded-md bg-white dark:bg-[#141416] px-2 py-0.5 text-[10px] text-[#D99AA9] dark:text-[#E2CCEA] border border-[#F4B6C2]/20">
                              {msg.slide}
                            </span>
                          </div>
                        )}
                      </div>

                      {msg.sender === "user" && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#202024] text-[#2D2A32] dark:text-[#F4F4F5] font-bold border border-[#F4B6C2]/20">
                          U
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendQuery} className="mt-3.5 pt-3 border-t border-[#F3E8EE] dark:border-[#27272A] flex gap-2">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Ask anything about this lecture..."
                    className="flex-1 rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] px-3.5 py-2 text-xs text-[#2D2A32] dark:text-[#F4F4F5] placeholder-[#9A949F] dark:placeholder-[#71717A] focus:outline-none focus:border-[#F4B6C2]"
                  />
                  <button
                    type="submit"
                    className="rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] px-4 py-2 text-xs font-semibold transition shadow-xs"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: Flashcard */}
            {activeTab === "flashcard" && (
              <div className="space-y-4">
                <div
                  onClick={() => setCardFlipped(!cardFlipped)}
                  className="cursor-pointer min-h-[200px] rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] p-6 text-center flex flex-col items-center justify-center transition hover:border-[#F4B6C2]/40 select-none shadow-xs"
                >
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D99AA9] dark:text-[#F4B6C2] mb-2">
                    <RotateCcw className="h-3 w-3" />
                    {cardFlipped ? "Answer (Click to flip)" : "Question (Click to reveal)"}
                  </span>

                  <p className="text-sm sm:text-base font-semibold text-[#2D2A32] dark:text-[#F4F4F5] max-w-md">
                    {cardFlipped
                      ? "Vanishing gradients occur when repeatedly multiplying small derivatives in deep layers. Mitigated by ReLU activations and Residual Connections."
                      : "What is the Vanishing Gradient Problem and what two architectures mitigate it?"}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-center">
                  <button className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] py-2 text-[#D99AA9] hover:bg-[#D99AA9]/15 transition shadow-xs">
                    Again (&lt;1m)
                  </button>
                  <button className="rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#202024] py-2 text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5] transition shadow-xs">
                    Hard (10m)
                  </button>
                  <button className="rounded-2xl border border-[#F4B6C2]/40 bg-[#F4B6C2]/15 dark:bg-[#F4B6C2]/20 py-2 text-[#D99AA9] dark:text-[#F4B6C2] hover:bg-[#F4B6C2]/30 transition shadow-xs">
                    Good (1d)
                  </button>
                  <button className="rounded-2xl border border-[#82A792]/40 dark:border-[#9ABAA4]/30 bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 py-2 text-[#82A792] dark:text-[#9ABAA4] hover:bg-[#82A792]/25 dark:hover:bg-[#9ABAA4]/25 transition shadow-xs">
                    Easy (4d)
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Quiz */}
            {activeTab === "quiz" && (
              <div className="space-y-4">
                <div className="rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#6B6873] dark:text-[#A1A1AA] mb-3">
                    <span className="font-semibold text-[#D99AA9] dark:text-[#F4B6C2]">Question 1 of 3</span>
                    <span>Optimization</span>
                  </div>

                  <h4 className="text-sm font-semibold text-[#2D2A32] dark:text-[#F4F4F5]">
                    Why does momentum help gradient descent escape shallow saddle points and ravines?
                  </h4>

                  <div className="mt-4 space-y-2">
                    {[
                      { id: 0, text: "It dynamically adjusts the learning rate using second-order Hessian computation.", correct: false },
                      { id: 1, text: "It accumulates velocity in directions of persistent gradient and dampens oscillations.", correct: true },
                      { id: 2, text: "It randomly samples minibatch gradients to inject stochastic noise.", correct: false },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setQuizAnswer(opt.id)}
                        className={`w-full text-left rounded-2xl p-3 text-xs font-medium transition flex items-center justify-between shadow-xs ${
                          quizAnswer === opt.id
                            ? opt.correct
                              ? "bg-[#82A792]/15 dark:bg-[#9ABAA4]/20 border border-[#82A792] dark:border-[#9ABAA4] text-[#2D2A32] dark:text-[#F4F4F5]"
                              : "bg-[#D99AA9]/15 border border-[#D99AA9] text-[#2D2A32] dark:text-[#F4F4F5]"
                            : "border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#6B6873] dark:text-[#A1A1AA] hover:text-[#2D2A32] dark:hover:text-[#F4F4F5]"
                        }`}
                      >
                        <span>{opt.text}</span>
                        {quizAnswer === opt.id && opt.correct && (
                          <CheckCircle2 className="h-4 w-4 text-[#82A792] dark:text-[#9ABAA4] shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>

                  {quizAnswer === 1 && (
                    <div className="mt-3.5 rounded-2xl bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 border border-[#82A792]/30 dark:border-[#9ABAA4]/35 p-3 text-xs text-[#2D2A32] dark:text-[#F4F4F5]">
                      <strong>Correct!</strong> As explained at 34:10, velocity vectors accumulate in consistent slope directions while canceling perpendicular oscillations.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: Video Sync */}
            {activeTab === "video" && (
              <div className="space-y-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#141416] flex flex-col items-center justify-center p-6 text-center shadow-xs">
                  <p className="text-xs uppercase tracking-widest text-[#D99AA9] dark:text-[#F4B6C2] font-semibold">
                    Lecture Slide Preview
                  </p>
                  <p className="mt-3 text-sm font-mono text-[#2D2A32] dark:text-[#F4F4F5]">
                    dL/dw = (dL/dy) * (dy/dz) * (dz/dw)
                  </p>
                  <p className="mt-2 text-xs text-[#6B6873] dark:text-[#A1A1AA]">
                    Chain Rule Derivation • Synced to 22:15
                  </p>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] shadow-md hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-[#F3E8EE] dark:border-[#27272A] px-6 py-3.5 bg-[#FFF9FB] dark:bg-[#141416] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B6873] dark:text-[#A1A1AA]">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[#82A792] dark:text-[#9ABAA4] font-medium">
                <NvidiaIcon className="h-3 w-3" />
                NVIDIA NIM
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#D99AA9] dark:text-[#F4B6C2] font-medium">
                <NebiusIcon className="h-3 w-3" />
                Nebius Cloud
              </span>
            </div>
            <Link
              href="/upload"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] px-4 py-2 text-xs font-semibold shadow-xs transition"
            >
              <span>Start Free with Your Slides</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
