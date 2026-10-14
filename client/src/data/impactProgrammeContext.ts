import {
  impactCollection,
  impactPublicText,
  type ImpactRecord,
} from "./impactPhotoCollections";

type Programme = {
  en: string;
  od: string;
  href: string;
  summaryEn: string;
  summaryOd: string;
};

const PROGRAMMES: Record<string, Programme> = {
  learning: {
    en: "Abhiara Shiksha Sathi: Learning support",
    od: "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ: ପାଠପଢ଼ା ସହାୟତା",
    href: "/shiksha-sathi",
    summaryEn:
      "Group learning and guidance help children continue their education.",
    summaryOd:
      "ସାମୂହିକ ପାଠପଢ଼ା ଓ ମାର୍ଗଦର୍ଶନ ମାଧ୍ୟମରେ ଶିଶୁମାନଙ୍କୁ ଶିକ୍ଷା ଜାରି ରଖିବାରେ ସହାୟତା କରାଯାଏ।",
  },
  materials: {
    en: "Books and school materials",
    od: "ପୁସ୍ତକ ଓ ସ୍କୁଲ ସାମଗ୍ରୀ ବଣ୍ଟନ",
    href: "/shiksha-sathi",
    summaryEn:
      "Education support includes books, dictionaries, school bags and other learning materials according to checked needs.",
    summaryOd:
      "ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ପୁସ୍ତକ, ଅଭିଧାନ, ସ୍କୁଲ ବ୍ୟାଗ ଓ ଅନ୍ୟ ପଢ଼ା ସାମଗ୍ରୀ ଦିଆଯାଏ।",
  },
  recognition: {
    en: "Abhiara Pratibha Samman",
    od: "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ",
    href: "/abhiara-pratibha-samman",
    summaryEn:
      "The student recognition programme honours achievement and encourages children to continue learning.",
    summaryOd:
      "ଶିକ୍ଷାର୍ଥୀଙ୍କ ସଫଳତାକୁ ସମ୍ମାନ ଦେଇ ଆଗକୁ ପାଠପଢ଼ା ଜାରି ରଖିବାକୁ ଉତ୍ସାହିତ କରାଯାଏ।",
  },
  education: {
    en: "Abhiara Shiksha Sathi",
    od: "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ",
    href: "/shiksha-sathi",
    summaryEn:
      "Education support helps orphaned children and children from underprivileged families stay in school.",
    summaryOd:
      "ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କୁ ପାଠପଢ଼ା ଜାରି ରଖିବା ପାଇଁ ଶିକ୍ଷା ସହାୟତା ଦିଆଯାଏ।",
  },
  elder: {
    en: "Elder Care and Dignity",
    od: "ବୃଦ୍ଧ ସେବା ଓ ସମ୍ମାନ",
    href: "/elder-care-and-dignity",
    summaryEn:
      "Visits and limited supplies support for elderly people are organised according to verified needs and available funds.",
    summaryOd:
      "ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଉପଲବ୍ଧ ଅର୍ଥ ଅନୁଯାୟୀ ବୃଦ୍ଧଙ୍କ ପାଇଁ ପରିଦର୍ଶନ ଓ ସୀମିତ ସାମଗ୍ରୀ ସହାୟତା କରାଯାଏ।",
  },
  water: {
    en: "Pana Sankranti Drinking Water Service",
    od: "ପଣା ସଂକ୍ରାନ୍ତି ପାନୀୟ ଜଳ ସେବା",
    href: "/wellness-and-wellbeing",
    summaryEn:
      "Drinking water was provided during the recorded Pana Sankranti community service activity.",
    summaryOd: "ପଣା ସଂକ୍ରାନ୍ତିର ସମୁଦାୟ ସେବା କାର୍ଯ୍ୟକ୍ରମରେ ପାନୀୟ ଜଳ ଦିଆଯାଇଥିଲା।",
  },
  medical: {
    en: "Medical Emergency Support",
    od: "ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା",
    href: "/medical-emergency-support",
    summaryEn:
      "Medical requests are considered case by case after verification, subject to available funds and an approved budget.",
    summaryOd:
      "ଚିକିତ୍ସା ସହାୟତା ଅନୁରୋଧ ଯାଞ୍ଚ ପରେ ପ୍ରତ୍ୟେକ ମାମଲା ଅନୁଯାୟୀ ବିଚାର କରାଯାଏ। ସହାୟତା ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।",
  },
  disaster: {
    en: "Disaster Relief",
    od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା",
    href: "/disaster-relief",
    summaryEn:
      "Limited relief after floods, fires and other disasters follows ground verification and the available budget.",
    summaryOd:
      "ବନ୍ୟା, ଅଗ୍ନିକାଣ୍ଡ ଓ ଅନ୍ୟ ବିପର୍ଯ୍ୟୟ ପରେ କ୍ଷେତ୍ର ଯାଞ୍ଚ ଓ ଉପଲବ୍ଧ ବଜେଟ ଅନୁଯାୟୀ ସୀମିତ ସହାୟତା ଦିଆଯାଏ।",
  },
  animals: {
    en: "Animal Welfare",
    od: "ପଶୁ କଲ୍ୟାଣ",
    href: "/animal-welfare-support",
    summaryEn:
      "Limited feeding, treatment help and rescue coordination depend on verified needs and available resources.",
    summaryOd:
      "ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଉପଲବ୍ଧ ସମ୍ବଳ ଅନୁଯାୟୀ ସୀମିତ ଖାଦ୍ୟ, ଚିକିତ୍ସା ସହାୟତା ଓ ଉଦ୍ଧାର ସମନ୍ୱୟ କରାଯାଏ।",
  },
  community: {
    en: "Community Support",
    od: "ସମୁଦାୟ ସହାୟତା",
    href: "/other-verified-support",
    summaryEn:
      "Community activities and limited support are recorded separately from the Foundation's main education work.",
    summaryOd:
      "ସମୁଦାୟ କାର୍ଯ୍ୟକ୍ରମ ଓ ସୀମିତ ସହାୟତାର ବିବରଣୀ ଫାଉଣ୍ଡେସନର ମୁଖ୍ୟ ଶିକ୍ଷା କାମଠାରୁ ପୃଥକ ରଖାଯାଏ।",
  },
};

