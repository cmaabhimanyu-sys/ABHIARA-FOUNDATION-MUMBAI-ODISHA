export type ImpactRecord = {
  id: number;
  imageUrl: string;
  title: string;
  description?: string | null;
  category: string;
  mediaType?: string | null;
  isPublished?: boolean | null;
  location?: string | null;
  dateTaken?: string | null;
};

export const IMPACT_COLLECTIONS = [
  { key: "learning", en: "Learning together", od: "ଏକାଠି ଶିଖିବା" },
  {
    key: "materials",
    en: "Books and school materials",
    od: "ପୁସ୍ତକ ଓ ସ୍କୁଲ ସାମଗ୍ରୀ",
  },
  { key: "recognition", en: "Student recognition", od: "ଶିକ୍ଷାର୍ଥୀ ସମ୍ମାନ" },
  { key: "education", en: "Other education work", od: "ଅନ୍ୟ ଶିକ୍ଷା କାମ" },
  { key: "elder", en: "Elder care visits", od: "ବୃଦ୍ଧ ସେବା ଭ୍ରମଣ" },
  { key: "community", en: "Community service", od: "ସମୁଦାୟ ସେବା" },
  { key: "disaster", en: "Disaster relief", od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା" },
  { key: "medical", en: "Medical support", od: "ଚିକିତ୍ସା ସହାୟତା" },
  { key: "animals", en: "Animal welfare", od: "ପଶୁ କଲ୍ୟାଣ" },
] as const;

export type ImpactCollection = (typeof IMPACT_COLLECTIONS)[number]["key"];

const LEGACY_TITLES_OD: Record<string, string> = {
  "Children With School Supplies Outdoors": "ସ୍କୁଲ ସାମଗ୍ରୀ ସହ ଶିଶୁମାନେ",
  "Open Air Learning Session": "ଖୋଲା ଆକାଶ ତଳେ ଶିକ୍ଷା ଅଧିବେଶନ",
  "Book donation to tribal children": "ଶିଶୁମାନଙ୍କୁ ପୁସ୍ତକ ବଣ୍ଟନ",
  "Elderly care visit at Hope is Life Old Age Home":
    "Hope is Life ବୃଦ୍ଧାଶ୍ରମ ପରିଦର୍ଶନ",
  "Community gathering with elderly residents":
    "ବୃଦ୍ଧାଶ୍ରମର ବାସିନ୍ଦାଙ୍କ ସହ ସମୟ",
  "Pratibha Samman organising team": "ପ୍ରତିଭା ସମ୍ମାନ ଆୟୋଜକ ଦଳ",
  "Pratibha Samman programme": "ପ୍ରତିଭା ସମ୍ମାନ କାର୍ଯ୍ୟକ୍ରମ",
  "Pana Sankranti drinking water service": "ପଣା ସଂକ୍ରାନ୍ତିରେ ପାନୀୟ ଜଳ ସେବା",
  "Elder home visit": "ବୃଦ୍ଧାଶ୍ରମ ପରିଦର୍ଶନ",
  "Books and dictionary distribution": "ପୁସ୍ତକ ଓ ଅଭିଧାନ ବଣ୍ଟନ",
  "Classroom Teaching Session With Learning Activities": "ଶ୍ରେଣୀକକ୍ଷରେ ପାଠପଢ଼ା",
  "Outdoor Group Lesson With Learning Materials":
    "ଶିକ୍ଷା ସାମଗ୍ରୀ ସହ ବାହାରେ ସାମୂହିକ ପାଠ",
  "Outdoor Learning Session With Books": "ପୁସ୍ତକ ସହ ବାହାରେ ପାଠପଢ଼ା",
  "Books and Learning Materials Outdoors": "ବାହାରେ ପୁସ୍ତକ ଓ ଶିକ୍ଷା ସାମଗ୍ରୀ",
  "Education material distribution": "ଶିକ୍ଷା ସାମଗ୍ରୀ ବଣ୍ଟନ",
  "Children Seated Together in a Classroom": "ଶ୍ରେଣୀକକ୍ଷରେ ଶିଶୁମାନେ",
  "Classroom Learning Session With Teaching Materials":
    "ଶିକ୍ଷା ସାମଗ୍ରୀ ସହ ଶ୍ରେଣୀକକ୍ଷ ପାଠ",
};

const LEGACY_DESCRIPTIONS_OD: Record<string, string> = {
  "Children stand together outdoors carrying backpacks, notebooks and other school supplies.":
    "ଶିଶୁମାନେ ବ୍ୟାଗ, ଖାତା ଓ ଅନ୍ୟ ସ୍କୁଲ ସାମଗ୍ରୀ ସହ ବାହାରେ ଠିଆ ହୋଇଛନ୍ତି।",
  "Books and learning materials were shared during an open air education session.":
    "ଖୋଲା ସ୍ଥାନରେ ଶିକ୍ଷା ଅଧିବେଶନ ସମୟରେ ପୁସ୍ତକ ଓ ଶିକ୍ଷା ସାମଗ୍ରୀ ଦିଆଯାଇଥିଲା।",
  "Every book donated is a step towards a brighter future. Empowering young minds through education materials.":
    "ଶିଶୁମାନଙ୍କୁ ପୁସ୍ତକ ଓ ଶିକ୍ଷା ସାମଗ୍ରୀ ଦିଆଯାଇଥିଲା।",
  "Our first elder care visit — Hope is Life Old Age Home. Listening, learning, and lending a hand.":
    "Hope is Life ବୃଦ୍ଧାଶ୍ରମରେ ପରିଦର୍ଶନ ଓ ସହାୟତାର ଦୃଶ୍ୟ।",
  "Building connections that last — community gathering at Hope is Life Old Age Home.":
    "Hope is Life ବୃଦ୍ଧାଶ୍ରମର ବାସିନ୍ଦାଙ୍କ ସହ ସମୟ କାଟିବାର ଦୃଶ୍ୟ।",
  "Organising team at the Pratibha Samman student recognition programme in Raisar, Kendrapara.":
    "କେନ୍ଦ୍ରାପଡ଼ାର ରାଇସରରେ ପ୍ରତିଭା ସମ୍ମାନ କାର୍ଯ୍ୟକ୍ରମର ଆୟୋଜକ ଦଳ।",
  "A group moment from the Pratibha Samman student recognition programme in Raisar, Kendrapara.":
    "କେନ୍ଦ୍ରାପଡ଼ାର ରାଇସରରେ ପ୍ରତିଭା ସମ୍ମାନ କାର୍ଯ୍ୟକ୍ରମର ଏକ ସାମୂହିକ ଦୃଶ୍ୟ।",
  "Drinking water service held at reviewed local locations on 14 April 2026.":
    "୧୪ ଏପ୍ରିଲ ୨୦୨୬ରେ ସ୍ଥାନୀୟ ଅଞ୍ଚଳରେ ପାନୀୟ ଜଳ ସେବାର ଦୃଶ୍ୟ।",
  "Reviewed photograph from an October 2025 visit and supply support at an elderly home in Puri.":
    "ପୁରୀର ଏକ ବୃଦ୍ଧାଶ୍ରମରେ ଅକ୍ଟୋବର ୨୦୨୫ର ପରିଦର୍ଶନ ଓ ସାମଗ୍ରୀ ସହାୟତାର ଦୃଶ୍ୟ।",
  "Books and dictionaries were distributed to students in Raisar, Kendrapara on 15 August 2026.":
    "୧୫ ଅଗଷ୍ଟ ୨୦୨୬ରେ କେନ୍ଦ୍ରାପଡ଼ାର ରାଇସରରେ ଶିକ୍ଷାର୍ଥୀଙ୍କୁ ପୁସ୍ତକ ଓ ଅଭିଧାନ ବଣ୍ଟନ କରାଯାଇଥିଲା।",
  "A standing instructor addresses seated learners, with educational displays, a chalkboard and classroom decorations visible.":
    "ଶ୍ରେଣୀକକ୍ଷରେ ଜଣେ ଶିକ୍ଷକ ବସିଥିବା ଶିକ୍ଷାର୍ଥୀଙ୍କୁ ପାଠ ବୁଝାଉଛନ୍ତି।",
  "A group sits outdoors on mats while an instructor presents materials, with notebooks and school bags nearby.":
    "ବାହାରେ ଶିକ୍ଷାର୍ଥୀମାନେ ବସିଛନ୍ତି; ପାଖରେ ଖାତା ଓ ସ୍କୁଲ ବ୍ୟାଗ ରହିଛି।",
  "Young learners sit outdoors on a mat with books while an adult guides the learning activity.":
    "ଶିଶୁମାନେ ପୁସ୍ତକ ସହ ବାହାରେ ବସି ପାଠପଢ଼ାରେ ଭାଗ ନେଉଛନ୍ତି।",
  "Participants gather outdoors with books, bags and learning materials during an educational activity.":
    "ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମରେ ଅଂଶଗ୍ରହଣକାରୀମାନେ ପୁସ୍ତକ, ବ୍ୟାଗ ଓ ଶିକ୍ଷା ସାମଗ୍ରୀ ସହ ବାହାରେ ଅଛନ୍ତି।",
  "Reviewed photograph from an education material distribution activity.":
    "ଶିକ୍ଷା ସାମଗ୍ରୀ ବଣ୍ଟନ କାର୍ଯ୍ୟକ୍ରମର ଏକ ଫଟୋ।",
  "Children sit together in a classroom surrounded by educational charts, posters and learning materials.":
    "ଶ୍ରେଣୀକକ୍ଷରେ ଶିଶୁମାନେ ଶିକ୍ଷାମୂଳକ ଚାର୍ଟ, ପୋଷ୍ଟର ଓ ସାମଗ୍ରୀ ପାଖରେ ବସିଛନ୍ତି।",
  "A classroom session shows children seated near a teaching table, with educational displays and artwork visible on the wall.":
    "ଶ୍ରେଣୀକକ୍ଷରେ ଶିଶୁମାନେ ଶିକ୍ଷା ସାମଗ୍ରୀ ଓ କାନ୍ଥର ଚିତ୍ର ପାଖରେ ବସିଛନ୍ତି।",
};

/** Older owner records are translated here; new owner entries can use "English | ଓଡ଼ିଆ". */
export function impactPublicText(
  value: string | null | undefined,
  language: "en" | "od",
  field: "title" | "description"
): string {
  if (!value) return "";
  const parts = value.split(/\s+\|\s+/);
  if (parts.length === 2) return parts[language === "od" ? 1 : 0].trim();
  if (language === "en") return value;
  return (
    (field === "title" ? LEGACY_TITLES_OD : LEGACY_DESCRIPTIONS_OD)[value] ||
    value
  );
}

/** Newspaper clippings are records on Press and Media, not programme photographs. */
export function isPressProof(photo: Pick<ImpactRecord, "title" | "imageUrl">) {
  return (
    /press coverage|newspaper|press clipping|certificate/i.test(photo.title) ||
    /pratibha-samman-press-coverage/i.test(photo.imageUrl)
  );
}

export function impactCollection(photo: ImpactRecord): ImpactCollection {
  if (photo.category === "education") {
    if (/pratibha samman/i.test(photo.title)) return "recognition";
    if (
      /classroom|learning|teaching|open air|outdoor group lesson/i.test(
        photo.title
      )
    )
      return "learning";
    if (/book|dictionary|school supplies|material/i.test(photo.title))
      return "materials";
    return "education";
  }
  if (photo.category === "elderly" || photo.category === "elder")
    return "elder";
  if (
    photo.category === "animals" ||
    photo.category === "medical" ||
    photo.category === "disaster"
  )
    return photo.category;
  return "community";
}

export function publishedImpactPhotos<T extends ImpactRecord>(
  items: readonly T[]
): T[] {
  return items.filter(
    photo =>
      photo.isPublished !== false &&
      Boolean(photo.imageUrl) &&
      (!photo.mediaType || photo.mediaType === "photo") &&
      !isPressProof(photo)
  );
}
