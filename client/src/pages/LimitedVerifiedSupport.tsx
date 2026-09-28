import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import {
  BUDGET_PRIORITIES,
  FOUNDATION_PROMISE,
  LIMITED_SUPPORT,
} from "@/data/focusContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const SUPPORT_PAGE_BY_TITLE: Record<string, string> = {
  "Medical emergency support": "/medical-emergency-support",
  "Flood and disaster relief": "/disaster-relief",
  "Animal care and compassion": "/animal-welfare-support",
};

export default function LimitedVerifiedSupport() {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Limited Verified Support | Abhiara Foundation",
          "ସୀମିତ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description="Case-based emergency and compassion support within defined budget limits, after verification and approval."
        url="https://www.abhiarafoundation.org/limited-verified-support"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#FAF4E8] pt-32 pb-20 md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A6100]">
              {t("Exceptional cases only", "କେବଳ ବିଶେଷ ମାମଲା")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">
              {t("Limited Verified Support", "ସୀମିତ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-[#555]">
              {t(
                FOUNDATION_PROMISE,
                "ଶିକ୍ଷା ସହିତ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଅସହାୟ ବୃଦ୍ଧ, ପଶୁ କଲ୍ୟାଣ, ଚିକିତ୍ସା ଜରୁରୀ ସ୍ଥିତି ଓ ବିପର୍ଯ୍ୟୟ ସହାୟତା ପାଇଁ ସୀମିତ ସହାୟତା ଦେଇପାରେ। ଏହା ଉପଲବ୍ଧ ଅର୍ଥ, କ୍ଷେତ୍ର ଯାଞ୍ଚ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।"
              )}
            </p>
            <p className="mt-4 max-w-3xl font-sans text-sm font-semibold text-[#7A4E00]">
              {t(
                "This is not a standing public programme. Support is considered only in exceptional verified cases.",
                "ଏହା କୌଣସି ନିୟମିତ ସାର୍ବଜନିକ କାର୍ଯ୍ୟକ୍ରମ ନୁହେଁ। କେବଳ ଯାଞ୍ଚ ହୋଇଥିବା ବିଶେଷ ମାମଲାରେ ସହାୟତା ବିଚାର କରାଯାଏ।"
              )}
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-5 md:grid-cols-2">
              {LIMITED_SUPPORT.map(item => {
                const href = SUPPORT_PAGE_BY_TITLE[item.titleEn];
                return (
                  <article
                    key={item.titleEn}
                    className="border border-gray-200 p-7"
                  >
                    <h2 className="font-serif text-xl font-bold">
                      {t(item.titleEn, item.titleOd)}
                    </h2>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
                      {t(item.bodyEn, item.bodyOd)}
                    </p>
                    {href && (
                      <Link
                        href={href}
                        className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#8A5700]"
                      >
                        {t("Open this section", "ଏହି ବିଭାଗ ଖୋଲନ୍ତୁ")}
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
            <Link
              href="/other-verified-support"
              className="mt-8 inline-flex items-center gap-2 rounded bg-[#F5A623] px-6 py-3 font-sans text-sm font-bold text-[#1A1A1A]"
            >
              {t(
                "See past records and ground-work photos",
                "ପୁରୁଣା ରେକର୍ଡ ଓ କ୍ଷେତ୍ର କାମର ଫଟୋ ଦେଖନ୍ତୁ"
              )}
              <ArrowRight size={16} />
            </Link>
            <div className="mt-14">
              <h2 className="font-serif text-3xl font-bold">
                {t("Budget priorities", "ବଜେଟ ପ୍ରାଥମିକତା")}
              </h2>
              <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-[#555]">
                {t(
                  "We provide support only after verification, when funds are available and approval is recorded. These ranges guide our budget. They do not guarantee support.",
                  "ସମସ୍ତ ସହାୟତା ଯାଞ୍ଚ, ଉପଲବ୍ଧ ବଜେଟ ଓ ରେକର୍ଡ ଭିତ୍ତିକ ଅନୁମୋଦନ ଉପରେ ନିର୍ଭର କରେ। ଏହି ସୀମା ଆଭ୍ୟନ୍ତରୀଣ ଶୃଙ୍ଖଳା ପାଇଁ ଏବଂ କୌଣସି ନିଶ୍ଚିତ ଅଧିକାର ସୃଷ୍ଟି କରେ ନାହିଁ।"
                )}
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {BUDGET_PRIORITIES.map(item => (
                  <article
                    key={item.share}
                    className="bg-[#111111] p-6 text-white"
                  >
                    <p className="font-serif text-3xl font-bold text-[#F5A623]">
                      {item.share}
                    </p>
                    <h3 className="mt-4 font-serif text-lg font-bold text-white">
                      {t(item.titleEn, item.titleOd)}
                    </h3>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-white/70">
                      {t(item.bodyEn, item.bodyOd)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
