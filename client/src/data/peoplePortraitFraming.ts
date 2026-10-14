type PortraitReference = {
  id: number;
  imageUrl?: string | null;
};

type Framing = {
  fileName: string;
  zoom: number;
  x: number;
  y: number;
};

/**
 * Current published 800 × 1000 portraits, reviewed as circular People cards.
 * x/y are percentages of the image element. The filename check deliberately
 * expires each adjustment when the owner uploads a replacement in Admin.
 * A new photo uses the safe centered cover crop until it is reviewed.
 */
const currentPortraits: Record<number, Framing> = {
  1: {
    fileName:
      "2026-10-03T17-46-23-757Z-abhimanyu-mallik-maroon-blazer-800x1000-professional-800x100.webp",
    zoom: 2.09,
    x: 4.44,
    y: 28.59,
  },
  2: {
    fileName: "2026-09-29T13-16-00-137Z-2-people-portrait-800x1000.webp",
    zoom: 1,
    x: 0,
    y: 11.35,
  },
  3: {
    fileName: "2026-09-29T13-16-04-042Z-3-people-portrait-800x1000.webp",
    zoom: 1,
    x: 0,
    y: 12.5,
  },
  4: {
    fileName: "2026-09-29T13-16-45-686Z-4-people-portrait-800x1000.webp",
    zoom: 1.26,
    x: 10.29,
    y: -20.6,
  },
  30001: {
    fileName: "2026-09-29T13-16-09-590Z-30001-people-portrait-800x1000.webp",
    zoom: 1,
    x: 0,
    y: -0.72,
  },
  30002: {
    fileName: "2026-09-29T13-16-16-427Z-30002-people-portrait-800x1000.webp",
    zoom: 1.15,
    x: 0.93,
    y: 20.73,
  },
  30003: {
    fileName: "2026-09-29T13-16-20-189Z-30003-people-portrait-800x1000.webp",
    zoom: 1.55,
    x: 1.74,
    y: 27.75,
  },
  30004: {
    fileName: "2026-09-29T13-16-24-755Z-30004-people-portrait-800x1000.webp",
    zoom: 1,
    x: 0,
    y: 12.5,
  },
  30005: {
    fileName: "2026-09-29T13-16-29-414Z-30005-people-portrait-800x1000.webp",
    zoom: 1,
    x: 0,
    y: 12.28,
  },
  30006: {
    fileName: "2026-09-29T13-16-33-332Z-30006-people-portrait-800x1000.webp",
    zoom: 1,
    x: 0,
    y: 8.1,
  },
  30007: {
    fileName: "2026-09-29T13-16-37-504Z-30007-people-portrait-800x1000.webp",
    zoom: 1.28,
    x: 7.94,
    y: 30.22,
  },
  30011: {
    fileName: "2026-09-29T13-16-41-352Z-30011-people-portrait-800x1000.webp",
    zoom: 1.14,
    x: 7.16,
    y: 14.16,
  },
  60001: {
    fileName:
      "2026-09-29T13-24-03-477Z-kishore-kumar-parida-people-portrait-800x1000.webp",
    zoom: 1.1,
    x: 5.11,
    y: 19.01,
  },
  90001: {
    fileName:
      "2026-09-29T16-18-24-397Z-sonalika-das-people-portrait-800x1000.webp",
    zoom: 1,
    x: 0,
    y: 4.16,
  },
  91001: {
    fileName:
      "2026-10-03T17-43-50-944Z-subhasis-sahoo-people-portrait-800x1000-professional-800x100.webp",
    zoom: 2.75,
    x: 0,
    y: 121.875,
  },
  91002: {
    fileName:
      "2026-10-03T17-52-17-582Z-ashish-kumar-swain-people-portrait-800x1000-professional-800.webp",
    zoom: 1.15,
    x: -4.38,
    y: 21.88,
  },
  91003: {
    fileName:
      "2026-10-03T17-53-42-681Z-viky-sangoi-people-portrait-800x1000-professional-800x1000.webp",
    zoom: 1,
    x: 0,
    y: 12.5,
  },
};

function reviewedFraming(member: PortraitReference): Framing | undefined {
  const framing = currentPortraits[member.id];
  const filename = member.imageUrl?.split("/").pop()?.split("?")[0];
  return filename === framing?.fileName ? framing : undefined;
}

/**
 * The <img> element itself must cover the circle, even though object-cover
 * draws a taller 800 × 1000 source inside it. Shift the photo pixels with
 * object-position to preserve the reviewed face location without exposing
 * the beige backing. A translation percent converts to 4/zoom percent of
 * object-position movement at this aspect ratio.
 */
export function peoplePortraitObjectPosition(
  member: PortraitReference
): string {
  const framing = reviewedFraming(member);
  if (!framing) return "50% 50%";
  const safeY = safeTranslation(framing.y, framing.zoom);
  const vertical = Number(
    Math.max(
      0,
      Math.min(100, 50 - ((framing.y - safeY) * 4) / framing.zoom)
    ).toFixed(2)
  );
  return `50% ${vertical}%`;
}

function safeTranslation(offset: number, zoom: number): number {
  if (zoom === 1) return 0;
  // The CSS transform scales a square img box; the painted image is taller,
  // but that does not enlarge the actual element's background coverage.
  const limit = (zoom - 1) * 50 - 0.6;
  return Math.max(-limit, Math.min(limit, offset));
}

export function peoplePortraitTransform(member: PortraitReference): string {
  const framing = reviewedFraming(member);
  if (!framing || framing.zoom === 1) return "none";

  const x = safeTranslation(framing.x, framing.zoom);
  const y = safeTranslation(framing.y, framing.zoom);
  return `translate(${x}%, ${y}%) scale(${framing.zoom})`;
}
