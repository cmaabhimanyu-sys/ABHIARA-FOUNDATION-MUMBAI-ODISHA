import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, HelpCircle, Mail, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  questionEn: string;
  questionOd: string;
  answerEn: string;
  answerOd: string;
};

type FaqGroup = {
  id: string;
  titleEn: string;
  titleOd: string;
  introEn: string;
  introOd: string;
  items: FaqItem[];
};

const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "about",
    titleEn: "About Abhiara",
    titleOd: "ଅଭିଆରା ବିଷୟରେ",
    introEn: "Simple answers about who we are and what we do.",
    introOd: "ଆମେ କିଏ ଓ କଣ କରୁଛୁ, ସେ ବିଷୟରେ ସରଳ ଉତ୍ତର।",
    items: [
      {
        questionEn: "What is Abhiara Foundation?",
        questionOd: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ କଣ?",
        answerEn:
          "Abhiara Foundation is a registered Section 8 not-for-profit company. Our registered office is in Mumbai, Maharashtra, and our work is focused mainly in Odisha.",
        answerOd:
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଏକ ପଞ୍ଜୀକୃତ ଧାରା ୮ ଅଣଲାଭକାରୀ କମ୍ପାନୀ। ଆମର ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ରରେ ଅଛି ଏବଂ ଆମର ମୁଖ୍ୟ କାମ ଓଡ଼ିଶାରେ ହେଉଛି।",
      },
      {
        questionEn: "What does the name ABHIARA mean?",
        questionOd: "ABHIARA ନାମର ଅର୍ଥ କଣ?",
        answerEn:
          "ABHI represents fearlessness. ARA represents a ray of light. Together, the name means A Fearless Ray of Light.",
        answerOd:
          "ABHI ନିର୍ଭୀକତାକୁ ବୁଝାଏ। ARA ଆଲୋକର ଏକ କିରଣକୁ ବୁଝାଏ। ଦୁଇଟି ମିଶି ଅର୍ଥ ହେଉଛି ନିର୍ଭୀକ ଆଲୋକର କିରଣ।",
      },
      {
        questionEn: "What work is Abhiara doing now?",
        questionOd: "ଅଭିଆରା ବର୍ତ୍ତମାନ କଣ କାମ କରୁଛି?",
        answerEn:
          "Our main work is supporting the education of orphaned children and children from underprivileged families. Abhiara Shiksha Sathi helps with verified education needs such as tuition fees, school bags and learning materials. Dated, reviewed counts are published separately in Student Impact. Alongside education, limited support for vulnerable elders, animal welfare, medical emergencies and disaster relief may be considered according to available funds, ground verification and approved budget. The planned old-age home under Abhiara Vidyapitha is not a current programme.",
        answerOd:
          "ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କ ଶିକ୍ଷା ଆମର ପ୍ରମୁଖ କାମ। ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ମାଧ୍ୟମରେ ଯାଞ୍ଚ ହୋଇଥିବା ଟ୍ୟୁସନ ଫି, ସ୍କୁଲ ବ୍ୟାଗ ଓ ପଢ଼ା ସାମଗ୍ରୀ ପାଇଁ ସାହାଯ୍ୟ କରୁ। ଯାଞ୍ଚ ହୋଇଥିବା ତାରିଖ ସହ ଶିକ୍ଷା ସହାୟତା ସଂଖ୍ୟା ଅଲଗା ଭାବେ ଛାତ୍ର ପ୍ରଭାବ ପୃଷ୍ଠାରେ ପ୍ରକାଶ କରୁ। ଏହା ସହିତ ଉପଲବ୍ଧ ଅର୍ଥ, କ୍ଷେତ୍ର ଯାଞ୍ଚ ଓ ଅନୁମୋଦିତ ବଜେଟ ଅନୁସାରେ ଅସହାୟ ବୃଦ୍ଧ, ପଶୁ କଲ୍ୟାଣ, ଚିକିତ୍ସା ଜରୁରୀ ସ୍ଥିତି ଓ ବିପର୍ଯ୍ୟୟ ପାଇଁ ସୀମିତ ସହାୟତା ବିଚାର କରାଯାଇପାରେ। ଅଭିଆରା ବିଦ୍ୟାପୀଠ ଅଧୀନରେ ପରିକଳ୍ପିତ ବୃଦ୍ଧ ସେବା ଗୃହ ବର୍ତ୍ତମାନର କାର୍ଯ୍ୟକ୍ରମ ନୁହେଁ।",
      },
      {
        questionEn: "Where does Abhiara Foundation work?",
        questionOd: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ କେଉଁଠି କାମ କରେ?",
        answerEn:
          "Our registered office is in Mumbai and much of our field activity is in Odisha. An adult may email an education support request for an orphaned or underprivileged child from any Indian state. Every request is reviewed case by case and support depends on verification, available funds, programme capacity and local follow-up feasibility.",
        answerOd:
          "ଆମର ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ ମୁମ୍ବାଇରେ ଅଛି ଏବଂ ଆମର ଅଧିକାଂଶ କ୍ଷେତ୍ର କାମ ଓଡ଼ିଶାରେ ହୁଏ। ଜଣେ ବୟସ୍କ ବ୍ୟକ୍ତି ଭାରତର ଯେକୌଣସି ରାଜ୍ୟରୁ ଅନାଥ ବା ସୁବିଧାବଞ୍ଚିତ ଶିଶୁଙ୍କ ପାଇଁ ଇମେଲରେ ଶିକ୍ଷା ସହାୟତା ଅନୁରୋଧ ପଠାଇପାରିବେ। ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଅଲଗା ଭାବେ ସମୀକ୍ଷା ହୁଏ ଏବଂ ସହାୟତା ଯାଞ୍ଚ, ଉପଲବ୍ଧ ଅର୍ଥ, କାର୍ଯ୍ୟକ୍ରମ କ୍ଷମତା ଓ ସ୍ଥାନୀୟ ଅନୁସରଣ ସମ୍ଭବତା ଉପରେ ନିର୍ଭର କରେ।",
      },
      {
        questionEn: "Does the Foundation support any political party?",
        questionOd: "ଫାଉଣ୍ଡେସନ କୌଣସି ରାଜନୈତିକ ଦଳକୁ ସମର୍ଥନ କରେ କି?",
        answerEn:
          "No. Our work is for people in need. Support is not decided by religion, caste, political party, or personal connection.",
        answerOd:
          "ନା। ଆମର କାମ ଆବଶ୍ୟକତାରେ ଥିବା ଲୋକଙ୍କ ପାଇଁ। ଧର୍ମ, ଜାତି, ରାଜନୈତିକ ଦଳ କିମ୍ବା ବ୍ୟକ୍ତିଗତ ପରିଚୟ ଆଧାରରେ ସହାୟତା ନିଷ୍ପତ୍ତି ହୁଏ ନାହିଁ।",
      },
    ],
  },
  {
    id: "support",
    titleEn: "Donations and Support",
    titleOd: "ଦାନ ଓ ସହଯୋଗ",
    introEn: "What to check before donating or offering support.",
    introOd: "ଦାନ କିମ୍ବା ସହଯୋଗ କରିବା ପୂର୍ବରୁ ଜାଣିବା କଥା।",
    items: [
      {
        questionEn: "How can I support Abhiara Foundation?",
        questionOd: "ମୁଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ କିପରି ସହଯୋଗ କରିପାରିବି?",
        answerEn:
          "You can make a one-time donation to the general fund, Abhiara Shiksha Sathi, elder support, medical emergency help, disaster relief or animal welfare. You can also volunteer, coordinate approved materials, discuss institutional support or share our verified work.",
        answerOd:
          "ଆପଣ ସାଧାରଣ ପାଣ୍ଠି, ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ, ବୟସ୍କ ସହାୟତା, ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା, ବିପର୍ଯ୍ୟୟ ସହାୟତା ବା ପଶୁ କଲ୍ୟାଣ ପାଇଁ ଏକକାଳୀନ ଦାନ କରିପାରିବେ। ଆପଣ ସ୍ୱେଚ୍ଛାସେବା, ଅନୁମୋଦିତ ସାମଗ୍ରୀ ସହଯୋଗ, ସଂସ୍ଥାଗତ ସହାୟତା ବିଷୟରେ କଥାବାର୍ତ୍ତା ବା ଆମର ଯାଞ୍ଚ ହୋଇଥିବା କାମ ସେୟାର କରିପାରିବେ।",
      },
      {
        questionEn: "Where should I send a donation?",
        questionOd: "ମୁଁ ଦାନ କେଉଁଠି ପଠାଇବି?",
        answerEn:
          "Use only the payment button, UPI QR code, or bank details shown on our official website. We do not use agents to collect donations, and a Foundation donation should never be sent to a person’s private account.",
        answerOd:
          "ଆମର ଅଧିକୃତ ୱେବସାଇଟରେ ଥିବା ପେମେଣ୍ଟ ବଟନ, UPI QR କୋଡ କିମ୍ବା ବ୍ୟାଙ୍କ ବିବରଣୀ ମାତ୍ର ବ୍ୟବହାର କରନ୍ତୁ। ଆମେ ଦାନ ସଂଗ୍ରହ ପାଇଁ ଏଜେଣ୍ଟ ବ୍ୟବହାର କରୁନାହୁଁ ଏବଂ ଫାଉଣ୍ଡେସନର ଦାନ କୌଣସି ବ୍ୟକ୍ତିଙ୍କ ନିଜସ୍ୱ ଖାତାକୁ ପଠାଯିବା ଉଚିତ ନୁହେଁ।",
      },
      {
        questionEn: "Is automatic monthly donation available?",
        questionOd: "ସ୍ୱୟଂଚାଳିତ ମାସିକ ଦାନ ଉପଲବ୍ଧ କି?",
        answerEn:
          "No. Automatic monthly debit is not active. Online payments on our donation page are one-time payments.",
        answerOd:
          "ନା। ସ୍ୱୟଂଚାଳିତ ମାସିକ ଟଙ୍କା କଟିବା ସୁବିଧା ସକ୍ରିୟ ନୁହେଁ। ଆମ ଦାନ ପୃଷ୍ଠାର ଅନଲାଇନ ପେମେଣ୍ଟ ଏକକାଳୀନ ପେମେଣ୍ଟ।",
      },
      {
        questionEn:
          "Can I request a Donation Acknowledgement, and is 80G available?",
        questionOd: "ମୁଁ ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ମାଗିପାରିବି କି, ଏବଂ 80G ଉପଲବ୍ଧ କି?",
        answerEn:
          "We can provide a Donation Acknowledgement. Our 80G approval is under process, so donations made now are not eligible for an 80G tax deduction.",
        answerOd:
          "ଆମେ ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ଦେଇପାରିବୁ। ଆମର 80G ଅନୁମୋଦନ ପ୍ରକ୍ରିୟାରେ ଅଛି, ତେଣୁ ବର୍ତ୍ତମାନ କରାଯାଇଥିବା ଦାନ 80G କର ରିହାତି ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ।",
      },
      {
        questionEn: "Can I choose a programme for my donation?",
        questionOd: "ମୁଁ ମୋ ଦାନ ପାଇଁ ଏକ କାର୍ଯ୍ୟକ୍ରମ ବାଛିପାରିବି କି?",
        answerEn:
          "Yes. You can choose from the causes shown on the donation page. We record your preference and use the donation within that work where the need is genuine.",
        answerOd:
          "ହଁ। ଦାନ ପୃଷ୍ଠାରେ ଥିବା କାରଣଗୁଡ଼ିକ ମଧ୍ୟରୁ ଆପଣ ବାଛିପାରିବେ। ଆମେ ଆପଣଙ୍କ ପସନ୍ଦ ଲେଖି ରଖୁ ଏବଂ ସେହି କାମର ସତ୍ୟ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ଦାନ ବ୍ୟବହାର କରୁ।",
      },
      {
        questionEn: "How does Abhiara protect people’s privacy?",
        questionOd: "ଅଭିଆରା ଲୋକଙ୍କ ଗୋପନୀୟତା କିପରି ରକ୍ଷା କରେ?",
        answerEn:
          "We do not publish sensitive personal details. We share names or photographs only when appropriate and consent has been obtained. For a child, guardian consent is required.",
        answerOd:
          "ଆମେ ସମ୍ବେଦନଶୀଳ ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ପ୍ରକାଶ କରୁନାହୁଁ। ବିଶେଷକରି ପିଲା ଓ ପରିବାରଙ୍କ ନାମ ଏବଂ ଫଟୋ ଉଚିତ ହେଲେ ଓ ଅନୁମତି ବିଚାର କରିବା ପରେ ମାତ୍ର ସେୟାର କରାଯାଏ।",
      },
    ],
  },
  {
    id: "participation",
    titleEn: "Volunteering and Questions",
    titleOd: "ସ୍ୱେଚ୍ଛାସେବା ଓ ପ୍ରଶ୍ନ",
    introEn: "Simple ways to speak with us or offer your time.",
    introOd: "ଆମ ସହ କଥା ହେବା କିମ୍ବା ସମୟ ଦେବାର ସରଳ ଉପାୟ।",
    items: [
      {
        questionEn: "Can I volunteer with Abhiara Foundation?",
        questionOd: "ମୁଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ସ୍ୱେଚ୍ଛାସେବା କରିପାରିବି କି?",
        answerEn:
          "Yes. Tell us how you would like to help and when you are available. You may help at an event, support children’s studies, take photos, coordinate locally, or share our work. We are not offering full-time jobs at present.",
        answerOd:
          "ହଁ। ଆପଣ କିପରି ସାହାଯ୍ୟ କରିବାକୁ ଚାହୁଁଛନ୍ତି ଏବଂ କେବେ ସମୟ ଦେଇପାରିବେ, ଆମକୁ କୁହନ୍ତୁ। ଆପଣ କୌଣସି କାର୍ଯ୍ୟକ୍ରମରେ, ପିଲାଙ୍କ ପଢ଼ାରେ, ଫଟୋ ନେବାରେ, ସ୍ଥାନୀୟ ସମନ୍ୱୟରେ କିମ୍ବା ଆମ କାମ ସେୟାର କରି ସାହାଯ୍ୟ କରିପାରିବେ। ବର୍ତ୍ତମାନ ଆମେ ପୂର୍ଣ୍ଣକାଳୀନ ଚାକିରି ଦେଉନାହୁଁ।",
      },
      {
        questionEn: "Can I ask questions before supporting the Foundation?",
        questionOd:
          "ଫାଉଣ୍ଡେସନକୁ ସହଯୋଗ କରିବା ପୂର୍ବରୁ ମୁଁ ପ୍ରଶ୍ନ ପଚାରିପାରିବି କି?",
        answerEn:
          "Yes. You are welcome to ask about our programmes, donations, governance, or use of funds before deciding to support us.",
        answerOd:
          "ହଁ। ଆମକୁ ସହଯୋଗ କରିବା ପୂର୍ବରୁ ଆପଣ ଆମ କାର୍ଯ୍ୟକ୍ରମ, ଦାନ, ପରିଚାଳନା କିମ୍ବା ଟଙ୍କା ବ୍ୟବହାର ବିଷୟରେ ପଚାରିପାରିବେ।",
      },
      {
        questionEn: "How can I contact Abhiara Foundation?",
        questionOd: "ମୁଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ କିପରି ଯୋଗାଯୋଗ କରିବି?",
        answerEn:
          "Use the Contact page, email info@abhiarafoundation.org, or follow the official WhatsApp channel linked on this website. Please check that you are using an official channel before sharing personal information or sending money.",
        answerOd:
          "ଯୋଗାଯୋଗ ପୃଷ୍ଠା ବ୍ୟବହାର କରନ୍ତୁ, info@abhiarafoundation.org କୁ ଇମେଲ କରନ୍ତୁ କିମ୍ବା ଏହି ୱେବସାଇଟରେ ଥିବା ଅଧିକୃତ ହ୍ୱାଟସଆପ ଚ୍ୟାନେଲକୁ ଅନୁସରଣ କରନ୍ତୁ। ବ୍ୟକ୍ତିଗତ ସୂଚନା କିମ୍ବା ଟଙ୍କା ପଠାଇବା ପୂର୍ବରୁ ଏହା ଅଧିକୃତ ମାଧ୍ୟମ କି ନୁହେଁ ଯାଞ୍ଚ କରନ୍ତୁ।",
      },
    ],
  },
];

