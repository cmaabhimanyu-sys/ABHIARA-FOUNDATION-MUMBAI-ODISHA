import { describe, expect, it, vi } from "vitest";
import {
  ALBUM_DESTINATIONS,
  runSequentialAlbum,
  validateAlbumDetails,
  validateAlbumFiles,
  type AlbumDetails,
  type AlbumFile,
  type AlbumResult,
} from "./programmeAlbum";

const validDetails: AlbumDetails = {
  title: "Odia literacy camp",
  description: "A bilingual caption describing the community session.",
  category: "education",
  location: "Bhubaneswar district",
  dateTaken: "2026-01-15",
  isPublished: false,
};

const file = (name: string, overrides: Partial<AlbumFile> = {}): AlbumFile => ({
  name,
  size: 100,
  type: "image/jpeg",
  ...overrides,
});

const run = async (
  overrides: Partial<Parameters<typeof runSequentialAlbum>[0]> = {}
) => {
  const results: Record<string, AlbumResult> = {};
  const progress = vi.fn<(name: string, result: AlbumResult) => void>();
  const upload = vi.fn(
    async (selected: AlbumFile) => `https://cdn.test/${selected.name}`
  );
  const create = vi.fn(async () => undefined);
  const options = {
    files: [file("one.jpg"), file("two.png")],
    results,
    details: validDetails,
    upload,
    create,
    existingUrls: new Set<string>(),
    progress,
    ...overrides,
  };
  const failed = await runSequentialAlbum(options);
  return { failed, results, progress, upload, create };
};

describe("programme album destinations", () => {
  it("keeps the exact five folder/category mappings", () => {
    expect(ALBUM_DESTINATIONS).toEqual([
      { folder: "programmes", category: "education", label: "Education" },
      {
        folder: "disaster-relief",
        category: "disaster",
        label: "Disaster relief",
      },
      { folder: "elder-support", category: "elderly", label: "Elder support" },
      {
        folder: "medical-support",
        category: "medical",
        label: "Medical support",
      },
      {
        folder: "animal-welfare",
        category: "animals",
        label: "Animal welfare",
      },
    ]);
  });
});

describe("programme album file validation", () => {
  it("accepts 1 through 20 JPEG, PNG, and WebP files under 1 MB", () => {
    expect(validateAlbumFiles([file("a.jpg")])).toBeNull();
    expect(
      validateAlbumFiles(
        Array.from({ length: 20 }, (_, index) =>
          file(`${index}.webp`, { type: "image/webp" })
        )
      )
    ).toBeNull();
    expect(
      validateAlbumFiles([
        file("a.png", { type: "image/png", size: 1024 * 1024 - 1 }),
      ])
    ).toBeNull();
  });

  it.each([
    ["zero files", []],
    [
      "21 files",
      Array.from({ length: 21 }, (_, index) => file(`${index}.jpg`)),
    ],
    ["exactly 1 MB", [file("a.jpg", { size: 1024 * 1024 })]],
    ["zero-size file", [file("a.jpg", { size: 0 })]],
    ["unsupported MIME", [file("a.gif", { type: "image/gif" })]],
    ["name over 120 characters", [file(`${"a".repeat(121)}.jpg`)]],
    [
      "duplicate filenames",
      [file("same.jpg"), file("same.jpg", { type: "image/png" })],
    ],
  ])("rejects %s", (_label, files) => {
    expect(validateAlbumFiles(files as AlbumFile[])).not.toBeNull();
  });
});

describe("programme album details validation", () => {
  it("requires explicit consent before accepting details", () => {
    expect(validateAlbumDetails(validDetails, false)).toBe(
      "Confirm recorded permissions and safeguarding review for every photo."
    );
  });

  it("requires title minimum five characters, caption, date, and location", () => {
    expect(
      validateAlbumDetails({ ...validDetails, title: "abcd" }, true)
    ).not.toBeNull();
    expect(
      validateAlbumDetails({ ...validDetails, description: "short" }, true)
    ).not.toBeNull();
    expect(
      validateAlbumDetails({ ...validDetails, dateTaken: "   " }, true)
    ).not.toBeNull();
    expect(
      validateAlbumDetails({ ...validDetails, location: "   " }, true)
    ).not.toBeNull();
    expect(validateAlbumDetails(validDetails, true)).toBeNull();
  });
});

