import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { impactPublicText } from "@/data/impactPhotoCollections";
import { type ProgrammePhotoAlbum } from "@/data/programmePhotoAlbums";
import { impactProgrammeContext } from "@/data/impactProgrammeContext";

export type ProgrammeAlbumSelection = { key: string; index: number } | null;
export default function ProgrammeAlbumViewer({
  albums,
  selection,
  onSelectionChange,
}: {
  albums: ProgrammePhotoAlbum[];
  selection: ProgrammeAlbumSelection;
  onSelectionChange: (selection: ProgrammeAlbumSelection) => void;
}) {
  const { language, t } = useLanguage();
  const album = albums.find(item => item.key === selection?.key);
  const index = album
    ? Math.min(Math.max(0, selection?.index || 0), album.photos.length - 1)
    : 0;
  const photo = album?.photos[index];
  const step = (delta: number) => {
    if (album)
      onSelectionChange({
        key: album.key,
        index: (index + delta + album.photos.length) % album.photos.length,
      });
  };
  useEffect(() => {
    if (selection && !album) onSelectionChange(null);
  }, [selection, album, onSelectionChange]);
  useEffect(() => {
    if (!album || album.photos.length < 2) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        onSelectionChange({
          key: album.key,
          index:
            (index +
              (event.key === "ArrowLeft" ? -1 : 1) +
              album.photos.length) %
            album.photos.length,
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [album?.key, album?.photos.length, index, onSelectionChange]);
  const title = photo ? impactPublicText(photo.title, language, "title") : "";
  const context = photo ? impactProgrammeContext(photo, language) : null;
  return (
    <Dialog
      open={Boolean(photo)}
      onOpenChange={open => {
        if (!open) onSelectionChange(null);
      }}
    >
      {photo && album && (
        <DialogContent
          data-testid="programme-album-viewer"
          className="z-[10001] max-h-[95vh] max-w-[96vw] overflow-y-auto bg-white text-[#1A1A1A] sm:max-w-[min(96vw,1100px)]"
        >
          <DialogTitle className="pr-8 font-serif text-xl leading-7">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-[#555]">
            {impactPublicText(photo.description, language, "description") ||
              t("Published activity photo", "ପ୍ରକାଶିତ କାର୍ଯ୍ୟକ୍ରମ ଫଟୋ")}
          </DialogDescription>
          <div className="flex min-h-0 items-center justify-center bg-[#F5EFE3] p-2">
            <img
              data-testid="album-full-photo"
              src={photo.imageUrl}
              alt={title}
              className="max-h-[62vh] max-w-full object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs leading-6 text-[#665D4F]">
              {[context?.location, context?.date].filter(Boolean).join(" · ")}
            </p>
            <div className="flex items-center gap-2">
              {album.photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t("Previous album photo", "ପୂର୍ବ ଫଟୋ")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8C7A5] text-[#704708] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B56A22]"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <p
                className="min-w-16 text-center text-sm tabular-nums text-[#665D4F]"
                aria-live="polite"
              >
                {(index + 1).toLocaleString(
                  language === "od" ? "or-IN" : "en-IN"
                )}{" "}
                /{" "}
                {album.photos.length.toLocaleString(
                  language === "od" ? "or-IN" : "en-IN"
                )}
              </p>
              {album.photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t("Next album photo", "ପରବର୍ତ୍ତୀ ଫଟୋ")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8C7A5] text-[#704708] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B56A22]"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
          {album.photos.length > 1 && (
            <div
              className="flex gap-2 overflow-x-auto py-1"
              aria-label={t("Album photographs", "କାର୍ଯ୍ୟକ୍ରମର ଫଟୋ")}
            >
              {album.photos.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onSelectionChange({ key: album.key, index: i })
                  }
                  aria-label={t(
                    `View album photo ${i + 1}`,
                    `ଫଟୋ ${(i + 1).toLocaleString("or-IN")} ଦେଖନ୍ତୁ`
                  )}
                  aria-pressed={i === index}
                  className={`flex h-14 w-20 shrink-0 items-center justify-center border-2 bg-[#F5EFE3] p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B56A22] ${i === index ? "border-[#B56A22]" : "border-transparent"}`}
                >
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
