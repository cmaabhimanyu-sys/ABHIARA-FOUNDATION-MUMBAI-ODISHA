export type LocalizedText = {
  en: string;
  od: string;
};

export type StoryCategory =
  | "founder"
  | "education"
  | "supporters"
  | "jeevan-sathi"
  | "relief"
  | "events";

export type BlogStory = {
  slug: string;
  category: StoryCategory;
  title: LocalizedText;
  excerpt: LocalizedText;
  paragraphs: LocalizedText[];
  dateISO: string;
  date: LocalizedText;
  location: LocalizedText;
  result: LocalizedText;
  resultLabel?: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  imagePosition?: string;
  evidenceHref: string;
  evidenceLabel?: LocalizedText;
  author?: LocalizedText;
  authorRole?: LocalizedText;
  featured?: boolean;
};

export const STORY_CATEGORY_LABELS: Record<StoryCategory, LocalizedText> = {
  founder: {
    en: "Founder Story / Our Story",
    od: "ପ୍ରତିଷ୍ଠାତାଙ୍କ କାହାଣୀ / ଆମ କାହାଣୀ",
  },
  education: { en: "Education Support", od: "ଶିକ୍ଷା ସହାୟତା" },
  supporters: { en: "Institutional Support", od: "ସଂସ୍ଥାଗତ ସହାୟତା" },
  "jeevan-sathi": { en: "Jeevan Sathi", od: "ଜୀବନ ସାଥୀ" },
  relief: { en: "Emergency Relief", od: "ଜରୁରୀ ସହାୟତା" },
  events: { en: "Events and Activities", od: "କାର୍ଯ୍ୟକ୍ରମ ଓ କାର୍ଯ୍ୟକଳାପ" },
};