describe("sequential album upload and CMS persistence", () => {
  it("uploads then creates one photo per file in strict sequence, preserving bilingual details and draft state", async () => {
    const events: string[] = [];
    const details = {
      ...validDetails,
      title: "ଶିକ୍ଷା camp",
      description: "ଓଡ଼ିଆ caption / English caption",
      isPublished: false,
    };
    const upload = vi.fn(async (selected: AlbumFile) => {
      events.push(`upload:${selected.name}`);
      return `url:${selected.name}`;
    });
    const create = vi.fn(
      async (
        payload: AlbumDetails & { imageUrl: string; mediaType: "photo" }
      ) => {
        events.push(`create:${payload.imageUrl}`);
        expect(payload).not.toHaveProperty("beneficiariesCount");
        expect(payload).not.toHaveProperty("Fynd");
        expect(payload).not.toHaveProperty("CSR");
        expect(payload).toMatchObject({ ...details, mediaType: "photo" });
        return { id: payload.imageUrl };
      }
    );

    const outcome = await runSequentialAlbum({
      files: [file("one.jpg"), file("two.png")],
      results: {},
      details,
      upload,
      create,
      existingUrls: new Set(),
      progress: vi.fn(),
    });

    expect(outcome).toBeUndefined();
    expect(events).toEqual([
      "upload:one.jpg",
      "create:url:one.jpg",
      "upload:two.png",
      "create:url:two.png",
    ]);
  });

  it("stops at the first failure and retains the saved URL when create fails", async () => {
    const progress = vi.fn();
    const upload = vi.fn(
      async (selected: AlbumFile) => `saved:${selected.name}`
    );
    const create = vi.fn(async ({ imageUrl }: { imageUrl: string }) => {
      if (imageUrl === "saved:one.jpg") throw new Error("CMS unavailable");
    });
    const results: Record<string, AlbumResult> = {};

    expect(
      await runSequentialAlbum({
        files: [file("one.jpg"), file("two.jpg")],
        results,
        details: validDetails,
        upload,
        create,
        existingUrls: new Set(),
        progress,
      })
    ).toBe("one.jpg");
    expect(upload).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledTimes(1);
    expect(progress).toHaveBeenLastCalledWith("one.jpg", {
      url: "saved:one.jpg",
      error: "CMS unavailable",
    });
  });

  it("retries a stored URL without re-uploading, skips completed work, and reconciles existing CMS URLs", async () => {
    const results: Record<string, AlbumResult> = {
      "stored.jpg": { url: "url:stored.jpg" },
      "done.jpg": { url: "url:done.jpg", done: true },
      "already.jpg": { url: "url:already.jpg" },
    };
    const upload = vi.fn(async (selected: AlbumFile) => `url:${selected.name}`);
    const create = vi.fn(async () => undefined);
    const progress = vi.fn();

    expect(
      await runSequentialAlbum({
        files: [file("stored.jpg"), file("done.jpg"), file("already.jpg")],
        results,
        details: validDetails,
        upload,
        create,
        existingUrls: new Set(["url:already.jpg"]),
        progress,
      })
    ).toBeUndefined();

    expect(upload).toHaveBeenCalledTimes(0);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith({
      ...validDetails,
      imageUrl: "url:stored.jpg",
      mediaType: "photo",
    });
    expect(progress).toHaveBeenCalledWith("stored.jpg", {
      url: "url:stored.jpg",
      done: true,
    });
    expect(progress).not.toHaveBeenCalledWith("done.jpg", expect.anything());
    expect(progress).toHaveBeenCalledWith("already.jpg", {
      url: "url:already.jpg",
      done: true,
    });
  });
});
