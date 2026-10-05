import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

type Bilingual = { en: string; od: string };
type PolicySection = {
  heading: Bilingual;
  paragraphs: Bilingual[];
  bullets?: Bilingual[];
};

const email = "info@abhiarafoundation.org";

const sections: PolicySection[] = [
  {
    heading: { en: "Official payment channels", od: "ଅଧିକୃତ ଦାନ ମାଧ୍ୟମ" },
    paragraphs: [
      {
        en: "Donate only through our official website, the Foundation bank account or the authorised UPI QR shown on our donation page. Website donations are one-time only. We never ask supporters to send programme funds to a personal account.",
        od: "ଦୟାକରି ଆମ ଅଧିକୃତ ୱେବସାଇଟ, ଫାଉଣ୍ଡେସନର ବ୍ୟାଙ୍କ ଖାତା କିମ୍ବା ଦାନ ପୃଷ୍ଠାରେ ଥିବା ଅଧିକୃତ UPI QR ମାଧ୍ୟମରେ ମାତ୍ର ଦାନ କରନ୍ତୁ। ୱେବସାଇଟ ମାଧ୍ୟମରେ ଦାନ କେବଳ ଥରେ କରାଯାଏ। କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ଧନ କୌଣସି ବ୍ୟକ୍ତିଗତ ଖାତାକୁ ପଠାଇବାକୁ ଆମେ କହୁ ନାହୁଁ।",
      },
      {
        en: "We do not accept foreign contributions at present. If we receive a payment we cannot lawfully accept, we will address it in accordance with applicable law.",
        od: "ବର୍ତ୍ତମାନ ଆମେ ବିଦେଶୀ ଅନୁଦାନ ଗ୍ରହଣ କରୁ ନାହୁଁ। ଆଇନ ଅନୁସାରେ ଗ୍ରହଣ କରିପାରିବା ନଥିବା ପେମେଣ୍ଟ ମିଳିଲେ ପ୍ରଯୋଜ୍ୟ ଆଇନ ଅନୁଯାୟୀ ତାହାର ବ୍ୟବସ୍ଥା କରିବୁ।",
      },
    ],
  },
  {
    heading: { en: "How donations are used", od: "ଦାନ କିପରି ବ୍ୟବହାର ହୁଏ" },
    paragraphs: [
      {
        en: "A donation for a specific cause is used only for verified needs and reasonable programme costs within that cause:",
        od: "ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣ ପାଇଁ ଦିଆଯାଇଥିବା ଦାନ କେବଳ ସେହି କାରଣର ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଯୁକ୍ତିସଙ୍ଗତ କାର୍ଯ୍ୟକ୍ରମ ଖର୍ଚ୍ଚରେ ବ୍ୟବହୃତ ହୁଏ:",
      },
      {
        en: "We do not move a cause-specific donation to another cause without the donor's consent. If there is no immediate approved need, it remains recorded for the next verified need within the selected cause.",
        od: "ଦାତାଙ୍କ ସମ୍ମତି ବିନା ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣ ପାଇଁ ଦିଆଯାଇଥିବା ଦାନକୁ ଅନ୍ୟ କାରଣକୁ ସ୍ଥାନାନ୍ତର କରୁ ନାହୁଁ। ବର୍ତ୍ତମାନ ଅନୁମୋଦିତ ଆବଶ୍ୟକତା ନଥିଲେ, ସେହି ଦାନ ସେହି କାରଣର ପରବର୍ତ୍ତୀ ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ପାଇଁ ରେକର୍ଡ ହୋଇ ରହିବ।",
      },
      {
        en: "A General Fund donation may be used across approved Abhiara programmes and the necessary costs of carrying out that work, according to verified need and an approved budget. Selecting a cause does not guarantee support to a named person or case.",
        od: "ସାଧାରଣ ପାଣ୍ଠିର ଦାନ ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଅନୁମୋଦିତ ବଜେଟ ଅନୁସାରେ ଅଭିଆରାର ଯେକୌଣସି ଅନୁମୋଦିତ କାର୍ଯ୍ୟକ୍ରମ ଏବଂ ସେହି କାମର ଆବଶ୍ୟକ ଖର୍ଚ୍ଚରେ ବ୍ୟବହାର ହୋଇପାରେ। କାରଣ ବାଛିବା ଦ୍ୱାରା କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ବ୍ୟକ୍ତି ବା ମାମଲାକୁ ସହାୟତା ନିଶ୍ଚିତ ହୁଏ ନାହିଁ।",
      },
      {
        en: "If we can no longer use a cause-specific donation for its selected cause, we will contact the donor to agree on another lawful use or a refund. Until then it remains recorded for that cause; we will not transfer it elsewhere without consent.",
        od: "ବାଛିଥିବା କାରଣ ପାଇଁ ଦାନ ବ୍ୟବହାର କରିବା ଆଉ ସମ୍ଭବ ନହେଲେ, ଅନ୍ୟ ଆଇନସମ୍ମତ ବ୍ୟବହାର ବା ରିଫଣ୍ଡ ବିଷୟରେ ସମ୍ମତି ପାଇଁ ଆମେ ଦାତାଙ୍କ ସହ ଯୋଗାଯୋଗ କରିବୁ। ସେପର୍ଯ୍ୟନ୍ତ ଦାନ ସେହି କାରଣ ପାଇଁ ରେକର୍ଡ ହୋଇ ରହିବ; ସମ୍ମତି ବିନା ଅନ୍ୟତ୍ର ବ୍ୟବହାର ହେବ ନାହିଁ।",
      },
    ],
    bullets: [
      {
        en: "Abhiara Shiksha Sathi: education support and the reasonable costs of providing that support.",
        od: "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ: ଶିକ୍ଷା ସହାୟତା ଏବଂ ସେହି ସହାୟତା ଦେବାର ଯୁକ୍ତିସଙ୍ଗତ ଖର୍ଚ୍ଚ।",
      },
      {
        en: "Elder support, medical emergencies, disaster relief or animal welfare: verified needs and reasonable programme costs within the cause chosen by the donor.",
        od: "ବୟସ୍କ ସହାୟତା, ଚିକିତ୍ସା ଜରୁରୀ ପରିସ୍ଥିତି, ବିପର୍ଯ୍ୟୟ ସହାୟତା ବା ପଶୁ କଲ୍ୟାଣ: ଦାତା ବାଛିଥିବା କାରଣର ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଯୁକ୍ତିସଙ୍ଗତ କାର୍ଯ୍ୟକ୍ରମ ଖର୍ଚ୍ଚ।",
      },
    ],
  },
  {
    heading: {
      en: "Tax status and acknowledgements",
      od: "କର ସ୍ଥିତି ଓ ଦାନ ସ୍ୱୀକୃତି",
    },
    paragraphs: [
      {
        en: "Our 12AB and 80G applications are pending. Donations made while 80G approval is pending are not eligible for an 80G tax deduction.",
        od: "ଆମର 12AB ଓ 80G ଆବେଦନ ବିଚାରାଧୀନ ଅଛି। 80G ଅନୁମୋଦନ ନଥିବା ସମୟରେ କରାଯାଇଥିବା ଦାନ 80G କର ରିହାତି ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ।",
      },
      {
        en: "To request a Donation Acknowledgement, email us the payment reference. The acknowledgement confirms receipt of the donation; it is not an 80G certificate.",
        od: "ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ପାଇଁ ପେମେଣ୍ଟ ରେଫରେନ୍ସ ସହ ଆମକୁ ଇମେଲ କରନ୍ତୁ। ଏହା ଦାନ ପ୍ରାପ୍ତିକୁ ନିଶ୍ଚିତ କରେ; ଏହା 80G ପ୍ରମାଣପତ୍ର ନୁହେଁ।",
      },
    ],
  },
  {
    heading: {
      en: "General refund position",
      od: "ରିଫଣ୍ଡ ସମ୍ପର୍କରେ ସାଧାରଣ ନୀତି",
    },
    paragraphs: [
      {
        en: "Donations are voluntary and generally not refundable once used for an approved purpose. We will still review a duplicate payment, an incorrect amount, a mistaken donation or a payment not authorised by the payer.",
        od: "ଦାନ ସ୍ୱେଚ୍ଛାକୃତ ଏବଂ ଅନୁମୋଦିତ କାର୍ଯ୍ୟରେ ବ୍ୟବହାର ହୋଇସାରିଲେ ସାଧାରଣତଃ ରିଫଣ୍ଡ ହୁଏ ନାହିଁ। ତଥାପି ଦୁଇଥର ପେମେଣ୍ଟ, ଭୁଲ ପରିମାଣ, ଭୁଲରେ କରାଯାଇଥିବା ଦାନ ବା ଦାତାଙ୍କ ଅନୁମତି ବିନା ହୋଇଥିବା ପେମେଣ୍ଟ ଆମେ ସମୀକ୍ଷା କରିବୁ।",
      },
      {
        en: "A verified duplicate payment or an amount collected because of our error will be refunded. Other requests depend on the circumstances, including whether the donation has already been used or irrevocably committed to its stated cause. We will explain a decision to decline a refund.",
        od: "ଯାଞ୍ଚ ହୋଇଥିବା ଦୁଇଥର ପେମେଣ୍ଟ ବା ଆମ ତ୍ରୁଟି ଯୋଗୁଁ ଆଦାୟ ହୋଇଥିବା ରାଶି ଫେରସ୍ତ କରିବୁ। ଅନ୍ୟ ଅନୁରୋଧରେ ଦାନ ପୂର୍ବରୁ ବ୍ୟବହୃତ ହୋଇଛି କିମ୍ବା ସେହି କାରଣ ପାଇଁ ଫେରାଇ ଆଣିହେବ ନାହିଁ ଏପରି ଖର୍ଚ୍ଚ ପାଇଁ ନିର୍ଦ୍ଧାରିତ ହୋଇଛି କି ନାହିଁ, ତାହା ସହ ପରିସ୍ଥିତି ବିଚାର କରିବୁ। ରିଫଣ୍ଡ ନ ଦେବାକୁ ନିଷ୍ପତ୍ତି ହେଲେ କାରଣ ଜଣାଇବୁ।",
      },
    ],
  },
  {
    heading: { en: "How to request a refund", od: "ରିଫଣ୍ଡ କିପରି ମାଗିବେ" },
    paragraphs: [
      {
        en: 'Email us with the subject "Donation refund request" and include:',
        od: '"Donation refund request" ବିଷୟ ଲେଖି ଆମକୁ ଇମେଲ କରନ୍ତୁ। ଏହି ସୂଚନା ଦିଅନ୍ତୁ:',
      },
      {
        en: "Where possible, contact us within 7 days of discovering an issue. We will still review a later request, especially a duplicate or unauthorised payment.",
        od: "ସମ୍ଭବ ହେଲେ ସମସ୍ୟା ଜାଣିବାର ୭ ଦିନ ମଧ୍ୟରେ ଆମକୁ ଲେଖନ୍ତୁ। ପରେ ଆସିଥିବା ଅନୁରୋଧ ମଧ୍ୟ ସମୀକ୍ଷା କରିବୁ, ବିଶେଷକରି ଦୁଇଥର ବା ଅନୁମତି ବିନା ହୋଇଥିବା ପେମେଣ୍ଟ।",
      },
      {
        en: "We aim to acknowledge your request within 3 working days and communicate a decision within 10 working days after receiving the information needed to verify it. We may ask for reasonable proof of the transaction, but never for a card PIN, password or one-time password.",
        od: "ଆପଣଙ୍କ ଅନୁରୋଧ ପାଇବାର ୩ କାର୍ଯ୍ୟଦିବସ ମଧ୍ୟରେ ସ୍ୱୀକୃତି ଜଣାଇବାକୁ ଏବଂ ଯାଞ୍ଚ ପାଇଁ ଆବଶ୍ୟକ ସୂଚନା ମିଳିବାର ୧୦ କାର୍ଯ୍ୟଦିବସ ମଧ୍ୟରେ ନିଷ୍ପତ୍ତି ଜଣାଇବାକୁ ଆମର ଲକ୍ଷ୍ୟ। ପେମେଣ୍ଟର ଯୁକ୍ତିସଙ୍ଗତ ପ୍ରମାଣ ମାଗିପାରୁ, କିନ୍ତୁ କେବେ ବି କାର୍ଡ PIN, ପାସୱାର୍ଡ ବା ଏକଥରିଆ ପାସୱାର୍ଡ ମାଗିବୁ ନାହିଁ।",
      },
      {
        en: "If you believe a payment was unauthorised, notify your bank or payment provider promptly as well. We will cooperate in verifying the transaction.",
        od: "ପେମେଣ୍ଟ ଆପଣଙ୍କ ଅନୁମତି ବିନା ହୋଇଛି ବୋଲି ଭାବୁଥିଲେ ଶୀଘ୍ର ନିଜ ବ୍ୟାଙ୍କ ବା ପେମେଣ୍ଟ ସେବାକୁ ମଧ୍ୟ ଜଣାନ୍ତୁ। ଲେଣଦେଣର ଯାଞ୍ଚରେ ଆମେ ସହଯୋଗ କରିବୁ।",
      },
    ],
    bullets: [
      {
        en: "Donor name and contact details",
        od: "ଦାତାଙ୍କ ନାମ ଓ ଯୋଗାଯୋଗ ସୂଚନା",
      },
      { en: "Donation date and amount", od: "ଦାନ ତାରିଖ ଓ ରାଶି" },
      {
        en: "Payment or transaction reference",
        od: "ପେମେଣ୍ଟ ବା ଲେଣଦେଣ ରେଫରେନ୍ସ",
      },
      {
        en: "Brief explanation of the issue",
        od: "ସମସ୍ୟା ବିଷୟରେ ସଂକ୍ଷିପ୍ତ ବିବରଣୀ",
      },
    ],
  },
  {
    heading: {
      en: "How approved refunds are paid",
      od: "ଅନୁମୋଦିତ ରିଫଣ୍ଡ କିପରି ଫେରସ୍ତ ହୁଏ",
    },
    paragraphs: [
      {
        en: "An approved refund will ordinarily go to the original payment method. We will initiate it promptly after approval; the bank or payment provider may need more time for the money to appear.",
        od: "ଅନୁମୋଦିତ ରିଫଣ୍ଡ ସାଧାରଣତଃ ମୂଳ ପେମେଣ୍ଟ ମାଧ୍ୟମକୁ ଫେରିବ। ଅନୁମୋଦନ ପରେ ଆମେ ଶୀଘ୍ର ପ୍ରକ୍ରିୟା ଆରମ୍ଭ କରିବୁ; ରାଶି ଖାତାରେ ଦେଖାଯିବାକୁ ବ୍ୟାଙ୍କ ବା ପେମେଣ୍ଟ ସେବା ଅଧିକ ସମୟ ନେଇପାରେ।",
      },
      {
        en: "We will not deduct payment charges from a refund arising from our error or a verified duplicate charge. For another approved refund, we will tell the donor in advance if an actual, non-recoverable payment-provider charge is proposed to be deducted, where permitted by law.",
        od: "ଆମ ତ୍ରୁଟି ବା ଯାଞ୍ଚ ହୋଇଥିବା ଦୁଇଥର ଆଦାୟ ପାଇଁ ଦିଆଯାଉଥିବା ରିଫଣ୍ଡରୁ ପେମେଣ୍ଟ ଶୁଳ୍କ କାଟିବୁ ନାହିଁ। ଅନ୍ୟ ଅନୁମୋଦିତ ରିଫଣ୍ଡରେ ଆଇନ ଅନୁମତି ଦେଲେ ମାତ୍ର, ପେମେଣ୍ଟ ସେବାର ପ୍ରକୃତ ଓ ଫେରସ୍ତ ନ ମିଳୁଥିବା ଶୁଳ୍କ କାଟିବାର ପ୍ରସ୍ତାବ ଥିଲେ ଆଗରୁ ଦାତାଙ୍କୁ ଜଣାଇବୁ।",
      },
    ],
  },
  {
    heading: {
      en: "Failed or pending payments",
      od: "ବିଫଳ ବା ଅପେକ୍ଷାରତ ପେମେଣ୍ଟ",
    },
    paragraphs: [
      {
        en: "If a payment fails or is pending but money was debited, contact your bank or payment provider and email us the payment reference. We will check whether the Foundation received the money and help resolve the discrepancy. Do not pay again merely because the first transaction has not yet been confirmed.",
        od: "ପେମେଣ୍ଟ ବିଫଳ ବା ଅପେକ୍ଷାରତ ଦେଖାଯାଉଥିଲେ ମଧ୍ୟ ଟଙ୍କା କଟିଥିଲେ ନିଜ ବ୍ୟାଙ୍କ ବା ପେମେଣ୍ଟ ସେବା ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ ଓ ପେମେଣ୍ଟ ରେଫରେନ୍ସ ସହ ଆମକୁ ଇମେଲ କରନ୍ତୁ। ଫାଉଣ୍ଡେସନକୁ ରାଶି ମିଳିଛି କି ନାହିଁ ଆମେ ଯାଞ୍ଚ କରି ଅମେଳ ସମାଧାନରେ ସହଯୋଗ କରିବୁ। ପ୍ରଥମ ଲେଣଦେଣ ନିଶ୍ଚିତ ହୋଇନଥିବାରୁ ମାତ୍ର ପୁଣି ଦାନ କରନ୍ତୁ ନାହିଁ।",
      },
    ],
  },
  {
    heading: { en: "Lawful donations", od: "ଆଇନସମ୍ମତ ଦାନ" },
    paragraphs: [
      {
        en: "Donations must not come from unlawful funds or be offered to obtain an improper benefit, influence a decision or hide the source of funds. We may request information reasonably needed to verify a donation and decline or return a payment if accepting it would be unlawful or raise a material compliance concern. A return will follow applicable law and, where possible, use the original payment channel.",
        od: "ଦାନ ବେଆଇନ ଧନରୁ ହୋଇପାରିବ ନାହିଁ; ଅନୁଚିତ ଲାଭ ନେବା, ନିଷ୍ପତ୍ତିକୁ ପ୍ରଭାବିତ କରିବା ବା ଧନର ଉତ୍ସ ଲୁଚାଇବା ପାଇଁ ମଧ୍ୟ ଦିଆଯିବା ଉଚିତ ନୁହେଁ। ଦାନ ଯାଞ୍ଚ ପାଇଁ ଯୁକ୍ତିସଙ୍ଗତ ଭାବେ ଆବଶ୍ୟକ ସୂଚନା ମାଗିପାରୁ ଏବଂ ଗ୍ରହଣ କରିବା ବେଆଇନ ହେଲେ ବା ଗୁରୁତର ଆଇନଗତ ଅନୁପାଳନ ଚିନ୍ତା ଥିଲେ ପେମେଣ୍ଟ ପ୍ରତ୍ୟାଖ୍ୟାନ ବା ଫେରସ୍ତ କରିପାରୁ। ଫେରସ୍ତ ପ୍ରଯୋଜ୍ୟ ଆଇନ ଅନୁସାରେ ଏବଂ ସମ୍ଭବ ହେଲେ ମୂଳ ପେମେଣ୍ଟ ମାଧ୍ୟମରେ ହେବ।",
      },
    ],
  },
  {
    heading: { en: "Changes and contact", od: "ନୀତି ପରିବର୍ତ୍ତନ ଓ ଯୋଗାଯୋଗ" },
    paragraphs: [
      {
        en: "We may update this policy by publishing a revised version with a new last-updated date. The version in effect when a donation was made will apply to that donation.",
        od: "ନୂଆ ଅଦ୍ୟତନ ତାରିଖ ସହ ସଂଶୋଧିତ ନୀତି ପ୍ରକାଶ କରିପାରୁ। ଦାନ କରିବା ସମୟରେ ଲାଗୁ ଥିବା ନୀତି ସେହି ଦାନ ପାଇଁ ଲାଗୁ ହେବ।",
      },
      {
        en: "For donation questions or refund requests, email Abhiara Foundation. Its registered office is in Mumbai, Maharashtra.",
        od: "ଦାନ ସମ୍ବନ୍ଧୀୟ ପ୍ରଶ୍ନ ବା ରିଫଣ୍ଡ ଅନୁରୋଧ ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ ଇମେଲ କରନ୍ତୁ। ଏହାର ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ରରେ ଅଛି।",
      },
    ],
  },
];

