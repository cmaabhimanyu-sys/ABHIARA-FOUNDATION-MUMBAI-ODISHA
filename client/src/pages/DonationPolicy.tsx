import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DonationPolicy() {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sections = [
    [
      t("Official payment channels", "ଅଧିକୃତ ପେମେଣ୍ଟ ମାଧ୍ୟମ"),
      t(
        "Please donate only through the official website, the Foundation bank account or the authorised UPI QR shown on the donation page. The Foundation never asks supporters to transfer programme funds to personal accounts.",
        "ଦୟାକରି ଅଧିକୃତ ୱେବସାଇଟ, ଫାଉଣ୍ଡେସନ ବ୍ୟାଙ୍କ ଖାତା ବା ଦାନ ପୃଷ୍ଠାର ଅନୁମୋଦିତ UPI QR ମାଧ୍ୟମରେ ମାତ୍ର ଦାନ କରନ୍ତୁ। ଫାଉଣ୍ଡେସନ କେବେ ବି ବ୍ୟକ୍ତିଗତ ଖାତାକୁ କାର୍ଯ୍ୟକ୍ରମ ଧନ ପଠାଇବାକୁ କୁହେ ନାହିଁ।"
      ),
    ],
    [
      t("Donation use", "ଦାନ ବ୍ୟବହାର"),
      t(
        "A donation made for a specific cause is restricted to verified needs and reasonable programme costs within that same cause. An Abhiara Shiksha Sathi donation is used only for education support. The same rule applies separately to elder support, medical emergency help, disaster relief and animal welfare. A cause-specific donation is not moved to another cause. If no immediate approved need is ready, it remains recorded for the next verified need within that cause. General Fund donations may be used across any approved Abhiara programme and the necessary costs of carrying out that work, based on verified need and an approved budget. Selecting a cause does not promise support to a named person or case.",
        "ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣ ପାଇଁ ଦିଆଯାଇଥିବା ଦାନ କେବଳ ସେହି କ୍ଷେତ୍ରର ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଯୁକ୍ତିସଙ୍ଗତ କାର୍ଯ୍ୟକ୍ରମ ଖର୍ଚ୍ଚରେ ବ୍ୟବହୃତ ହୁଏ। ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ପାଇଁ ଦାନ କେବଳ ଶିକ୍ଷା ସହାୟତାରେ ବ୍ୟବହୃତ ହୁଏ। ବୟସ୍କ ସହାୟତା, ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା, ବିପର୍ଯ୍ୟୟ ସହାୟତା ଓ ପଶୁ କଲ୍ୟାଣ ପାଇଁ ମଧ୍ୟ ଏହି ନିୟମ ଅଲଗା ଭାବେ ଲାଗୁ ହୁଏ। ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣର ଦାନ ଅନ୍ୟ କାରଣକୁ ସ୍ଥାନାନ୍ତର ହୁଏ ନାହିଁ। ବର୍ତ୍ତମାନ କୌଣସି ଅନୁମୋଦିତ ଆବଶ୍ୟକତା ନଥିଲେ, ସେହି ଦାନ ସେହି କାରଣର ପରବର୍ତ୍ତୀ ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ପାଇଁ ରେକର୍ଡ ହୋଇ ରହିବ। ସାଧାରଣ ପାଣ୍ଠିର ଦାନ ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଅନୁମୋଦିତ ବଜେଟ ଅନୁଯାୟୀ ଯେକୌଣସି ଅନୁମୋଦିତ ଅଭିଆରା କାର୍ଯ୍ୟକ୍ରମ ଏବଂ ସେହି କାମ କରିବାର ଆବଶ୍ୟକ ଖର୍ଚ୍ଚରେ ବ୍ୟବହୃତ ହୋଇପାରେ। କାରଣ ବାଛିବା ଦ୍ୱାରା କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ବ୍ୟକ୍ତି ବା ମାମଲାକୁ ସହାୟତାର ପ୍ରତିଶ୍ରୁତି ମିଳେ ନାହିଁ।"
      ),
    ],
    [
      t("80G status", "80G ସ୍ଥିତି"),
      t(
        "Until 80G approval is received, donations are not eligible for an 80G tax deduction. Donors may request a Donation Acknowledgement.",
        "80G ଅନୁମୋଦନ ମିଳିବା ପର୍ଯ୍ୟନ୍ତ ଦାନ 80G କର ରିହାତି ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ। ଦାତା ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ମାଗିପାରନ୍ତି।"
      ),
    ],
    [
      t("Refund requests", "ରିଫଣ୍ଡ ଅନୁରୋଧ"),
      t(
        "If a donation was made by mistake or paid twice, email info@abhiarafoundation.org with the payment reference as soon as possible. Refunds are not automatic. We will check the payment record, whether the funds have been used or committed, and any payment charges before deciding.",
        "ଭୁଲରେ ବା ଦୁଇଥର ଦାନ ହୋଇଥିଲେ ପେମେଣ୍ଟ ରେଫରେନ୍ସ ସହ ଶୀଘ୍ର info@abhiarafoundation.org କୁ ଇମେଲ କରନ୍ତୁ। ରିଫଣ୍ଡ ସ୍ୱୟଂଚାଳିତ ନୁହେଁ। ନିଷ୍ପତ୍ତି ପୂର୍ବରୁ ରେକର୍ଡ, ପେମେଣ୍ଟ ସ୍ଥିତି, ଧନ ପୂର୍ବରୁ ବ୍ୟବହାର ପାଇଁ ଅନୁମୋଦିତ କି ନାହିଁ ଓ ପେମେଣ୍ଟ ଶୁଳ୍କ ସମୀକ୍ଷା ହେବ।"
      ),
    ],
  ];
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Donation and Refund Policy | Abhiara Foundation",
          "ଦାନ ଓ ରିଫଣ୍ଡ ନୀତି | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description="Official payment channels, donation use, 80G status and refund review policy."
        url="https://www.abhiarafoundation.org/donation-and-refund-policy"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pt-32 pb-20 text-white md:pt-40">
          <div className="container max-w-4xl">
            <h1 className="font-serif text-4xl font-bold md:text-6xl">
              {t("Donation and Refund Policy", "ଦାନ ଓ ରିଫଣ୍ଡ ନୀତି")}
            </h1>
            <p className="mt-6 font-sans text-base text-white/70">
              {t(
                "Plain information for donors using official Abhiara Foundation payment channels.",
                "ଅଧିକୃତ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ପେମେଣ୍ଟ ମାଧ୍ୟମ ବ୍ୟବହାର କରୁଥିବା ଦାତାଙ୍କ ପାଇଁ ସରଳ ସୂଚନା।"
              )}
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl space-y-5">
            {sections.map(([title, body]) => (
              <article key={title} className="border border-gray-200 p-7">
                <h2 className="font-serif text-2xl font-bold">{title}</h2>
                <p className="mt-4 font-sans text-sm leading-relaxed text-[#555]">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
