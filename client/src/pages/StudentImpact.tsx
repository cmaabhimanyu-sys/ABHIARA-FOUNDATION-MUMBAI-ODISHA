import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, FileCheck2, GraduationCap, LockKeyhole } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { MONTHLY_REPORT } from "@/data/focusContent";
import { trpc } from "@/lib/trpc";

export default function StudentImpact() {
  const { t } = useLanguage();
  const { data: publicSettings = [] } = trpc.cms.settings.listPublic.useQuery(undefined, { retry: false });
  const studentsSupported = publicSettings.find((item: any) => item.settingKey === "stat_students_reached")?.settingValue || "50+";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const records = [
    { icon: GraduationCap, value: studentsSupported, title: t("Children actively supported", "ଶିଶୁ ସକ୍ରିୟ ସହାୟତାରେ"), body: t("Children currently recorded under Abhiara Shiksha Sathi.", "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ଅଧୀନରେ ବର୍ତ୍ତମାନ ରେକର୍ଡ ହୋଇଥିବା ଶିଶୁ।") },
    { icon: BookOpen, value: t("Monthly", "ମାସିକ"), title: t("Education support", "ଶିକ୍ଷା ସହାୟତା"), body: t("Tuition and learning needs are supported according to verified need and capacity.", "ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ କ୍ଷମତା ଅନୁସାରେ ଟ୍ୟୁସନ ଓ ପଢ଼ା ଆବଶ୍ୟକତାକୁ ସହାୟତା।") },
    { icon: FileCheck2, value: t("Ongoing", "ଚାଲିଛି"), title: t("Follow-up", "ଅନୁସରଣ"), body: t("Programme records show approved support and whether education is continuing.", "କାର୍ଯ୍ୟକ୍ରମ ରେକର୍ଡରେ ଅନୁମୋଦିତ ସହାୟତା ଓ ଶିକ୍ଷା ଜାରି ରହିବା ଟ୍ରାକ ହୁଏ।") },
  ];
  return <div className="min-h-screen bg-white"><SEO title={t("Student Impact | Abhiara Shiksha Sathi", "ଛାତ୍ର ପ୍ରଭାବ | ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ")} description="Combined, privacy-safe education records for orphaned children and children from underprivileged families." url="https://www.abhiarafoundation.org/student-impact" /><Navbar /><main id="main-content"><section className="bg-[#FAF4E8] pt-32 pb-20 md:pt-40"><div className="container max-w-5xl"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A6100]">{t("Aggregate public record", "ସାମୂହିକ ସାର୍ବଜନିକ ରେକର୍ଡ")}</p><h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">{t("Student Impact", "ଛାତ୍ର ପ୍ରଭାବ")}</h1><p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-[#555]">{t("We report programme progress without using a child’s situation as publicity. Private names, addresses, school details and sensitive family records are not published.", "ଆମେ ଶିଶୁର ପରିସ୍ଥିତିକୁ ପ୍ରଚାର ପାଇଁ ବ୍ୟବହାର ନକରି କାର୍ଯ୍ୟକ୍ରମ ଅଗ୍ରଗତି ଦେଉଛୁ। ବ୍ୟକ୍ତିଗତ ନାମ, ଠିକଣା, ସ୍କୁଲ ବିବରଣୀ ଓ ସମ୍ବେଦନଶୀଳ ପରିବାରିକ ରେକର୍ଡ ପ୍ରକାଶ ହୁଏ ନାହିଁ।")}</p></div></section><section className="py-16 md:py-24"><div className="container"><div className="grid gap-6 md:grid-cols-3">{records.map((record) => <AnimatedSection key={record.title}><article className="h-full border border-gray-200 p-7"><record.icon size={25} className="text-[#B56A22]" /><p className="mt-6 font-serif text-4xl font-bold">{record.value}</p><h2 className="mt-2 font-serif text-xl font-bold">{record.title}</h2><p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">{record.body}</p></article></AnimatedSection>)}</div><div className="mt-10 grid gap-6 lg:grid-cols-2"><div className="bg-[#111111] p-8 text-white"><h2 className="font-serif text-2xl font-bold">{t("What support includes", "ସହାୟତାରେ କଣ ରହେ")}</h2><p className="mt-4 font-sans text-sm leading-relaxed text-white/75">{t(MONTHLY_REPORT.supportEn, MONTHLY_REPORT.supportOd)}</p></div><div className="border border-[#E8D6B2] bg-[#FFFDF8] p-8"><div className="flex items-center gap-3"><LockKeyhole className="text-[#9A6100]" /><h2 className="font-serif text-2xl font-bold">{t("Safeguarding rule", "ସୁରକ୍ଷା ନିୟମ")}</h2></div><p className="mt-4 font-sans text-sm leading-relaxed text-[#555]">{t(MONTHLY_REPORT.mediaEn, MONTHLY_REPORT.mediaOd)}</p></div></div><Link href="/monthly-reports" className="mt-9 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#9A6100]">{t("Read monthly reports", "ମାସିକ ରିପୋର୍ଟ ପଢ଼ନ୍ତୁ")} <ArrowRight size={15} /></Link></div></section></main><Footer /></div>;
}
