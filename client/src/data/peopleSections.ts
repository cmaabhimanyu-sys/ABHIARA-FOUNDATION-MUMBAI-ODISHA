export const PEOPLE_SECTIONS = [
  {
    type: "board",
    titleEn: "Board of Directors",
    titleOd: "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳୀ",
  },
  {
    type: "auditor",
    titleEn: "Independent Statutory Auditor",
    titleOd: "ସ୍ୱାଧୀନ ବୈଧାନିକ ଲେଖାପରୀକ୍ଷକ",
  },
  {
    type: "advisor",
    titleEn: "Guiding Patron & Advisors",
    titleOd: "ମାର୍ଗଦର୍ଶକ ପୃଷ୍ଠପୋଷକ ଓ ପରାମର୍ଶଦାତା",
  },
  {
    type: "odisha",
    titleEn: "Odisha Division Leadership",
    titleOd: "ଓଡ଼ିଶା ବିଭାଗର ନେତୃତ୍ୱ",
  },
  {
    type: "member",
    titleEn: "Core Members",
    titleOd: "ମୁଖ୍ୟ ସଦସ୍ୟମାନେ",
  },
] as const;

export type PeopleSectionType = (typeof PEOPLE_SECTIONS)[number]["type"];

export function groupPublishedPeople<
  T extends { memberType: string; sortOrder: number; id: number },
>(members: T[]) {
  const ordered = [...members].sort(
    (left, right) => left.sortOrder - right.sortOrder || left.id - right.id
  );
  return PEOPLE_SECTIONS.map(section => ({
    ...section,
    members: ordered.filter(person => person.memberType === section.type),
  })).filter(section => section.members.length > 0);
}
