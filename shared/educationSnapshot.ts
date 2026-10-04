export const EDUCATION_SNAPSHOT_KEY = "stat_education_programme_snapshot";

export type EducationSnapshot = {
  reportedOn: string;
  onboarded: string;
  materials: string;
  mostlyOrphaned: boolean;
};

export function formatEducationFigure(value: string, odia: boolean): string {
  return odia
    ? value.replace(/\d/g, digit => "୦୧୨୩୪୫୬୭୮୯"[Number(digit)])
    : value;
}

const ODIA_MONTHS = [
  "ଜାନୁଆରୀ",
  "ଫେବୃଆରୀ",
  "ମାର୍ଚ୍ଚ",
  "ଏପ୍ରିଲ",
  "ମେ",
  "ଜୁନ",
  "ଜୁଲାଇ",
  "ଅଗଷ୍ଟ",
  "ସେପ୍ଟେମ୍ବର",
  "ଅକ୍ଟୋବର",
  "ନଭେମ୍ବର",
  "ଡିସେମ୍ବର",
] as const;

export function formatEducationSnapshotDate(
  value: string,
  odia: boolean
): string {
  const date = new Date(`${value}T00:00:00Z`);
  if (!odia) {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  return `${formatEducationFigure(String(date.getUTCDate()), true)} ${ODIA_MONTHS[date.getUTCMonth()]} ${formatEducationFigure(String(date.getUTCFullYear()), true)}`;
}

/** A Foundation-reported programme snapshot, not an audited or monthly recipient total. */
export function parseEducationSnapshot(
  raw: string | null | undefined,
  now: number = Date.now()
): EducationSnapshot | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null || Array.isArray(value))
      return null;
    const { reportedOn, onboarded, materials, mostlyOrphaned } =
      value as Record<string, unknown>;
    if (typeof reportedOn !== "string") return null;
    const dateParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(reportedOn);
    if (!dateParts) return null;
    const date = new Date(
      Date.UTC(
        Number(dateParts[1]),
        Number(dateParts[2]) - 1,
        Number(dateParts[3])
      )
    );
    if (
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== reportedOn ||
      date.getTime() > now
    )
      return null;
    if (
      typeof onboarded !== "string" ||
      typeof materials !== "string" ||
      !/^[1-9]\d{0,5}\+$/.test(onboarded) ||
      !/^[1-9]\d{0,5}\+$/.test(materials) ||
      typeof mostlyOrphaned !== "boolean"
    )
      return null;
    return { reportedOn, onboarded, materials, mostlyOrphaned };
  } catch {
    return null;
  }
}
