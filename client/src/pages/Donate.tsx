import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Donate() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-[#1A7F8E] uppercase tracking-widest text-sm font-semibold mb-4">Support Our Mission</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Help Us Build a <span className="text-[#C9A84C]">Fearless</span> Future
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto mb-8" />
          <p className="text-white/70 text-lg leading-relaxed mb-12">
            Every contribution to Abhiara Foundation goes directly towards 
            education for underprivileged children and dignity for the elderly — 
            village by village, life by life.
          </p>

          <div className="bg-white/5 border border-[#C9A84C]/30 rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-[#C9A84C] text-xl font-semibold mb-6 text-center">To Donate, Please Contact Us Directly</h2>
            <div className="flex flex-col items-center gap-4">
              <a
                href="https://www.linkedin.com/in/abhimanyu-mallik/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 w-full max-w-sm justify-center"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn — Abhimanyu Mallik
              </a>
              <p className="text-white/50 text-sm text-center">Founder & Director · Abhiara Foundation</p>
            </div>
          </div>

          <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-8 text-left space-y-4">
            <h3 className="text-red-400 font-semibold text-lg text-center mb-4">Important Notice</h3>
            <div className="flex gap-3">
              <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-white">Abhiara Foundation does not accept cash donations.</strong> All contributions must be made through proper banking channels — NEFT, RTGS, cheque, or online transfer — to ensure full transparency and accountability.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-white">We do not work with agents or intermediaries.</strong> Abhiara Foundation does not authorise any individual or organisation to collect donations on our behalf or pay any commission in exchange for donations.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-white">Do not expect cash back against your donation</strong> to claim income tax benefits. Donations must be made transparently through banking channels to qualify for 80G deduction under the Income Tax Act.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
              <p className="text-white/80 text-sm leading-relaxed">
                Anyone approaching you claiming to represent Abhiara Foundation for cash collection is <strong className="text-white">not authorised</strong>. Please report such instances directly to us via LinkedIn.
              </p>
            </div>
          </div>

          <p className="text-white/40 text-xs mt-8">
            Abhiara Foundation · Section 8 Company · Not-for-Profit · Odisha · Pan India
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
