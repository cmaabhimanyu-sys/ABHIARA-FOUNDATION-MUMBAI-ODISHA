import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DonorWall() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-[#1A7F8E] uppercase tracking-widest text-sm font-semibold mb-4">
            Every Name is a Ray of Light
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Donor Wall<span className="text-[#C9A84C]"> of Light</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto mb-6" />
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
            Every person who contributes to Abhiara Foundation is honoured here — permanently and publicly.
            Because generosity deserves to be seen. Because every name on this wall represents a life changed.
          </p>
        </div>
      </section>

      {/* Wall Entries */}
      <section className="py-12 bg-[#080F1C]">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-8 text-center">
            Our Supporters
          </p>

          <div className="space-y-4">
            {/* Founder Entry */}
            <div className="bg-white/5 border border-[#C9A84C]/30 rounded-2xl p-6 flex items-start gap-4 text-left">
              <div className="text-2xl mt-1">✦</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <p className="text-white font-semibold">Abhimanyu Mallik</p>
                  <span className="bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold px-2 py-0.5 rounded-full">Founder</span>
                  <span className="bg-[#1A7F8E]/20 text-[#1A7F8E] text-xs font-semibold px-2 py-0.5 rounded-full">Raisar, Odisha → Mumbai</span>
                </div>
                <p className="text-white/50 text-sm">Founded Abhiara Foundation · Dedicated his life's work to every child and elder in Raisar</p>
                <p className="text-white/30 text-xs mt-1">March 2026</p>
              </div>
            </div>

            {/* Placeholder Entry 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 text-left">
              <div className="text-2xl mt-1 text-white/20">✦</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <p className="text-white/30 font-semibold text-sm italic">Your name could be here</p>
                  <span className="bg-white/5 text-white/20 text-xs px-2 py-0.5 rounded-full">First Donor</span>
                </div>
                <p className="text-white/20 text-sm">Be the first to light up a life. Your name on this wall — permanently.</p>
              </div>
            </div>

            {/* Placeholder Entry 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 text-left">
              <div className="text-2xl mt-1 text-white/20">✦</div>
              <div className="flex-1">
                <p className="text-white/20 text-sm italic">Birthday celebrant · Visited students in Raisar · Coming soon</p>
              </div>
            </div>

            {/* Placeholder Entry 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 text-left">
              <div className="text-2xl mt-1 text-white/20">✦</div>
              <div className="flex-1">
                <p className="text-white/20 text-sm italic">CSR Partner · Funded 100 children · Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-[#0A1628]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-2xl p-8 mb-10">
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-6 text-center">
              How to Join the Wall of Light
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-[#C9A84C] font-bold text-lg mb-2">✦ Donate</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Any donation to Abhiara Foundation earns you a permanent place on this wall — with your name, city, and contribution story.
                </p>
              </div>
              <div>
                <p className="text-[#C9A84C] font-bold text-lg mb-2">✦ Celebrate</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Celebrate your birthday with underprivileged students or the elderly — and your birthday story is added to the wall forever.
                </p>
              </div>
              <div>
                <p className="text-[#C9A84C] font-bold text-lg mb-2">✦ Partner</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  CSR partners are featured prominently on this wall with their company name, logo, and impact statement — visible to every visitor.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Rules */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4 text-center">
              Privacy & Display Rules
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-white/70 text-sm leading-relaxed">
                  <span className="text-[#C9A84C] font-semibold">No financial amounts</span> are ever displayed publicly on this wall. Only name, city, story, and date.
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm leading-relaxed">
                  <span className="text-[#C9A84C] font-semibold">Anonymous donors</span> are honoured as "A Friend of Abhiara" with city and date only.
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm leading-relaxed">
                  <span className="text-[#C9A84C] font-semibold">Birthday celebrants</span> are displayed as: Name · Celebrated birthday with X students · Location · Date.
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm leading-relaxed">
                  <span className="text-[#C9A84C] font-semibold">CSR Partners</span> are displayed as: Company Name · CSR Partner · Impact Statement · Date.
                </p>
              </div>
            </div>
            <p className="text-white/30 text-xs text-center mt-6">
              Names are only displayed with explicit permission of the donor. No mobile numbers or personal contact information is ever shown.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/donate"
              className="inline-block bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A1628] font-bold px-10 py-4 rounded-xl transition-all duration-300 uppercase tracking-wider"
            >
              Add My Name to the Wall →
            </Link>
            <p className="text-white/30 text-xs mt-6">
              Contact us via LinkedIn or WhatsApp to make a contribution and be featured on the Donor Wall of Light.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
