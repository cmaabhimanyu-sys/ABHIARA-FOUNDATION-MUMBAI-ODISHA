import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-[#0A1628] pt-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/5 blur-[120px] pointer-events-none" />
        <div className="relative z-10 text-center px-4">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">
            PAGE NOT FOUND
          </p>
          <h1 className="font-serif text-[120px] md:text-[180px] font-bold text-[#C9A84C]/10 leading-none select-none">
            404
          </h1>
          <p className="font-serif text-3xl md:text-4xl font-bold text-white -mt-8 mb-4">
            Page Not Found
          </p>
          <p className="font-sans text-[15px] text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors"
          >
            BACK TO HOME <ArrowRight size={12} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
