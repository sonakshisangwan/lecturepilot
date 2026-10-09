"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen bg-[#FFF9FB] dark:bg-[#0D0D0E] text-[#2D2A32] dark:text-[#F4F4F5] transition-colors duration-200 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto flex w-full max-w-md items-center justify-center px-5 py-12">
        <div className="w-full rounded-3xl border border-[#F3E8EE] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-8 shadow-xl space-y-6">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-[#202024] border border-[#F4B6C2]/35 text-[#D99AA9] dark:text-[#F4B6C2] shadow-xs">
              <BookOpen className="h-6 w-6" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#2D2A32] dark:text-[#F4F4F5]">Welcome back 🌸</h1>
            <p className="mt-1.5 text-xs text-[#6B6873] dark:text-[#A1A1AA]">
              Sign in to continue your peaceful study session.
            </p>
          </div>

          <form
  onSubmit={async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      router.push("/dashboard");
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#6B6873] dark:text-[#A1A1AA]">Student Email</label>
              <input
                type="email"
                 value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Enter your email"
                className="w-full rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] px-4 py-3 text-xs text-[#2D2A32] dark:text-[#F4F4F5] placeholder-[#9A949F] dark:placeholder-[#71717A] outline-none transition focus:border-[#F4B6C2]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#6B6873] dark:text-[#A1A1AA]">Password</label>
              <input
                type="password"
                value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Enter your password"
                className="w-full rounded-2xl border border-[#F3E8EE] dark:border-[#27272A] bg-[#FFF9FB] dark:bg-[#202024] px-4 py-3 text-xs text-[#2D2A32] dark:text-[#F4F4F5] placeholder-[#9A949F] dark:placeholder-[#71717A] outline-none transition focus:border-[#F4B6C2]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#F4B6C2] hover:bg-[#F8CAD4] text-[#18181B] py-3 text-xs font-semibold transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>
  {loading ? "Signing In..." : "Sign In to LecturePilot"}
</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="pt-2 border-t border-[#F3E8EE] dark:border-[#27272A] text-center text-xs text-[#9A949F] dark:text-[#71717A]">
            <span>Don&apos;t have an account? </span>
            <Link href="/upload" className="text-[#D99AA9] dark:text-[#F4B6C2] font-semibold hover:underline">
              Try guest workspace
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}