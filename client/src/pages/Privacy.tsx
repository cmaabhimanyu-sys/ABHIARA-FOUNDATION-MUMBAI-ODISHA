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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title="Privacy and Safeguarding | Abhiara Foundation"
        description="Privacy and safeguarding policy for website visitors, programme participants, children and elderly persons connected with Abhiara Foundation."
        url="https://www.abhiarafoundation.org/privacy"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#FAFAFA]">
        <div className="container text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">
            LEGAL
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            {t("Privacy Policy", "ଗୋପନୀୟତା ନୀତି")}
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto mb-4" />
          <p className="font-mono text-[10px] tracking-wider uppercase text-[#888]">
            {t("Last updated: 4 October 2026", "ଶେଷ ଅଦ୍ୟତନ: ୪ ଅକ୍ଟୋବର ୨୦୨୬")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 section-light">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              1. {t("Introduction", "ପରିଚୟ")}
            </h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                'Abhiara Foundation ("we", "us", "our") respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or interact with our programmes.',
                'ଅଭିଆରା ଫାଉଣ୍ଡେସନ ("ଆମେ", "ଆମର") ଆପଣଙ୍କ ଗୋପନୀୟତାକୁ ସମ୍ମାନ କରେ ଏବଂ ଆପଣ ଆମ ସହ ଅଂଶୀଦାର କରୁଥିବା ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ସୁରକ୍ଷିତ ରଖିବାକୁ ପ୍ରତିବଦ୍ଧ। ଏହି ଗୋପନୀୟତା ନୀତି ବ୍ୟାଖ୍ୟା କରେ ଯେ ଆପଣ ଆମ ୱେବସାଇଟ ପରିଦର୍ଶନ କରିବା ବା ଆମ କାର୍ଯ୍ୟକ୍ରମ ସହ ଯୋଗାଯୋଗ କରିବା ସମୟରେ ଆମେ କିପରି ଆପଣଙ୍କ ସୂଚନା ସଂଗ୍ରହ, ବ୍ୟବହାର, ସଂରକ୍ଷଣ ଏବଂ ସୁରକ୍ଷା କରୁ।'
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              2. {t("Information We Collect", "ଆମେ ସଂଗ୍ରହ କରୁଥିବା ସୂଚନା")}
            </h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-3">
              {t(
                "We may collect the following types of information:",
                "ଆମେ ନିମ୍ନଲିଖିତ ପ୍ରକାରର ସୂଚନା ସଂଗ୍ରହ କରିପାରୁ:"
              )}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Personal information: Name, email address, phone number and location when you contact us, volunteer or donate",
                  "ବ୍ୟକ୍ତିଗତ ସୂଚନା: ଯେତେବେଳେ ଆପଣ ଯୋଗାଯୋଗ, ସ୍ୱେଚ୍ଛାସେବା ବା ଦାନ କରନ୍ତି ସେତେବେଳେ ନାମ, ଇମେଲ ଠିକଣା, ଫୋନ ନମ୍ବର ଓ ସ୍ଥାନ"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Website use: our hosting service processes technical request information. Optional analytics may record pages visited only after you allow it in the cookie settings.",
                  "ୱେବସାଇଟ ବ୍ୟବହାର: ଆମର ହୋଷ୍ଟିଂ ସେବା ୱେବ ଅନୁରୋଧର ବୈଷୟିକ ତଥ୍ୟ ପ୍ରକ୍ରିୟା କରେ। କୁକି ସେଟିଂରେ ଆପଣ ଅନୁମତି ଦେଲେ ମାତ୍ର ଇଚ୍ଛାଧୀନ ବିଶ୍ଳେଷଣ ପରିଦର୍ଶିତ ପୃଷ୍ଠା ରେକର୍ଡ କରିପାରେ।"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Donation information: Transaction details when you make a contribution (processed through secure third-party payment gateways)",
                  "ଦାନ ସୂଚନା: ଆପଣ ଅବଦାନ କରିବା ସମୟରେ ଲେନଦେନ ବିବରଣୀ (ସୁରକ୍ଷିତ ତୃତୀୟ ପକ୍ଷ ପେମେଣ୍ଟ ଗେଟୱେ ମାଧ୍ୟମରେ ପ୍ରକ୍ରିୟାକୃତ)"
                )}
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              3.{" "}
              {t(
                "How We Use Your Information",
                "ଆମେ ଆପଣଙ୍କ ସୂଚନା କିପରି ବ୍ୟବହାର କରୁ"
              )}
            </h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "To respond to your enquiries and applications",
                  "ଆପଣଙ୍କ ଅନୁସନ୍ଧାନ ଏବଂ ଆବେଦନର ଉତ୍ତର ଦେବା ପାଇଁ"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "To process donations and provide Donation Acknowledgements when requested",
                  "ଦାନ ପ୍ରକ୍ରିୟା କରିବା ଏବଂ ଅନୁରୋଧରେ ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ଦେବା ପାଇଁ"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "To send updates about our programmes (with your consent)",
                  "ଆମ କାର୍ଯ୍ୟକ୍ରମ ବିଷୟରେ ଅଦ୍ୟତନ ପଠାଇବା ପାଇଁ (ଆପଣଙ୍କ ସମ୍ମତି ସହ)"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "To improve our website and user experience",
                  "ଆମ ୱେବସାଇଟ ଏବଂ ବ୍ୟବହାରକାରୀ ଅନୁଭବ ଉନ୍ନତ କରିବା ପାଇଁ"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "To comply with legal obligations under Indian law",
                  "ଭାରତୀୟ ଆଇନ ଅଧୀନରେ ଆଇନଗତ ବାଧ୍ୟବାଧକତା ପାଳନ ପାଇଁ"
                )}
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              4. {t("Data Protection", "ତଥ୍ୟ ସୁରକ୍ଷା")}
            </h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "We do not sell personal information. Website hosting, the general contact form provider and payment services may process information needed for their functions. We share programme information with an institutional supporter only when there is a clear purpose and the appropriate permission. We do not publish private case records.",
                "ଆମେ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ବିକ୍ରି କରୁ ନାହୁଁ। ୱେବସାଇଟ ହୋଷ୍ଟିଂ, ସାଧାରଣ ଯୋଗାଯୋଗ ଫର୍ମ ଓ ପେମେଣ୍ଟ ସେବା ସେମାନଙ୍କ କାମ ପାଇଁ ଆବଶ୍ୟକ ତଥ୍ୟ ପ୍ରକ୍ରିୟା କରିପାରନ୍ତି। ସ୍ପଷ୍ଟ ଉଦ୍ଦେଶ୍ୟ ଓ ଉପଯୁକ୍ତ ସମ୍ମତି ଥିଲେ ମାତ୍ର ସଂସ୍ଥାଗତ ସହଯୋଗୀଙ୍କ ସହ କାର୍ଯ୍ୟକ୍ରମ ସୂଚନା ସେୟାର କରୁ। ବ୍ୟକ୍ତିଗତ ମାମଲା ରେକର୍ଡ ପ୍ରକାଶ କରୁ ନାହୁଁ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              5. {t("Cookies", "କୁକିଜ")}
            </h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "Required storage keeps the website working and remembers your language and cookie choice. We load Google Analytics or the configured site analytics only if you choose Allow all. Choose Required only to keep optional analytics off. You can reopen the cookie choices below. Your browser can also clear stored information.",
                "ଆବଶ୍ୟକ ସଂରକ୍ଷଣ ୱେବସାଇଟ ଚଲାଇବା ସହ ଆପଣଙ୍କ ଭାଷା ଓ କୁକି ପସନ୍ଦ ମନେ ରଖେ। ଆପଣ ‘ସମସ୍ତକୁ ଅନୁମତି ଦିଅନ୍ତୁ’ ବାଛିଲେ ମାତ୍ର ଗୁଗୁଲ ଆନାଲିଟିକ୍ସ ବା ନିର୍ଦ୍ଧାରିତ ୱେବସାଇଟ ବିଶ୍ଳେଷଣ ଚାଲୁ ହୁଏ। ବିଶ୍ଳେଷଣ ବନ୍ଦ ରଖିବାକୁ ‘କେବଳ ଆବଶ୍ୟକ’ ବାଛନ୍ତୁ। ନିମ୍ନରେ ଆପଣ ପୁଣି କୁକି ପସନ୍ଦ ଖୋଲିପାରିବେ। ବ୍ରାଉଜରରୁ ସଂରକ୍ଷିତ ତଥ୍ୟ ମଧ୍ୟ ମିଟାଇପାରିବେ।"
              )}
            </p>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new Event("abhiara:cookie-settings"))
              }
              className="mb-8 rounded border border-[#9A6100] px-5 py-2 text-sm font-semibold text-[#714700] hover:bg-[#FFF2D8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("Change cookie choice", "କୁକି ପସନ୍ଦ ବଦଳାନ୍ତୁ")}
            </button>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              6. {t("Your Rights", "ଆପଣଙ୍କ ଅଧିକାର")}
            </h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-3">
              {t(
                "Under applicable Indian data protection laws, you have the right to:",
                "ପ୍ରଯୋଜ୍ୟ ଭାରତୀୟ ତଥ୍ୟ ସୁରକ୍ଷା ଆଇନ ଅଧୀନରେ, ଆପଣଙ୍କର ଅଧିକାର ଅଛି:"
              )}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Access the personal data we hold about you",
                  "ଆମ ପାଖରେ ଥିବା ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପ୍ରବେଶ କରିବା"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Request correction of inaccurate data",
                  "ଭୁଲ ତଥ୍ୟ ସଂଶୋଧନ ଅନୁରୋଧ କରିବା"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Request deletion of your data (subject to legal retention requirements)",
                  "ଆପଣଙ୍କ ତଥ୍ୟ ବିଲୋପ ଅନୁରୋଧ କରିବା (ଆଇନଗତ ସଂରକ୍ଷଣ ଆବଶ୍ୟକତା ସାପେକ୍ଷ)"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Withdraw consent for communications at any time",
                  "ଯେକୌଣସି ସମୟରେ ଯୋଗାଯୋଗ ପାଇଁ ସମ୍ମତି ପ୍ରତ୍ୟାହାର କରିବା"
                )}
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              7.{" "}
              {t(
                "Privacy of Children and Elderly Persons",
                "ଶିଶୁ ଓ ବୃଦ୍ଧ ବ୍ୟକ୍ତିଙ୍କ ଗୋପନୀୟତା"
              )}
            </h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-4">
              {t(
                "Children and elderly persons may face greater harm when private information is disclosed. We use additional safeguards to protect their privacy, safety, choice and dignity.",
                "ବ୍ୟକ୍ତିଗତ ସୂଚନା ପ୍ରକାଶ ହେଲେ ଶିଶୁ ଓ ବୃଦ୍ଧ ବ୍ୟକ୍ତିମାନେ ଅଧିକ କ୍ଷତିର ସମ୍ମୁଖୀନ ହୋଇପାରନ୍ତି। ସେମାନଙ୍କ ଗୋପନୀୟତା, ସୁରକ୍ଷା, ପସନ୍ଦ ଓ ମର୍ଯ୍ୟାଦା ରକ୍ଷା ପାଇଁ ଆମେ ଅତିରିକ୍ତ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା ଅନୁସରଣ କରୁ।"
              )}
            </p>

            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">
              7.1 {t("Children's Privacy", "ଶିଶୁ ଗୋପନୀୟତା")}
            </h3>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "We collect only the child information needed for verification and programme administration. We do not publish a child’s full name, exact address, school details, bank details or sensitive family-loss details. A child’s photograph is published only when guardian consent and a safeguarding review are recorded. Public reports use aggregate information wherever possible.",
                "ଯାଞ୍ଚ ଓ କାର୍ଯ୍ୟକ୍ରମ ପରିଚାଳନା ପାଇଁ ଆବଶ୍ୟକ ଶିଶୁ ସୂଚନା ମାତ୍ର ଆମେ ସଂଗ୍ରହ କରୁ। ଶିଶୁର ପୂର୍ଣ୍ଣ ନାମ, ଠିକଣା, ସ୍କୁଲ ବିବରଣୀ, ବ୍ୟାଙ୍କ ବିବରଣୀ ବା ସମ୍ବେଦନଶୀଳ ପରିବାରିକ ଘଟଣା ଆମେ ପ୍ରକାଶ କରୁ ନାହୁଁ। ଅଭିଭାବକ ସମ୍ମତି ଓ ସୁରକ୍ଷା ସମୀକ୍ଷା ରେକର୍ଡ ହେଲେ ମାତ୍ର ଫଟୋ ପ୍ରକାଶ ହୁଏ।"
              )}
            </p>

            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">
              7.2{" "}
              {t(
                "Elderly Privacy and Dignity",
                "ବୃଦ୍ଧ ବ୍ୟକ୍ତିଙ୍କ ଗୋପନୀୟତା ଓ ମର୍ଯ୍ୟାଦା"
              )}
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Older age does not remove a person’s right to decide how their information and image are used. We seek informed consent directly from the elderly person wherever they can decide for themselves. Permission from a family member, caregiver or institution does not replace the person’s own consent.",
                  "ବୟସ ବଢ଼ିଲେ ନିଜ ସୂଚନା ଓ ଫଟୋ କିପରି ବ୍ୟବହାର ହେବ ତାହା ନିଷ୍ପତ୍ତି କରିବାର ଅଧିକାର କମିଯାଏ ନାହିଁ। ବୃଦ୍ଧ ବ୍ୟକ୍ତି ନିଜେ ନିଷ୍ପତ୍ତି ନେଇପାରୁଥିଲେ ଆମେ ସେମାନଙ୍କଠାରୁ ସିଧାସଳଖ ସଚେତନ ସମ୍ମତି ନେଉ। ପରିବାର ସଦସ୍ୟ, ଦେଖଭାଳକାରୀ ବା ସଂସ୍ଥାର ଅନୁମତି ବ୍ୟକ୍ତିଙ୍କ ନିଜ ସମ୍ମତିର ସ୍ଥାନ ନେଉ ନାହିଁ।"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "We collect only the information needed to verify, coordinate and record approved support. We do not publish an elderly person’s full name, exact home or care address, personal phone number, identity documents, bank or pension details, health or disability details, prescriptions, or private family and financial circumstances.",
                  "ଅନୁମୋଦିତ ସହାୟତାର ଯାଞ୍ଚ, ସମନ୍ୱୟ ଓ ରେକର୍ଡ ପାଇଁ ଆବଶ୍ୟକ ସୂଚନା ମାତ୍ର ଆମେ ସଂଗ୍ରହ କରୁ। ବୃଦ୍ଧ ବ୍ୟକ୍ତିଙ୍କ ପୂର୍ଣ୍ଣ ନାମ, ସଠିକ ଘର ବା ଯତ୍ନ କେନ୍ଦ୍ର ଠିକଣା, ବ୍ୟକ୍ତିଗତ ଫୋନ ନମ୍ବର, ପରିଚୟ ପତ୍ର, ବ୍ୟାଙ୍କ ବା ପେନସନ ବିବରଣୀ, ସ୍ୱାସ୍ଥ୍ୟ ବା ଦିବ୍ୟାଙ୍ଗତା ବିବରଣୀ, ଔଷଧ ପ୍ରେସକ୍ରିପସନ, କିମ୍ବା ବ୍ୟକ୍ତିଗତ ପାରିବାରିକ ଓ ଆର୍ଥିକ ପରିସ୍ଥିତି ଆମେ ପ୍ରକାଶ କରୁ ନାହୁଁ।"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "We publish a recognisable photograph, video, quotation or personal story only after consent for that specific public use and a safeguarding review are recorded. If informed consent cannot be obtained, we do not publish identifiable content unless an authorised representative’s permission and the Foundation’s safeguarding approval are both recorded.",
                  "ନିର୍ଦ୍ଦିଷ୍ଟ ସାର୍ବଜନିକ ବ୍ୟବହାର ପାଇଁ ସମ୍ମତି ଓ ସୁରକ୍ଷା ସମୀକ୍ଷା ରେକର୍ଡ ହେଲେ ମାତ୍ର ଆମେ ଚିହ୍ନଟ ହୋଇପାରୁଥିବା ଫଟୋ, ଭିଡିଓ, ଉଦ୍ଧୃତି ବା ବ୍ୟକ୍ତିଗତ କାହାଣୀ ପ୍ରକାଶ କରୁ। ସଚେତନ ସମ୍ମତି ନିଆଯାଇପାରିବ ନାହିଁ ହେଲେ, ଅଧିକୃତ ପ୍ରତିନିଧିଙ୍କ ଅନୁମତି ଓ ଫାଉଣ୍ଡେସନର ସୁରକ୍ଷା ଅନୁମୋଦନ ଉଭୟ ରେକର୍ଡ ନ ହେଉଅବଧି ଚିହ୍ନଟ ହୋଇପାରୁଥିବା ବିଷୟ ପ୍ରକାଶ କରୁ ନାହୁଁ।"
                )}
              </li>
              <li className="font-sans text-[17px] text-[#333]">
                {t(
                  "Public reports use broad locations and combined information wherever possible. We do not use images or language that may embarrass, stereotype or present an elderly person without dignity. Consent for future public use may be withdrawn by contacting the Foundation.",
                  "ସମ୍ଭବ ହେଲେ ସାର୍ବଜନିକ ରିପୋର୍ଟରେ ବ୍ୟାପକ ସ୍ଥାନ ଓ ସାମୂହିକ ସୂଚନା ବ୍ୟବହାର ହୁଏ। ବୃଦ୍ଧ ବ୍ୟକ୍ତିଙ୍କୁ ଲଜ୍ଜିତ କରିପାରୁଥିବା, ଗତାନୁଗତିକ ଧାରଣା ସୃଷ୍ଟି କରୁଥିବା ବା ମର୍ଯ୍ୟାଦା ବିନା ଦେଖାଉଥିବା ଫଟୋ କିମ୍ବା ଭାଷା ଆମେ ବ୍ୟବହାର କରୁ ନାହୁଁ। ଭବିଷ୍ୟତ ସାର୍ବଜନିକ ବ୍ୟବହାର ପାଇଁ ସମ୍ମତି ଫାଉଣ୍ଡେସନ ସହ ଯୋଗାଯୋଗ କରି ପ୍ରତ୍ୟାହାର କରାଯାଇପାରେ।"
                )}
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              8. {t("Changes to This Policy", "ଏହି ନୀତିରେ ପରିବର୍ତ୍ତନ")}
            </h2>
            <p className="font-sans text-[17px] text-[#333] leading-relaxed mb-6">
              {t(
                "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.",
                "ଆମେ ସମୟ ସମୟରେ ଏହି ଗୋପନୀୟତା ନୀତି ଅଦ୍ୟତନ କରିପାରୁ। କୌଣସି ପରିବର୍ତ୍ତନ ଏକ ଅଦ୍ୟତନ ସଂଶୋଧନ ତାରିଖ ସହ ଏହି ପୃଷ୍ଠାରେ ପୋଷ୍ଟ କରାଯିବ।"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              9. {t("Contact Us", "ଆମ ସହ ଯୋଗାଯୋଗ")}
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <p className="font-sans text-[17px] text-[#333] leading-relaxed">
                <strong>Abhiara Foundation</strong>
                <br />
                {t(
                  "Registered Office: Mumbai, Maharashtra, India",
                  "ନିବନ୍ଧିତ କାର୍ଯ୍ୟାଳୟ: ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ର, ଭାରତ"
                )}
                <br />
                <strong>{t("Email", "ଇମେଲ")}:</strong>{" "}
                info@abhiarafoundation.org
                <br />
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
