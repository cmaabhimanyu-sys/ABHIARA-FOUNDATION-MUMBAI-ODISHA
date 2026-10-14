import type { PublicActivityStory } from "./mustafapurActivity";
export const PRATAPPUR_ACTIVITY_ID = 93002;
export function pratappurActivity<T extends PublicActivityStory>(
  items: readonly T[]
): T | undefined {
  return items.find(
    item =>
      item.id === PRATAPPUR_ACTIVITY_ID &&
      item.isPublished === true &&
      item.category === "community"
  );
}
