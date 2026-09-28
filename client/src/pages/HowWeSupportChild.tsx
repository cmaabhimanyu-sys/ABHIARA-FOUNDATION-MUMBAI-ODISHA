import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";

const STEPS = [
  [
    "Referral or request",
    "ରେଫରାଲ ବା ଅନୁରୋଧ",
    "A family, volunteer, school contact or community member tells the Foundation about a child who may need education support.",
    "ପରିବାର, ସ୍ୱେଚ୍ଛାସେବୀ, ସ୍କୁଲ ସମ୍ପର୍କ ବା ସମୁଦାୟର ଜଣେ ବ୍ୟକ୍ତି ଶିକ୍ଷା ସହାୟତା ଆବଶ୍ୟକ ଥିବା ଶିଶୁ ବିଷୟରେ ଫାଉଣ୍ଡେସନକୁ ଜଣାନ୍ତି।",
  ],
  [
    "Check the need",
    "ଆବଶ୍ୟକତା ଯାଞ୍ଚ",
    "A local team member checks the situation and records only the details needed to review the request.",
    "ସ୍ଥାନୀୟ ଦଳର ଜଣେ ସଦସ୍ୟ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତି ଏବଂ ଅନୁରୋଧ ସମୀକ୍ଷା ପାଇଁ ଆବଶ୍ୟକ ତଥ୍ୟ ମାତ୍ର ରେକର୍ଡ କରନ୍ତି।",
  ],
  [
    "Review the request",
    "ଅନୁରୋଧ ସମୀକ୍ଷା",
    "We check the education need, available funds and how much support the programme can manage. Support is not automatic.",
    "ଶିକ୍ଷା ଆବଶ୍ୟକତା, ଉପଲବ୍ଧ ଅର୍ଥ ଓ କାର୍ଯ୍ୟକ୍ରମ କେତେ ସହାୟତା କରିପାରିବ ତାହା ଯାଞ୍ଚ ହୁଏ। ସହାୟତା ସ୍ୱୟଂଚାଳିତ ନୁହେଁ।",
  ],
  [
    "Record the approval",
    "ଅନୁମୋଦନ ରେକର୍ଡ",
    "We record what support was approved, why it was approved and how it will be provided.",
    "କେଉଁ ସହାୟତା ଅନୁମୋଦିତ ହେଲା, କାହିଁକି ହେଲା ଏବଂ କିପରି ଦିଆଯିବ ତାହା ରେକର୍ଡ କରାଯାଏ।",
  ],
  [
    "Provide the support",
    "ସହାୟତା ଦିଆଯାଏ",
    "Approved support may cover tuition, books, school supplies, examination needs or another checked learning need.",
    "ଅନୁମୋଦିତ ସହାୟତାରେ ଟ୍ୟୁସନ, ପୁସ୍ତକ, ସ୍କୁଲ ସାମଗ୍ରୀ, ପରୀକ୍ଷା ଆବଶ୍ୟକତା ବା ଅନ୍ୟ ଯାଞ୍ଚ ହୋଇଥିବା ପଢ଼ା ଆବଶ୍ୟକତା ରହିପାରେ।",
  ],
  [
    "Follow up",
    "ଅନୁସରଣ",
    "The team checks whether the approved support reached its purpose and whether the child is continuing education.",
    "ଅନୁମୋଦିତ ସହାୟତା ଠିକ ଉଦ୍ଦେଶ୍ୟରେ ପହଞ୍ଚିଛି କି ଏବଂ ଶିଶୁର ପଢ଼ା ଜାରି ଅଛି କି ଦଳ ଯାଞ୍ଚ କରେ।",
  ],
] as const;

