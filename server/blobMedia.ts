import { del, list, put } from "@vercel/blob";

export const BLOB_MEDIA_ROOT = "abhiara-images";
export const BLOB_MEDIA_STORE_ID =
  process.env.BLOB_STORE_ID || "store_cxjY0GQfLCaUfKdA";
export const PUBLIC_IMAGE_FOLDERS = [
  "beneficiaries",
  "programmes",
  "leadership",
  "partners",
  "press",
  "elder-support",
  "disaster-relief",
  "medical-support",
  "animal-welfare",
  "general",
] as const;
export type PublicImageFolder = (typeof PUBLIC_IMAGE_FOLDERS)[number];

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_IMAGE_BYTES = 1024 * 1024;

export type PublicBlobImage = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};

export function isBlobMediaConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || BLOB_MEDIA_STORE_ID);
}

function cleanFileStem(fileName: string) {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  const cleaned = withoutExtension
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return cleaned.slice(0, 60) || "image";
}

function imagePrefix(folder: PublicImageFolder) {
  return `${BLOB_MEDIA_ROOT}/${folder}/`;
}

export async function listPublicBlobImages(folder: PublicImageFolder) {
  if (!isBlobMediaConfigured()) {
    return { configured: false, images: [] as PublicBlobImage[] };
  }

  try {
    const result = await list({
      prefix: imagePrefix(folder),
      limit: 100,
      storeId: BLOB_MEDIA_STORE_ID,
    });
    const images = result.blobs
      .filter(blob => !blob.pathname.includes("/_metadata/"))
      .filter(blob => /\.(avif|jpe?g|png|webp)$/i.test(blob.pathname))
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
      .map(blob => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      }));

    return { configured: true, images };
  } catch (error) {
    console.warn(
      "[Blob media] Public image listing is unavailable.",
      error instanceof Error ? error.message : "Unknown error"
    );
    return { configured: false, images: [] as PublicBlobImage[] };
  }
}

type UploadPublicImageInput = {
  folder: PublicImageFolder;
  fileName: string;
  fileBase64: string;
  contentType: string;
  altText: string;
  consentConfirmed: boolean;
};

export async function uploadPublicBlobImage(input: UploadPublicImageInput) {
  if (!isBlobMediaConfigured()) {
    throw new Error("Vercel Blob is not connected to this deployment.");
  }

  const extension = IMAGE_TYPES[input.contentType];
  if (!extension) {
    throw new Error("Only JPEG, PNG and WebP images are allowed.");
  }
  if (
    [
      "beneficiaries",
      "programmes",
      "press",
      "elder-support",
      "disaster-relief",
      "medical-support",
      "animal-welfare",
    ].includes(input.folder) &&
    !input.consentConfirmed
  ) {
    throw new Error(
      "Recorded consent and safeguarding review are required for public evidence photos."
    );
  }

  const buffer = Buffer.from(input.fileBase64, "base64");
  if (buffer.length === 0 || buffer.length > MAX_IMAGE_BYTES) {
    throw new Error("Images must be smaller than 1 MB.");
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileStem = cleanFileStem(input.fileName);
  const pathname = `${imagePrefix(input.folder)}${stamp}-${fileStem}.${extension}`;
  const blob = await put(pathname, buffer, {
    storeId: BLOB_MEDIA_STORE_ID,
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: false,
    cacheControlMaxAge: 31_536_000,
    contentType: input.contentType,
  });

  const metadata = {
    pathname: blob.pathname,
    altText: input.altText.trim(),
    consentConfirmed: input.consentConfirmed,
    publishedAt: new Date().toISOString(),
  };
  await put(
    `${imagePrefix(input.folder)}_metadata/${stamp}-${fileStem}.json`,
    JSON.stringify(metadata),
    {
      storeId: BLOB_MEDIA_STORE_ID,
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      cacheControlMaxAge: 60,
      contentType: "application/json",
    }
  );

  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: blob.contentType,
    altText: metadata.altText,
  };
}

export async function deletePublicBlobImage(
  folder: PublicImageFolder,
  pathname: string
) {
  const prefix = imagePrefix(folder);
  if (!pathname.startsWith(prefix) || pathname.includes("/_metadata/")) {
    throw new Error(
      "The requested image is outside the approved media folder."
    );
  }
  await del(pathname, { storeId: BLOB_MEDIA_STORE_ID });
  return { success: true } as const;
}
