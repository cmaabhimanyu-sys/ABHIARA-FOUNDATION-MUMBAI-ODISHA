/**
 * Abhiara Foundation, Terms & Conditions
 * Legal page for website usage terms
 */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title="Terms & Conditions, Abhiara Foundation"
        description="Terms and conditions for using the Abhiara Foundation website."
        url="https://www.abhiarafoundation.org/terms"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#FAFAFA]">
        <div className="container text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">LEGAL</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            {t("Terms & Conditions", "ନିୟମ ଓ ସର୍ତ୍ତାବଳୀ")}
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto mb-4" />
          <p className="font-mono text-[10px] tracking-wider uppercase text-[#888]">
            {t("Last updated: September 2026", "ଶେଷ ଅଦ୍ୟତନ: ସେପ୍ଟେମ୍ବର ୨୦୨୬")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 section-light">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none">

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">1. {t("About Us", "ଆମ ବିଷୟରେ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "Abhiara Foundation is a Section 8 not-for-profit company incorporated under the Companies Act, 2013 with CIN U87300MH2026NPL471397. Our registered office is in Mumbai, Maharashtra. Our main public programme is Abhiara Shiksha Sathi. It helps orphaned children and children from underprivileged families stay in school after their needs are checked. An adult may email an education request from any Indian state for case by case review.",
                "ଅଭିଆରା ଫାଉଣ୍ଡେସନ କମ୍ପାନୀ ଆଇନ, ୨୦୧୩ ଅଧୀନରେ CIN U87300MH2026NPL471397 ସହ ନିବନ୍ଧିତ ସେକ୍ସନ 8 ଲାଭବିହୀନ କମ୍ପାନୀ। ଆମର ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ରରେ ଅଛି। ଆମର ପ୍ରମୁଖ ସାର୍ବଜନିକ କାର୍ଯ୍ୟକ୍ରମ ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ, ଯାହା ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କ ଶିକ୍ଷା ଜାରି ରଖିବାକୁ ଯାଞ୍ଚ ଭିତ୍ତିକ ସହାୟତା କରେ। ଜଣେ ବୟସ୍କ ବ୍ୟକ୍ତି ଭାରତର ଯେକୌଣସି ରାଜ୍ୟରୁ ଇମେଲ ମାଧ୍ୟମରେ ଶିକ୍ଷା ଅନୁରୋଧ ପଠାଇପାରିବେ ଏବଂ ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଅଲଗା ଭାବେ ସମୀକ୍ଷା ହୁଏ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">2. {t("Acceptance of Terms", "ସର୍ତ୍ତ ଗ୍ରହଣ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "By accessing and using this website (abhiarafoundation.org), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.",
                "ଏହି ୱେବସାଇଟ (abhiarafoundation.org) ବ୍ୟବହାର କରି, ଆପଣ ଏହି ନିୟମ ଓ ସର୍ତ୍ତାବଳୀ ଦ୍ୱାରା ବାଧ୍ୟ ହେବାକୁ ସମ୍ମତ ହୁଅନ୍ତି। ଯଦି ଆପଣ ଏହି ସର୍ତ୍ତର କୌଣସି ଅଂଶ ସହ ସମ୍ମତ ନୁହଁନ୍ତି, ଦୟାକରି ଏହି ୱେବସାଇଟ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">3. {t("Use of Website", "ୱେବସାଇଟ ବ୍ୟବହାର")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "This website tells you about Abhiara Foundation's work and programmes. Please do not use it for anything wrong or harmful. All the words, photos, logos, and design on this website belong to Abhiara Foundation.",
                "ଏହି ୱେବସାଇଟ ଅଭିଆରା ଫାଉଣ୍ଡେସନର କାର୍ଯ୍ୟକ୍ରମ, କାର୍ଯ୍ୟକଳାପ ଏବଂ ଉଦ୍ୟୋଗ ବିଷୟରେ ସୂଚନା ପ୍ରଦାନ ପାଇଁ ପ୍ରଦାନ କରାଯାଇଛି। ଆପଣ ଏହି ୱେବସାଇଟକୁ କୌଣସି ବେଆଇନ ଉଦ୍ଦେଶ୍ୟରେ, କ୍ଷତିକାରକ ସାମଗ୍ରୀ ପ୍ରସାରଣ ପାଇଁ, କିମ୍ବା ୱେବସାଇଟର କାର୍ଯ୍ୟରେ ହସ୍ତକ୍ଷେପ ପାଇଁ ବ୍ୟବହାର କରିପାରିବେ ନାହିଁ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">4. {t("Donations & Contributions", "ଦାନ ଓ ଅବଦାନ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "All donations are voluntary. Our 12AB and 80G applications are pending. Donations made now are not eligible for an 80G tax deduction. We can provide a Donation Acknowledgement on request. Foreign contributions are not accepted at present. Please donate only through the official website, Foundation bank account or authorised UPI channel. The Foundation never asks donors to transfer programme funds to personal accounts. Refund requests are reviewed under the published Donation and Refund Policy.",
                "ସମସ୍ତ ଦାନ ସ୍ୱେଚ୍ଛାକୃତ। ଆମର 12AB ଓ 80G ଆବେଦନ ବିଚାରାଧୀନ। ବର୍ତ୍ତମାନର ଦାନ 80G କର ରିହାତି ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ। ବିଦେଶୀ ଅନୁଦାନ ବର୍ତ୍ତମାନ ଗ୍ରହଣ କରାଯାଉ ନାହିଁ। ଦୟାକରି କେବଳ ଅଧିକୃତ ୱେବସାଇଟ, ଫାଉଣ୍ଡେସନ ବ୍ୟାଙ୍କ ଖାତା ବା ଅନୁମୋଦିତ UPI ମାଧ୍ୟମରେ ଦାନ କରନ୍ତୁ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">5. {t("Disclaimer", "ଦାୟିତ୍ୱ ମୁକ୍ତି")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "The information on this website is provided 'as is' without any warranties, express or implied. Abhiara Foundation makes no representations about the accuracy or completeness of the information. We reserve the right to modify the content of this website at any time without notice. Abhiara Foundation shall not be liable for any loss or damage arising from the use of this website.",
                "ଏହି ୱେବସାଇଟରେ ସୂଚନା 'ଯେପରି ଅଛି' ସେପରି ପ୍ରଦାନ କରାଯାଇଛି, କୌଣସି ୱାରେଣ୍ଟି ବିନା। ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସୂଚନାର ସଠିକତା ବା ସମ୍ପୂର୍ଣ୍ଣତା ବିଷୟରେ କୌଣସି ପ୍ରତିନିଧିତ୍ୱ କରେ ନାହିଁ। ଆମେ ବିନା ସୂଚନାରେ ଏହି ୱେବସାଇଟର ବିଷୟବସ୍ତୁ ପରିବର୍ତ୍ତନ କରିବାର ଅଧିକାର ସଂରକ୍ଷଣ କରୁ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">6. {t("Third-Party Links", "ତୃତୀୟ ପକ୍ଷ ଲିଙ୍କ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "This website may contain links to third-party websites. These links are provided for convenience only and do not signify endorsement. Abhiara Foundation is not responsible for the content or privacy practices of linked websites.",
                "ଏହି ୱେବସାଇଟରେ ତୃତୀୟ ପକ୍ଷ ୱେବସାଇଟର ଲିଙ୍କ ଥାଇପାରେ। ଏହି ଲିଙ୍କଗୁଡ଼ିକ କେବଳ ସୁବିଧା ପାଇଁ ପ୍ରଦାନ କରାଯାଇଛି ଏବଂ ଅନୁମୋଦନ ସୂଚିତ କରେ ନାହିଁ। ଲିଙ୍କ ହୋଇଥିବା ୱେବସାଇଟର ବିଷୟବସ୍ତୁ ବା ଗୋପନୀୟତା ଅଭ୍ୟାସ ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦାୟୀ ନୁହେଁ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">7. {t("Governing Law", "ପ୍ରଯୋଜ୍ୟ ଆଇନ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.",
                "ଏହି ସର୍ତ୍ତଗୁଡ଼ିକ ଭାରତର ଆଇନ ଦ୍ୱାରା ପରିଚାଳିତ ଏବଂ ବ୍ୟାଖ୍ୟା କରାଯିବ। ଏହି ସର୍ତ୍ତରୁ ଉଦ୍ଭବ ହେଉଥିବା କୌଣସି ବିବାଦ ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ରରେ ଥିବା ନ୍ୟାୟାଳୟର ଏକମାତ୍ର ଅଧିକାର କ୍ଷେତ୍ରର ଅଧୀନ ହେବ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">8. {t("Grievance Redressal", "ଅଭିଯୋଗ ନିବାରଣ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "For any grievances, complaints, or concerns regarding this website or Abhiara Foundation's activities, please contact our Grievance Officer:",
                "ଏହି ୱେବସାଇଟ ବା ଅଭିଆରା ଫାଉଣ୍ଡେସନର କାର୍ଯ୍ୟକଳାପ ସମ୍ବନ୍ଧରେ କୌଣସି ଅଭିଯୋଗ, ଅସନ୍ତୋଷ ବା ଚିନ୍ତା ପାଇଁ, ଦୟାକରି ଆମର ଅଭିଯୋଗ ଅଧିକାରୀଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ:"
              )}
            </p>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <p className="font-sans text-[17px] text-[#333] leading-relaxed">
                <strong>{t("Grievance Officer", "ଅଭିଯୋଗ ଅଧିକାରୀ")}:</strong> Abhimanyu Mallik<br />
                <strong>{t("Designation", "ପଦବୀ")}:</strong> {t("Founder & Director", "ପ୍ରତିଷ୍ଠାତା ଓ ନିର୍ଦ୍ଦେଶକ")}<br />
                <strong>{t("Email", "ଇମେଲ")}:</strong> info@abhiarafoundation.org<br />
                <strong>{t("Response Time", "ଉତ୍ତର ସମୟ")}:</strong> {t("Within 48 hours of receiving the complaint", "ଅଭିଯୋଗ ପ୍ରାପ୍ତ ହେବାର ୪୮ ଘଣ୍ଟା ମଧ୍ୟରେ")}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">9. {t("Contact", "ଯୋଗାଯୋଗ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "If you have any questions about these Terms & Conditions, please write to us at info@abhiarafoundation.org.",
                "ଯଦି ଆପଣଙ୍କର ଏହି ନିୟମ ଓ ସର୍ତ୍ତାବଳୀ ବିଷୟରେ କୌଣସି ପ୍ରଶ୍ନ ଅଛି, ଦୟାକରି ଆମକୁ info@abhiarafoundation.org ରେ ଲେଖନ୍ତୁ।"
              )}
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
