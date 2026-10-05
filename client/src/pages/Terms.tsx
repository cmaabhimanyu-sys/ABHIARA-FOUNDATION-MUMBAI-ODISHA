import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

type Bilingual = { en: string; od: string };
type TermsSection = { heading: Bilingual; paragraphs: Bilingual[] };

const email = "info@abhiarafoundation.org";

const sections: TermsSection[] = [
  {
    heading: { en: "About us", od: "ଆମ ବିଷୟରେ" },
    paragraphs: [
      {
        en: "Abhiara Foundation is a Section 8 not-for-profit company incorporated under the Companies Act, 2013. Its Corporate Identity Number is U87300MH2026NPL471397, and its registered office is in Mumbai, Maharashtra.",
        od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ କମ୍ପାନୀ ଆଇନ, ୨୦୧୩ ଅଧୀନରେ ଗଠିତ ଏକ ସେକ୍ସନ ୮ ଲାଭବିହୀନ କମ୍ପାନୀ। ଏହାର କର୍ପୋରେଟ ପରିଚୟ ସଂଖ୍ୟା U87300MH2026NPL471397 ଏବଂ ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ରରେ ଅଛି।",
      },
      {
        en: "Our main public programme, Abhiara Shiksha Sathi, supports orphaned children and children from underprivileged families to stay in school. Our other approved activities are described on this website.",
        od: "ଆମର ପ୍ରମୁଖ ସାର୍ବଜନିକ କାର୍ଯ୍ୟକ୍ରମ ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କ ଶିକ୍ଷା ଜାରି ରଖିବାକୁ ସହାୟତା କରେ। ଅନ୍ୟ ଅନୁମୋଦିତ କାର୍ଯ୍ୟକଳାପ ବିଷୟରେ ଏହି ୱେବସାଇଟରେ ସୂଚନା ଅଛି।",
      },
    ],
  },
  {
    heading: { en: "Use of the website", od: "ୱେବସାଇଟର ବ୍ୟବହାର" },
    paragraphs: [
      {
        en: "By using this website, you agree to these Terms of Use. If you do not agree, please stop using it.",
        od: "ଏହି ୱେବସାଇଟ ବ୍ୟବହାର କଲେ ଆପଣ ଏହି ବ୍ୟବହାର ନିୟମକୁ ମାନିବାକୁ ସମ୍ମତ ହୁଅନ୍ତି। ସମ୍ମତ ନ ଥିଲେ ଦୟାକରି ୱେବସାଇଟ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।",
      },
      {
        en: "You may use the website to learn about our work, contact us, request assistance or donate through an authorised channel. Do not interfere with the website, submit false or misleading information, impersonate the Foundation or collect money in its name without written authorisation.",
        od: "ଆମ କାମ ବିଷୟରେ ଜାଣିବା, ଯୋଗାଯୋଗ କରିବା, ସହାୟତା ମାଗିବା ବା ଅଧିକୃତ ମାଧ୍ୟମରେ ଦାନ କରିବା ପାଇଁ ଆପଣ ୱେବସାଇଟ ବ୍ୟବହାର କରିପାରିବେ। ୱେବସାଇଟର କାମରେ ବାଧା ଦିଅନ୍ତୁ ନାହିଁ, ମିଥ୍ୟା ବା ଭ୍ରମକର ସୂଚନା ପଠାନ୍ତୁ ନାହିଁ, ଫାଉଣ୍ଡେସନର ପରିଚୟ ନେଇ ନିଜକୁ ପ୍ରସ୍ତୁତ କରନ୍ତୁ ନାହିଁ ବା ଲିଖିତ ଅନୁମତି ବିନା ଏହାର ନାମରେ ଧନ ସଂଗ୍ରହ କରନ୍ତୁ ନାହିଁ।",
      },
      {
        en: "An education or other assistance request does not guarantee support. Requests are reviewed according to verified need, available resources and the Foundation's approval process. A child-related request should be emailed by a parent, guardian or other responsible adult from any Indian state for case-by-case review.",
        od: "ଶିକ୍ଷା ବା ଅନ୍ୟ ସହାୟତା ମାଗିଲେ ସହାୟତା ନିଶ୍ଚିତ ହୁଏ ନାହିଁ। ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା, ଉପଲବ୍ଧ ସମ୍ବଳ ଓ ଫାଉଣ୍ଡେସନର ଅନୁମୋଦନ ପ୍ରକ୍ରିୟା ଅନୁସାରେ ଅନୁରୋଧ ସମୀକ୍ଷା ହୁଏ। ଶିଶୁ ସମ୍ବନ୍ଧୀୟ ଅନୁରୋଧ ଭାରତର ଯେକୌଣସି ରାଜ୍ୟରୁ ମାତାପିତା, ଅଭିଭାବକ ବା ଅନ୍ୟ ଦାୟିତ୍ୱବାନ ବୟସ୍କ ବ୍ୟକ୍ତି ଇମେଲରେ ପଠାଇବା ଉଚିତ। ପ୍ରତ୍ୟେକ ଅନୁରୋଧକୁ ଅଲଗା ଭାବେ ସମୀକ୍ଷା କରାଯାଏ।",
      },
    ],
  },
  {
    heading: { en: "Donations", od: "ଦାନ" },
    paragraphs: [
      {
        en: "Donations are voluntary and website payments are one-time only. Donate only through our official website, the Foundation bank account or the authorised UPI QR on our donation page. We never ask supporters to transfer programme funds to a personal account.",
        od: "ଦାନ ସ୍ୱେଚ୍ଛାକୃତ ଏବଂ ୱେବସାଇଟ ମାଧ୍ୟମରେ ପେମେଣ୍ଟ କେବଳ ଥରେ କରାଯାଏ। ଆମ ଅଧିକୃତ ୱେବସାଇଟ, ଫାଉଣ୍ଡେସନର ବ୍ୟାଙ୍କ ଖାତା ବା ଦାନ ପୃଷ୍ଠାର ଅଧିକୃତ UPI QR ମାଧ୍ୟମରେ ମାତ୍ର ଦାନ କରନ୍ତୁ। କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ଧନ ବ୍ୟକ୍ତିଗତ ଖାତାକୁ ପଠାଇବାକୁ ଆମେ କହୁ ନାହୁଁ।",
      },
      {
        en: "A donation for a specific cause is used only for verified needs and reasonable programme costs within that cause. General Fund donations may be used across approved Abhiara programmes and the necessary costs of that work. Choosing a cause does not promise support to a named person or case.",
        od: "ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣ ପାଇଁ ଦାନ ସେହି କାରଣର ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଯୁକ୍ତିସଙ୍ଗତ କାର୍ଯ୍ୟକ୍ରମ ଖର୍ଚ୍ଚରେ ମାତ୍ର ବ୍ୟବହୃତ ହୁଏ। ସାଧାରଣ ପାଣ୍ଠିର ଦାନ ଅନୁମୋଦିତ ଅଭିଆରା କାର୍ଯ୍ୟକ୍ରମ ଓ ସେହି କାମର ଆବଶ୍ୟକ ଖର୍ଚ୍ଚରେ ବ୍ୟବହାର ହୋଇପାରେ। କାରଣ ବାଛିଲେ ନିର୍ଦ୍ଦିଷ୍ଟ ବ୍ୟକ୍ତି ବା ମାମଲାକୁ ସହାୟତା ନିଶ୍ଚିତ ହୁଏ ନାହିଁ।",
      },
      {
        en: "Our 12AB and 80G applications are pending. Donations made while 80G approval is pending are not eligible for an 80G tax deduction. A donor may request a Donation Acknowledgement, which is not an 80G certificate. We do not accept foreign contributions at present.",
        od: "ଆମର 12AB ଓ 80G ଆବେଦନ ବିଚାରାଧୀନ ଅଛି। 80G ଅନୁମୋଦନ ନଥିବା ସମୟରେ କରାଯାଇଥିବା ଦାନ 80G କର ରିହାତି ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ। ଦାତା ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ମାଗିପାରିବେ; ଏହା 80G ପ୍ରମାଣପତ୍ର ନୁହେଁ। ବର୍ତ୍ତମାନ ଆମେ ବିଦେଶୀ ଅନୁଦାନ ଗ୍ରହଣ କରୁ ନାହୁଁ।",
      },
      {
        en: "Our Donation and Refund Policy explains donation use, mistaken or duplicate payments and how to request a refund. Please read it before donating.",
        od: "ଦାନର ବ୍ୟବହାର, ଭୁଲରେ ବା ଦୁଇଥର ହୋଇଥିବା ପେମେଣ୍ଟ ଓ ରିଫଣ୍ଡ ଅନୁରୋଧ ବିଷୟରେ ଆମ ଦାନ ଓ ରିଫଣ୍ଡ ନୀତିରେ ସୂଚନା ଅଛି। ଦାନ କରିବା ପୂର୍ବରୁ ଏହା ପଢ଼ନ୍ତୁ।",
      },
    ],
  },
  {
    heading: { en: "Website information", od: "ୱେବସାଇଟର ସୂଚନା" },
    paragraphs: [
      {
        en: "We review programme information before publishing it, but activities, eligibility and available support may change. Website content does not guarantee assistance to any person or that a proposed activity will take place. For current information or to report an error, email us.",
        od: "ପ୍ରକାଶ ପୂର୍ବରୁ ଆମେ କାର୍ଯ୍ୟକ୍ରମ ସୂଚନା ସମୀକ୍ଷା କରୁ, କିନ୍ତୁ କାର୍ଯ୍ୟକଳାପ, ଯୋଗ୍ୟତା ଓ ଉପଲବ୍ଧ ସହାୟତା ବଦଳିପାରେ। ୱେବସାଇଟର ସୂଚନା କୌଣସି ବ୍ୟକ୍ତିଙ୍କୁ ସହାୟତା ବା ପ୍ରସ୍ତାବିତ କାର୍ଯ୍ୟ ହେବାର ନିଶ୍ଚୟତା ଦିଏ ନାହିଁ। ବର୍ତ୍ତମାନର ସୂଚନା ବା ତ୍ରୁଟି ଜଣାଇବାକୁ ଆମକୁ ଇମେଲ କରନ୍ତୁ।",
      },
    ],
  },
  {
    heading: { en: "Website content", od: "ୱେବସାଇଟର ବିଷୟବସ୍ତୁ" },
    paragraphs: [
      {
        en: "The words, photographs, designs, logos and other content on this website are owned by Abhiara Foundation or used with permission, unless stated otherwise. You may share links to the website. Please obtain our written permission before copying content or using our name, logo or photographs in other materials, except where the law permits such use.",
        od: "ଅନ୍ୟଥା ଉଲ୍ଲେଖ ନଥିଲେ ଏହି ୱେବସାଇଟର ଲେଖା, ଫଟୋ, ଡିଜାଇନ, ଲୋଗୋ ଓ ଅନ୍ୟ ବିଷୟବସ୍ତୁ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଅଟେ ବା ଅନୁମତି ସହ ବ୍ୟବହୃତ। ୱେବସାଇଟର ଲିଙ୍କ ସେୟାର କରିପାରିବେ। ଆଇନ ଅନୁମତି ଦେଇଥିବା କ୍ଷେତ୍ର ବ୍ୟତୀତ, ଏହାର ବିଷୟବସ୍ତୁ ନକଲ କରିବା ବା ଆମ ନାମ, ଲୋଗୋ ଓ ଫଟୋ ଅନ୍ୟ ସାମଗ୍ରୀରେ ବ୍ୟବହାର କରିବା ପୂର୍ବରୁ ଆମ ଲିଖିତ ଅନୁମତି ନିଅନ୍ତୁ।",
      },
    ],
  },
  {
    heading: { en: "Privacy and safeguarding", od: "ଗୋପନୀୟତା ଓ ସୁରକ୍ଷା" },
    paragraphs: [
      {
        en: "Our Privacy and Safeguarding Policy explains how we handle personal information. Please read it before sending information or photographs concerning a child or elderly person. Do not post anyone's private details publicly on our website or social media pages.",
        od: "ଆମର ଗୋପନୀୟତା ଓ ସୁରକ୍ଷା ନୀତିରେ ବ୍ୟକ୍ତିଗତ ସୂଚନା କିପରି ସମ୍ଭାଳୁ, ତାହା ବୁଝାଯାଇଛି। ଶିଶୁ ବା ବୃଦ୍ଧ ବ୍ୟକ୍ତିଙ୍କ ସୂଚନା ବା ଫଟୋ ପଠାଇବା ପୂର୍ବରୁ ଏହା ପଢ଼ନ୍ତୁ। ଆମ ୱେବସାଇଟ ବା ସାମାଜିକ ମାଧ୍ୟମରେ କାହାରି ବ୍ୟକ୍ତିଗତ ସୂଚନା ସାର୍ବଜନିକ କରନ୍ତୁ ନାହିଁ।",
      },
      {
        en: 'Report a safeguarding concern by emailing us with "Urgent safeguarding concern" in the subject line. If someone is in immediate danger, contact the appropriate local emergency or child protection authority.',
        od: 'ସୁରକ୍ଷା ସମ୍ବନ୍ଧୀୟ ଚିନ୍ତା ଥିଲେ ଇମେଲର ବିଷୟରେ "Urgent safeguarding concern" ଲେଖି ଆମକୁ ଜଣାନ୍ତୁ। କେହି ତୁରନ୍ତ ବିପଦରେ ଥିଲେ ସ୍ଥାନୀୟ ଜରୁରୀ ସେବା ବା ଶିଶୁ ସୁରକ୍ଷା କର୍ତ୍ତୃପକ୍ଷଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
      },
    ],
  },
  {
    heading: { en: "Other websites", od: "ଅନ୍ୟ ୱେବସାଇଟ" },
    paragraphs: [
      {
        en: "We may link to websites operated by others. A link does not necessarily mean that we endorse the website or its operator. Please review their terms and privacy notices before using them.",
        od: "ଅନ୍ୟମାନେ ଚଳାଉଥିବା ୱେବସାଇଟକୁ ଆମେ ଲିଙ୍କ ଦେଇପାରୁ। ଲିଙ୍କ ଥିବା ମାତ୍ରେ ଆମେ ସେହି ୱେବସାଇଟ ବା ଏହାର ପରିଚାଳକଙ୍କୁ ସମର୍ଥନ କରୁ ବୋଲି ଅର୍ଥ ନୁହେଁ। ସେଗୁଡ଼ିକ ବ୍ୟବହାର ପୂର୍ବରୁ ସେମାନଙ୍କ ନିୟମ ଓ ଗୋପନୀୟତା ସୂଚନା ପଢ଼ନ୍ତୁ।",
      },
    ],
  },
  {
    heading: { en: "Questions and grievances", od: "ପ୍ରଶ୍ନ ଓ ଅଭିଯୋଗ" },
    paragraphs: [
      {
        en: "For a question or concern about the website, a donation or a programme, email us. We aim to acknowledge complaints within 3 working days and provide a response or update after reviewing the matter. Safeguarding concerns will be prioritised.",
        od: "ୱେବସାଇଟ, ଦାନ ବା କାର୍ଯ୍ୟକ୍ରମ ବିଷୟରେ ପ୍ରଶ୍ନ ବା ଅଭିଯୋଗ ଥିଲେ ଆମକୁ ଇମେଲ କରନ୍ତୁ। ଅଭିଯୋଗ ପାଇବାର ୩ କାର୍ଯ୍ୟଦିବସ ମଧ୍ୟରେ ସ୍ୱୀକୃତି ଜଣାଇବାକୁ ଆମର ଲକ୍ଷ୍ୟ। ସମୀକ୍ଷା ପରେ ଉତ୍ତର ବା ଅଦ୍ୟତନ ଦେବୁ। ସୁରକ୍ଷା ସମ୍ବନ୍ଧୀୟ ଅଭିଯୋଗକୁ ଅଗ୍ରାଧିକାର ଦେବୁ।",
      },
    ],
  },
  {
    heading: { en: "Changes to these terms", od: "ଏହି ନିୟମର ପରିବର୍ତ୍ତନ" },
    paragraphs: [
      {
        en: "We may update these Terms of Use by publishing a revised version with a new last-updated date. Revised terms apply to website use after publication. A change will not retrospectively alter the conditions on which an earlier donation was accepted.",
        od: "ନୂଆ ଅଦ୍ୟତନ ତାରିଖ ସହ ସଂଶୋଧିତ ବ୍ୟବହାର ନିୟମ ପ୍ରକାଶ କରିପାରୁ। ପ୍ରକାଶ ପରେ ୱେବସାଇଟ ବ୍ୟବହାରରେ ସଂଶୋଧିତ ନିୟମ ଲାଗୁ ହେବ। ଏଥିରେ ପରିବର୍ତ୍ତନ ହେଲେ ପୂର୍ବରୁ ଗ୍ରହଣ କରାଯାଇଥିବା ଦାନର ସର୍ତ୍ତ ପଛୁଆ ଭାବେ ବଦଳିବ ନାହିଁ।",
      },
    ],
  },
  {
    heading: { en: "Governing law", od: "ପ୍ରଯୋଜ୍ୟ ଆଇନ" },
    paragraphs: [
      {
        en: "These Terms of Use are governed by Indian law. Subject to applicable law, disputes arising from them will be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.",
        od: "ଏହି ବ୍ୟବହାର ନିୟମ ଭାରତୀୟ ଆଇନ ଅଧୀନରେ ପରିଚାଳିତ। ପ୍ରଯୋଜ୍ୟ ଆଇନ ସାପେକ୍ଷ, ଏହି ନିୟମରୁ ଉଦ୍ଭବ ବିବାଦ ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ରର ଅଦାଲତଙ୍କ ଏକମାତ୍ର ଅଧିକାର କ୍ଷେତ୍ରରେ ରହିବ।",
      },
    ],
  },
  {
    heading: { en: "Contact", od: "ଯୋଗାଯୋଗ" },
    paragraphs: [
      {
        en: "Abhiara Foundation. CIN U87300MH2026NPL471397. Registered office: Mumbai, Maharashtra. For questions about these terms, email us.",
        od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ। CIN U87300MH2026NPL471397। ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ: ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ର। ଏହି ନିୟମ ବିଷୟରେ ପ୍ରଶ୍ନ ପାଇଁ ଇମେଲ କରନ୍ତୁ।",
      },
    ],
  },
];

