import { useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ALBUM_DESTINATIONS,
  runSequentialAlbum,
  validateAlbumDetails,
  validateAlbumFiles,
  type AlbumResult,
} from "@/lib/programmeAlbum";

export default function ProgrammeAlbumUploader() {
  const utils = trpc.useUtils();
  const upload = trpc.cms.media.upload.useMutation();
  const publish = trpc.cms.gallery.create.useMutation();
  const { data: storageStatus } = trpc.cms.media.status.useQuery();
  const [destination, setDestination] = useState<
    (typeof ALBUM_DESTINATIONS)[number]
  >(ALBUM_DESTINATIONS[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [consent, setConsent] = useState(false);
  const [publicNow, setPublicNow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Record<string, AlbumResult>>({});
  const saved = useRef<Record<string, AlbumResult>>({});
  const running = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const done = Object.values(results).filter(item => item.done).length;
  const locked = busy || Object.values(results).some(item => item.url);
  const setResult = (name: string, result: AlbumResult) => {
    saved.current[name] = result;
    setResults({ ...saved.current });
  };

  const run = async () => {
    if (running.current) return;
    const details = {
      title: title.trim(),
      description: caption.trim(),
      category: destination.category,
      location: location.trim(),
      dateTaken: date.trim(),
      isPublished: publicNow,
    };
    const validation =
      validateAlbumFiles(files) || validateAlbumDetails(details, consent);
    if (validation) {
      toast.error(validation);
      return;
    }
    running.current = true;
    setBusy(true);
    try {
      const existing = await utils.cms.gallery.list.fetch();
      const failed = await runSequentialAlbum({
        files,
        results: saved.current,
        details,
        existingUrls: new Set(existing.map(item => item.imageUrl)),
        progress: setResult,
        create: input => publish.mutateAsync(input),
        upload: async file => {
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () =>
              reject(new Error("Could not read the selected photo."));
            reader.readAsDataURL(file);
          });
          const stored = await upload.mutateAsync({
            folder: destination.folder,
            fileName: file.name,
            fileBase64: dataUrl.split(",")[1],
            contentType: file.type as "image/jpeg" | "image/png" | "image/webp",
            altText: details.title,
            consentConfirmed: consent,
          });
          return stored.url;
        },
      });
      await Promise.all([
        utils.cms.gallery.list.invalidate(),
        utils.cms.gallery.listPublished.invalidate(),
        utils.cms.media.listFolder.invalidate({ folder: destination.folder }),
      ]);
      if (failed)
        toast.error(
          `Stopped at ${failed}. Retry resumes only unfinished photos. Keep this page open.`
        );
      else
        toast.success(
          `${files.length} photos ${publicNow ? "published" : "saved as drafts"}.`
        );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not finish this album. Keep this page open and retry."
      );
    } finally {
      running.current = false;
      setBusy(false);
    }
  };

  return (
    <details className="mb-6 rounded-xl border border-[#D8C7A5] bg-[#FFFDF8] p-5 text-[#1A1A1A]">
      <summary className="cursor-pointer text-lg font-semibold">
        Upload a programme album
      </summary>
      <p className="mt-3 text-sm leading-6 text-[#555]">
        Select up to 20 photos from one programme. Keep each below 1 MB. All
        photos use these same editable details. Uploads run one at a time. Retry
        resumes unfinished photos while this page remains open.
      </p>
      <fieldset disabled={locked} className="mt-4">
        <legend className="mb-2 text-sm font-medium">Album destination</legend>
        <div className="flex flex-wrap gap-2">
          {ALBUM_DESTINATIONS.map(item => (
            <button
              type="button"
              key={item.folder}
              aria-pressed={destination.folder === item.folder}
              onClick={() => {
                setDestination(item);
                setConsent(false);
              }}
              className={`rounded border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${destination.folder === item.folder ? "border-[#111] bg-[#111] text-white" : "border-gray-300 bg-white text-[#333]"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-[#555]">
          abhiara-images/{destination.folder}/
        </p>
      </fieldset>
      <fieldset disabled={locked} className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="md:col-span-2 text-sm font-medium">
          Album photos
          <input
            ref={fileInput}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="mt-2 block w-full text-sm"
            onChange={event => {
              const selected = Array.from(event.target.files || []);
              const error = selected.length
                ? validateAlbumFiles(selected)
                : null;
              if (error) {
                toast.error(error);
                event.target.value = "";
                setFiles([]);
              } else setFiles(selected);
              saved.current = {};
              setResults({});
              setConsent(false);
            }}
          />
        </label>
        <label className="text-sm font-medium">
          Public programme title
          <Input
            value={title}
            onChange={event => setTitle(event.target.value)}
            maxLength={120}
            placeholder="English | ଓଡ଼ିଆ"
            className="mt-1"
          />
        </label>
        <label className="text-sm font-medium">
          Public activity caption
          <Input
            value={caption}
            onChange={event => setCaption(event.target.value)}
            maxLength={500}
            placeholder="What happened | କଣ କରାଗଲା"
            className="mt-1"
          />
        </label>
        <label className="text-sm font-medium">
          Activity month or date
          <Input
            value={date}
            onChange={event => setDate(event.target.value)}
            maxLength={100}
            placeholder="August 2026 | ଅଗଷ୍ଟ ୨୦୨୬"
            className="mt-1"
          />
        </label>
        <label className="text-sm font-medium">
          Broad programme location
          <Input
            value={location}
            onChange={event => setLocation(event.target.value)}
            maxLength={160}
            placeholder="Panchayat, district, state | ଓଡ଼ିଆ"
            className="mt-1"
          />
        </label>
        <label className="flex items-start gap-2 text-sm leading-6 md:col-span-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={event => setConsent(event.target.checked)}
            className="mt-1"
          />
          I confirm that required guardian/adult media permissions and
          safeguarding review are recorded for every selected photo. No Aadhaar,
          passbooks, readable personal records or vehicle plates are visible.
        </label>
        <label className="flex items-start gap-2 text-sm leading-6 md:col-span-2">
          <input
            type="checkbox"
            checked={publicNow}
            onChange={event => setPublicNow(event.target.checked)}
            className="mt-1"
          />
          Publish this album on the website after upload. Leave unchecked for
          drafts.
        </label>
      </fieldset>
      <Button
        onClick={run}
        disabled={
          busy ||
          !storageStatus?.configured ||
          !files.length ||
          !consent ||
          done === files.length
        }
        className="mt-5 bg-[#F5A623] text-[#111] hover:bg-[#E8960E]"
      >
        {busy
          ? `Uploading ${done}/${files.length}`
          : Object.values(results).some(item => item.error)
            ? "Resume unfinished photos"
            : publicNow
              ? "Upload and publish album"
              : "Upload album as drafts"}
      </Button>
      {done > 0 && done === files.length && (
        <Button
          variant="outline"
          className="ml-2 mt-5"
          onClick={() => {
            setFiles([]);
            setResults({});
            saved.current = {};
            setConsent(false);
            setPublicNow(false);
            setTitle("");
            setCaption("");
            setLocation("");
            setDate("");
            if (fileInput.current) fileInput.current.value = "";
          }}
        >
          Start another album
        </Button>
      )}
      <p aria-live="polite" role="status" className="mt-3 text-sm">
        {files.length
          ? `${done} of ${files.length} photos ${publicNow ? "published" : "saved"}.`
          : "No album files selected."}
      </p>
      {files.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs">
          {files.map(file => (
            <li
              key={file.name}
              className={
                results[file.name]?.error ? "text-red-700" : "text-[#555]"
              }
            >
              {file.name}:{" "}
              {results[file.name]?.done
                ? "Complete"
                : results[file.name]?.error ||
                  (results[file.name]?.url
                    ? "Stored, awaiting caption record"
                    : "Waiting")}
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}
