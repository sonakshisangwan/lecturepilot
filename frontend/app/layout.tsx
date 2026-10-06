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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('lecturepilot-theme');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  if (!saved) {
                    try { localStorage.setItem('lecturepilot-theme', theme); } catch (err) {}
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.colorScheme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FFF9FB] dark:bg-[#0D0D0E] text-[#2D2A32] dark:text-[#F4F4F5] antialiased transition-colors duration-250">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}