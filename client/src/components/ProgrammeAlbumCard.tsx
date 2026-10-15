import { Images } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { impactPublicText } from "@/data/impactPhotoCollections";
import {
  programmeAlbumTitle,
  type ProgrammePhotoAlbum,
} from "@/data/programmePhotoAlbums";
import { impactProgrammeContext } from "@/data/impactProgrammeContext";

export default function ProgrammeAlbumCard({
  album,
  onOpen,
  eager = false,
}: {
  album: ProgrammePhotoAlbum;
  onOpen: (key: string, index: number) => void;
  eager?: boolean;
}) {
  const { language, t } = useLanguage();
  const { cover, photos } = album;
  const albumTitle = programmeAlbumTitle(cover);
  const title = impactPublicText(albumTitle, language, "title");
  const description =
    albumTitle !== cover.title
      ? t(
          "Photographs from the Pratibha Samman student recognition programme.",
          "ପ୍ରତିଭା ସମ୍ମାନ ଶିକ୍ଷାର୍ଥୀ ସମ୍ମାନ କାର୍ଯ୍ୟକ୍ରମର ଫଟୋ।"
        )
      : impactPublicText(cover.description, language, "description");
  const context = impactProgrammeContext(cover, language);
  const preview = photos.slice(0, 5);
  const grid =
    preview.length >= 5
      ? "lg:grid-cols-4 xl:grid-cols-5"
      : preview.length === 4
        ? "lg:grid-cols-4"
        : preview.length === 3
          ? "lg:grid-cols-3"
          : "";
  return (
    <article
      data-category={cover.category === "elderly" ? "elder" : cover.category}
      data-programme-album={album.key}
      data-album-size={photos.length}
      data-preview-count={preview.length}
      className="overflow-hidden border border-[#E8DCC6] bg-[#FFFDF8] p-4 sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-4xl">
          <h3 className="font-serif text-2xl font-bold leading-9 sm:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-sm leading-7 text-[#666]">{description}</p>
          )}
          {(context.location || context.date) && (
            <p className="mt-2 text-xs leading-6 text-[#7A6A54]">
              {[context.location, context.date].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <p className="shrink-0 text-sm leading-7 text-[#7A6A54]">
          {photos.length.toLocaleString(language === "od" ? "or-IN" : "en-IN")}{" "}
          {t("photos", "ଫଟୋ")}
        </p>
      </div>
      <div
        className={`grid gap-3 ${preview.length >= 3 ? "grid-cols-2" : "grid-cols-1"} sm:grid-cols-2 ${grid}`}
      >
        {preview.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => onOpen(album.key, index)}
            aria-label={t(
              `View programme photo ${index + 1}: ${title}`,
              `କାର୍ଯ୍ୟକ୍ରମର ଫଟୋ ${(index + 1).toLocaleString("or-IN")} ଦେଖନ୍ତୁ: ${title}`
            )}
            className="flex aspect-[4/3] w-full items-center justify-center border border-[#E8DCC6] bg-[#F5EFE3] p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B56A22]"
          >
            <img
              src={photo.imageUrl}
              alt={impactPublicText(photo.title, language, "title")}
              className="h-full w-full object-contain"
              loading={eager && index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onOpen(album.key, 0)}
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-left text-sm font-bold text-[#704708] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B56A22]"
      >
        <Images size={17} className="shrink-0" aria-hidden="true" />
        {photos.length > 1
          ? t(
              `View all ${photos.length} photos`,
              `ସମସ୍ତ ${photos.length.toLocaleString("or-IN")}ଟି ଫଟୋ ଦେଖନ୍ତୁ`
            )
          : t("View full photo", "ପୂରା ଫଟୋ ଦେଖନ୍ତୁ")}
      </button>
    </article>
  );
}
