export type LocalizedText = {
  en: string;
  od: string;
};

export type ImpactResult = {
  value: LocalizedText;
  label: LocalizedText;
};

export type MonthlyImpactReport = {
  id: string;
  period: LocalizedText;
  programme: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  locations: LocalizedText;
  results: ImpactResult[];
  notes: LocalizedText[];
  imageCategories: string[];
  videoCategories: string[];
};

export type RegistryImage = {
  file?: string;
  filename?: string;
  category: string;
  alt?: string;
  caption?: string;
  location?: string;
};

export type RegistryVideo = {
  url: string;
  category: string;
  alt?: string;
  thumbnail?: string;
};

export type ImageRegistry = {
  images: RegistryImage[];
  videos: RegistryVideo[];
};

export type ImpactMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption: string;
  location?: string;
  poster?: string;
};

const MANUS_PUBLIC_MEDIA_ORIGIN = "https://abhiara-ngo-hv6lgfne.manus.space";

export const MONTHLY_IMPACT_REPORTS: MonthlyImpactReport[] = [
  {
    id: "august-2026-education",
    period: { en: "15 August 2026", od: "୧୫ ଅଗଷ୍ଟ ୨୦୨୬" },
    programme: { en: "Education", od: "ଶିକ୍ଷା" },
    title: {
      en: "School books and dictionaries for students",
      od: "ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ସ୍କୁଲ ବହି ଓ ଶବ୍ଦକୋଷ",
    },
    summary: {
      en: "School books and dictionaries were distributed to students on Independence Day to encourage them to continue their education.",
      od: "ସ୍ୱାଧୀନତା ଦିବସରେ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ପାଠପଢ଼ା ଜାରି ରଖିବାକୁ ଉତ୍ସାହ ଦେବା ପାଇଁ ସ୍କୁଲ ବହି ଓ ଶବ୍ଦକୋଷ ବଣ୍ଟନ କରାଗଲା।",
    },
    locations: {
      en: "Raisar, Kendrapara district, Odisha",
      od: "ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲା, ଓଡ଼ିଶା",
    },
    results: [
      {
        value: { en: "Books and dictionaries", od: "ବହି ଓ ଶବ୍ଦକୋଷ" },
        label: { en: "given to students", od: "ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ଦିଆଗଲା" },
      },
      {
        value: { en: "15 August", od: "୧୫ ଅଗଷ୍ଟ" },
        label: { en: "education encouragement activity", od: "ଶିକ୍ଷା ଉତ୍ସାହ କାର୍ଯ୍ୟକ୍ରମ" },
      },
    ],
    notes: [
      {
        en: "All photographs supplied for this activity are included in the public media record below.",
        od: "ଏହି କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ଦିଆଯାଇଥିବା ସମସ୍ତ ଫଟୋ ତଳେ ସାର୍ବଜନୀନ ମିଡିଆ ରେକର୍ଡରେ ରହିଛି।",
      },
      {
        en: "No student count is stated because a verified total was not provided.",
        od: "ଯାଞ୍ଚ ହୋଇଥିବା ମୋଟ ସଂଖ୍ୟା ଦିଆଯାଇନଥିବାରୁ ଛାତ୍ରଛାତ୍ରୀ ସଂଖ୍ୟା ଉଲ୍ଲେଖ କରାଯାଇନାହିଁ।",
      },
    ],
    imageCategories: ["independence-day-books"],
    videoCategories: [],
  },
  {
    id: "august-2026",
    period: { en: "August 2026", od: "ଅଗଷ୍ଟ ୨୦୨୬" },
    programme: { en: "Disaster Relief", od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା" },
    title: {
      en: "Relief supplies and a field visit in Kankili",
      od: "କଙ୍କିଲିରେ ରିଲିଫ ସାମଗ୍ରୀ ଓ କ୍ଷେତ୍ର ପରିଦର୍ଶନ",
    },
    summary: {
      en: "The Abhiara team visited a fire-affected family, assessed the damage, and handed over rice, groceries, and essential supplies.",
      od: "ଅଭିଆରା ଦଳ ଅଗ୍ନିକାଣ୍ଡରେ ପ୍ରଭାବିତ ପରିବାରଙ୍କୁ ଭେଟି କ୍ଷୟକ୍ଷତି ଦେଖିଥିଲେ ଏବଂ ଚାଉଳ, ଖାଦ୍ୟସାମଗ୍ରୀ ଓ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ଦେଇଥିଲେ।",
    },
    locations: {
      en: "Kankili village, Parjang block, Dhenkanal, Odisha",
      od: "କଙ୍କିଲି ଗ୍ରାମ, ପରଜଙ୍ଗ ବ୍ଲକ, ଢେଙ୍କାନାଳ, ଓଡ଼ିଶା",
    },
    results: [
      {
        value: { en: "1 family", od: "୧ ପରିବାର" },
        label: { en: "received essential supplies", od: "ଆବଶ୍ୟକ ସାମଗ୍ରୀ ପାଇଲେ" },
      },
      {
        value: { en: "Field visit", od: "କ୍ଷେତ୍ର ପରିଦର୍ଶନ" },
        label: { en: "damage was checked in person", od: "କ୍ଷୟକ୍ଷତି ସ୍ଥାନରେ ଦେଖାଗଲା" },
      },
    ],
    notes: [
      {
        en: "Rice, groceries, and household essentials were handed over directly.",
        od: "ଚାଉଳ, ଖାଦ୍ୟସାମଗ୍ରୀ ଓ ଘରୋଇ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ସିଧାସଳଖ ଦିଆଗଲା।",
      },
      {
        en: "The photo record includes the team visit, damage assessment, and supply handover.",
        od: "ଫଟୋରେ ଦଳର ପରିଦର୍ଶନ, କ୍ଷୟକ୍ଷତି ଯାଞ୍ଚ ଓ ସାମଗ୍ରୀ ହସ୍ତାନ୍ତର ଦେଖାଯାଇଛି।",
      },
    ],
    imageCategories: ["disaster-relief"],
    videoCategories: [],
  },
  {
    id: "june-2026",
    period: { en: "June 2026", od: "ଜୁନ ୨୦୨୬" },
    programme: { en: "Education and Emergency Help", od: "ଶିକ୍ଷା ଓ ଜରୁରୀ ସାହାଯ୍ୟ" },
    title: {
      en: "Pratibha Samman and fire relief",
      od: "ପ୍ରତିଭା ସମ୍ମାନ ଓ ଅଗ୍ନିକାଣ୍ଡ ସହାୟତା",
    },
    summary: {
      en: "Students were honoured at Raisar Kharisan High School on 4 June. During the same month, clothes, rice, and groceries were given to a fire-affected family in Kankili village.",
      od: "୪ ଜୁନରେ ରାଇସର ଖରିସାନ ଉଚ୍ଚ ବିଦ୍ୟାଳୟର ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ସମ୍ମାନିତ କରାଗଲା। ସେହି ମାସରେ କଙ୍କିଲି ଗ୍ରାମର ଅଗ୍ନିକାଣ୍ଡ ପ୍ରଭାବିତ ପରିବାରକୁ ଲୁଗାପଟା, ଚାଉଳ ଓ ଖାଦ୍ୟସାମଗ୍ରୀ ଦିଆଗଲା।",
    },
    locations: {
      en: "Garadpur, Kendrapara and Kankili, Dhenkanal, Odisha",
      od: "ଗରଦପୁର, କେନ୍ଦ୍ରାପଡ଼ା ଓ କଙ୍କିଲି, ଢେଙ୍କାନାଳ, ଓଡ଼ିଶା",
    },
    results: [
      {
        value: { en: "57 students", od: "୫୭ ଛାତ୍ରଛାତ୍ରୀ" },
        label: { en: "honoured at the school programme", od: "ବିଦ୍ୟାଳୟ କାର୍ଯ୍ୟକ୍ରମରେ ସମ୍ମାନିତ" },
      },
      {
        value: { en: "1 family", od: "୧ ପରିବାର" },
        label: { en: "received fire-relief support", od: "ଅଗ୍ନିକାଣ୍ଡ ସହାୟତା ପାଇଲେ" },
      },
    ],
    notes: [
      {
        en: "Students received trophies, certificates, and medals at Pratibha Samman.",
        od: "ପ୍ରତିଭା ସମ୍ମାନରେ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ଟ୍ରଫି, ପ୍ରମାଣପତ୍ର ଓ ପଦକ ଦିଆଗଲା।",
      },
      {
        en: "The report includes ceremony photos, newspaper coverage, and field relief media.",
        od: "ରିପୋର୍ଟରେ ସମ୍ମାନ ଉତ୍ସବର ଫଟୋ, ଖବରକାଗଜ କଭରେଜ ଓ ରିଲିଫ କାମର ମିଡିଆ ଅଛି।",
      },
    ],
    imageCategories: ["pratibha-samman", "fire-relief"],
    videoCategories: ["pratibha-samman", "fire-relief"],
  },
  {
    id: "april-2026",
    period: { en: "April 2026", od: "ଏପ୍ରିଲ ୨୦୨୬" },
    programme: { en: "Community Service", od: "ସମାଜ ସେବା" },
    title: {
      en: "Free drinking-water camps for Pana Sankranti",
      od: "ପଣା ସଂକ୍ରାନ୍ତିରେ ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର",
    },
    summary: {
      en: "Free drinking-water camps were held on 14 April for Pana Sankranti. The public photo and video record shows the camp setup and water being served.",
      od: "୧୪ ଏପ୍ରିଲ ପଣା ସଂକ୍ରାନ୍ତିରେ ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର କରାଗଲା। ଫଟୋ ଓ ଭିଡିଓରେ ଶିବିର ପ୍ରସ୍ତୁତି ଓ ପାଣି ବଣ୍ଟନ ଦେଖାଯାଇଛି।",
    },
    locations: {
      en: "Koraput, Kendrapara, and Bhubaneswar, Odisha",
      od: "କୋରାପୁଟ, କେନ୍ଦ୍ରାପଡ଼ା ଓ ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
    },
    results: [
      {
        value: { en: "3 locations", od: "୩ ସ୍ଥାନ" },
        label: { en: "served on the same occasion", od: "ଏକେ ଅବସରରେ ସେବା" },
      },
      {
        value: { en: "Photo and video", od: "ଫଟୋ ଓ ଭିଡିଓ" },
        label: { en: "public record available", od: "ସାର୍ବଜନୀନ ରେକର୍ଡ ଉପଲବ୍ଧ" },
      },
    ],
    notes: [
      {
        en: "Water was served free of charge during the Odisha solar new year occasion.",
        od: "ଓଡ଼ିଆ ସୌର ନବବର୍ଷ ଅବସରରେ ନିଶୁଳ୍କ ପାଣି ବଣ୍ଟନ କରାଗଲା।",
      },
      {
        en: "Only the registered water-camp photos and videos are included below.",
        od: "ତଳେ କେବଳ ରେଜିଷ୍ଟର ହୋଇଥିବା ଜଳଛତ୍ର ଫଟୋ ଓ ଭିଡିଓ ରହିଛି।",
      },
    ],
    imageCategories: ["water-camp"],
    videoCategories: ["water-camp"],
  },
  {
    id: "october-2025",
    period: { en: "October 2025", od: "ଅକ୍ଟୋବର ୨୦୨୫" },
    programme: { en: "Jeevan Sathi", od: "ଜୀବନ ସାଥୀ" },
    title: {
      en: "Visit to Hope is Life Old Age Home",
      od: "ହୋପ ଇଜ୍ ଲାଇଫ ବୃଦ୍ଧାଶ୍ରମ ପରିଦର୍ଶନ",
    },
    summary: {
      en: "The team visited elderly residents in Puri, spent time with them, and shared essential supplies.",
      od: "ଦଳ ପୁରୀର ବୃଦ୍ଧ ବାସିନ୍ଦାଙ୍କୁ ଭେଟି ସେମାନଙ୍କ ସହ ସମୟ ବିତାଇଥିଲେ ଏବଂ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ଦେଇଥିଲେ।",
    },
    locations: { en: "Puri, Odisha", od: "ପୁରୀ, ଓଡ଼ିଶା" },
    results: [
      {
        value: { en: "40+ elders", od: "୪୦+ ବୃଦ୍ଧ" },
        label: { en: "visited at the old age home", od: "ବୃଦ୍ଧାଶ୍ରମରେ ଭେଟିଥିଲେ" },
      },
      {
        value: { en: "Essentials", od: "ଆବଶ୍ୟକ ସାମଗ୍ରୀ" },
        label: { en: "shared during the visit", od: "ପରିଦର୍ଶନ ସମୟରେ ଦିଆଗଲା" },
      },
    ],
    notes: [
      {
        en: "This report records companionship and practical support during the visit.",
        od: "ଏହି ରିପୋର୍ଟରେ ସାଥୀ ସେବା ଓ ପରିଦର୍ଶନ ସମୟର ସାହାଯ୍ୟ ରହିଛି।",
      },
    ],
    imageCategories: ["elderly-care"],
    videoCategories: [],
  },
];

export const INSTAGRAM_UPDATES = [
  {
    id: "rti-public-information",
    period: { en: "September 2026", od: "ସେପ୍ଟେମ୍ବର ୨୦୨୬" },
    title: { en: "Right to Information", od: "ସୂଚନା ଅଧିକାର" },
    description: {
      en: "A public information Reel from the official @abhiarafoundation account. It is shown as a social update and is not counted as field impact.",
      od: "ଅଧିକୃତ @abhiarafoundation ଖାତାର ସାର୍ବଜନୀନ ସୂଚନା ରିଲ୍। ଏହା ସୋସିଆଲ ଅପଡେଟ ଭାବେ ଦେଖାଯାଉଛି ଏବଂ କ୍ଷେତ୍ର ପ୍ରଭାବ ଭାବେ ଗଣାଯାଇନାହିଁ।",
    },
    url: "https://www.instagram.com/reel/Dc6oZSqN1_6/",
    embedUrl: "https://www.instagram.com/reel/Dc6oZSqN1_6/embed/",
  },
];

export function resolveRegistryImageSrc(image: RegistryImage): string | null {
  const filename = image.file ?? image.filename;
  return filename ? `/images/${filename}` : null;
}

export function resolveRegistryVideoSrc(url: string): string {
  return url.startsWith("/manus-storage/") ? `${MANUS_PUBLIC_MEDIA_ORIGIN}${url}` : url;
}

export function collectReportMedia(
  registry: ImageRegistry,
  report: MonthlyImpactReport,
): ImpactMedia[] {
  const images: ImpactMedia[] = registry.images
    .filter(image => report.imageCategories.includes(image.category))
    .flatMap(image => {
      const src = resolveRegistryImageSrc(image);
      if (!src) return [];
      return [{
        type: "image" as const,
        src,
        alt: image.alt || report.title.en,
        caption: image.caption || image.alt || report.title.en,
        location: image.location,
      }];
    });

  const videos: ImpactMedia[] = registry.videos
    .filter(video => report.videoCategories.includes(video.category))
    .map(video => ({
      type: "video" as const,
      src: resolveRegistryVideoSrc(video.url),
      alt: video.alt || report.title.en,
      caption: video.alt || report.title.en,
      poster: video.thumbnail ? `/images/${video.thumbnail}` : undefined,
    }));

  return [...images, ...videos];
}
