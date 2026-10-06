import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: "LecturePilot | AI-Powered Learning Platform",
  description: "Learn faster, not harder. Upload lecture videos, PDFs, and notes. Chat with study material, generate adaptive quizzes, spaced repetition flashcards, and grounded summaries with AI.",
  keywords: [
    "LecturePilot",
    "AI study assistant",
    "lecture transcription",
    "active recall",
    "spaced repetition",
    "Anki export",
    "Socratic AI tutor",
    "study tool",
  ],
  authors: [{ name: "LecturePilot Team" }],
  openGraph: {
    title: "LecturePilot — Learn Faster. Not Harder.",
    description: "Upload lecture videos, PDFs and notes. Chat with your study material, generate quizzes, flashcards and summaries powered by AI.",
    siteName: "LecturePilot",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF9FB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-[#FFF9FB] dark:bg-[#121014] text-[#2D2A32] dark:text-[#FAF8FA] antialiased transition-colors duration-250">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}