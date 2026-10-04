export type VerifiedEducationCounts = {
  month: string;
  recurring: number;
  oneTime: number;
};

/** Never show legacy aggregate counts without a checked month and separate support types. */
export function parseVerifiedEducationCounts(
  raw: string | null | undefined,
  now: number = Date.now()
): VerifiedEducationCounts | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;
    const { month, recurring, oneTime } = value as Record<string, unknown>;
    if (typeof month !== "string") return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(month);
    if (!match) return null;
    const monthEnd = new Date(Date.UTC(Number(match[1]), Number(match[2]), 0));
    if (
      monthEnd.toISOString().slice(0, 10) !== month ||
      monthEnd.getTime() > now
    )
      return null;
    if (
      ![recurring, oneTime].every(
        n =>
          typeof n === "number" &&
          Number.isSafeInteger(n) &&
          n >= 0 &&
          n <= 999999
      )
    )
      return null;
    return {
      month,
      recurring: recurring as number,
      oneTime: oneTime as number,
    };
  } catch {
    return null;
  }
}
