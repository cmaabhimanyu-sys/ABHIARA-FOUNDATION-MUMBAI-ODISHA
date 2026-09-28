import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";

const { mockList, mockPut, mockDel } = vi.hoisted(() => ({
  mockList: vi.fn(),
  mockPut: vi.fn(),
  mockDel: vi.fn(),
}));

vi.mock("@vercel/blob", () => ({
  list: mockList,
  put: mockPut,
  del: mockDel,
}));

import {
  BLOB_MEDIA_ROOT,
  deletePublicBlobImage,
  listPublicBlobImages,
  uploadPublicBlobImage,
} from "./blobMedia";

describe("Vercel Blob public media", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.BLOB_READ_WRITE_TOKEN = "test-token";
    mockPut.mockImplementation(
      async (
        pathname: string,
        _body: unknown,
        options: { contentType?: string }
      ) => ({
        url: `https://example.public.blob.vercel-storage.com/${pathname}`,
        downloadUrl: `https://example.public.blob.vercel-storage.com/${pathname}?download=1`,
        pathname,
        contentType: options.contentType || "application/octet-stream",
        contentDisposition: "inline",
        etag: "test-etag",
      })
    );
  });

  afterEach(() => {
    delete process.env.BLOB_READ_WRITE_TOKEN;
    delete process.env.BLOB_STORE_ID;
  });

  it("lists only images from the approved beneficiary prefix and returns the newest first", async () => {
    mockList.mockResolvedValue({
      hasMore: false,
      blobs: [
        {
          url: "https://blob/old.jpg",
          downloadUrl: "https://blob/old.jpg",
          pathname: `${BLOB_MEDIA_ROOT}/beneficiaries/old.jpg`,
          size: 10,
          uploadedAt: new Date("2026-01-01"),
          etag: "1",
        },
        {
          url: "https://blob/new.webp",
          downloadUrl: "https://blob/new.webp",
          pathname: `${BLOB_MEDIA_ROOT}/beneficiaries/new.webp`,
          size: 20,
          uploadedAt: new Date("2026-02-01"),
          etag: "2",
        },
        {
          url: "https://blob/meta.json",
          downloadUrl: "https://blob/meta.json",
          pathname: `${BLOB_MEDIA_ROOT}/beneficiaries/_metadata/new.json`,
          size: 5,
          uploadedAt: new Date("2026-02-01"),
          etag: "3",
        },
      ],
    });

    const result = await listPublicBlobImages("beneficiaries");

    expect(mockList).toHaveBeenCalledWith(
      expect.objectContaining({
        prefix: "abhiara-images/beneficiaries/",
        limit: 100,
        storeId: "store_cxjY0GQfLCaUfKdA",
      })
    );
    expect(result.configured).toBe(true);
    expect(result.images.map(image => image.pathname)).toEqual([
      "abhiara-images/beneficiaries/new.webp",
      "abhiara-images/beneficiaries/old.jpg",
    ]);
  });

  it("uses the connected store ID with Vercel's rotating OIDC authentication", async () => {
    delete process.env.BLOB_READ_WRITE_TOKEN;
    process.env.BLOB_STORE_ID = "store_test";
    mockList.mockResolvedValue({ hasMore: false, blobs: [] });

    const result = await listPublicBlobImages("beneficiaries");

    expect(mockList).toHaveBeenCalledWith(
      expect.objectContaining({
        prefix: "abhiara-images/beneficiaries/",
        limit: 100,
        storeId: "store_cxjY0GQfLCaUfKdA",
      })
    );
    expect(result.configured).toBe(true);
  });

  it("requires recorded consent before uploading a beneficiary image", async () => {
    await expect(
      uploadPublicBlobImage({
        folder: "beneficiaries",
        fileName: "student.jpg",
        fileBase64: Buffer.from("photo").toString("base64"),
        contentType: "image/jpeg",
        altText: "A student continuing education",
        consentConfirmed: false,
      })
    ).rejects.toThrow(/consent/i);
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("requires permission and privacy review before uploading a press evidence image", async () => {
    await expect(
      uploadPublicBlobImage({
        folder: "press",
        fileName: "press-proof.jpg",
        fileBase64: Buffer.from("photo").toString("base64"),
        contentType: "image/jpeg",
        altText: "Reviewed public activity evidence",
        consentConfirmed: false,
      })
    ).rejects.toThrow(/consent/i);
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("requires permission before uploading elder, disaster, medical or animal support photos", async () => {
    for (const folder of [
      "elder-support",
      "disaster-relief",
      "medical-support",
      "animal-welfare",
    ] as const) {
      await expect(
        uploadPublicBlobImage({
          folder,
          fileName: `${folder}.jpg`,
          fileBase64: Buffer.from("photo").toString("base64"),
          contentType: "image/jpeg",
          altText: "Reviewed public ground work photo",
          consentConfirmed: false,
        })
      ).rejects.toThrow(/consent/i);
    }
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("uploads approved beneficiary media under abhiara-images and writes safeguarding metadata", async () => {
    const result = await uploadPublicBlobImage({
      folder: "beneficiaries",
      fileName: "Higher Education Student.jpeg",
      fileBase64: Buffer.from("photo").toString("base64"),
      contentType: "image/jpeg",
      altText: "A student continuing higher education",
      consentConfirmed: true,
    });

    expect(result.pathname).toMatch(
      /^abhiara-images\/beneficiaries\/.*-higher-education-student\.jpg$/
    );
    expect(mockPut).toHaveBeenCalledTimes(2);
    expect(mockPut.mock.calls[1][0]).toContain(
      "abhiara-images/beneficiaries/_metadata/"
    );
  });

  it("blocks deletion outside the selected approved folder", async () => {
    await expect(
      deletePublicBlobImage("beneficiaries", "private/other.jpg")
    ).rejects.toThrow(/outside/i);
    expect(mockDel).not.toHaveBeenCalled();
  });

  it("uses owner-published gallery records on Student Impact and keeps only a reviewed continuity fallback", () => {
    const page = readFileSync("client/src/pages/StudentImpact.tsx", "utf8");
    const cms = readFileSync("server/cms-router.ts", "utf8");
    expect(page).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(page).not.toContain("trpc.cms.media.listFolder.useQuery");
    expect(page).toMatch(
      /data-media-source=\{\s*publishedHigherEducationPhoto\s*\?\s*"published-gallery"\s*:\s*"local-fallback"\s*\}/
    );
    expect(cms).toMatch(/listFolder:\s*adminProcedure/);
    expect(cms).toContain("media: mediaRouter");
  });
});
