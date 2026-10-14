export const MUSTAFAPUR_ACTIVITY_ID = 93001;

export type PublicActivityStory = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  beneficiariesCount?: string | null;
  category: string;
  isPublished: boolean;
};

/** One event record, never a total obtained by adding the people shown in photos. */
export function mustafapurActivity<T extends PublicActivityStory>(
  items: readonly T[]
): T | undefined {
  return items.find(
    item =>
      item.id === MUSTAFAPUR_ACTIVITY_ID &&
      item.isPublished === true &&
      item.category === "community"
  );
}

export function activityPublicText(
  value: string | null | undefined,
  language: "en" | "od"
) {
  if (!value) return "";
  const parts = value.split(/\s*\|\s*/);
  return (parts.length === 2 ? parts[language === "od" ? 1 : 0] : value).trim();
}