export default function DonationPolicy() {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Donation and Refund Policy | Abhiara Foundation",
          "ଦାନ ଓ ରିଫଣ୍ଡ ନୀତି | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Donation use, tax status, mistaken payments and refund requests.",
          "ଦାନର ବ୍ୟବହାର, କର ସ୍ଥିତି, ଭୁଲ ପେମେଣ୍ଟ ଓ ରିଫଣ୍ଡ ଅନୁରୋଧ ବିଷୟରେ ସୂଚନା।"
        )}
        url="https://www.abhiarafoundation.org/donation-and-refund-policy"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pt-32 pb-16 text-white md:pt-40">
          <div className="container max-w-4xl">
            <h1 className="font-serif text-4xl font-bold text-white md:text-6xl">
              {t("Donation and Refund Policy", "ଦାନ ଓ ରିଫଣ୍ଡ ନୀତି")}
            </h1>
            <p className="mt-5 font-sans text-sm text-white/75">
              {t("Last updated: 5 October 2026", "ଶେଷ ଅଦ୍ୟତନ: ୫ ଅକ୍ଟୋବର ୨୦୨୬")}
            </p>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/85">
              {t(
                "This policy explains how Abhiara Foundation accepts and uses monetary donations and handles payment errors and refund requests. Please read it before donating.",
                "ଅଭିଆରା ଫାଉଣ୍ଡେସନ କିପରି ଆର୍ଥିକ ଦାନ ଗ୍ରହଣ ଓ ବ୍ୟବହାର କରେ, ପେମେଣ୍ଟ ତ୍ରୁଟି ଓ ରିଫଣ୍ଡ ଅନୁରୋଧ କିପରି ସମ୍ଭାଳେ, ତାହା ଏହି ନୀତିରେ ବୁଝାଯାଇଛି। ଦାନ କରିବା ପୂର୍ବରୁ ଏହା ପଢ଼ନ୍ତୁ।"
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
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <div key={paragraph.en}>
                    <p className="mt-4 font-sans text-base leading-relaxed text-[#333]">
                      {t(paragraph.en, paragraph.od)}
                    </p>
                    {section.bullets && paragraphIndex === 0 && (
                      <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#333]">
                        {section.bullets.map(item => (
                          <li key={item.en}>{t(item.en, item.od)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {(index === 2 || index === 4 || index === 8) && (
                  <a
                    className="mt-4 inline-block break-all font-semibold text-[#765000] underline"
                    href={`mailto:${email}${index === 4 ? "?subject=Donation%20refund%20request" : ""}`}
                  >
                    {email}
                  </a>
                )}
              </article>
            ))}
            <p className="text-sm text-[#555]">
              {t("Also read our", "ଏହା ମଧ୍ୟ ପଢ଼ନ୍ତୁ:")}{" "}
              <Link
                href="/terms"
                className="font-semibold text-[#765000] underline"
              >
                {t("Terms of Use", "ବ୍ୟବହାର ନିୟମ")}
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