const CLEAN_LEGACY_DESCRIPTIONS: Record<string, string> = {
  "Every book donated is a step towards a brighter future. Empowering young minds through education materials.":
    "Books and learning materials were distributed to children.",
  "Our first elder care visit — Hope is Life Old Age Home. Listening, learning, and lending a hand.":
    "A visit to elderly residents at Hope is Life Old Age Home.",
  "Building connections that last — community gathering at Hope is Life Old Age Home.":
    "Time spent with residents at Hope is Life Old Age Home.",
};

const LOCATION_OD: Record<string, string> = {
  Odisha: "ଓଡ଼ିଶା",
  "Kendrapara, Odisha": "କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
  "Puri, Odisha": "ପୁରୀ, ଓଡ଼ିଶା",
  "Raisar, Kendrapara": "ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା",
  "Raisar, Garadpur, Kendrapara": "ରାଇସର, ଗରଦପୁର, କେନ୍ଦ୍ରାପଡ଼ା",
  "Bhadrak, Odisha": "ଭଦ୍ରକ, ଓଡ଼ିଶା",
};
const MONTHS_OD: Record<string, string> = {
  January: "ଜାନୁଆରୀ",
  February: "ଫେବୃଆରୀ",
  March: "ମାର୍ଚ୍ଚ",
  April: "ଏପ୍ରିଲ",
  May: "ମେ",
  June: "ଜୁନ",
  July: "ଜୁଲାଇ",
  August: "ଅଗଷ୍ଟ",
  September: "ସେପ୍ଟେମ୍ବର",
  October: "ଅକ୍ଟୋବର",
  November: "ନଭେମ୍ବର",
  December: "ଡିସେମ୍ବର",
};

export function impactProgrammeContext(
  photo: ImpactRecord,
  language: "en" | "od"
) {
  const collection = impactCollection(photo);
  const key = /pana sankranti|drinking water|ପଣା ସଂକ୍ରାନ୍ତି|ପାନୀୟ ଜଳ/i.test(
    photo.title
  )
    ? "water"
    : photo.category === "education" &&
        /school bags|school supplies|book donation|books and|education material|ସ୍କୁଲ ବ୍ୟାଗ|ପୁସ୍ତକ.*ବଣ୍ଟନ/i.test(
          photo.title
        )
      ? "materials"
      : collection;
  const programme = PROGRAMMES[key] ?? PROGRAMMES.community;
  const ownerDescription = impactPublicText(
    photo.description,
    language,
    "description"
  );
  const description =
    (language === "en" &&
      photo.description &&
      CLEAN_LEGACY_DESCRIPTIONS[photo.description]) ||
    ownerDescription;
  const rawLocation = photo.location?.trim() || "";
  let date = impactPublicText(photo.dateTaken, language, "description");
  if (language === "od") {
    date = date
      .replace(
        /January|February|March|April|May|June|July|August|September|October|November|December/g,
        month => MONTHS_OD[month]
      )
      .replace(/[0-9]/g, digit => "୦୧୨୩୪୫୬୭୮୯"[Number(digit)]);
  }
  return {
    programme: language === "od" ? programme.od : programme.en,
    title: impactPublicText(photo.title, language, "title"),
    description:
      description ||
      (language === "od" ? programme.summaryOd : programme.summaryEn),
    hasActivityDescription: Boolean(description),
    href: programme.href,
    location:
      language === "od"
        ? LOCATION_OD[rawLocation] ||
          impactPublicText(rawLocation, language, "description")
        : impactPublicText(rawLocation, language, "description"),
    date,
  };
}
