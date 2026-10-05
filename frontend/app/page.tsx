import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Features from "@/components/ui/Features";
import HowItWorks from "@/components/ui/HowItWorks";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1E1B22] text-[#F7F4F5]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks/>
      <Footer/>
    </main>
  );
}