export default function FAQ() {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t(
          "Frequently Asked Questions, Abhiara Foundation",
          "ସାଧାରଣ ପ୍ରଶ୍ନ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Clear answers about Abhiara Foundation, our work, donations, 80G status, privacy, and volunteering.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ଆମ କାମ, ଦାନ, 80G ସ୍ଥିତି, ଗୋପନୀୟତା ଓ ସ୍ୱେଚ୍ଛାସେବା ବିଷୟରେ ସ୍ପଷ୍ଟ ଉତ୍ତର।"
        )}
        url="https://www.abhiarafoundation.org/faq"
      />
      <Navbar />

      <main id="main-content">
        <section className="pt-36 md:pt-44 pb-12 md:pb-16 bg-white border-b border-gray-100">
          <div className="container max-w-4xl text-center">
            <AnimatedSection>
              <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-[#FFF7E7] flex items-center justify-center">
                <HelpCircle size={24} className="text-[#F5A623]" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
                {t("PUBLIC INFORMATION", "ସାଧାରଣ ସୂଚନା")}
              </p>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-5">
                {t("Questions People Ask Us", "ଲୋକେ ଆମକୁ ପଚାରୁଥିବା ପ୍ରଶ୍ନ")}
              </h1>
              <p className="font-sans text-[16px] md:text-[18px] text-[#555] leading-relaxed max-w-2xl mx-auto">
                {t(
                  "Simple answers about our work, donations, volunteering, and public records.",
                  "ଆମ କାମ, ଦାନ, ସ୍ୱେଚ୍ଛାସେବା ଓ ସାର୍ବଜନିକ ରେକର୍ଡ ବିଷୟରେ ସରଳ ଉତ୍ତର।"
                )}
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {FAQ_GROUPS.map(group => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full font-sans text-[13px] text-[#555] hover:text-[#9A6100] hover:border-[#F5A623] transition-colors"
                >
                  {language === "od" ? group.titleOd : group.titleEn}
                </a>
              ))}
            </div>

            <div className="space-y-14">
              {FAQ_GROUPS.map((group, groupIndex) => (
                <AnimatedSection key={group.id} delay={groupIndex * 0.05}>
                  <section id={group.id} className="scroll-mt-44">
                    <div className="mb-6">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
                        {language === "od" ? group.titleOd : group.titleEn}
                      </h2>
                      <p className="font-sans text-[14px] text-[#777]">
                        {language === "od" ? group.introOd : group.introEn}
                      </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3">
                      {group.items.map((item, itemIndex) => (
                        <AccordionItem
                          key={item.questionEn}
                          value={`${group.id}-${itemIndex}`}
                          className="bg-white border border-gray-200 rounded-lg px-5"
                        >
                          <AccordionTrigger className="py-5 font-sans text-[15px] md:text-[16px] font-semibold text-[#1A1A1A] text-left hover:no-underline">
                            {language === "od"
                              ? item.questionOd
                              : item.questionEn}
                          </AccordionTrigger>
                          <AccordionContent className="pb-5 font-sans text-[14px] md:text-[15px] text-[#555] leading-relaxed">
                            {language === "od" ? item.answerOd : item.answerEn}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white border-t border-gray-100">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={20} className="text-[#F5A623]" />
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9A6100]">
                    {t("ASK BEFORE YOU SUPPORT", "ସହଯୋଗ ପୂର୍ବରୁ ପଚାରନ୍ତୁ")}
                  </p>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
                  {t("Still have a question?", "ଆଉ କିଛି ପ୍ରଶ୍ନ ଅଛି କି?")}
                </h2>
                <p className="font-sans text-[15px] text-[#555] leading-relaxed max-w-xl">
                  {t(
                    "Write to us. We will answer as clearly as we can.",
                    "ଆମକୁ ଲେଖନ୍ତୁ। ଆମେ ଯେତେ ସମ୍ଭବ ସ୍ପଷ୍ଟ ଭାବେ ଉତ୍ତର ଦେବୁ।"
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-sans text-[13px] font-semibold rounded-md hover:bg-[#E59618] transition-colors"
                >
                  <Mail size={16} /> {t("Contact Us", "ଯୋଗାଯୋଗ କରନ୍ତୁ")}
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-[#333] font-sans text-[13px] font-semibold rounded-md hover:border-[#F5A623] hover:text-[#9A6100] transition-colors"
                >
                  {t("Donation Information", "ଦାନ ସୂଚନା")}{" "}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
