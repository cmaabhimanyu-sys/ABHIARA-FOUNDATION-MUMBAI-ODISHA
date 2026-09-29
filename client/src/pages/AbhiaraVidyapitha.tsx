import { useEffect } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  HeartPulse,
  Home,
  Laptop,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { FUTURE_INITIATIVES } from "@/data/focusContent";

export default function AbhiaraVidyapitha() {
  const { t } = useLanguage();
  const icons = [BookOpen, Home, BriefcaseBusiness, Laptop, HeartPulse];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A]">
      <SEO
        title={t(
          "Vision and Upcoming Initiatives | Abhiara Foundation",
          "ଦୃଷ୍ଟିକୋଣ ଓ ଆଗାମୀ ପରିକଳ୍ପନା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Abhiara Foundation's future vision for a school, an elder care home, a livelihood centre, digital learning with AI basics, and partner-led wellness activities.",
          "ସ୍କୁଲ, ବୃଦ୍ଧ ସେବା ଗୃହ, ଜୀବିକା କେନ୍ଦ୍ର, AI ମୂଳ ଜ୍ଞାନ ସହ ଡିଜିଟାଲ ଶିକ୍ଷା ଓ ସହଯୋଗୀ ଭିତ୍ତିକ ସୁସ୍ଥତା କାମ ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଭବିଷ୍ୟତ ଦୃଷ୍ଟିକୋଣ।"
        )}
        url="https://www.abhiarafoundation.org/abhiara-vidyapitha"
      />
      <Navbar />

      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="container max-w-5xl">
            <span className="inline-flex rounded-full bg-[#F5A623] px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A]">
              {t(
                "Future plans, not current programmes",
                "ଭବିଷ୍ୟତ ପରିକଳ୍ପନା, ବର୍ତ୍ତମାନ କାର୍ଯ୍ୟକ୍ରମ ନୁହେଁ"
              )}
            </span>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              Abhiara Vidyapitha
            </p>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
              {t(
                "Vision and Upcoming Initiatives",
                "ଦୃଷ୍ଟିକୋଣ ଓ ଆଗାମୀ ପରିକଳ୍ପନା"
              )}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
              {t(
                "Abhiara Vidyapitha is Abhiara Foundation's plan for the future. It brings together a school for children, a home for elders, a livelihood centre for adults, digital learning with AI basics, and partner-led wellness activities.",
                "ଅଭିଆରା ବିଦ୍ୟାପୀଠ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଭବିଷ୍ୟତ ପରିକଳ୍ପନା। ଏଥିରେ ଶିଶୁଙ୍କ ପାଇଁ ସ୍କୁଲ, ବୃଦ୍ଧଙ୍କ ପାଇଁ ସେବା ଗୃହ, ବୟସ୍କଙ୍କ ପାଇଁ ଜୀବିକା କେନ୍ଦ୍ର, AI ମୂଳ ଜ୍ଞାନ ସହ ଡିଜିଟାଲ ଶିକ୍ଷା ଓ ସହଯୋଗୀ ଭିତ୍ତିକ ସୁସ୍ଥତା କାମ ରହିଛି।"
              )}
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Upcoming section", "ଆଗାମୀ ବିଭାଗ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
                {t(
                  "Future plans under one vision",
                  "ଏକ ଦୃଷ୍ଟିକୋଣ ଅଧୀନରେ ଭବିଷ୍ୟତ ଯୋଜନା"
                )}
              </h2>
              <p className="mt-4 font-sans text-sm leading-7 text-[#555]">
                {t(
                  "These are future plans. We will begin them only when land, approvals, enough staff and resources, and steady funding are in place.",
                  "ଏଗୁଡ଼ିକ ପରିକଳ୍ପିତ ପଦକ୍ଷେପ। ଆବଶ୍ୟକ ଜମି, ଅନୁମୋଦନ, ପରିଚାଳନା କ୍ଷମତା ଓ ସ୍ଥାୟୀ ଅର୍ଥସାହାୟ୍ୟ ଉପଲବ୍ଧ ହେବା ପରେ ମାତ୍ର ଏଗୁଡ଼ିକ ଆଗକୁ ବଢ଼ିବ।"
                )}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {FUTURE_INITIATIVES.map((item, index) => {
                const Icon = icons[index] ?? BookOpen;
                return (
                  <article
                    key={item.titleEn}
                    className="flex h-full flex-col border border-[#E8DCC6] bg-[#FFFDF8] p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623] text-[#1A1A1A]">
                        <Icon size={24} />
                      </span>
                      <span className="rounded-full border border-[#DDBB7A] bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#7A4B00]">
                        {t("Upcoming", "ଆଗାମୀ")}
                      </span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl font-bold">
                      {t(item.titleEn, item.titleOd)}
                    </h3>
                    <p className="mt-4 flex-1 font-sans text-sm leading-7 text-[#555]">
                      {t(item.bodyEn, item.bodyOd)}
                    </p>
                    <p className="mt-6 border-t border-[#E8DCC6] pt-4 font-sans text-xs font-bold text-[#7A4B00]">
                      {t("Status: future plan", "ସ୍ଥିତି: ଭବିଷ୍ୟତ ପରିକଳ୍ପନା")}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 border-l-4 border-[#F5A623] bg-[#FAF4E8] p-7">
              <h2 className="font-serif text-2xl font-bold">
                {t("What is active today", "ଆଜି କଣ ସକ୍ରିୟ ଅଛି")}
              </h2>
              <p className="mt-3 font-sans text-sm leading-7 text-[#555]">
                {t(
                  "Abhiara Shiksha Sathi is the Foundation's main programme today. The school, elder care home, livelihood centre, digital learning, and wellness work are future plans. They are not accepting enrolment or applications now.",
                  "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ଫାଉଣ୍ଡେସନର ମୁଖ୍ୟ ସକ୍ରିୟ କାର୍ଯ୍ୟକ୍ରମ। ସ୍କୁଲ, ବୃଦ୍ଧ ସେବା ଗୃହ, ଜୀବିକା କେନ୍ଦ୍ର, ଡିଜିଟାଲ ଶିକ୍ଷା ଓ ସୁସ୍ଥତା କାମ ଭବିଷ୍ୟତ ପରିକଳ୍ପନା। ବର୍ତ୍ତମାନ ଏଗୁଡ଼ିକ ପାଇଁ ନାମଲେଖା ବା ଆବେଦନ ଗ୍ରହଣ ହେଉନାହିଁ।"
                )}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