export default function Terms() {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t(
          "Terms of Use | Abhiara Foundation",
          "ବ୍ୟବହାର ନିୟମ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Terms for using the Abhiara Foundation website, requesting support and donating.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ୱେବସାଇଟ ବ୍ୟବହାର, ସହାୟତା ଅନୁରୋଧ ଓ ଦାନ ସମ୍ବନ୍ଧୀୟ ନିୟମ।"
        )}
        url="https://www.abhiarafoundation.org/terms"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pt-32 pb-16 text-white md:pt-40">
          <div className="container max-w-4xl">
            <h1 className="font-serif text-4xl font-bold text-white md:text-6xl">
              {t("Terms of Use", "ବ୍ୟବହାର ନିୟମ")}
            </h1>
            <p className="mt-5 font-sans text-sm text-white/75">
              {t("Last updated: 5 October 2026", "ଶେଷ ଅଦ୍ୟତନ: ୫ ଅକ୍ଟୋବର ୨୦୨୬")}
            </p>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/85">
              {t(
                "These Terms of Use apply when you access the Abhiara Foundation website, contact us through it or make a donation.",
                "ଆପଣ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ୱେବସାଇଟ ଦେଖିବା, ଏହା ମାଧ୍ୟମରେ ଯୋଗାଯୋଗ କରିବା ବା ଦାନ କରିବା ସମୟରେ ଏହି ବ୍ୟବହାର ନିୟମ ଲାଗୁ ହୁଏ।"
              )}
            </p>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container max-w-4xl space-y-6">
            {sections.map((section, index) => (
              <article
                key={section.heading.en}
                className="rounded-xl border border-gray-200 bg-white p-6 md:p-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  {index + 1}. {t(section.heading.en, section.heading.od)}
                </h2>
                {section.paragraphs.map(paragraph => (
                  <p
                    key={paragraph.en}
                    className="mt-4 font-sans text-base leading-relaxed text-[#333]"
                  >
                    {t(paragraph.en, paragraph.od)}
                  </p>
                ))}
                {index === 2 && (
                  <Link
                    href="/donation-and-refund-policy"
                    className="mt-4 inline-block font-semibold text-[#765000] underline"
                  >
                    {t(
                      "Read the Donation and Refund Policy",
                      "ଦାନ ଓ ରିଫଣ୍ଡ ନୀତି ପଢ଼ନ୍ତୁ"
                    )}
                  </Link>
                )}
                {index === 5 && (
                  <Link
                    href="/privacy"
                    className="mt-4 mr-4 inline-block font-semibold text-[#765000] underline"
                  >
                    {t(
                      "Read the Privacy and Safeguarding Policy",
                      "ଗୋପନୀୟତା ଓ ସୁରକ୍ଷା ନୀତି ପଢ଼ନ୍ତୁ"
                    )}
                  </Link>
                )}
                {[3, 5, 7, 10].includes(index) && (
                  <a
                    className="mt-4 inline-block break-all font-semibold text-[#765000] underline"
                    href={`mailto:${email}${index === 5 ? "?subject=Urgent%20safeguarding%20concern" : ""}`}
                  >
                    {email}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
