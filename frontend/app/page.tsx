import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
    </main>
  );
}