export const BLOG_STORIES: BlogStory[] = [
  {
    slug: "someone-once-extended-a-hand",
    category: "founder",
    featured: true,
    title: {
      en: "From Raisar to a Structured Education Programme",
      od: "ରାଇସରରୁ ସଂଗଠିତ ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ପର୍ଯ୍ୟନ୍ତ",
    },
    excerpt: {
      en: "Abhiara Foundation is a Section 8 not for profit company focused on verified education support for orphaned and underprivileged children.",
      od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଏକ ଧାରା ୮ ଅଲାଭକାରୀ କମ୍ପାନୀ, ଯାହା ଅନାଥ ଓ ସୁବିଧାବଞ୍ଚିତ ଶିଶୁଙ୍କ ଯାଞ୍ଚ ଆଧାରିତ ଶିକ୍ଷା ସହାୟତା ଉପରେ କେନ୍ଦ୍ରିତ।",
    },
    paragraphs: [
      {
        en: "Founder Abhimanyu Mallik grew up in his home village of Raisar in Kendrapara district, Odisha. He faced limited opportunities, a lack of guidance and financial difficulties. Family, friends and relatives supported him as he built his career in Odisha and later moved to Mumbai.",
        od: "ପ୍ରତିଷ୍ଠାତା ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାର ନିଜ ଗାଁ ରାଇସରରେ ବଢ଼ିଥିଲେ। ସେ ସୁଯୋଗ ଓ ମାର୍ଗଦର୍ଶନର ଅଭାବ ସହ ଆର୍ଥିକ ଅସୁବିଧାର ମଧ୍ୟ ସମ୍ମୁଖୀନ ହୋଇଥିଲେ। ଓଡ଼ିଶାରେ କାର୍ଯ୍ୟଜୀବନ ଗଢ଼ି ପରେ ମୁମ୍ବାଇ ଯିବା ପର୍ଯ୍ୟନ୍ତ ପରିବାର, ସାଙ୍ଗ ଓ ସମ୍ପର୍କୀୟମାନେ ତାଙ୍କୁ ସହାୟତା କରିଥିଲେ।",
      },
      {
        en: "Their help influenced his decision to give back to society. Today, Abhiara Foundation's members, advisors, volunteers and institutional supporters contribute to its education work. Families from any Indian state may email an education request for case-by-case review. Support depends on verified need and available funds.",
        od: "ସେମାନଙ୍କ ସହାୟତା ତାଙ୍କୁ ସମାଜକୁ ସହାୟତା ଫେରାଇବାକୁ ପ୍ରେରିତ କରିଥିଲା। ଆଜି ଅଭିଆରା ଫାଉଣ୍ଡେସନର ସଦସ୍ୟ, ପରାମର୍ଶଦାତା, ସ୍ୱେଚ୍ଛାସେବୀ ଓ ସଂସ୍ଥାଗତ ସମର୍ଥକମାନେ ଏହାର ଶିକ୍ଷା କାର୍ଯ୍ୟରେ ଯୋଗ ଦେଉଛନ୍ତି। ଭାରତର ଯେକୌଣସି ରାଜ୍ୟର ପରିବାର ଶିକ୍ଷା ସହାୟତା ପାଇଁ ଇମେଲ କରିପାରିବେ। ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଉପଲବ୍ଧ ଅର୍ଥ ଅନୁସାରେ ପ୍ରତ୍ୟେକ ଅନୁରୋଧକୁ ଅଲଗା ଭାବେ ସମୀକ୍ଷା କରାଯାଏ।",
      },
      {
        en: "Education is the main programme area. Support may include tuition, school materials and other approved needs that help a child continue learning.",
        od: "ଶିକ୍ଷା ହେଉଛି ପ୍ରମୁଖ କାର୍ଯ୍ୟକ୍ରମ କ୍ଷେତ୍ର। ସହାୟତାରେ ଟ୍ୟୁସନ, ସ୍କୁଲ ସାମଗ୍ରୀ ଓ ଶିଶୁଙ୍କ ପଢ଼ା ଜାରି ରଖିବାରେ ଉପଯୋଗୀ ଅନ୍ୟ ଅନୁମୋଦିତ ଆବଶ୍ୟକତା ରହିପାରେ।",
      },
      {
        en: "Every request is considered against documented need, available funds and an approved programme budget. Support is not automatic and is not promised in advance.",
        od: "ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଲିପିବଦ୍ଧ ଆବଶ୍ୟକତା, ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ କାର୍ଯ୍ୟକ୍ରମ ବଜେଟ ଆଧାରରେ ବିଚାର କରାଯାଏ। ସହାୟତା ସ୍ୱୟଂଚାଳିତ ନୁହେଁ ଏବଂ ଆଗୁଆ ପ୍ରତିଶ୍ରୁତି ଦିଆଯାଏ ନାହିଁ।",
      },
      {
        en: "Public reporting uses aggregate information and reviewed records. Child names, private hardship details and identity documents are not published.",
        od: "ସାର୍ବଜନିକ ରିପୋର୍ଟରେ ସମିକ୍ତ ସୂଚନା ଓ ସମୀକ୍ଷା ହୋଇଥିବା ରେକର୍ଡ ବ୍ୟବହାର କରାଯାଏ। ଶିଶୁଙ୍କ ନାମ, ବ୍ୟକ୍ତିଗତ କଷ୍ଟର ବିବରଣୀ ଓ ପରିଚୟ ପତ୍ର ପ୍ରକାଶ କରାଯାଏ ନାହିଁ।",
      },
      {
        en: "Secondary support for elders, medical emergencies, disaster relief and animal welfare remains limited, verified and subject to available funds and approved budget.",
        od: "ବୃଦ୍ଧ, ଚିକିତ୍ସା ଜରୁରୀ ପରିସ୍ଥିତି, ବିପର୍ଯ୍ୟୟ ସହାୟତା ଓ ପଶୁ କଲ୍ୟାଣ ପାଇଁ ଦ୍ୱିତୀୟ ସହାୟତା ସୀମିତ, ଯାଞ୍ଚ ଆଧାରିତ ଏବଂ ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭରଶୀଳ।",
      },
    ],
    dateISO: "2026-09-12",
    date: { en: "12 September 2026", od: "୧୨ ସେପ୍ଟେମ୍ବର ୨୦୨୬" },
    location: { en: "Odisha and Mumbai, India", od: "ଓଡ଼ିଶା ଓ ମୁମ୍ବାଇ, ଭାରତ" },
    result: {
      en: "Verified education support with privacy and accountability.",
      od: "ଗୋପନୀୟତା ଓ ଉତ୍ତରଦାୟିତ୍ୱ ସହ ଯାଞ୍ଚ ଆଧାରିତ ଶିକ୍ଷା ସହାୟତା।",
    },
    resultLabel: { en: "Story focus", od: "କାହାଣୀର ମୂଳ କଥା" },
    image: "/images/team-abhimanyu-mallik.png",
    imageAlt: {
      en: "Abhimanyu Mallik, Founder and Director of Abhiara Foundation",
      od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ପ୍ରତିଷ୍ଠାତା ଓ ନିର୍ଦ୍ଦେଶକ ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ",
    },
    imagePosition: "center 20%",
    evidenceHref: "/our-story",
    evidenceLabel: { en: "Read Our Story", od: "ଆମ କାହାଣୀ ପଢ଼ନ୍ତୁ" },
    author: { en: "Abhiara Foundation", od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ" },
    authorRole: { en: "Public information", od: "ସାର୍ବଜନିକ ସୂଚନା" },
  },
  {
    slug: "fynd-foundation-supports-education-programme",
    category: "supporters",
    title: {
      en: "Fynd Foundation supports Abhiara’s education programme",
      od: "Fynd Foundation ଅଭିଆରାର ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମକୁ ସହାୟତା କରୁଛି",
    },
    excerpt: {
      en: "Fynd Foundation, Mumbai supports Abhiara Foundation’s education programme in Odisha for orphaned children and children from underprivileged families.",
      od: "Fynd Foundation, Mumbai ଓଡ଼ିଶାରେ ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କ ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମକୁ ସହାୟତା କରୁଛି।",
    },
    paragraphs: [
      {
        en: "Fynd Foundation, Mumbai supports Abhiara Foundation’s education programme in Odisha for orphaned children and children from underprivileged families.",
        od: "Fynd Foundation, Mumbai ଓଡ଼ିଶାରେ ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କ ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମକୁ ସହାୟତା କରୁଛି।",
      },
      {
        en: "The support is linked to Abhiara Shiksha Sathi. Under this programme, approved education help may include tuition, school bags, books, stationery, uniforms, examination needs and learning materials according to verified need.",
        od: "ଏହି ସହାୟତା ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ସହ ଯୋଡ଼ା। ଏହି କାର୍ଯ୍ୟକ୍ରମରେ ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଅନୁସାରେ ଅନୁମୋଦିତ ଶିକ୍ଷା ସହାୟତାରେ ଟ୍ୟୁସନ, ସ୍କୁଲ ବ୍ୟାଗ, ପୁସ୍ତକ, ଷ୍ଟେସନେରୀ, ୟୁନିଫର୍ମ, ପରୀକ୍ଷା ଆବଶ୍ୟକତା ଓ ପଢ଼ା ସାମଗ୍ରୀ ରହିପାରେ।",
      },
      {
        en: "The Foundation maintains programme approvals, payment records and follow-up. Public updates use combined information and do not publish child names, identity documents, exact addresses or private hardship histories.",
        od: "ଫାଉଣ୍ଡେସନ କାର୍ଯ୍ୟକ୍ରମ ଅନୁମୋଦନ, ପେମେଣ୍ଟ ରେକର୍ଡ ଓ ଅନୁସରଣ ରଖେ। ସାର୍ବଜନିକ ଅଦ୍ୟତନରେ ସାମୂହିକ ତଥ୍ୟ ବ୍ୟବହାର ହୁଏ ଏବଂ ଶିଶୁଙ୍କ ନାମ, ପରିଚୟ ପତ୍ର, ସଠିକ ଠିକଣା ବା ବ୍ୟକ୍ତିଗତ କଷ୍ଟର ବିବରଣୀ ପ୍ରକାଶ ହୁଏ ନାହିଁ।",
      },
      {
        en: "This is recorded as institutional support. Abhiara Foundation does not represent it as CSR expenditure, CSR implementation or CSR eligibility.",
        od: "ଏହା ସଂସ୍ଥାଗତ ସହାୟତା ଭାବେ ରେକର୍ଡ ହୋଇଛି। ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଏହାକୁ CSR ଖର୍ଚ୍ଚ, CSR କାର୍ଯ୍ୟନ୍ୱୟନ ବା CSR ଯୋଗ୍ୟତା ଭାବେ ଦେଖାଏ ନାହିଁ।",
      },
    ],
    dateISO: "2026-09-30",
    date: { en: "Current support record", od: "ବର୍ତ୍ତମାନ ସହାୟତା ରେକର୍ଡ" },
    location: { en: "Mumbai and Odisha, India", od: "ମୁମ୍ବାଇ ଓ ଓଡ଼ିଶା, ଭାରତ" },
    result: {
      en: "Institutional support for the education programme in Odisha",
      od: "ଓଡ଼ିଶାର ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ସଂସ୍ଥାଗତ ସହାୟତା",
    },
    resultLabel: { en: "Support record", od: "ସହାୟତା ରେକର୍ଡ" },
    image: "/images/csr-fynd-foundation-mumbai.png",
    imageAlt: {
      en: "Fynd Foundation logo",
      od: "Fynd Foundation ଲୋଗୋ",
    },
    evidenceHref: "/partners-and-supporters",
    evidenceLabel: {
      en: "See partners and supporters",
      od: "ସହଯୋଗୀ ଓ ସମର୍ଥକ ଦେଖନ୍ତୁ",
    },
  },
  {
    slug: "pratibha-samman-2026",
    category: "education",
    title: {
      en: "57 students honoured at Abhiara Pratibha Samman 2026",
      od: "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ ୨୦୨୬ରେ ୫୭ ଛାତ୍ରଛାତ୍ରୀ ସମ୍ମାନିତ",
    },
    excerpt: {
      en: "Students of Raisar Kharisan High School were recognised with trophies, certificates, and medals on 4 June 2026.",
      od: "୪ ଜୁନ ୨୦୨୬ରେ ରାଇସର ଖରିସାନ ଉଚ୍ଚ ବିଦ୍ୟାଳୟର ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ଟ୍ରଫି, ପ୍ରମାଣପତ୍ର ଓ ପଦକ ଦେଇ ସମ୍ମାନିତ କରାଗଲା।",
    },
    paragraphs: [
      {
        en: "Abhiara Pratibha Samman was held at Raisar Kharisan High School in Garadpur, Kendrapara, on 4 June 2026. The programme brought students, teachers, school committee members, guests, and the Abhiara Foundation team together at the school.",
        od: "୪ ଜୁନ ୨୦୨୬ରେ କେନ୍ଦ୍ରାପଡ଼ାର ଗରଦପୁରସ୍ଥିତ ରାଇସର ଖରିସାନ ଉଚ୍ଚ ବିଦ୍ୟାଳୟରେ ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ ଆୟୋଜିତ ହୋଇଥିଲା। ଏହି କାର୍ଯ୍ୟକ୍ରମରେ ଛାତ୍ରଛାତ୍ରୀ, ଶିକ୍ଷକ, ବିଦ୍ୟାଳୟ କମିଟି ସଦସ୍ୟ, ଅତିଥି ଏବଂ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ ଯୋଗ ଦେଇଥିଲେ।",
      },
      {
        en: "A total of 57 students were honoured. Students received trophies, certificates, and medals during the ceremony. The purpose of the programme was simple: recognise their effort and encourage them to continue their studies.",
        od: "ମୋଟ ୫୭ ଜଣ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ସମ୍ମାନିତ କରାଗଲା। ସମାରୋହରେ ସେମାନଙ୍କୁ ଟ୍ରଫି, ପ୍ରମାଣପତ୍ର ଓ ପଦକ ଦିଆଗଲା। ସେମାନଙ୍କ ପରିଶ୍ରମକୁ ସମ୍ମାନ ଦେବା ଏବଂ ପାଠପଢ଼ା ଜାରି ରଖିବାକୁ ଉତ୍ସାହ ଦେବା ଥିଲା ଏହି କାର୍ଯ୍ୟକ୍ରମର ସରଳ ଉଦ୍ଦେଶ୍ୟ।",
      },
      {
        en: "The public record includes ceremony photographs, local newspaper coverage, and a programme video. These materials are available in the June 2026 Monthly Impact report.",
        od: "ସାର୍ବଜନୀନ ରେକର୍ଡରେ ସମାରୋହର ଫଟୋ, ସ୍ଥାନୀୟ ଖବରକାଗଜ କଭରେଜ ଓ କାର୍ଯ୍ୟକ୍ରମ ଭିଡିଓ ରହିଛି। ଏହି ସାମଗ୍ରୀ ଜୁନ ୨୦୨୬ ମାସିକ ପ୍ରଭାବ ରିପୋର୍ଟରେ ଦେଖିପାରିବେ।",
      },
    ],
    dateISO: "2026-06-04",
    date: { en: "4 June 2026", od: "୪ ଜୁନ ୨୦୨୬" },
    location: {
      en: "Raisar, Garadpur, Kendrapara, Odisha",
      od: "ରାଇସର, ଗରଦପୁର, କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    },
    result: { en: "57 students honoured", od: "୫୭ ଛାତ୍ରଛାତ୍ରୀ ସମ୍ମାନିତ" },
    image: "/images/pratibha-samman-group.jpeg",
    imageAlt: {
      en: "Students, teachers, guests, and Abhiara Foundation team at Pratibha Samman 2026",
      od: "ପ୍ରତିଭା ସମ୍ମାନ ୨୦୨୬ରେ ଛାତ୍ରଛାତ୍ରୀ, ଶିକ୍ଷକ, ଅତିଥି ଓ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ",
    },
    evidenceHref: "/abhiara-pratibha-samman",
  },
  {
    slug: "fire-relief-kankili",
    category: "relief",
    title: {
      en: "Support after a house fire in Kankili village",
      od: "କଙ୍କିଲି ଗ୍ରାମରେ ଘର ଅଗ୍ନିକାଣ୍ଡ ପରେ ସହାୟତା",
    },
    excerpt: {
      en: "The team visited a fire-affected family in Dhenkanal and handed over clothes, rice, groceries, and household essentials.",
      od: "ଦଳ ଢେଙ୍କାନାଳର ଅଗ୍ନିକାଣ୍ଡ ପ୍ରଭାବିତ ପରିବାରକୁ ଭେଟି ଲୁଗାପଟା, ଚାଉଳ, ଖାଦ୍ୟସାମଗ୍ରୀ ଓ ଘରୋଇ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ଦେଇଥିଲେ।",
    },
    paragraphs: [
      {
        en: "In June 2026, the Abhiara Foundation team visited Kankili village in Parjang block, Dhenkanal, after a family lost their home belongings in a fire. The team saw the damage at the site and spoke with the family.",
        od: "ଜୁନ ୨୦୨୬ରେ ଏକ ପରିବାର ଅଗ୍ନିକାଣ୍ଡରେ ଘରୋଇ ସାମଗ୍ରୀ ହରାଇବା ପରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ ଢେଙ୍କାନାଳର ପରଜଙ୍ଗ ବ୍ଲକସ୍ଥିତ କଙ୍କିଲି ଗ୍ରାମକୁ ଯାଇଥିଲେ। ଦଳ ଘଟଣାସ୍ଥଳର କ୍ଷୟକ୍ଷତି ଦେଖି ପରିବାର ସହ କଥା ହୋଇଥିଲେ।",
      },
      {
        en: "Clothes, rice, groceries, and household essentials were handed over directly. The help was limited to immediate practical needs. No wider outcome is claimed beyond the supplies shown in the public record.",
        od: "ଲୁଗାପଟା, ଚାଉଳ, ଖାଦ୍ୟସାମଗ୍ରୀ ଓ ଘରୋଇ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ସିଧାସଳଖ ଦିଆଗଲା। ଏହି ସହାୟତା ତତ୍କାଳ ଆବଶ୍ୟକତା ପର୍ଯ୍ୟନ୍ତ ସୀମିତ ଥିଲା। ସାର୍ବଜନୀନ ରେକର୍ଡରେ ଥିବା ସାମଗ୍ରୀ ବ୍ୟତୀତ ଅନ୍ୟ କୌଣସି ଫଳାଫଳ ଦାବି କରାଯାଇନାହିଁ।",
      },
      {
        en: "Photographs and a short field video show the visit, damage assessment, and supply handover. They are available in the June 2026 Monthly Impact report.",
        od: "ଫଟୋ ଓ ଛୋଟ କ୍ଷେତ୍ର ଭିଡିଓରେ ପରିଦର୍ଶନ, କ୍ଷୟକ୍ଷତି ଯାଞ୍ଚ ଓ ସାମଗ୍ରୀ ହସ୍ତାନ୍ତର ଦେଖାଯାଇଛି। ଏଗୁଡ଼ିକ ଜୁନ ୨୦୨୬ ମାସିକ ପ୍ରଭାବ ରିପୋର୍ଟରେ ଉପଲବ୍ଧ।",
      },
    ],
    dateISO: "2026-06-17",
    date: { en: "June 2026", od: "ଜୁନ ୨୦୨୬" },
    location: {
      en: "Kankili village, Parjang block, Dhenkanal, Odisha",
      od: "କଙ୍କିଲି ଗ୍ରାମ, ପରଜଙ୍ଗ ବ୍ଲକ, ଢେଙ୍କାନାଳ, ଓଡ଼ିଶା",
    },
    result: {
      en: "1 family received essential supplies",
      od: "୧ ପରିବାର ଆବଶ୍ୟକ ସାମଗ୍ରୀ ପାଇଲେ",
    },
    image: "/images/fire-relief-distribution.jpeg",
    imageAlt: {
      en: "Abhiara Foundation handing supplies to a fire-affected family in Kankili",
      od: "କଙ୍କିଲିର ଅଗ୍ନିକାଣ୍ଡ ପ୍ରଭାବିତ ପରିବାରକୁ ସାମଗ୍ରୀ ଦେଉଛି ଅଭିଆରା ଫାଉଣ୍ଡେସନ",
    },
    evidenceHref: "/disaster-relief",
  },
  {
    slug: "pana-sankranti-water-camps",
    category: "events",
    title: {
      en: "Free drinking water on Pana Sankranti",
      od: "ପଣା ସଂକ୍ରାନ୍ତିରେ ନିଶୁଳ୍କ ପାନୀୟ ଜଳ ସେବା",
    },
    excerpt: {
      en: "Free drinking-water camps were held in three Odisha locations on 14 April 2026.",
      od: "୧୪ ଏପ୍ରିଲ ୨୦୨୬ରେ ଓଡ଼ିଶାର ତିନୋଟି ସ୍ଥାନରେ ନିଶୁଳ୍କ ପାନୀୟ ଜଳ ଶିବିର କରାଗଲା।",
    },
    paragraphs: [
      {
        en: "On 14 April 2026, free drinking-water camps were held for Pana Sankranti in Koraput, Kendrapara, and Bhubaneswar. The activity was a simple public service during the Odisha solar new year occasion.",
        od: "୧୪ ଏପ୍ରିଲ ୨୦୨୬ରେ ପଣା ସଂକ୍ରାନ୍ତି ଅବସରରେ କୋରାପୁଟ, କେନ୍ଦ୍ରାପଡ଼ା ଓ ଭୁବନେଶ୍ୱରରେ ନିଶୁଳ୍କ ପାନୀୟ ଜଳ ଶିବିର କରାଗଲା। ଓଡ଼ିଆ ସୌର ନବବର୍ଷ ଅବସରରେ ଏହା ଏକ ସରଳ ଜନସେବା କାର୍ଯ୍ୟ ଥିଲା।",
      },
      {
        en: "Volunteers prepared the camp areas and served drinking water to people passing by. Abhiara does not publish an estimated beneficiary count because a verified count was not recorded.",
        od: "ସ୍ୱେଚ୍ଛାସେବୀମାନେ ଶିବିର ସ୍ଥାନ ପ୍ରସ୍ତୁତ କରି ଯାତାୟାତ କରୁଥିବା ଲୋକଙ୍କୁ ପାନୀୟ ଜଳ ଦେଇଥିଲେ। ଯାଞ୍ଚ ହୋଇଥିବା ଗଣନା ରେକର୍ଡ ନଥିବାରୁ ଅଭିଆରା ଲାଭାର୍ଥୀ ସଂଖ୍ୟାର ଅନୁମାନ ପ୍ରକାଶ କରୁନାହିଁ।",
      },
      {
        en: "The April 2026 Monthly Impact report carries registered photos and videos of the camp setup and water service.",
        od: "ଏପ୍ରିଲ ୨୦୨୬ ମାସିକ ପ୍ରଭାବ ରିପୋର୍ଟରେ ଶିବିର ପ୍ରସ୍ତୁତି ଓ ପାଣି ସେବାର ରେଜିଷ୍ଟର ହୋଇଥିବା ଫଟୋ ଓ ଭିଡିଓ ରହିଛି।",
      },
    ],
    dateISO: "2026-04-14",
    date: { en: "14 April 2026", od: "୧୪ ଏପ୍ରିଲ ୨୦୨୬" },
    location: {
      en: "Koraput, Kendrapara, and Bhubaneswar, Odisha",
      od: "କୋରାପୁଟ, କେନ୍ଦ୍ରାପଡ଼ା ଓ ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
    },
    result: {
      en: "Free water service at 3 locations",
      od: "୩ ସ୍ଥାନରେ ନିଶୁଳ୍କ ଜଳ ସେବା",
    },
    image: "/images/water-camp-serving.jpeg",
    imageAlt: {
      en: "Volunteers serving drinking water at a Pana Sankranti camp",
      od: "ପଣା ସଂକ୍ରାନ୍ତି ଜଳଛତ୍ରରେ ପାନୀୟ ଜଳ ଦେଉଥିବା ସ୍ୱେଚ୍ଛାସେବୀ",
    },
    evidenceHref: "/impact-gallery",
  },
  {
    slug: "hope-is-life-old-age-home-visit",
    category: "jeevan-sathi",
    title: {
      en: "A visit to Hope is Life Old Age Home in Puri",
      od: "ପୁରୀର ହୋପ ଇଜ୍ ଲାଇଫ ବୃଦ୍ଧାଶ୍ରମ ପରିଦର୍ଶନ",
    },
    excerpt: {
      en: "The team spent time with more than 40 elderly residents and shared essential supplies during an October 2025 visit.",
      od: "ଅକ୍ଟୋବର ୨୦୨୫ରେ ଦଳ ୪୦ରୁ ଅଧିକ ବୃଦ୍ଧ ବାସିନ୍ଦାଙ୍କ ସହ ସମୟ ବିତାଇ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ଦେଇଥିଲେ।",
    },
    paragraphs: [
      {
        en: "In October 2025, the Abhiara Foundation team visited Hope is Life Old Age Home in Puri, Odisha. The team met more than 40 elderly residents and spent time speaking with them.",
        od: "ଅକ୍ଟୋବର ୨୦୨୫ରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ ପୁରୀର ହୋପ ଇଜ୍ ଲାଇଫ ବୃଦ୍ଧାଶ୍ରମକୁ ଯାଇଥିଲେ। ଦଳ ୪୦ରୁ ଅଧିକ ବୃଦ୍ଧ ବାସିନ୍ଦାଙ୍କୁ ଭେଟି ସେମାନଙ୍କ ସହ କଥା ହୋଇ ସମୟ ବିତାଇଥିଲେ।",
      },
      {
        en: "Essential supplies were shared during the visit. The public record describes companionship and practical support only. It does not make claims about residents' families, health, legal needs, or future services.",
        od: "ପରିଦର୍ଶନ ସମୟରେ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ଦିଆଗଲା। ସାର୍ବଜନୀନ ରେକର୍ଡରେ କେବଳ ସାଥୀ ସେବା ଓ ବ୍ୟବହାରିକ ସହାୟତା ଉଲ୍ଲେଖ ଅଛି। ବାସିନ୍ଦାଙ୍କ ପରିବାର, ସ୍ୱାସ୍ଥ୍ୟ, ଆଇନଗତ ଆବଶ୍ୟକତା କିମ୍ବା ଭବିଷ୍ୟତ ସେବା ବିଷୟରେ କୌଣସି ଦାବି କରାଯାଇନାହିଁ।",
      },
      {
        en: "The October 2025 Monthly Impact report contains the registered photographs from this visit.",
        od: "ଅକ୍ଟୋବର ୨୦୨୫ ମାସିକ ପ୍ରଭାବ ରିପୋର୍ଟରେ ଏହି ପରିଦର୍ଶନର ରେଜିଷ୍ଟର ହୋଇଥିବା ଫଟୋ ରହିଛି।",
      },
    ],
    dateISO: "2025-10-15",
    date: { en: "October 2025", od: "ଅକ୍ଟୋବର ୨୦୨୫" },
    location: { en: "Puri, Odisha", od: "ପୁରୀ, ଓଡ଼ିଶା" },
    result: {
      en: "40+ elderly residents visited",
      od: "୪୦+ ବୃଦ୍ଧ ବାସିନ୍ଦାଙ୍କୁ ଭେଟ",
    },
    image: "/images/elderly-care-visit-3.jpeg",
    imageAlt: {
      en: "Abhiara Foundation team spending time with elderly residents in Puri",
      od: "ପୁରୀର ବୃଦ୍ଧ ବାସିନ୍ଦାଙ୍କ ସହ ସମୟ ବିତାଉଥିବା ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ",
    },
    evidenceHref: "/elder-care-and-dignity",
  },
];

export function getStoryBySlug(slug: string) {
  return BLOG_STORIES.find(story => story.slug === slug);
}
