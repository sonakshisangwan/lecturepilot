"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import {
  MessageSquare,
  Sparkles,
  Send,
  FileText,
  Video,
  ExternalLink,
  Copy,
  Check,
  BookmarkPlus,
  RefreshCw,
  ChevronDown,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { MOCK_LECTURES } from "@/lib/mockLectures";
import { ChatMessage, Citation, LectureData } from "@/types/study";
import { NvidiaIcon, NebiusIcon } from "@/components/ui/icons/BrandIcons";

export default function ChatPage() {
  const [selectedLecture, setSelectedLecture] = useState<LectureData>(MOCK_LECTURES[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(selectedLecture.initialChat);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tutorMode, setTutorMode] = useState<"direct" | "socratic">("direct");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedFlashcardNotice, setSavedFlashcardNotice] = useState<string | null>(null);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested Prompts explicitly specified in prompt:
  // - Summarize this lecture
  // - Explain this simply
  // - Make quiz questions
  // - Give important points
  const suggestedPrompts = [
    { label: "Summarize this lecture", query: "Can you summarize the main takeaways of this lecture in 4 clear points?" },
    { label: "Explain this simply", query: "Explain the core concept like I'm a beginner with an intuitive real-world analogy." },
    { label: "Make quiz questions", query: "Generate 2 tricky exam-style multiple-choice questions from this lecture with answer explanations." },
    { label: "Give important points", query: "Give me the most high-yield exam points, formulas, and common professor traps." },
  ];

  useEffect(() => {
    setMessages(selectedLecture.initialChat);
  }, [selectedLecture]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Simulate intelligent contextual response based on query
    setTimeout(() => {
      let aiResponseText = "";
      let citations: Citation[] = [];
      let followUps: string[] = [];

      const lower = text.toLowerCase();
      if (lower.includes("summarize") || lower.includes("summary")) {
        aiResponseText = `Here is the high-yield executive summary for **${selectedLecture.title}** 🌸:\n\n1. **Core Problem**: Finding optimal parameters $\\theta^*$ where gradient $\\nabla J(\\theta) = 0$ across high-dimensional parameter spaces.\n2. **First-Order vs Second-Order**: SGD is $O(n)$ per step but sensitive to learning rate; Newton-Raphson is $O(n^3)$ due to Hessian inversion $H^{-1}$.\n3. **Momentum**: Polyak momentum accelerates consistent directions while canceling perpendicular oscillations in ravines.\n4. **Critical Stability Criterion**: Learning rate must stay bounded $\\alpha < 2/\\lambda_{max}$ to prevent divergence.`;
        citations = [
          { label: "Slide 4: Overview", page: 4, excerpt: "Summary of iterative optimization algorithms for convex and non-convex losses." },
          { label: "Slide 22: Summary Table", page: 22, excerpt: "Computational complexity comparisons: BGD, SGD, and Newton-Raphson." },
        ];
        followUps = ["Show me the Polyak Momentum update formula", "Generate an exam quiz on this"];
      } else if (lower.includes("explain this simply") || lower.includes("beginner") || lower.includes("analogy")) {
        aiResponseText = tutorMode === "socratic"
          ? `Imagine you are blindfolded on a foggy mountain and want to reach the bottom of the valley. With each step, you feel the slope of the ground under your boots and take a step downhill. That is **Gradient Descent**.\n\nNow, let me ask you: *What happens if your step size (learning rate) is 100 feet long instead of 2 feet? How would that affect reaching the valley?*`
          : `Think of Gradient Descent as a gentle marble rolling down a smooth bowl ✨:\n\n- The height of the bowl is your **Loss/Error** (you want it at the lowest point).\n- The steepness of the surface at the marble's position is the **Gradient**.\n- The size of each nudge downhill is your **Learning Rate**.\n- If the learning rate is too large, the marble flies out of the bowl! If it's too small, it takes forever to roll down.`;
        citations = [
          { label: "Slide 8: Geometric Intuition", page: 8, excerpt: "Visualizing cost function contours and downhill gradient vectors." },
        ];
        followUps = ["What is the mathematical definition of learning rate annealing?", "Make quiz questions"];
      } else if (lower.includes("quiz") || lower.includes("questions")) {
        aiResponseText = `Here are 2 high-yield exam practice questions based on this lecture 🌸:\n\n**Question 1**: What happens to batch gradient descent convergence if the condition number $\\kappa = \\lambda_{max} / \\lambda_{min}$ of the Hessian is very large ($> 10^4$)?\n*Answer*: The loss surface forms an elongated ravine, causing severe oscillations perpendicular to the minimum. Momentum is required to dampen these oscillations.\n\n**Question 2**: True or False: Newton's method is guaranteed to decrease loss on non-convex surfaces without step adjustment.\n*Answer*: **False**. In non-convex surfaces, negative eigenvalues cause Newton's method to jump toward saddle points or local maxima.`;
        citations = [
          { label: "Slide 18: Condition Numbers", page: 18, excerpt: "Ravine dynamics and condition numbers of quadratic approximations." },
          { label: "Slide 31: Non-Curvature", page: 31, excerpt: "Indefinite Hessians and saddle point attraction in multi-layer architectures." },
        ];
        followUps = ["Generate 5 more quiz questions", "Summarize this lecture"];
      } else if (lower.includes("important points") || lower.includes("key points") || lower.includes("takeaway")) {
        aiResponseText = `Here are the top exam-critical key points you must memorize for **${selectedLecture.title}** 🌸:\n\n⭐ **1. Learning Rate Bounds**: $\\alpha < 2/\\lambda_{max}(H)$ ensures spectral radius $\\rho(I - \\alpha H) < 1$.\n⭐ **2. Polyak vs Nesterov**: Nesterov calculates gradient after applying momentum nudge (look-ahead step), providing faster convergence for smooth convex functions ($O(1/k^2)$ vs $O(1/k)$).\n⭐ **3. Mini-Batch Variance**: Mini-batch gradient has variance inversely proportional to batch size $B$: $\\text{Var}(\\nabla J_B) \\propto 1/B$.\n⭐ **4. Common Trap**: Learning rate decay that is too aggressive ($O(1/k^2)$) can freeze optimization before reaching local minimum.`;
        citations = [
          { label: "Slide 12: Learning Rate Bounds", page: 12, excerpt: "Eigenvalue upper limits and numerical stability conditions." },
          { label: "Slide 26: Nesterov Look-Ahead", page: 26, excerpt: "Nesterov Accelerated Gradient formulation and convergence rates." },
        ];
        followUps = ["What is the difference between AdaGrad and Adam?", "Take adaptive quiz"];
      } else {
        aiResponseText = `Regarding **"${text}"** in **${selectedLecture.title}** 🌸:\n\nAccording to Slide 14 and the corresponding lecture audio recording (at 18:42), this relates directly to how the optimizer navigates steep curvature ravines. When the condition number $\\kappa = \\lambda_{max}/\\lambda_{min}$ is high, standard steepest descent oscillates excessively across the steep walls rather than moving along the shallow floor.\n\nWould you like me to show you the step-by-step mathematical proof or explain it with an intuitive diagram?`;
        citations = [
          { label: "Slide 14: Ravine Curvature", page: 14, excerpt: "Eigenvector decomposition along ill-conditioned loss surfaces." },
          { label: "Audio 18:42", excerpt: "Professor explains why naive SGD wastes 90% of compute bouncing between ravine walls." },
        ];
        followUps = ["Show mathematical proof", "Explain this simply", "Make quiz questions"];
      }

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        citations,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedFollowUps: followUps,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 850);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToFlashcards = (text: string) => {
    setSavedFlashcardNotice("Card saved to Flashcards deck! 🌸");
    setTimeout(() => setSavedFlashcardNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] dark:bg-[#121014] text-[#2D2A32] dark:text-[#FAF8FA] transition-colors duration-200 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col">
        
        {/* Top Header & Lecture Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#F3E8EE] dark:border-[#2C2630]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#221F27] border border-[#F4B6C2]/35 text-[#D99AA9] dark:text-[#F4B6C2] shadow-xs">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[#2D2A32] dark:text-[#FAF8FA]">
                  AI Socratic Tutor 🌸
                </h1>
                <span className="rounded-full bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 border border-[#82A792]/30 dark:border-[#9ABAA4]/30 text-[#82A792] dark:text-[#9ABAA4] px-2 py-0.5 text-[10px] font-medium">
                  RAG Grounded
                </span>
              </div>
              <p className="text-xs text-[#6B6873] dark:text-[#C8BAC3]">
                Answers grounded in exact course slide numbers & audio timestamps
              </p>
            </div>
          </div>

          {/* Right Controls: Lecture Dropdown & Tutor Mode */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Lecture Selector */}
            <div className="relative">
              <select
                value={selectedLecture.id}
                onChange={(e) => {
                  const found = MOCK_LECTURES.find((l) => l.id === e.target.value);
                  if (found) setSelectedLecture(found);
                }}
                className="appearance-none rounded-2xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#221F27] px-3.5 py-2 pr-8 text-xs font-medium text-[#2D2A32] dark:text-[#FAF8FA] focus:outline-none focus:border-[#F4B6C2] shadow-xs"
              >
                {MOCK_LECTURES.map((l) => (
                  <option key={l.id} value={l.id} className="bg-white dark:bg-[#221F27] text-[#2D2A32] dark:text-[#FAF8FA]">
                    {l.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-[#9A949F] dark:text-[#8E8691] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Socratic Mode Toggle */}
            <div className="flex items-center rounded-2xl bg-[#FDF2F8] dark:bg-[#221F27] border border-[#F3E8EE] dark:border-[#2C2630] p-1 text-xs">
              <button
                onClick={() => setTutorMode("direct")}
                className={`rounded-xl px-2.5 py-1 text-xs font-medium transition ${
                  tutorMode === "direct"
                    ? "bg-[#F4B6C2] text-[#1F1A23] font-semibold shadow-xs"
                    : "text-[#6B6873] dark:text-[#C8BAC3] hover:text-[#2D2A32] dark:hover:text-[#FAF8FA]"
                }`}
              >
                Direct
              </button>
              <button
                onClick={() => setTutorMode("socratic")}
                className={`rounded-xl px-2.5 py-1 text-xs font-medium transition ${
                  tutorMode === "socratic"
                    ? "bg-[#F4B6C2] text-[#1F1A23] font-semibold shadow-xs"
                    : "text-[#6B6873] dark:text-[#C8BAC3] hover:text-[#2D2A32] dark:hover:text-[#FAF8FA]"
                }`}
              >
                Socratic
              </button>
            </div>

            <Link
              href="/study"
              className="rounded-2xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#221F27] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] px-3 py-2 text-xs font-medium text-[#D99AA9] dark:text-[#F4B6C2] transition shadow-xs"
            >
              Study Tools Hub →
            </Link>
          </div>
        </div>

        {/* Saved to Flashcards Alert Banner */}
        {savedFlashcardNotice && (
          <div className="mb-4 rounded-2xl bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 border border-[#82A792]/30 dark:border-[#9ABAA4]/30 px-4 py-2 text-xs text-[#82A792] dark:text-[#9ABAA4] flex items-center gap-2">
            <Check className="h-3.5 w-3.5" />
            <span>{savedFlashcardNotice}</span>
          </div>
        )}

        {/* Main Chat Layout: Left Info Drawer & Chat Window */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[540px]">
          
          {/* Left Context Column */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col justify-between rounded-3xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] p-5 space-y-4 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9A949F] dark:text-[#8E8691]">
                  Active Document
                </span>
                <span className="text-[10px] text-[#82A792] dark:text-[#9ABAA4] bg-[#82A792]/15 dark:bg-[#9ABAA4]/15 px-2 py-0.5 rounded-full border border-[#82A792]/30 dark:border-[#9ABAA4]/30 font-medium">
                  Indexed
                </span>
              </div>

              <h2 className="text-sm font-bold text-[#2D2A32] dark:text-[#FAF8FA] leading-snug">
                {selectedLecture.title}
              </h2>
              <p className="text-xs text-[#6B6873] dark:text-[#C8BAC3] mt-1">{selectedLecture.course}</p>

              <div className="mt-4 pt-3 border-t border-[#F3E8EE] dark:border-[#2C2630] space-y-2 text-xs text-[#6B6873] dark:text-[#C8BAC3]">
                <div className="flex justify-between">
                  <span>Pages / Duration:</span>
                  <span className="text-[#2D2A32] dark:text-[#FAF8FA] font-mono">{selectedLecture.pages} slides</span>
                </div>
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span className="text-[#2D2A32] dark:text-[#FAF8FA] font-mono">{selectedLecture.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Audio Sync:</span>
                  <span className="text-[#82A792] dark:text-[#9ABAA4] font-medium">{selectedLecture.duration}</span>
                </div>
              </div>

              {/* Extracted Key Topics */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-[#2D2A32] dark:text-[#FAF8FA] mb-2">Core Concepts Identified:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLecture.topics.map((topic) => (
                    <span
                      key={topic}
                      onClick={() => handleSendMessage(`Explain ${topic} in detail based on this lecture.`)}
                      className="cursor-pointer text-[10px] rounded-xl bg-[#FFF9FB] dark:bg-[#221F27] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] text-[#6B6873] dark:text-[#C8BAC3] hover:text-[#D99AA9] dark:hover:text-[#F4B6C2] border border-[#F3E8EE] dark:border-[#2C2630] px-2.5 py-1 transition"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hardware Acceleration info */}
            <div className="pt-4 border-t border-[#F3E8EE] dark:border-[#2C2630] text-[11px] text-[#9A949F] dark:text-[#8E8691] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#82A792] dark:text-[#9ABAA4] font-medium">
                <NvidiaIcon className="h-3 w-3" />
                <span>NVIDIA NIM NeMo Retriever</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#D99AA9] dark:text-[#F4B6C2] font-medium">
                <NebiusIcon className="h-3 w-3" />
                <span>Nebius H100 Cluster</span>
              </div>
            </div>
          </aside>

          {/* Central Chat Panel */}
          <div className="lg:col-span-9 flex flex-col rounded-3xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] overflow-hidden shadow-sm">
            
            {/* Chat Message Stream */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 max-h-[580px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 text-xs sm:text-sm ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#221F27] border border-[#F4B6C2]/30 text-[#D99AA9] dark:text-[#F4B6C2] font-bold">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-3xl p-4 sm:p-5 space-y-3 ${
                      msg.sender === "user"
                        ? "bg-[#F4B6C2] text-[#1F1A23] font-medium shadow-xs"
                        : "bg-[#FFF9FB] dark:bg-[#221F27] text-[#2D2A32] dark:text-[#FAF8FA] border border-[#F3E8EE] dark:border-[#2C2630] shadow-xs"
                    }`}
                  >
                    {/* Message Body */}
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </div>

                    {/* Grounded Citation Badges */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="pt-2 border-t border-[#F3E8EE] dark:border-[#2C2630] space-y-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9A949F] dark:text-[#8E8691]">
                          Verified Lecture Sources:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {msg.citations.map((c, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveCitation(c)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-[#17141A] hover:bg-[#FDF2F8] dark:hover:bg-[#201A23] border border-[#F4B6C2]/30 dark:border-[#F4B6C2]/20 px-2.5 py-1 text-[11px] text-[#D99AA9] dark:text-[#F4B6C2] transition shadow-xs"
                            >
                              {c.page ? <FileText className="h-3 w-3" /> : <Video className="h-3 w-3" />}
                              <span>{c.label}</span>
                              <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Follow-up question suggestion pills */}
                    {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                      <div className="pt-2 border-t border-[#F3E8EE] dark:border-[#2C2630] flex flex-wrap gap-1.5">
                        <span className="text-[10px] text-[#9A949F] dark:text-[#8E8691] self-center">Follow-up:</span>
                        {msg.suggestedFollowUps.map((fu, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(fu)}
                            className="rounded-full bg-white dark:bg-[#17141A] hover:bg-[#FDF2F8] dark:hover:bg-[#201A23] border border-[#F3E8EE] dark:border-[#2C2630] px-3 py-1 text-[11px] text-[#6B6873] dark:text-[#C8BAC3] hover:text-[#2D2A32] dark:hover:text-[#FAF8FA] transition"
                          >
                            {fu}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Footer inside AI bubble: Copy & Save */}
                    {msg.sender === "ai" && (
                      <div className="pt-1 flex items-center justify-between text-[11px] text-[#9A949F] dark:text-[#8E8691]">
                        <span>{msg.timestamp}</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="hover:text-[#2D2A32] dark:hover:text-[#FAF8FA] transition flex items-center gap-1"
                            title="Copy text"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="h-3 w-3 text-[#82A792] dark:text-[#9ABAA4]" />
                                <span className="text-[#82A792] dark:text-[#9ABAA4]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleSaveToFlashcards(msg.text)}
                            className="hover:text-[#D99AA9] dark:hover:text-[#F4B6C2] transition flex items-center gap-1"
                            title="Save as Flashcard"
                          >
                            <BookmarkPlus className="h-3 w-3" />
                            <span>Save to Flashcards</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#221F27] text-[#2D2A32] dark:text-[#FAF8FA] border border-[#F4B6C2]/30 font-bold text-xs">
                      You
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2.5 text-xs text-[#6B6873] dark:text-[#C8BAC3]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#221F27] text-[#F4B6C2]">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className="rounded-2xl bg-[#FFF9FB] dark:bg-[#221F27] px-4 py-2.5 border border-[#F3E8EE] dark:border-[#2C2630] text-xs text-[#6B6873] dark:text-[#C8BAC3]">
                    LecturePilot is referencing course slides & synthesizing a cute response 🌸
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Strip (above input) */}
            <div className="px-4 sm:px-6 py-2.5 bg-[#FFF9FB] dark:bg-[#17151A] border-t border-[#F3E8EE] dark:border-[#2C2630] flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9A949F] dark:text-[#8E8691] whitespace-nowrap">
                Prompts:
              </span>
              {suggestedPrompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSendMessage(p.query)}
                  className="rounded-full bg-white dark:bg-[#221F27] hover:bg-[#FDF2F8] dark:hover:bg-[#2E2734] text-[#6B6873] dark:text-[#C8BAC3] hover:text-[#2D2A32] dark:hover:text-[#FAF8FA] border border-[#F3E8EE] dark:border-[#2C2630] px-3 py-1 text-xs whitespace-nowrap transition shadow-xs"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 sm:p-4 bg-[#FFF9FB] dark:bg-[#17151A] border-t border-[#F3E8EE] dark:border-[#2C2630]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ask a question about ${selectedLecture.title}...`}
                  className="flex-1 rounded-2xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#221F27] px-4 py-3 text-xs sm:text-sm text-[#2D2A32] dark:text-[#FAF8FA] placeholder-[#9A949F] dark:placeholder-[#8E8691] focus:outline-none focus:border-[#F4B6C2]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] disabled:opacity-40 disabled:cursor-not-allowed text-[#1F1A23] px-5 py-3 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-xs"
                >
                  <span>Send</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Citation Excerpt Modal Preview */}
        {activeCitation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-lg rounded-3xl border border-[#F3E8EE] dark:border-[#2C2630] bg-white dark:bg-[#1A181E] p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3E8EE] dark:border-[#2C2630]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D99AA9] dark:text-[#F4B6C2]">
                  {activeCitation.page ? <FileText className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  <span>{activeCitation.label}</span>
                </div>
                <button
                  onClick={() => setActiveCitation(null)}
                  className="text-xs text-[#6B6873] dark:text-[#C8BAC3] hover:text-[#2D2A32] dark:hover:text-[#FAF8FA]"
                >
                  Close
                </button>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#9A949F] dark:text-[#8E8691] uppercase tracking-wider mb-1.5">
                  Verbatim Source Excerpt:
                </p>
                <div className="rounded-2xl bg-[#FFF9FB] dark:bg-[#17141A] border border-[#F3E8EE] dark:border-[#2C2630] p-4 text-xs sm:text-sm text-[#2D2A32] dark:text-[#FAF8FA] leading-relaxed italic">
                  &ldquo;{activeCitation.excerpt}&rdquo;
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveCitation(null)}
                  className="rounded-xl bg-[#F4B6C2] text-[#1F1A23] px-4 py-1.5 text-xs font-semibold shadow-xs"
                >
                  Understood 🌸
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