export default function HowWeSupportChild() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "How We Support a Child | Abhiara Foundation",
          "ଆମେ ଶିଶୁଙ୍କୁ କିପରି ସହାୟତା କରୁ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "A six step review, approval, support and follow up process for Abhiara Shiksha Sathi.",
          "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ପାଇଁ ଛଅଟି ପଦକ୍ଷେପର ଯାଞ୍ଚ, ଅନୁମୋଦନ, ସହାୟତା ଓ ଅନୁସରଣ ପ୍ରକ୍ରିୟା।"
        )}
        url="https://www.abhiarafoundation.org/how-we-support-a-child"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
              {t("A clear process", "ଏକ ସ୍ପଷ୍ଟ ପ୍ରକ୍ରିୟା")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-6xl">
              {t("How We Support a Child", "ଆମେ ଶିଶୁଙ୍କୁ କିପରି ସହାୟତା କରୁ")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
              {t(
                "We consider education requests for orphaned and underprivileged children from different parts of India. We check each request before support is approved and keep private child records away from the public website.",
                "ଆମେ ଭାରତର ବିଭିନ୍ନ ସ୍ଥାନର ଅନାଥ ଓ ସୁବିଧାବଞ୍ଚିତ ଶିଶୁଙ୍କ ଶିକ୍ଷା ସହାୟତା ଅନୁରୋଧ ବିଚାର କରୁ। ସହାୟତା ଅନୁମୋଦନ ପୂର୍ବରୁ ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଯାଞ୍ଚ କରାଯାଏ ଏବଂ ଶିଶୁର ବ୍ୟକ୍ତିଗତ ରେକର୍ଡ ସାର୍ବଜନିକ ୱେବସାଇଟରେ ଦିଆଯାଏ ନାହିଁ।"
              )}
            </p>
          </div>
        </section>

        <section className="bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-5xl">
            <div className="space-y-5">
              {STEPS.map((step, index) => (
                <AnimatedSection key={step[0]}>
                  <article className="grid gap-5 border border-[#E8DCC6] bg-white p-6 md:grid-cols-[90px_1fr]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] font-serif text-xl font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold">
                        {t(step[0], step[1])}
                      </h2>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-[#555]">
                        {t(step[2], step[3])}
                      </p>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-10 border-l-4 border-[#1A7F8E] bg-white p-6">
              <div className="flex gap-3">
                <CheckCircle2 className="shrink-0 text-[#1A7F8E]" />
                <div>
                  <h2 className="font-serif text-xl font-bold">
                    {t(
                      "Education support, not a child home",
                      "ଶିକ୍ଷା ସହାୟତା, ଶିଶୁ ଗୃହ ନୁହେଁ"
                    )}
                  </h2>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#444]">
                    {t(
                      "Abhiara Shiksha Sathi provides education support. The Foundation does not operate a residential child care home. Private records are used only to check and manage support. Public reports use combined information, and a child photo is used only after guardian permission and a safety review.",
                      "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ଶିକ୍ଷା ସହାୟତା ଦେଇଥାଏ। ଫାଉଣ୍ଡେସନ କୌଣସି ଆବାସିକ ଶିଶୁ ଗୃହ ଚଳାଏ ନାହିଁ। ବ୍ୟକ୍ତିଗତ ରେକର୍ଡ କେବଳ ଯାଞ୍ଚ ଓ ସହାୟତା ପରିଚାଳନା ପାଇଁ ବ୍ୟବହୃତ ହୁଏ। ସାର୍ବଜନିକ ରିପୋର୍ଟରେ ସାମୂହିକ ତଥ୍ୟ ଦିଆଯାଏ ଏବଂ ଅଭିଭାବକ ଅନୁମତି ଓ ସୁରକ୍ଷା ସମୀକ୍ଷା ପରେ ମାତ୍ର ଶିଶୁର ଫଟୋ ବ୍ୟବହାର ହୁଏ।"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/board-and-transparency"
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#9A6100]"
            >
              {t(
                "Read our transparency process",
                "ଆମ ସ୍ୱଚ୍ଛତା ପ୍ରକ୍ରିୟା ପଢ଼ନ୍ତୁ"
              )}{" "}
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
