/**
 * Abhiara Foundation, Privacy Policy
 * Legal page for data privacy and protection
 */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Privacy() {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title="Privacy Policy, Abhiara Foundation"
        description="Privacy policy for the Abhiara Foundation website."
        url="https://www.abhiarafoundation.org/privacy"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#FAFAFA]">
        <div className="container text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">LEGAL</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            {t("Privacy Policy", "ଗୋପନୀୟତା ନୀତି")}
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

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">1. {t("Introduction", "ପରିଚୟ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "Abhiara Foundation (\"we\", \"us\", \"our\") respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or interact with our programmes.",
                "ଅଭିଆରା ଫାଉଣ୍ଡେସନ (\"ଆମେ\", \"ଆମର\") ଆପଣଙ୍କ ଗୋପନୀୟତାକୁ ସମ୍ମାନ କରେ ଏବଂ ଆପଣ ଆମ ସହ ଅଂଶୀଦାର କରୁଥିବା ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ସୁରକ୍ଷିତ ରଖିବାକୁ ପ୍ରତିବଦ୍ଧ। ଏହି ଗୋପନୀୟତା ନୀତି ବ୍ୟାଖ୍ୟା କରେ ଯେ ଆପଣ ଆମ ୱେବସାଇଟ ପରିଦର୍ଶନ କରିବା ବା ଆମ କାର୍ଯ୍ୟକ୍ରମ ସହ ଯୋଗାଯୋଗ କରିବା ସମୟରେ ଆମେ କିପରି ଆପଣଙ୍କ ସୂଚନା ସଂଗ୍ରହ, ବ୍ୟବହାର, ସଂରକ୍ଷଣ ଏବଂ ସୁରକ୍ଷା କରୁ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">2. {t("Information We Collect", "ଆମେ ସଂଗ୍ରହ କରୁଥିବା ସୂଚନା")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-3">
              {t("We may collect the following types of information:", "ଆମେ ନିମ୍ନଲିଖିତ ପ୍ରକାରର ସୂଚନା ସଂଗ୍ରହ କରିପାରୁ:")}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="font-sans text-[17px] text-[#333]">{t("Personal information: Name, email address, phone number and location when you contact us, volunteer or donate", "ବ୍ୟକ୍ତିଗତ ସୂଚନା: ଯେତେବେଳେ ଆପଣ ଯୋଗାଯୋଗ, ସ୍ୱେଚ୍ଛାସେବା ବା ଦାନ କରନ୍ତି ସେତେବେଳେ ନାମ, ଇମେଲ ଠିକଣା, ଫୋନ ନମ୍ବର ଓ ସ୍ଥାନ")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("Usage data: Browser type, IP address, pages visited, and time spent on the website (collected automatically)", "ବ୍ୟବହାର ତଥ୍ୟ: ବ୍ରାଉଜର ପ୍ରକାର, IP ଠିକଣା, ପରିଦର୍ଶନ ହୋଇଥିବା ପୃଷ୍ଠା, ଏବଂ ୱେବସାଇଟରେ ବିତାଇଥିବା ସମୟ (ସ୍ୱୟଂଚାଳିତ ଭାବେ ସଂଗ୍ରହ)")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("Donation information: Transaction details when you make a contribution (processed through secure third-party payment gateways)", "ଦାନ ସୂଚନା: ଆପଣ ଅବଦାନ କରିବା ସମୟରେ ଲେନଦେନ ବିବରଣୀ (ସୁରକ୍ଷିତ ତୃତୀୟ ପକ୍ଷ ପେମେଣ୍ଟ ଗେଟୱେ ମାଧ୍ୟମରେ ପ୍ରକ୍ରିୟାକୃତ)")}</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">3. {t("How We Use Your Information", "ଆମେ ଆପଣଙ୍କ ସୂଚନା କିପରି ବ୍ୟବହାର କରୁ")}</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="font-sans text-[17px] text-[#333]">{t("To respond to your enquiries and applications", "ଆପଣଙ୍କ ଅନୁସନ୍ଧାନ ଏବଂ ଆବେଦନର ଉତ୍ତର ଦେବା ପାଇଁ")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("To process donations and provide Donation Acknowledgements when requested", "ଦାନ ପ୍ରକ୍ରିୟା କରିବା ଏବଂ ଅନୁରୋଧରେ ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ଦେବା ପାଇଁ")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("To send updates about our programmes (with your consent)", "ଆମ କାର୍ଯ୍ୟକ୍ରମ ବିଷୟରେ ଅଦ୍ୟତନ ପଠାଇବା ପାଇଁ (ଆପଣଙ୍କ ସମ୍ମତି ସହ)")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("To improve our website and user experience", "ଆମ ୱେବସାଇଟ ଏବଂ ବ୍ୟବହାରକାରୀ ଅନୁଭବ ଉନ୍ନତ କରିବା ପାଇଁ")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("To comply with legal obligations under Indian law", "ଭାରତୀୟ ଆଇନ ଅଧୀନରେ ଆଇନଗତ ବାଧ୍ୟବାଧକତା ପାଳନ ପାଇଁ")}</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">4. {t("Data Protection", "ତଥ୍ୟ ସୁରକ୍ଷା")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "We take care to keep your personal information safe. We do not sell or share your details with anyone. If we work with other service providers, they are also bound to keep your information private.",
                "ଆମେ ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟକୁ ଅନଧିକୃତ ପ୍ରବେଶ, ପରିବର୍ତ୍ତନ, ପ୍ରକାଶ ବା ବିନାଶରୁ ସୁରକ୍ଷା ପାଇଁ ଉପଯୁକ୍ତ ବୈଷୟିକ ଏବଂ ସାଂଗଠନିକ ବ୍ୟବସ୍ଥା କାର୍ଯ୍ୟକାରୀ କରୁ। ଆମେ ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ସୂଚନା ତୃତୀୟ ପକ୍ଷଙ୍କୁ ବିକ୍ରି, ବାଣିଜ୍ୟ ବା ଭଡ଼ା ଦେଉ ନାହୁଁ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">5. {t("Cookies", "କୁକିଜ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "This website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. You can control cookie settings through your browser. Essential cookies are required for the website to function properly. Analytics cookies help us understand how visitors use our website.",
                "ଏହି ୱେବସାଇଟ ଆପଣଙ୍କ ବ୍ରାଉଜିଂ ଅନୁଭବ ବୃଦ୍ଧି ପାଇଁ କୁକିଜ ବ୍ୟବହାର କରେ। କୁକିଜ ହେଉଛି ଆପଣଙ୍କ ଡିଭାଇସରେ ସଂରକ୍ଷିତ ଛୋଟ ଟେକ୍ସଟ ଫାଇଲ। ଆପଣ ଆପଣଙ୍କ ବ୍ରାଉଜର ମାଧ୍ୟମରେ କୁକି ସେଟିଂସ ନିୟନ୍ତ୍ରଣ କରିପାରିବେ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">6. {t("Your Rights", "ଆପଣଙ୍କ ଅଧିକାର")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-3">
              {t("Under applicable Indian data protection laws, you have the right to:", "ପ୍ରଯୋଜ୍ୟ ଭାରତୀୟ ତଥ୍ୟ ସୁରକ୍ଷା ଆଇନ ଅଧୀନରେ, ଆପଣଙ୍କର ଅଧିକାର ଅଛି:")}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="font-sans text-[17px] text-[#333]">{t("Access the personal data we hold about you", "ଆମ ପାଖରେ ଥିବା ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପ୍ରବେଶ କରିବା")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("Request correction of inaccurate data", "ଭୁଲ ତଥ୍ୟ ସଂଶୋଧନ ଅନୁରୋଧ କରିବା")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("Request deletion of your data (subject to legal retention requirements)", "ଆପଣଙ୍କ ତଥ୍ୟ ବିଲୋପ ଅନୁରୋଧ କରିବା (ଆଇନଗତ ସଂରକ୍ଷଣ ଆବଶ୍ୟକତା ସାପେକ୍ଷ)")}</li>
              <li className="font-sans text-[17px] text-[#333]">{t("Withdraw consent for communications at any time", "ଯେକୌଣସି ସମୟରେ ଯୋଗାଯୋଗ ପାଇଁ ସମ୍ମତି ପ୍ରତ୍ୟାହାର କରିବା")}</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">7. {t("Children's Privacy", "ଶିଶୁ ଗୋପନୀୟତା")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "We collect only the child information needed for verification and programme administration. We do not publish a child’s full name, exact address, school details, bank details or sensitive family-loss details. A child’s photograph is published only when guardian consent and a safeguarding review are recorded. Public reports use aggregate information wherever possible.",
                "ଯାଞ୍ଚ ଓ କାର୍ଯ୍ୟକ୍ରମ ପରିଚାଳନା ପାଇଁ ଆବଶ୍ୟକ ଶିଶୁ ସୂଚନା ମାତ୍ର ଆମେ ସଂଗ୍ରହ କରୁ। ଶିଶୁର ପୂର୍ଣ୍ଣ ନାମ, ଠିକଣା, ସ୍କୁଲ ବିବରଣୀ, ବ୍ୟାଙ୍କ ବିବରଣୀ ବା ସମ୍ବେଦନଶୀଳ ପରିବାରିକ ଘଟଣା ଆମେ ପ୍ରକାଶ କରୁ ନାହୁଁ। ଅଭିଭାବକ ସମ୍ମତି ଓ ସୁରକ୍ଷା ସମୀକ୍ଷା ରେକର୍ଡ ହେଲେ ମାତ୍ର ଫଟୋ ପ୍ରକାଶ ହୁଏ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">8. {t("Changes to This Policy", "ଏହି ନୀତିରେ ପରିବର୍ତ୍ତନ")}</h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.",
                "ଆମେ ସମୟ ସମୟରେ ଏହି ଗୋପନୀୟତା ନୀତି ଅଦ୍ୟତନ କରିପାରୁ। କୌଣସି ପରିବର୍ତ୍ତନ ଏକ ଅଦ୍ୟତନ ସଂଶୋଧନ ତାରିଖ ସହ ଏହି ପୃଷ୍ଠାରେ ପୋଷ୍ଟ କରାଯିବ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">9. {t("Contact Us", "ଆମ ସହ ଯୋଗାଯୋଗ")}</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <p className="font-sans text-[17px] text-[#333] leading-relaxed">
                <strong>Abhiara Foundation</strong><br />
                {t("Registered Office: Mumbai, Maharashtra, India", "ନିବନ୍ଧିତ କାର୍ଯ୍ୟାଳୟ: ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ର, ଭାରତ")}<br />
                <strong>{t("Email", "ଇମେଲ")}:</strong> info@abhiarafoundation.org<br />
                <strong>CIN:</strong> U87300MH2026NPL471397
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
