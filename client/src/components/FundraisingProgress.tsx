/**
 * FundraisingProgress. Full-width section showing campaign goal progress
 * Data is pulled from CMS settings (admin-manageable)
 */
import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { TrendingUp, Users, Target, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { trpc } from "@/lib/trpc";

interface FundraisingProgressProps {
  language: string;
  t: (en: string, od: string) => string;
}

export default function FundraisingProgress({ language, t }: FundraisingProgressProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fetch campaign data from CMS settings
  const { data: settings } = trpc.cms.settings.listPublic.useQuery();

  const getSetting = (key: string, fallback: string) => {
    const found = settings?.find((s: any) => s.settingKey === key);
    return found?.settingValue || fallback;
  };

  const raised = parseInt(getSetting("fundraising_raised", "0"), 10);
  const goal = parseInt(getSetting("fundraising_goal", "3000000"), 10);
  const percentage = goal > 0 ? Math.round((raised / goal) * 100) : 0;
  const donorCount = parseInt(getSetting("fundraising_donors", "0"), 10);
  const daysLeft = parseInt(getSetting("fundraising_days_left", "0"), 10);
  const livesImpacted = parseInt(getSetting("fundraising_lives_impacted", "0"), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Don't render if no real data is set
  if (raised === 0 && donorCount === 0) return null;

  return (
    <section className="py-14 bg-gradient-to-r from-[#FFF8E1] via-white to-[#FFF8E1] border-y border-[#F5A623]/10">
      <div className="container" ref={ref}>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-1">
                  {t("FY 2025-26 CAMPAIGN", "FY 2025-26 ଅଭିଯାନ")}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1A1A1A]">
                  {t("Help us reach our goal", "ଆମ ଲକ୍ଷ୍ୟ ପୂରଣ କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ")}
                </h3>
              </div>
              <Link
                href="/donate"
                className="px-6 py-2.5 bg-[#1A1A1A] text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#111111] transition-colors flex items-center gap-2 rounded-sm"
              >
                {t("CONTRIBUTE", "ଅବଦାନ ଦିଅନ୍ତୁ")} <ArrowRight size={12} />
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-6">
              <div className="h-4 bg-[#FAFAFA] rounded-full overflow-hidden border border-[#F5A623]/15">
                <div
                  className="h-full bg-gradient-to-r from-[#F5A623] via-[#D4B85C] to-[#1A1A1A] rounded-full transition-all duration-2000 ease-out relative"
                  style={{ width: animated ? `${percentage}%` : "0%" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
              {/* Amount labels */}
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[12px] text-[#F5A623] font-bold">
                  ₹{(raised / 100000).toFixed(1)}L {t("raised", "ସଂଗ୍ରହ")}
                </span>
                <span className="font-mono text-[12px] text-[#1A1A1A]/60">
                  {t("Goal:", "ଲକ୍ଷ୍ୟ:")} ₹{(goal / 100000).toFixed(0)}L
                </span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-[#F5A623]/10 shadow-sm">
                <Users size={18} className="text-[#F5A623]" />
                <div>
                  <p className="font-serif text-lg font-bold text-[#1A1A1A]">{donorCount}</p>
                  <p className="font-mono text-[9px] text-[#1A1A1A]/50 tracking-wider uppercase">
                    {t("Donors", "ଦାତା")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-[#F5A623]/10 shadow-sm">
                <Target size={18} className="text-[#F5A623]" />
                <div>
                  <p className="font-serif text-lg font-bold text-[#1A1A1A]">{percentage}%</p>
                  <p className="font-mono text-[9px] text-[#1A1A1A]/50 tracking-wider uppercase">
                    {t("Funded", "ଅର୍ଥାୟିତ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-[#F5A623]/10 shadow-sm">
                <TrendingUp size={18} className="text-[#F5A623]" />
                <div>
                  <p className="font-serif text-lg font-bold text-[#1A1A1A]">{livesImpacted}</p>
                  <p className="font-mono text-[9px] text-[#1A1A1A]/50 tracking-wider uppercase">
                    {t("Lives Impacted", "ପ୍ରଭାବିତ ଜୀବନ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-[#F5A623]/10 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <div>
                  <p className="font-serif text-lg font-bold text-[#1A1A1A]">{daysLeft}</p>
                  <p className="font-mono text-[9px] text-[#1A1A1A]/50 tracking-wider uppercase">
                    {t("Days Left", "ଦିନ ବାକି")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
