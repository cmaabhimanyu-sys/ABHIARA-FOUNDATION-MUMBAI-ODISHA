/*
 * Abhiara Foundation — 404 Page
 * Design: "Dawn Breaking" — Navy background with gold accents
 */
import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-navy relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 container text-center py-32">
          <p className="font-serif text-[120px] md:text-[180px] font-bold text-gold/15 leading-none select-none">
            404
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white -mt-8 mb-4">
            Page Not Found
          </h1>
          <p className="font-sans text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
            The page you are looking for does not exist. It may have been moved, or the link may be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-colors flex items-center gap-2"
            >
              <Home size={16} /> Go Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white/20 text-white/70 font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:border-gold/50 hover:text-gold transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
