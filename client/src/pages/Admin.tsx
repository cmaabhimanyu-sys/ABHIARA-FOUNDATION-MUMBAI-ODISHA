import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getOwnerLoginUrl, OAUTH_SUPPORTED_ORIGIN } from "@/const";
import { PEOPLE_SECTIONS } from "@/data/peopleSections";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout, {
  type DashboardMenuItem,
} from "@/components/DashboardLayout";
import AdminControlCentre, {
  type AdminTab,
} from "@/components/AdminControlCentre";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Image,
  FileText,
  Youtube,
  Share2,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Upload,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Calendar,
  MapPin,
  Tag,
  Users,
  X,
  Check,
  Loader2,
  Link as LinkIcon,
  Layers,
  Megaphone,
  Images,
  IndianRupee,
  Newspaper,
  ExternalLink,
  Star,
} from "lucide-react";

type Tab = AdminTab;

type ImpactPhotoCategory =
  | "education"
  | "elderly"
  | "medical"
  | "disaster"
  | "animals"
  | "events"
  | "community";

const IMPACT_CATEGORY_OPTIONS: Array<{
  value: ImpactPhotoCategory;
  label: string;
  destination: string;
}> = [
  {
    value: "education",
    label: "Education",
    destination: "Education and Learning",
  },
  {
    value: "elderly",
    label: "Elder support",
    destination: "Elder Care and Dignity",
  },
  {
    value: "medical",
    label: "Medical emergency help",
    destination: "Medical Emergencies",
  },
  {
    value: "disaster",
    label: "Disaster relief",
    destination: "Natural Disaster",
  },
  {
    value: "animals",
    label: "Animal welfare",
    destination: "Animal Welfare",
  },
  {
    value: "events",
    label: "Education event",
    destination: "Education events and Impact Gallery",
  },
  {
    value: "community",
    label: "Community archive",
    destination: "Impact and Media",
  },
];

function isGenericImpactTitle(value: string) {
  return /^(education|community|elder|elderly|medical|disaster|animal|programme|program)\s+(activity|photo|work)$/i.test(
    value.trim()
  );
}

function getImpactCategoryOption(category: ImpactPhotoCategory) {
  return IMPACT_CATEGORY_OPTIONS.find(option => option.value === category)!;
}

// ===== FILE UPLOAD HELPER =====
function useFileUpload() {
  const uploadMutation = trpc.cms.upload.useMutation();

  const uploadFile = useCallback(
    async (file: File): Promise<string> => {
      const isImage = file.type.startsWith("image/");
      if (isImage) {
        const approved = window.confirm(
          "Privacy check: confirm that you have permission to publish this photo and it does not show Aadhaar, a bank passbook, an address, a phone number, school records or payment details."
        );
        if (!approved) throw new Error("Upload cancelled for privacy review.");
      }
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64 = (reader.result as string).split(",")[1];
            const result = await uploadMutation.mutateAsync({
              fileName: file.name,
              fileBase64: base64,
              contentType: file.type,
              folder: "general",
              altText: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
              consentConfirmed: isImage,
            });
            resolve(result.url);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    [uploadMutation]
  );

  return { uploadFile, isUploading: uploadMutation.isPending };
}

// Legacy alias
function useImageUpload() {
  const { uploadFile, isUploading } = useFileUpload();
  return { uploadImage: uploadFile, isUploading };
}

// ===== IMAGE UPLOAD COMPONENT =====
function ImageUploader({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const { uploadImage, isUploading } = useImageUpload();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      toast.error("Image must be smaller than 1 MB.");
      return;
    }
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Upload failed. Try again."
      );
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-[#333] mb-1 block">
        {label}
      </label>
      <div className="flex gap-2 items-center">
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Image URL or upload..."
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623] flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={isUploading}
          className="border-gray-200 text-[#333] hover:text-[#1A1A1A]"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>
      {value && (
        <img
          src={value}
          alt="Preview"
          className="mt-2 h-20 w-auto rounded object-contain bg-white"
        />
      )}
    </div>
  );
}

async function standardizeLeadershipPortrait(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = document.createElement("img");
    image.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("This image could not be read."));
      image.src = objectUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1000;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("This browser cannot prepare the photo.");

    const scale = Math.max(
      canvas.width / image.naturalWidth,
      canvas.height / image.naturalHeight
    );
    const width = Math.round(image.naturalWidth * scale);
    const height = Math.round(image.naturalHeight * scale);
    const x = Math.round((canvas.width - width) / 2);
    const y = Math.round((canvas.height - height) * 0.43);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, x, y, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        result =>
          result
            ? resolve(result)
            : reject(new Error("The professional photo could not be created.")),
        "image/webp",
        0.88
      );
    });
    const stem = file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/gi, "-");
    return new File([blob], `${stem}-professional-800x1000.webp`, {
      type: "image/webp",
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function LeadershipPortraitUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const uploadMutation = trpc.cms.media.upload.useMutation();
  const isUploading = uploadMutation.isPending;

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Choose an image smaller than 10 MB.");
      return;
    }
    try {
      const prepared = await standardizeLeadershipPortrait(file);
      if (prepared.size > 1024 * 1024) {
        throw new Error("The prepared portrait is still larger than 1 MB.");
      }
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(prepared);
      });
      const { url } = await uploadMutation.mutateAsync({
        folder: "leadership",
        fileName: prepared.name,
        fileBase64: dataUrl.split(",")[1],
        contentType: "image/webp",
        altText: `Portrait of ${file.name.replace(/\.[^.]+$/, "")}`,
        consentConfirmed: true,
      });
      onChange(url);
      toast.success(
        "Portrait resized to 800 × 1000 and uploaded to Vercel Blob."
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Portrait upload failed."
      );
    }
  };

  return (
    <div>
      <label
        htmlFor="leadership-portrait-upload"
        className="mb-1 block text-sm font-medium text-[#333]"
      >
        Public profile photo
      </label>
      <p className="mb-2 text-xs leading-5 text-[#666]">
        Use a centred head and shoulders photo. It is prepared as an 800 × 1000
        WebP and may crop the outer edges to keep every public profile
        consistent.
      </p>
      <div className="space-y-2">
        <Input
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder="Image URL or upload..."
          className="flex-1 border border-gray-300 bg-white text-[#333] focus:border-[#F5A623]"
        />
        <input
          id="leadership-portrait-upload"
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={isUploading}
          className="block w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-[#333] file:mr-3 file:rounded file:border-0 file:bg-[#F5A623] file:px-3 file:py-2 file:font-bold file:text-[#1A1A1A]"
        />
        {isUploading && (
          <p className="text-xs text-[#666]">
            Uploading portrait to Vercel Blob…
          </p>
        )}
      </div>
      {value && (
        <img
          src={value}
          alt="Profile preview"
          width={800}
          height={1000}
          className="mt-3 aspect-[4/5] w-32 border border-gray-200 bg-[#F5EFE3] object-cover"
        />
      )}
    </div>
  );
}

// ===== MEDIA UPLOAD COMPONENT (Photo + Video) =====
function MediaUploader({
  value,
  onChange,
  mediaType,
  label = "Media File",
}: {
  value: string;
  onChange: (url: string) => void;
  mediaType: "photo" | "video";
  label?: string;
}) {
  const { uploadFile, isUploading } = useFileUpload();
  const fileRef = useRef<HTMLInputElement>(null);
  const maxSize = mediaType === "video" ? 50 * 1024 * 1024 : 1024 * 1024;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxSize) {
      toast.error(
        `File too large. Max ${mediaType === "video" ? "50MB" : "1MB"}.`
      );
      return;
    }
    try {
      const url = await uploadFile(file);
      onChange(url);
      toast.success(`${mediaType === "video" ? "Video" : "Photo"} uploaded!`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Upload failed. Try again."
      );
    }
  };

  const accept =
    mediaType === "video" ? "video/mp4,video/webm,video/quicktime" : "image/*";

  return (
    <div>
      <label className="text-sm font-medium text-[#333] mb-1 block">
        {label}
      </label>
      <div className="flex gap-2 items-center">
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={`${mediaType === "video" ? "Video" : "Image"} URL or upload...`}
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623] flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={isUploading}
          className="border-gray-200 text-[#333] hover:text-[#1A1A1A]"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          onChange={handleFile}
          className="hidden"
        />
      </div>
      {value && mediaType === "photo" && (
        <img
          src={value}
          alt="Preview"
          className="mt-2 h-20 w-auto rounded object-contain bg-white"
        />
      )}
      {value && mediaType === "video" && (
        <video
          src={value}
          className="mt-2 h-20 w-auto rounded bg-white"
          controls
          muted
        />
      )}
    </div>
  );
}

// ===== ACTIVITIES MANAGER =====
function ActivitiesManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.activities.list.useQuery();
  const createMut = trpc.cms.activities.create.useMutation({
    onSuccess: () => {
      utils.cms.activities.list.invalidate();
      setShowForm(false);
      resetForm();
      toast.success("Activity created!");
    },
  });
  const updateMut = trpc.cms.activities.update.useMutation({
    onSuccess: () => {
      utils.cms.activities.list.invalidate();
      setEditId(null);
      setShowForm(false);
      resetForm();
      toast.success("Activity updated!");
    },
  });
  const deleteMut = trpc.cms.activities.delete.useMutation({
    onSuccess: () => {
      utils.cms.activities.list.invalidate();
      toast.success("Activity deleted!");
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "education" as "education" | "elderly" | "community" | "csr",
    imageUrl: "",
    sdgTags: "",
    beneficiariesCount: "",
    isPublished: true,
  });

  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      date: "",
      location: "",
      category: "education",
      imageUrl: "",
      sdgTags: "",
      beneficiariesCount: "",
      isPublished: true,
    });

  const startEdit = (item: any) => {
    setForm({
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      category: item.category,
      imageUrl: item.imageUrl || "",
      sdgTags: item.sdgTags || "",
      beneficiariesCount: item.beneficiariesCount || "",
      isPublished: item.isPublished,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.date || !form.location) {
      toast.error("Please fill all required fields");
      return;
    }
    if (editId) {
      updateMut.mutate({ id: editId, ...form });
    } else {
      createMut.mutate(form);
    }
  };

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              resetForm();
            }}
            className="text-[#555]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            {editId ? "Edit Field Report" : "New Field Report"}
          </h3>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">
          Use verified facts only. Do not enter a child’s full name, home
          address, phone number, school record, bank details or private family
          history. For an RTI or human rights class, choose Community archive
          and enter only the checked date, broad place and total attendance. Do
          not enter participant names or certificate numbers.
        </div>
        <Input
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Short public report title *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        <Textarea
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="What support was provided and what was verified? *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623] min-h-[100px]"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            placeholder="Report month or activity date *"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
          <Input
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            placeholder="District or broad location *"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.category}
            onChange={e =>
              setForm(f => ({ ...f, category: e.target.value as any }))
            }
            className="bg-white border border-gray-200 text-[#1A1A1A] rounded-md px-3 py-2 text-sm"
          >
            <option value="education">Education report</option>
            <option value="elderly">Limited verified support</option>
            <option value="community">Community archive</option>
            <option value="csr">Institutional support record</option>
          </select>
          <Input
            value={form.beneficiariesCount}
            onChange={e =>
              setForm(f => ({ ...f, beneficiariesCount: e.target.value }))
            }
            placeholder="Aggregate result, for example 50+ children"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>
        <ImageUploader
          value={form.imageUrl}
          onChange={url => setForm(f => ({ ...f, imageUrl: url }))}
          label="Approved report photo (optional)"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={e =>
              setForm(f => ({ ...f, isPublished: e.target.checked }))
            }
            className="rounded"
          />
          <span className="text-sm text-[#333]">
            Publish on the public website after saving
          </span>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={createMut.isPending || updateMut.isPending}
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          {createMut.isPending || updateMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {editId ? "Update Report" : "Publish Report"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            Monthly and Field Reports ({items.length})
          </h3>
          <p className="mt-1 text-xs text-[#777]">
            Education reports appear on Monthly Reports. Community archive
            records, such as RTI or human rights classes, appear in the RTI and
            Human Rights Awareness section and Press and Media after review.
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          size="sm"
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Report
        </Button>
      </div>
      {isLoading ? (
        <p className="text-[#666]">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#666] mb-2">No field reports yet.</p>
          <p className="text-[#aaa] text-xs">
            Use Add Report when you have verified facts and approved media.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-16 w-24 rounded bg-[#F5EFE3] object-contain shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[#1A1A1A] font-medium truncate">
                    {item.title}
                  </h4>
                  {!item.isPublished && (
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded uppercase">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-[#666] text-xs mt-1">
                  {item.date} · {item.location} · {item.category}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEdit(item)}
                  className="text-[#666] hover:text-[#1A1A1A] h-8 w-8 p-0"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("Delete this activity?"))
                      deleteMut.mutate({ id: item.id });
                  }}
                  className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== BULK UPLOAD BUTTON =====
function BulkUploadButton({ onSuccess }: { onSuccess: () => void }) {
  const { uploadFile, isUploading } = useFileUpload();
  const createMut = trpc.cms.gallery.create.useMutation({ onSuccess });
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setProgress({ done: 0, total: files.length });
    let successCount = 0;
    for (const file of files) {
      if (file.size > 1024 * 1024) {
        toast.error(`${file.name} is too large. Keep every photo below 1 MB.`);
        setProgress(p => ({ ...p, done: p.done + 1 }));
        continue;
      }
      try {
        const url = await uploadFile(file);
        const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
        await createMut.mutateAsync({
          title: name,
          imageUrl: url,
          category: "events",
          mediaType: "photo",
          isPublished: true,
        });
        successCount++;
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
      setProgress(p => ({ ...p, done: p.done + 1 }));
    }
    setUploading(false);
    if (successCount > 0) toast.success(`${successCount} photos uploaded!`);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <Button
        onClick={() => fileRef.current?.click()}
        size="sm"
        variant="outline"
        disabled={uploading}
        className="border-[#F5A623] text-[#F5A623] hover:bg-[#1A1A1A]/10"
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-1" /> {progress.done}/
            {progress.total}
          </>
        ) : (
          <>
            <Images className="h-4 w-4 mr-1" /> Bulk Upload
          </>
        )}
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />
    </>
  );
}

// ===== GALLERY MANAGER =====
function GalleryManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.gallery.list.useQuery();
  const createMut = trpc.cms.gallery.create.useMutation({
    onSuccess: () => {
      utils.cms.gallery.list.invalidate();
      setShowForm(false);
      resetForm();
      toast.success("Media added!");
    },
  });
  const updateMut = trpc.cms.gallery.update.useMutation({
    onSuccess: () => {
      utils.cms.gallery.list.invalidate();
      utils.cms.gallery.listPublished.invalidate();
      setEditId(null);
      setShowForm(false);
      resetForm();
      toast.success("Media updated!");
    },
  });
  const deleteMut = trpc.cms.gallery.delete.useMutation({
    onSuccess: () => {
      utils.cms.gallery.list.invalidate();
      utils.cms.gallery.listPublished.invalidate();
      toast.success("Media deleted!");
    },
  });
  const moveMut = trpc.cms.gallery.move.useMutation({
    onSuccess: () => {
      utils.cms.gallery.list.invalidate();
      utils.cms.gallery.listPublished.invalidate();
      toast.success("Photo order updated.");
    },
    onError: error => toast.error(error.message),
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    mediaType: "photo" as "photo" | "video",
    thumbnailUrl: "",
    category: "education" as ImpactPhotoCategory,
    location: "",
    dateTaken: "",
    isPublished: false,
    isHomepageFeatured: false,
    sortOrder: 0,
  });

  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      imageUrl: "",
      mediaType: "photo",
      thumbnailUrl: "",
      category: "education",
      location: "",
      dateTaken: "",
      isPublished: false,
      isHomepageFeatured: false,
      sortOrder: 0,
    });

  const startEdit = (item: any) => {
    setForm({
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl,
      mediaType: item.mediaType || "photo",
      thumbnailUrl: item.thumbnailUrl || "",
      category: item.category,
      location: item.location || "",
      dateTaken: item.dateTaken || "",
      isPublished: item.isPublished,
      isHomepageFeatured: item.isHomepageFeatured,
      sortOrder: item.sortOrder || 0,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.imageUrl) {
      toast.error("Title and media file are required");
      return;
    }
    if (form.mediaType === "photo" && form.description.trim().length < 8) {
      toast.error("Add a short public description for this photo.");
      return;
    }
    if (form.mediaType === "photo" && isGenericImpactTitle(form.title)) {
      toast.error(
        "Replace the generic title with a clear description of this activity."
      );
      return;
    }
    if (editId) {
      updateMut.mutate({ id: editId, ...form });
    } else {
      createMut.mutate({ ...form, isPublished: true });
    }
  };

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              resetForm();
            }}
            className="text-[#555]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            {editId ? "Edit Impact Photo" : "Add Impact Photo"}
          </h3>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">
          Publish photos or videos only after checking consent. Do not upload
          identity documents, bank records, personal phone numbers, or exact
          home addresses.
        </div>

        {/* Media Type Selector */}
        <div>
          <label className="text-sm font-medium text-[#333] mb-2 block">
            Choose photo or video
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={form.mediaType === "photo" ? "default" : "outline"}
              size="sm"
              onClick={() => setForm(f => ({ ...f, mediaType: "photo" }))}
              className={
                form.mediaType === "photo"
                  ? "bg-[#F5A623] text-[#1A1A1A]"
                  : "border-gray-200 text-[#333]"
              }
            >
              📷 Photo
            </Button>
            <Button
              type="button"
              variant={form.mediaType === "video" ? "default" : "outline"}
              size="sm"
              onClick={() => setForm(f => ({ ...f, mediaType: "video" }))}
              className={
                form.mediaType === "video"
                  ? "bg-[#1A1A1A] text-[#1A1A1A]"
                  : "border-gray-200 text-[#333]"
              }
            >
              🎬 Video
            </Button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#333]">
            Public title
          </label>
          <Input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Example: School book distribution"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#333]">
            Public description
          </label>
          <Textarea
            value={form.description}
            onChange={e =>
              setForm(f => ({ ...f, description: e.target.value }))
            }
            placeholder="Describe the verified activity without private personal details"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>

        {/* Main media file upload */}
        <MediaUploader
          value={form.imageUrl}
          onChange={url => setForm(f => ({ ...f, imageUrl: url }))}
          mediaType={form.mediaType}
          label={form.mediaType === "video" ? "Video File *" : "Photo *"}
        />

        {/* Thumbnail for videos */}
        {form.mediaType === "video" && (
          <ImageUploader
            value={form.thumbnailUrl}
            onChange={url => setForm(f => ({ ...f, thumbnailUrl: url }))}
            label="Video Thumbnail (optional)"
          />
        )}

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Website category
            </label>
            <select
              value={form.category}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  category: e.target.value as ImpactPhotoCategory,
                }))
              }
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-[#1A1A1A]"
            >
              {IMPACT_CATEGORY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-[#777]">
              Shows in {getImpactCategoryOption(form.category).destination}.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              District or broad location
            </label>
            <Input
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              placeholder="Example: Kendrapara, Odisha"
              className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Activity date
            </label>
            <Input
              value={form.dateTaken}
              onChange={e =>
                setForm(f => ({ ...f, dateTaken: e.target.value }))
              }
              placeholder="Example: 15 August 2026"
              className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Display order
            </label>
            <Input
              type="number"
              min={0}
              max={9999}
              value={form.sortOrder}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  sortOrder: Number(event.target.value) || 0,
                }))
              }
              className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
            />
            <p className="mt-1 text-xs text-[#777]">
              Lower numbers appear earlier.
            </p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-start gap-3 rounded border border-gray-200 bg-gray-50 p-4 text-sm text-[#333]">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  isPublished: event.target.checked,
                  isHomepageFeatured: event.target.checked
                    ? current.isHomepageFeatured
                    : false,
                }))
              }
              className="mt-1"
            />
            <span>
              <strong className="block">Published</strong>
              Shows on the homepage, Impact Gallery and matching category page.
            </span>
          </label>
          {form.mediaType === "photo" && (
            <label className="flex items-start gap-3 rounded border border-amber-300 bg-amber-50 p-4 text-sm text-[#59420B]">
              <input
                type="checkbox"
                checked={form.isHomepageFeatured}
                onChange={event =>
                  setForm(current => ({
                    ...current,
                    isHomepageFeatured: event.target.checked,
                    isPublished: event.target.checked
                      ? true
                      : current.isPublished,
                  }))
                }
                className="mt-1"
              />
              <span>
                <strong className="block">First homepage photo</strong>
                Only one photo can hold this position. Selecting another photo
                replaces the current first photo.
              </span>
            </label>
          )}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={createMut.isPending || updateMut.isPending}
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          {createMut.isPending || updateMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Save Photo
        </Button>
      </div>
    );
  }

  const photos = items.filter(
    (i: any) => !i.mediaType || i.mediaType === "photo"
  );
  const videos = items.filter((i: any) => i.mediaType === "video");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            Impact Photos ({items.length})
          </h3>
          <p className="mt-1 text-xs text-[#777]">
            {photos.length} photos and {videos.length} videos. Upload new photos
            in Photo Library. Edit here to change the title, description,
            category, location, date, homepage position, display order or public
            visibility.
          </p>
          <p className="mt-1 text-xs text-[#777]">
            Unpublish hides a photo safely. Delete record removes its website
            entry only. Use Photo Library to permanently delete the stored file.
          </p>
        </div>
      </div>
      {isLoading ? (
        <p className="text-[#666]">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#666] mb-2">No impact photos yet.</p>
          <p className="text-[#aaa] text-xs">
            Upload a reviewed photo from Photo Library, then press Publish.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item: any, index: number) => (
            <div
              key={item.id}
              className="relative group rounded-lg overflow-hidden bg-white border border-gray-200"
            >
              {item.mediaType === "video" ? (
                <div className="relative w-full h-32 bg-black flex items-center justify-center">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-[#888] text-2xl">🎬</div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-[#1A1A1A] text-xs">▶</span>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-32 bg-[#F5EFE3] object-contain"
                />
              )}
              <div className="p-2">
                <p className="text-[#1A1A1A] text-xs font-medium truncate">
                  {item.title}
                </p>
                <p className="text-[#888] text-[10px]">
                  {item.mediaType === "video" ? "🎬 " : "📷 "}
                  {item.category} {item.location ? `· ${item.location}` : ""}
                </p>
                {item.dateTaken && (
                  <p className="mt-1 text-[10px] text-[#888]">
                    {item.dateTaken}
                  </p>
                )}
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#8A5700]">
                  {item.isPublished ? "Live on public pages" : "Draft"}
                </p>
                <p className="mt-1 text-[10px] text-[#777]">
                  Display order {item.sortOrder || index + 1}
                </p>
                {item.isHomepageFeatured && (
                  <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-[#6F4300]">
                    <Star className="h-3 w-3 fill-current" /> First homepage
                    photo
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(item)}
                    className="h-8 border-gray-300 px-2 text-xs text-[#333]"
                  >
                    <Edit2 className="mr-1 h-3 w-3" /> Edit
                  </Button>
                  {item.mediaType !== "video" && !item.isHomepageFeatured && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateMut.mutate({
                          id: item.id,
                          isHomepageFeatured: true,
                          isPublished: true,
                        })
                      }
                      disabled={updateMut.isPending}
                      className="h-8 border-amber-300 px-2 text-xs text-[#6F4300] hover:bg-amber-50"
                    >
                      <Star className="mr-1 h-3 w-3" /> Set as first
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      moveMut.mutate({ id: item.id, direction: "up" })
                    }
                    disabled={index === 0 || moveMut.isPending}
                    className="h-8 border-gray-300 px-2 text-xs text-[#333]"
                    aria-label={`Move ${item.title} earlier`}
                  >
                    <ArrowUp className="mr-1 h-3 w-3" /> Earlier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      moveMut.mutate({ id: item.id, direction: "down" })
                    }
                    disabled={index === items.length - 1 || moveMut.isPending}
                    className="h-8 border-gray-300 px-2 text-xs text-[#333]"
                    aria-label={`Move ${item.title} later`}
                  >
                    <ArrowDown className="mr-1 h-3 w-3" /> Later
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateMut.mutate({
                        id: item.id,
                        isPublished: !item.isPublished,
                      })
                    }
                    disabled={updateMut.isPending}
                    className="h-8 border-gray-300 px-2 text-xs text-[#333]"
                  >
                    {item.isPublished ? (
                      <>
                        <EyeOff className="mr-1 h-3 w-3" /> Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="mr-1 h-3 w-3" /> Publish
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (
                        confirm(
                          "Delete this website photo record? The stored file will stay in Photo Library."
                        )
                      )
                        deleteMut.mutate({ id: item.id });
                    }}
                    disabled={deleteMut.isPending}
                    className="h-8 border-red-200 px-2 text-xs text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Delete record
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== BLOG MANAGER =====
function BlogManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.blog.list.useQuery();
  const createMut = trpc.cms.blog.create.useMutation({
    onSuccess: () => {
      utils.cms.blog.list.invalidate();
      setShowForm(false);
      resetForm();
      toast.success("Post created!");
    },
  });
  const updateMut = trpc.cms.blog.update.useMutation({
    onSuccess: () => {
      utils.cms.blog.list.invalidate();
      setEditId(null);
      setShowForm(false);
      resetForm();
      toast.success("Post updated!");
    },
  });
  const deleteMut = trpc.cms.blog.delete.useMutation({
    onSuccess: () => {
      utils.cms.blog.list.invalidate();
      toast.success("Post deleted!");
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    author: "Abhimanyu Mallik",
    category: "event" as
      | "education"
      | "elderly"
      | "csr"
      | "announcement"
      | "event",
    tags: "",
    isPublished: true,
  });

  const resetForm = () =>
    setForm({
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      author: "Abhimanyu Mallik",
      category: "event",
      tags: "",
      isPublished: true,
    });

  const startEdit = (item: any) => {
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      imageUrl: item.imageUrl || "",
      author: item.author,
      category: item.category,
      tags: item.tags || "",
      isPublished: item.isPublished,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.excerpt || !form.content) {
      toast.error("Title, excerpt, and content are required");
      return;
    }
    if (editId) {
      updateMut.mutate({ id: editId, ...form });
    } else {
      createMut.mutate(form);
    }
  };

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              resetForm();
            }}
            className="text-[#555]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            {editId ? "Edit Post" : "New Post"}
          </h3>
        </div>
        <Input
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Post Title *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        <Textarea
          value={form.excerpt}
          onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
          placeholder="Short excerpt (shown in card) *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          rows={2}
        />
        <Textarea
          value={form.content}
          onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          placeholder="Full content (use paragraphs separated by double newlines) *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623] min-h-[200px]"
        />
        <ImageUploader
          value={form.imageUrl}
          onChange={url => setForm(f => ({ ...f, imageUrl: url }))}
          label="Cover Image"
        />
        <div className="grid grid-cols-3 gap-3">
          <Input
            value={form.author}
            onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
            placeholder="Author"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
          <select
            value={form.category}
            onChange={e =>
              setForm(f => ({ ...f, category: e.target.value as any }))
            }
            className="bg-white border border-gray-200 text-[#1A1A1A] rounded-md px-3 py-2 text-sm"
          >
            <option value="education">Education</option>
            <option value="elderly">Elderly Care</option>
            <option value="csr">CSR</option>
            <option value="announcement">Announcement</option>
            <option value="event">Event</option>
          </select>
          <Input
            value={form.tags}
            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
            placeholder="Tags (comma-separated)"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={e =>
              setForm(f => ({ ...f, isPublished: e.target.checked }))
            }
            className="rounded"
          />
          <span className="text-sm text-[#333]">Published</span>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={createMut.isPending || updateMut.isPending}
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          {createMut.isPending || updateMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {editId ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">
          Blog Posts ({items.length})
        </h3>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          size="sm"
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          <Plus className="h-4 w-4 mr-1" /> New Post
        </Button>
      </div>
      {isLoading ? (
        <p className="text-[#666]">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#666] mb-2">
            No posts yet. Click "New Post" to write one.
          </p>
          <p className="text-[#aaa] text-xs">
            Blog posts will appear in the Updates tab on the Activities page.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-16 w-24 rounded object-cover shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[#1A1A1A] font-medium truncate">
                    {item.title}
                  </h4>
                  {!item.isPublished && (
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded uppercase">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-[#666] text-xs mt-1 truncate">
                  {item.excerpt}
                </p>
                <p className="text-[#aaa] text-[10px] mt-1">
                  {item.author} · {item.category}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEdit(item)}
                  className="text-[#666] hover:text-[#1A1A1A] h-8 w-8 p-0"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("Delete this post?"))
                      deleteMut.mutate({ id: item.id });
                  }}
                  className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== YOUTUBE MANAGER =====
function YoutubeManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.youtube.list.useQuery();
  const createMut = trpc.cms.youtube.create.useMutation({
    onSuccess: () => {
      utils.cms.youtube.list.invalidate();
      setShowForm(false);
      resetForm();
      toast.success("Video added!");
    },
  });
  const updateMut = trpc.cms.youtube.update.useMutation({
    onSuccess: () => {
      utils.cms.youtube.list.invalidate();
      setEditId(null);
      setShowForm(false);
      resetForm();
      toast.success("Video updated!");
    },
  });
  const deleteMut = trpc.cms.youtube.delete.useMutation({
    onSuccess: () => {
      utils.cms.youtube.list.invalidate();
      toast.success("Video deleted!");
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    youtubeUrl: "",
    description: "",
    category: "event" as
      | "education"
      | "elderly"
      | "event"
      | "documentary"
      | "other",
  });

  const resetForm = () =>
    setForm({ title: "", youtubeUrl: "", description: "", category: "event" });

  const getYoutubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&]+)/
    );
    return match?.[1] || "";
  };

  const startEdit = (item: any) => {
    setForm({
      title: item.title,
      youtubeUrl: item.youtubeUrl,
      description: item.description || "",
      category: item.category,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.youtubeUrl) {
      toast.error("Title and YouTube URL are required");
      return;
    }
    if (!getYoutubeId(form.youtubeUrl)) {
      toast.error("Invalid YouTube URL");
      return;
    }
    if (editId) {
      updateMut.mutate({ id: editId, ...form });
    } else {
      createMut.mutate({ ...form, isPublished: true });
    }
  };

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              resetForm();
            }}
            className="text-[#555]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            {editId ? "Edit Video" : "Add YouTube Video"}
          </h3>
        </div>
        <Input
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Video Title *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        <Input
          value={form.youtubeUrl}
          onChange={e => setForm(f => ({ ...f, youtubeUrl: e.target.value }))}
          placeholder="YouTube URL (paste full link) *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        {form.youtubeUrl && getYoutubeId(form.youtubeUrl) && (
          <div className="rounded-lg overflow-hidden bg-black aspect-video max-w-md">
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(form.youtubeUrl)}`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
        <Textarea
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="Description (optional)"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        <select
          value={form.category}
          onChange={e =>
            setForm(f => ({ ...f, category: e.target.value as any }))
          }
          className="bg-white border border-gray-200 text-[#1A1A1A] rounded-md px-3 py-2 text-sm"
        >
          <option value="education">Education</option>
          <option value="elderly">Elderly Care</option>
          <option value="event">Event</option>
          <option value="documentary">Documentary</option>
          <option value="other">Other</option>
        </select>
        <Button
          onClick={handleSubmit}
          disabled={createMut.isPending || updateMut.isPending}
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          {createMut.isPending || updateMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {editId ? "Update Video" : "Add Video"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">
          YouTube Videos ({items.length})
        </h3>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          size="sm"
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Video
        </Button>
      </div>
      {isLoading ? (
        <p className="text-[#666]">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#666] mb-2">
            No videos yet. Click "Add Video" to embed one.
          </p>
          <p className="text-[#aaa] text-xs">
            YouTube videos will be embedded on the Activities page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(item.youtubeUrl)}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-[#1A1A1A] text-sm font-medium">
                    {item.title}
                  </p>
                  <p className="text-[#888] text-[10px]">{item.category}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(item)}
                    className="text-[#666] hover:text-[#1A1A1A] h-8 w-8 p-0"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm("Delete this video?"))
                        deleteMut.mutate({ id: item.id });
                    }}
                    className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== SOCIAL LINKS MANAGER =====
function SocialLinksManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.social.list.useQuery();
  const upsertMut = trpc.cms.social.upsert.useMutation({
    onSuccess: () => {
      utils.cms.social.list.invalidate();
      setShowForm(false);
      resetForm();
      toast.success("Link saved!");
    },
  });
  const deleteMut = trpc.cms.social.delete.useMutation({
    onSuccess: () => {
      utils.cms.social.list.invalidate();
      toast.success("Link deleted!");
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ platform: "", url: "", label: "" });

  const resetForm = () => setForm({ platform: "", url: "", label: "" });

  const handleSubmit = () => {
    if (!form.platform || !form.url) {
      toast.error("Platform and URL are required");
      return;
    }
    upsertMut.mutate({ ...form, isActive: true });
  };

  const PLATFORMS = ["Facebook", "YouTube", "LinkedIn", "Instagram"];

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowForm(false);
              resetForm();
            }}
            className="text-[#555]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            Add Social Link
          </h3>
        </div>
        <select
          value={form.platform}
          onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
          className="bg-white border border-gray-200 text-[#1A1A1A] rounded-md px-3 py-2 text-sm w-full"
        >
          <option value="">Select Platform *</option>
          {PLATFORMS.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <Input
          value={form.url}
          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
          placeholder="URL or Link *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        <p className="text-xs leading-relaxed text-[#777]">
          Use the official HTTPS page for the selected platform. The website
          checks that the link is from the right social media site.
        </p>
        <Input
          value={form.label}
          onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
          placeholder="Display Label (e.g. Abhimanyu Mallik. Founder)"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        <Button
          onClick={handleSubmit}
          disabled={upsertMut.isPending}
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          {upsertMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}{" "}
          Save Link
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">
          Social Links ({items.length})
        </h3>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          size="sm"
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Link
        </Button>
      </div>
      {isLoading ? (
        <p className="text-[#666]">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#666] mb-2">
            No social links yet. Add your LinkedIn, Instagram, etc.
          </p>
          <p className="text-[#aaa] text-xs">
            Social links will appear in the website footer.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4"
            >
              <LinkIcon className="h-5 w-5 text-[#F5A623] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[#1A1A1A] font-medium">{item.platform}</p>
                <p className="text-[#888] text-xs truncate">{item.url}</p>
                {item.label && (
                  <p className="text-[#aaa] text-[10px]">{item.label}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm("Delete this link?"))
                    deleteMut.mutate({ id: item.id });
                }}
                className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== GUIDED PUBLIC DETAILS MANAGER =====
const PUBLIC_DETAIL_FIELDS = [
  {
    key: "stat_students_reached",
    label:
      "Historical aggregate count (not shown publicly without a dated breakdown)",
    placeholder: "50+",
    category: "stats",
    help: "Retained for existing records. Use the dated monthly fields below for any new public child counts; do not add one-time and recurring recipients together.",
  },
  {
    key: "stat_activities_completed",
    label: "Verified activities completed",
    placeholder: "50+",
    category: "stats",
    help: "Use only the reviewed public total.",
  },
  {
    key: "stat_families_supported",
    label: "Families receiving limited verified support",
    placeholder: "20+",
    category: "stats",
    help: "This remains separate from the primary education programme.",
  },
  {
    key: "stat_districts",
    label: "District coverage",
    placeholder: "5+",
    category: "stats",
    help: "Use a broad verified total, not private addresses.",
  },
  {
    key: "email_address",
    label: "Public contact email",
    placeholder: "info@abhiarafoundation.org",
    category: "contact",
    help: "Shown in the website footer.",
  },
  {
    key: "whatsapp_channel_url",
    label: "Public WhatsApp channel link",
    placeholder: "https://whatsapp.com/channel/...",
    category: "contact",
    help: "Use the public channel, not a private phone number.",
  },
] as const;

function SiteSettingsManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.settings.list.useQuery();
  const [values, setValues] = useState<Record<string, string>>({});
  const [educationCounts, setEducationCounts] = useState({
    month: "",
    recurring: "",
    oneTime: "",
  });
  const upsertMut = trpc.cms.settings.upsert.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.cms.settings.list.invalidate(),
        utils.cms.settings.listPublic.invalidate(),
      ]);
      toast.success("Public detail saved.");
    },
    onError: error => toast.error(error.message),
  });

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const field of PUBLIC_DETAIL_FIELDS) {
      next[field.key] =
        items.find((item: any) => item.settingKey === field.key)
          ?.settingValue || "";
    }
    setValues(next);
    const saved = items.find(
      (item: any) => item.settingKey === "stat_students_verified_monthly_counts"
    )?.settingValue;
    try {
      const parsed = saved ? JSON.parse(saved) : null;
      setEducationCounts({
        month: typeof parsed?.month === "string" ? parsed.month : "",
        recurring: Number.isSafeInteger(parsed?.recurring)
          ? String(parsed.recurring)
          : "",
        oneTime: Number.isSafeInteger(parsed?.oneTime)
          ? String(parsed.oneTime)
          : "",
      });
    } catch {
      setEducationCounts({ month: "", recurring: "", oneTime: "" });
    }
  }, [items]);

  const saveField = (field: (typeof PUBLIC_DETAIL_FIELDS)[number]) => {
    const value = (values[field.key] || "").trim();
    if (!value) {
      toast.error("Enter a value before saving.");
      return;
    }
    if (field.key === "email_address" && !/^\S+@\S+\.\S+$/.test(value)) {
      toast.error("Enter a valid public email address.");
      return;
    }
    if (
      field.key === "whatsapp_channel_url" &&
      !/^https:\/\/whatsapp\.com\/channel\//i.test(value)
    ) {
      toast.error("Enter the public WhatsApp channel link.");
      return;
    }
    upsertMut.mutate({
      settingKey: field.key,
      settingValue: value,
      label: field.label,
      category: field.category,
    });
  };

  const saveEducationCounts = () => {
    const month = educationCounts.month.trim();
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(month);
    const monthEnd = match
      ? new Date(Date.UTC(Number(match[1]), Number(match[2]), 0))
          .toISOString()
          .slice(0, 10)
      : "";
    if (monthEnd !== month || Date.parse(month) > Date.now()) {
      toast.error(
        "Use a real, completed reporting month end in YYYY-MM-DD format."
      );
      return;
    }
    if (
      ![educationCounts.recurring, educationCounts.oneTime].every(value =>
        /^\d{1,6}$/.test(value.trim())
      )
    ) {
      toast.error(
        "Enter both checked whole-number counts, including zero when applicable."
      );
      return;
    }
    upsertMut.mutate({
      settingKey: "stat_students_verified_monthly_counts",
      settingValue: JSON.stringify({
        month,
        recurring: Number(educationCounts.recurring),
        oneTime: Number(educationCounts.oneTime),
      }),
      label: "Reviewed education counts by support type and month",
      category: "stats",
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          Public Figures and Contact
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#666]">
          Only these public details can be changed here. Legal registrations,
          tax status, board roles, payment settings, and bank details are locked
          for safety.
        </p>
      </div>
      {isLoading ? (
        <p className="text-sm text-[#666]">Loading public details…</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {PUBLIC_DETAIL_FIELDS.map(field => (
              <article
                key={field.key}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <label
                  htmlFor={field.key}
                  className="block text-sm font-bold text-[#1A1A1A]"
                >
                  {field.label}
                </label>
                <p className="mt-1 text-xs leading-relaxed text-[#777]">
                  {field.help}
                </p>
                <div className="mt-4 flex gap-2">
                  <Input
                    id={field.key}
                    value={values[field.key] || ""}
                    onChange={event =>
                      setValues(current => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    maxLength={200}
                  />
                  <Button
                    type="button"
                    onClick={() => saveField(field)}
                    disabled={upsertMut.isPending}
                    className="bg-[#F5A623] font-bold text-[#1A1A1A] hover:bg-[#E8960E]"
                  >
                    Save
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <section
            className="mt-8 rounded-xl border border-[#D8C7A5] bg-[#FFFDF8] p-6"
            aria-label="Dated education counts"
          >
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Publish dated education counts
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#555]">
              After checking programme records, enter distinct children
              receiving monthly tuition and distinct children receiving one-time
              learning materials for the same completed month. A child may be in
              both groups; do not add them together. All three fields publish in
              one save.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                {
                  key: "month",
                  label: "Reporting month end (YYYY-MM-DD)",
                  placeholder: "2026-09-30",
                },
                {
                  key: "recurring",
                  label: "Monthly tuition recipients",
                  placeholder: "Checked whole number",
                },
                {
                  key: "oneTime",
                  label: "One-time materials recipients",
                  placeholder: "Checked whole number",
                },
              ].map(field => (
                <label
                  key={field.key}
                  className="text-sm font-semibold text-[#333]"
                >
                  {field.label}
                  <Input
                    value={
                      educationCounts[field.key as keyof typeof educationCounts]
                    }
                    onChange={event =>
                      setEducationCounts(current => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="mt-2 bg-white"
                    maxLength={20}
                  />
                </label>
              ))}
            </div>
            <Button
              type="button"
              onClick={saveEducationCounts}
              disabled={upsertMut.isPending}
              className="mt-5 bg-[#F5A623] font-bold text-[#1A1A1A] hover:bg-[#E8960E]"
            >
              Publish reviewed counts
            </Button>
          </section>
        </>
      )}
    </div>
  );
}

// ===== CORE MEMBER APPLICATIONS MANAGER =====
function CoreMemberApplicationsManager() {
  const utils = trpc.useUtils();
  const { data: applications = [], isLoading } =
    trpc.coreMember.list.useQuery();
  const updateStatusMutation = trpc.coreMember.updateStatus.useMutation({
    onSuccess: () => {
      utils.coreMember.list.invalidate();
      toast.success("Status updated!");
    },
    onError: () => toast.error("Failed to update status."),
  });

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    approved: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const areaLabels: Record<string, string> = {
    education: "Education",
    eldercare: "Elderly Care",
    community: "Community",
    health: "Health",
    fundraising: "Fundraising",
    technology: "Technology",
    fieldwork: "Fieldwork",
    other: "Other",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-[#F5A623]" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-[#aaa] mx-auto mb-4" />
        <p className="text-[#666]">No applications yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
          Core Member Applications
        </h2>
        <span className="text-xs font-mono text-[#888]">
          {applications.length} total
        </span>
      </div>

      {applications.map((app: any) => (
        <div
          key={app.id}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-[#1A1A1A] font-semibold text-sm">
                {app.fullName}
              </h3>
              <p className="text-[#666] text-xs">
                {app.email} &middot; {app.phone}
              </p>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${statusColors[app.status] || statusColors.pending}`}
            >
              {app.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
            <div>
              <span className="text-[#888] block">Location</span>
              <span className="text-[#1A1A1A]/80">
                {app.location}, {app.district}, {app.state}
              </span>
            </div>
            <div>
              <span className="text-[#888] block">Occupation</span>
              <span className="text-[#1A1A1A]/80">
                {app.occupation || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-[#888] block">Area of Interest</span>
              <span className="text-[#1A1A1A]/80">
                {areaLabels[app.areaOfInterest] || app.areaOfInterest}
              </span>
            </div>
            <div>
              <span className="text-[#888] block">Applied</span>
              <span className="text-[#1A1A1A]/80">
                {app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString("en-IN")
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-[#888] text-xs block mb-1">Motivation</span>
            <p className="text-[#333] text-sm leading-relaxed bg-white rounded p-3">
              {app.motivation}
            </p>
          </div>

          {app.status === "pending" && (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: app.id,
                    status: "approved",
                  })
                }
                disabled={updateStatusMutation.isPending}
                className="bg-amber-600 hover:bg-amber-700 text-[#1A1A1A] text-xs"
              >
                <Check className="h-3 w-3 mr-1" /> Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: app.id,
                    status: "rejected",
                  })
                }
                disabled={updateStatusMutation.isPending}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
              >
                <X className="h-3 w-3 mr-1" /> Reject
              </Button>
            </div>
          )}

          {app.status !== "pending" && app.reviewedAt && (
            <p className="text-[#aaa] text-[10px] font-mono">
              Reviewed: {new Date(app.reviewedAt).toLocaleDateString("en-IN")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ===== HERO SLIDES MANAGER =====
function HeroSlidesManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.heroSlides.list.useQuery();
  const createMut = trpc.cms.heroSlides.create.useMutation({
    onSuccess: () => {
      utils.cms.heroSlides.list.invalidate();
      setShowForm(false);
      resetForm();
      toast.success("Slide created!");
    },
  });
  const updateMut = trpc.cms.heroSlides.update.useMutation({
    onSuccess: () => {
      utils.cms.heroSlides.list.invalidate();
      setEditId(null);
      setShowForm(false);
      resetForm();
      toast.success("Slide updated!");
    },
  });
  const deleteMut = trpc.cms.heroSlides.delete.useMutation({
    onSuccess: () => {
      utils.cms.heroSlides.list.invalidate();
      toast.success("Slide deleted!");
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    titleEn: "",
    titleOd: "",
    subtitleEn: "",
    subtitleOd: "",
    imageUrl: "",
    ctaTextEn: "",
    ctaTextOd: "",
    ctaHref: "",
    accentColor: "#F5A623",
    sortOrder: 0,
    isActive: true,
  });

  const resetForm = () =>
    setForm({
      titleEn: "",
      titleOd: "",
      subtitleEn: "",
      subtitleOd: "",
      imageUrl: "",
      ctaTextEn: "",
      ctaTextOd: "",
      ctaHref: "",
      accentColor: "#F5A623",
      sortOrder: 0,
      isActive: true,
    });

  const startEdit = (item: any) => {
    setForm({
      titleEn: item.titleEn,
      titleOd: item.titleOd || "",
      subtitleEn: item.subtitleEn || "",
      subtitleOd: item.subtitleOd || "",
      imageUrl: item.imageUrl,
      ctaTextEn: item.ctaTextEn || "",
      ctaTextOd: item.ctaTextOd || "",
      ctaHref: item.ctaHref || "",
      accentColor: item.accentColor || "#F5A623",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.titleEn || !form.imageUrl) {
      toast.error("Title (English) and Image are required");
      return;
    }
    if (editId) {
      updateMut.mutate({ id: editId, ...form });
    } else {
      createMut.mutate(form);
    }
  };

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              resetForm();
            }}
            className="text-[#555]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            {editId ? "Edit Slide" : "New Slide"}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={form.titleEn}
            onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))}
            placeholder="Title (English) *"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
          <Input
            value={form.titleOd}
            onChange={e => setForm(f => ({ ...f, titleOd: e.target.value }))}
            placeholder="Title (Odia)"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Textarea
            value={form.subtitleEn}
            onChange={e => setForm(f => ({ ...f, subtitleEn: e.target.value }))}
            placeholder="Subtitle (English)"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
          <Textarea
            value={form.subtitleOd}
            onChange={e => setForm(f => ({ ...f, subtitleOd: e.target.value }))}
            placeholder="Subtitle (Odia)"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>
        <ImageUploader
          value={form.imageUrl}
          onChange={url => setForm(f => ({ ...f, imageUrl: url }))}
          label="Background Image *"
        />
        <div className="grid grid-cols-3 gap-3">
          <Input
            value={form.ctaTextEn}
            onChange={e => setForm(f => ({ ...f, ctaTextEn: e.target.value }))}
            placeholder="Button Text (EN)"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
          <Input
            value={form.ctaTextOd}
            onChange={e => setForm(f => ({ ...f, ctaTextOd: e.target.value }))}
            placeholder="Button Text (Odia)"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
          <Input
            value={form.ctaHref}
            onChange={e => setForm(f => ({ ...f, ctaHref: e.target.value }))}
            placeholder="Button Link (e.g. /programs)"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium text-[#333] mb-1 block">
              Accent Color
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={form.accentColor}
                onChange={e =>
                  setForm(f => ({ ...f, accentColor: e.target.value }))
                }
                className="h-9 w-12 rounded border border-gray-300"
              />
              <Input
                value={form.accentColor}
                onChange={e =>
                  setForm(f => ({ ...f, accentColor: e.target.value }))
                }
                className="bg-white border border-gray-300 text-[#333] flex-1"
              />
            </div>
          </div>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={e =>
              setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))
            }
            placeholder="Sort Order"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={e =>
                setForm(f => ({ ...f, isActive: e.target.checked }))
              }
              className="rounded"
            />
            <span className="text-sm text-[#333]">Active</span>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={createMut.isPending || updateMut.isPending}
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          {createMut.isPending || updateMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {editId ? "Update Slide" : "Create Slide"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            Hero Slider ({items.length} slides)
          </h3>
          <p className="text-xs text-[#888] mt-1">
            Manage the homepage hero banner slides. Changes auto-update on the
            live site.
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          size="sm"
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Slide
        </Button>
      </div>
      {isLoading ? (
        <p className="text-[#666]">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <Layers className="h-12 w-12 text-[#ddd] mx-auto mb-3" />
          <p className="text-[#666] mb-2">No hero slides yet.</p>
          <p className="text-[#aaa] text-xs">
            Add slides to replace the default homepage hero banner.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-4"
            >
              <img
                src={item.imageUrl}
                alt=""
                className="h-16 w-28 rounded object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[#1A1A1A] font-medium truncate">
                    {item.titleEn}
                  </h4>
                  {!item.isActive && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded uppercase">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="text-[#666] text-xs mt-1 truncate">
                  {item.subtitleEn || "No subtitle"}
                </p>
                <p className="text-[#aaa] text-[10px] mt-0.5">
                  Order: {item.sortOrder} · CTA: {item.ctaTextEn || "None"} →{" "}
                  {item.ctaHref || ", "}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="h-5 w-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: item.accentColor }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEdit(item)}
                  className="text-[#666] hover:text-[#1A1A1A] h-8 w-8 p-0"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("Delete this slide?"))
                      deleteMut.mutate({ id: item.id });
                  }}
                  className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== BANNERS MANAGER =====
function BannersManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.banners.list.useQuery();
  const createMut = trpc.cms.banners.create.useMutation({
    onSuccess: () => {
      utils.cms.banners.list.invalidate();
      setShowForm(false);
      resetForm();
      toast.success("Banner created!");
    },
  });
  const updateMut = trpc.cms.banners.update.useMutation({
    onSuccess: () => {
      utils.cms.banners.list.invalidate();
      setEditId(null);
      setShowForm(false);
      resetForm();
      toast.success("Banner updated!");
    },
  });
  const deleteMut = trpc.cms.banners.delete.useMutation({
    onSuccess: () => {
      utils.cms.banners.list.invalidate();
      toast.success("Banner deleted!");
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    linkUrl: "",
    pagePlacement: "home",
    position: "top" as "top" | "middle" | "bottom",
    isActive: true,
    startDate: "",
    endDate: "",
    sortOrder: 0,
  });

  const resetForm = () =>
    setForm({
      title: "",
      imageUrl: "",
      linkUrl: "",
      pagePlacement: "home",
      position: "top",
      isActive: true,
      startDate: "",
      endDate: "",
      sortOrder: 0,
    });

  const startEdit = (item: any) => {
    setForm({
      title: item.title,
      imageUrl: item.imageUrl,
      linkUrl: item.linkUrl || "",
      pagePlacement: item.pagePlacement,
      position: item.position,
      isActive: item.isActive,
      startDate: item.startDate
        ? new Date(item.startDate).toISOString().split("T")[0]
        : "",
      endDate: item.endDate
        ? new Date(item.endDate).toISOString().split("T")[0]
        : "",
      sortOrder: item.sortOrder,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.imageUrl) {
      toast.error("Title and Image are required");
      return;
    }
    if (editId) {
      updateMut.mutate({ id: editId, ...form });
    } else {
      createMut.mutate(form);
    }
  };

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              resetForm();
            }}
            className="text-[#555]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            {editId ? "Edit Banner" : "New Banner"}
          </h3>
        </div>
        <Input
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Banner Title (internal reference) *"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        <ImageUploader
          value={form.imageUrl}
          onChange={url => setForm(f => ({ ...f, imageUrl: url }))}
          label="Banner Image *"
        />
        <Input
          value={form.linkUrl}
          onChange={e => setForm(f => ({ ...f, linkUrl: e.target.value }))}
          placeholder="Click Link (optional, e.g. /donate)"
          className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
        />
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium text-[#333] mb-1 block">
              Show On Pages
            </label>
            <Input
              value={form.pagePlacement}
              onChange={e =>
                setForm(f => ({ ...f, pagePlacement: e.target.value }))
              }
              placeholder="home, donate, all"
              className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
            />
            <p className="text-[10px] text-[#aaa] mt-1">
              Comma-separated: home, donate, programs, all
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#333] mb-1 block">
              Position
            </label>
            <select
              value={form.position}
              onChange={e =>
                setForm(f => ({ ...f, position: e.target.value as any }))
              }
              className="w-full bg-white border border-gray-200 text-[#1A1A1A] rounded-md px-3 py-2 text-sm"
            >
              <option value="top">Top (below navbar)</option>
              <option value="middle">Middle (between sections)</option>
              <option value="bottom">Bottom (above footer)</option>
            </select>
          </div>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={e =>
              setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))
            }
            placeholder="Sort Order"
            className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-[#333] mb-1 block">
              Start Date (optional)
            </label>
            <Input
              type="date"
              value={form.startDate}
              onChange={e =>
                setForm(f => ({ ...f, startDate: e.target.value }))
              }
              className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#333] mb-1 block">
              End Date (optional)
            </label>
            <Input
              type="date"
              value={form.endDate}
              onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
              className="bg-white border border-gray-300 text-[#333] focus:border-[#F5A623]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
            className="rounded"
          />
          <span className="text-sm text-[#333]">Active (visible on site)</span>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={createMut.isPending || updateMut.isPending}
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          {createMut.isPending || updateMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {editId ? "Update Banner" : "Create Banner"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            Banners ({items.length})
          </h3>
          <p className="text-xs text-[#888] mt-1">
            Promotional banners displayed on website pages. Set date ranges for
            time-limited campaigns.
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          size="sm"
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Banner
        </Button>
      </div>
      {isLoading ? (
        <p className="text-[#666]">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <Megaphone className="h-12 w-12 text-[#ddd] mx-auto mb-3" />
          <p className="text-[#666] mb-2">No banners yet.</p>
          <p className="text-[#aaa] text-xs">
            Add banners to promote campaigns, events, or announcements on your
            site.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-4"
            >
              <img
                src={item.imageUrl}
                alt=""
                className="h-14 w-32 rounded object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[#1A1A1A] font-medium truncate">
                    {item.title}
                  </h4>
                  {!item.isActive && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded uppercase">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="text-[#666] text-xs mt-1">
                  Pages: {item.pagePlacement} · Position: {item.position}
                  {item.startDate &&
                    ` · From: ${new Date(item.startDate).toLocaleDateString("en-IN")}`}
                  {item.endDate &&
                    ` · Until: ${new Date(item.endDate).toLocaleDateString("en-IN")}`}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEdit(item)}
                  className="text-[#666] hover:text-[#1A1A1A] h-8 w-8 p-0"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("Delete this banner?"))
                      deleteMut.mutate({ id: item.id });
                  }}
                  className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== MAIN ADMIN PAGE =====
// ===== DONATIONS MANAGER =====
type BlobFolder =
  | "beneficiaries"
  | "programmes"
  | "leadership"
  | "partners"
  | "press"
  | "elder-support"
  | "disaster-relief"
  | "medical-support"
  | "animal-welfare"
  | "general";

function impactCategoryForFolder(
  folder: BlobFolder
): ImpactPhotoCategory | null {
  if (folder === "beneficiaries" || folder === "programmes") return "education";
  if (folder === "elder-support") return "elderly";
  if (folder === "disaster-relief") return "disaster";
  if (folder === "medical-support") return "medical";
  if (folder === "animal-welfare") return "animals";
  if (folder === "press" || folder === "general") return "community";
  return null;
}

function VercelMediaManager() {
  const utils = trpc.useUtils();
  const fileRef = useRef<HTMLInputElement>(null);
  const [folder, setFolder] = useState<BlobFolder>("beneficiaries");
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [publicTitle, setPublicTitle] = useState("");
  const [publicCaption, setPublicCaption] = useState("");
  const [publicLocation, setPublicLocation] = useState("");
  const [publicDateTaken, setPublicDateTaken] = useState("");
  const [impactCategory, setImpactCategory] =
    useState<ImpactPhotoCategory>("education");
  const [publishAfterUpload, setPublishAfterUpload] = useState(false);
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const impactFolderCategory = impactCategoryForFolder(folder);
  const { data: status, isLoading: statusLoading } =
    trpc.cms.media.status.useQuery();
  const { data: media, isLoading: mediaLoading } =
    trpc.cms.media.listFolder.useQuery({ folder });
  const { data: galleryItems = [] } = trpc.cms.gallery.list.useQuery();
  const publishMutation = trpc.cms.gallery.create.useMutation({
    onSuccess: async () => {
      await utils.cms.gallery.list.invalidate();
    },
    onError: error => toast.error(error.message),
  });
  const publicationMutation = trpc.cms.gallery.update.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.cms.gallery.list.invalidate();
      toast.success(
        variables.isPublished
          ? "Photo published on the website."
          : "Photo removed from public pages."
      );
    },
    onError: error => toast.error(error.message),
  });
  const removePublicationMutation = trpc.cms.gallery.delete.useMutation({
    onSuccess: async () => {
      await utils.cms.gallery.list.invalidate();
    },
    onError: error => toast.error(error.message),
  });
  const uploadMutation = trpc.cms.media.upload.useMutation({
    onSuccess: async uploaded => {
      if (impactFolderCategory) {
        await publishMutation.mutateAsync({
          title: publicTitle.trim(),
          description: publicCaption.trim(),
          imageUrl: uploaded.url,
          mediaType: "photo",
          category: impactCategory,
          location: publicLocation.trim() || undefined,
          dateTaken: publicDateTaken || undefined,
          isPublished: publishAfterUpload,
        });
      }
      await utils.cms.media.listFolder.invalidate({ folder });
      setFile(null);
      setAltText("");
      setPublicTitle("");
      setPublicCaption("");
      setPublicLocation("");
      setPublicDateTaken("");
      setPublishAfterUpload(false);
      setConsentConfirmed(false);
      if (fileRef.current) fileRef.current.value = "";
      toast.success(
        publishAfterUpload
          ? "Photo uploaded and published."
          : "Photo uploaded as a draft. Press Publish when it is ready."
      );
    },
    onError: error => toast.error(error.message),
  });
  const deleteMutation = trpc.cms.media.delete.useMutation({
    onSuccess: async () => {
      await utils.cms.media.listFolder.invalidate({ folder });
      toast.success("Photo deleted.");
    },
    onError: error => toast.error(error.message),
  });

  const handleFile = (nextFile: File | undefined) => {
    if (!nextFile) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(nextFile.type)) {
      toast.error("Please upload a JPEG, PNG or WebP photo.");
      return;
    }
    if (nextFile.size > 1024 * 1024) {
      toast.error("The photo must be smaller than 1 MB.");
      return;
    }
    setFile(nextFile);
    const suggestedTitle = nextFile.name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, letter => letter.toUpperCase());
    setPublicTitle(suggestedTitle);
    if (!altText) setAltText(suggestedTitle);
  };

  const handleUpload = async () => {
    if (!file || altText.trim().length < 5) {
      toast.error("Choose a photo and add a short description.");
      return;
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
      ].includes(folder) &&
      !consentConfirmed
    ) {
      toast.error(
        "Confirm permission and privacy review before uploading a public evidence photo."
      );
      return;
    }
    if (
      impactFolderCategory &&
      (publicTitle.trim().length < 3 || publicCaption.trim().length < 8)
    ) {
      toast.error("Add a public title and a short caption before uploading.");
      return;
    }
    if (impactFolderCategory && isGenericImpactTitle(publicTitle)) {
      toast.error(
        "Replace the generic title with a clear description of this activity."
      );
      return;
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    await uploadMutation.mutateAsync({
      folder,
      fileName: file.name,
      fileBase64: dataUrl.split(",")[1],
      contentType: file.type as "image/jpeg" | "image/png" | "image/webp",
      altText: altText.trim(),
      consentConfirmed,
    });
  };

  const publicationForUrl = (url: string) =>
    galleryItems.find((item: any) => item.imageUrl === url);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Website Photo Library
          </h2>
          <p className="mt-1 text-sm text-[#666]">
            Choose the storage folder, add the public details and select the
            website category. The category decides which public section shows
            the photo.
          </p>
        </div>
        <code className="rounded bg-gray-100 px-3 py-2 text-xs text-[#555]">
          abhiara-images/{folder}/
        </code>
      </div>

      <div
        className={`mb-6 rounded-lg border p-4 text-sm ${status?.configured ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-900"}`}
      >
        {statusLoading
          ? "Checking the photo library…"
          : status?.configured
            ? "The Vercel photo library is connected and ready."
            : "The photo library is not connected to this Vercel deployment yet. Ask the website administrator to check the Vercel Blob connection before uploading."}
      </div>

      <div className="grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#333]">
            Photo type
          </label>
          <select
            value={folder}
            onChange={event => {
              const nextFolder = event.target.value as BlobFolder;
              setFolder(nextFolder);
              const suggestedCategory = impactCategoryForFolder(nextFolder);
              if (suggestedCategory) setImpactCategory(suggestedCategory);
              setConsentConfirmed(false);
              setFile(null);
              setAltText("");
              setPublicTitle("");
              setPublicCaption("");
              setPublicLocation("");
              setPublicDateTaken("");
              setPublishAfterUpload(false);
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm"
          >
            <option value="beneficiaries">Beneficiary photos</option>
            <option value="programmes">Programme photos</option>
            <option value="leadership">Leadership portraits</option>
            <option value="partners">Partner logos</option>
            <option value="press">Press and media proofs</option>
            <option value="elder-support">Elder support ground work</option>
            <option value="disaster-relief">Disaster relief ground work</option>
            <option value="medical-support">
              Medical emergency ground work
            </option>
            <option value="animal-welfare">Animal welfare ground work</option>
            <option value="general">General website photos</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#333]">
            Choose photo
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={event => handleFile(event.target.files?.[0])}
            className="block w-full text-sm text-[#555] file:mr-3 file:rounded file:border-0 file:bg-[#1A1A1A] file:px-4 file:py-2 file:text-white"
          />
          <p className="mt-1 text-xs text-[#888]">
            JPEG, PNG or WebP. Smaller than 1 MB.
          </p>
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-[#333]">
            Short public description
          </label>
          <Input
            value={altText}
            onChange={event => setAltText(event.target.value)}
            maxLength={180}
            placeholder="Example: A supported student continuing higher education"
          />
        </div>
        {impactFolderCategory && (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Public title
              </label>
              <Input
                value={publicTitle}
                onChange={event => setPublicTitle(event.target.value)}
                maxLength={120}
                placeholder="Example: School book distribution"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Short public caption
              </label>
              <Input
                value={publicCaption}
                onChange={event => setPublicCaption(event.target.value)}
                maxLength={240}
                placeholder="What happened, where and when"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Website category
              </label>
              <select
                value={impactCategory}
                onChange={event =>
                  setImpactCategory(event.target.value as ImpactPhotoCategory)
                }
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-[#1A1A1A]"
              >
                {IMPACT_CATEGORY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-[#777]">
                This photo will appear in{" "}
                {getImpactCategoryOption(impactCategory).destination}.
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Activity date
              </label>
              <Input
                value={publicDateTaken}
                onChange={event => setPublicDateTaken(event.target.value)}
                placeholder="Example: 15 August 2026"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[#333]">
                District or broad location
              </label>
              <Input
                value={publicLocation}
                onChange={event => setPublicLocation(event.target.value)}
                maxLength={160}
                placeholder="Example: Kendrapara, Odisha"
              />
            </div>
            <label className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 md:col-span-2">
              <input
                type="checkbox"
                checked={publishAfterUpload}
                onChange={event => setPublishAfterUpload(event.target.checked)}
                className="mt-1"
              />
              <span>
                Publish after upload. When checked, this photo will appear in
                the homepage carousel and Impact Gallery. Leave it unchecked to
                save a draft.
              </span>
            </label>
          </>
        )}
        {[
          "beneficiaries",
          "programmes",
          "press",
          "elder-support",
          "disaster-relief",
          "medical-support",
          "animal-welfare",
        ].includes(folder) && (
          <label className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-[#59420B] md:col-span-2">
            <input
              type="checkbox"
              checked={consentConfirmed}
              onChange={event => setConsentConfirmed(event.target.checked)}
              className="mt-1"
            />
            <span>
              I confirm that permission for public use is recorded and the image
              does not show Aadhaar, a bank passbook, phone number, address,
              school record, payment detail or other sensitive information.
            </span>
          </label>
        )}
        <div className="md:col-span-2">
          <Button
            onClick={handleUpload}
            disabled={!status?.configured || uploadMutation.isPending || !file}
            className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
          >
            {uploadMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {publishAfterUpload && impactFolderCategory
              ? "Upload and Publish"
              : "Upload as Draft"}
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
          Photos in this folder
        </h3>
        {mediaLoading ? (
          <p className="mt-4 text-sm text-[#777]">Loading photos…</p>
        ) : media?.images.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {media.images.map((image, index) => (
              <article
                key={image.pathname}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="flex h-56 items-center justify-center bg-gray-100 p-2">
                  <img
                    src={image.url}
                    alt="Vercel Blob media preview"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  {folder === "beneficiaries" && index === 0 && (
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#9A6100]">
                      Currently used on Student Impact
                    </p>
                  )}
                  <p className="break-all text-xs text-[#666]">
                    {image.pathname}
                  </p>
                  {impactFolderCategory &&
                    (() => {
                      const publication = galleryItems.find(
                        (item: any) => item.imageUrl === image.url
                      );
                      return publication ? (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            publicationMutation.mutate({
                              id: publication.id,
                              isPublished: !publication.isPublished,
                            });
                          }}
                          disabled={
                            publishMutation.isPending ||
                            publicationMutation.isPending
                          }
                          className={`mt-3 ${
                            publication?.isPublished
                              ? "bg-gray-700 text-white hover:bg-gray-800"
                              : "bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
                          }`}
                        >
                          {publication?.isPublished ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" /> Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" /> Publish
                            </>
                          )}
                        </Button>
                      ) : (
                        <p className="mt-3 text-xs font-semibold text-amber-700">
                          Caption record missing. Upload this photo again with a
                          title and caption before publishing.
                        </p>
                      );
                    })()}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      if (
                        !confirm(
                          "Permanently delete this stored photo and its website record? This cannot be undone."
                        )
                      )
                        return;
                      const publication = publicationForUrl(image.url);
                      if (publication) {
                        await removePublicationMutation.mutateAsync({
                          id: publication.id,
                        });
                      }
                      await deleteMutation.mutateAsync({
                        folder,
                        pathname: image.pathname,
                      });
                    }}
                    disabled={
                      deleteMutation.isPending ||
                      removePublicationMutation.isPending
                    }
                    className="mt-3 border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-sm text-[#777]">
            There are no photos in this folder yet.
          </p>
        )}
      </div>
    </div>
  );
}

function PressMediaManager({ onOpen }: { onOpen: (tab: Tab) => void }) {
  const actions: Array<{
    tab: Tab;
    title: string;
    body: string;
    icon: typeof FileText;
  }> = [
    {
      tab: "activities",
      title: "Add report content",
      body: "Publish verified activity text with a date, broad location and aggregate result.",
      icon: FileText,
    },
    {
      tab: "media",
      title: "Upload reviewed public photos",
      body: "Choose education, press, elder support, disaster relief, medical support or animal welfare. Permission and privacy review are required.",
      icon: Images,
    },
    {
      tab: "youtube",
      title: "Add a public video",
      body: "Paste a reviewed YouTube link. Do not upload private or identifying footage.",
      icon: Youtube,
    },
    {
      tab: "social",
      title: "Update social media links",
      body: "Manage the official Facebook, YouTube, LinkedIn and Instagram links.",
      icon: Share2,
    },
  ];

  return (
    <div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          Press and Media
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#666]">
          Use these four steps to keep Press and Media up to date. Publish only
          verified records, approved photos, reviewed videos, and official
          social links.
        </p>
        <a
          href="https://www.abhiarafoundation.org/press-and-media"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#8A5500]"
        >
          Open public Press and Media page <ExternalLink size={15} />
        </a>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {actions.map(action => (
          <button
            key={action.tab}
            type="button"
            onClick={() => onOpen(action.tab)}
            className="rounded-xl border border-gray-200 bg-white p-5 text-left hover:border-[#F5A623]"
          >
            <action.icon className="h-5 w-5 text-[#B56A22]" />
            <h3 className="mt-4 font-serif text-xl font-bold text-[#1A1A1A]">
              {action.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#666]">{action.body}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#8A5500]">
              Open tool <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

type LeadershipMemberType =
  | "board"
  | "auditor"
  | "advisor"
  | "odisha"
  | "member";

function LeadershipManager() {
  const utils = trpc.useUtils();
  const { data: members = [], isLoading } = trpc.cms.leadership.list.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [auditorMediaApproved, setAuditorMediaApproved] = useState(false);
  const [form, setForm] = useState({
    memberType: "board" as LeadershipMemberType,
    nameEn: "",
    nameOd: "",
    roleEn: "",
    roleOd: "",
    qualificationEn: "",
    qualificationOd: "",
    bioEn: "",
    bioOd: "",
    bioIsPublic: false,
    imageUrl: "",
    profileUrl: "",
    sortOrder: 0,
    isPublished: false,
  });

  const resetForm = () => {
    setAuditorMediaApproved(false);
    setForm({
      memberType: "board",
      nameEn: "",
      nameOd: "",
      roleEn: "",
      roleOd: "",
      qualificationEn: "",
      qualificationOd: "",
      bioEn: "",
      bioOd: "",
      bioIsPublic: false,
      imageUrl: "",
      profileUrl: "",
      sortOrder: 0,
      isPublished: false,
    });
    setEditId(null);
  };

  const onSuccess = async (message: string) => {
    await utils.cms.leadership.list.invalidate();
    await utils.cms.leadership.listPublished.invalidate();
    toast.success(message);
  };

  const createMut = trpc.cms.leadership.create.useMutation({
    onSuccess: async () => {
      await onSuccess("Member added.");
      resetForm();
      setShowForm(false);
    },
    onError: error => toast.error(error.message),
  });
  const updateMut = trpc.cms.leadership.update.useMutation({
    onSuccess: async () => {
      await onSuccess("Member updated.");
      resetForm();
      setShowForm(false);
    },
    onError: error => toast.error(error.message),
  });
  const deleteMut = trpc.cms.leadership.delete.useMutation({
    onSuccess: async () => onSuccess("Member removed."),
    onError: error => toast.error(error.message),
  });

  const startEdit = (member: any) => {
    setAuditorMediaApproved(false);
    setForm({
      memberType: member.memberType,
      nameEn: member.nameEn,
      nameOd: member.nameOd || "",
      roleEn: member.roleEn,
      roleOd: member.roleOd || "",
      qualificationEn: member.qualificationEn || "",
      qualificationOd: member.qualificationOd || "",
      bioEn: member.bioEn || "",
      bioOd: member.bioOd || "",
      bioIsPublic: Boolean(member.bioIsPublic),
      imageUrl: member.imageUrl || "",
      profileUrl: member.profileUrl || "",
      sortOrder: member.sortOrder || 0,
      isPublished: member.isPublished,
    });
    setEditId(member.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (form.nameEn.trim().length < 2 || form.roleEn.trim().length < 2) {
      toast.error("English name and role are required.");
      return;
    }
    if (form.profileUrl && !form.profileUrl.startsWith("https://")) {
      toast.error("Profile link must begin with https://");
      return;
    }
    if (
      form.memberType === "auditor" &&
      !auditorMediaApproved &&
      (form.imageUrl.trim() || form.profileUrl.trim())
    ) {
      toast.error(
        "Written consent from the audit firm is required for a partner photo or profile link."
      );
      return;
    }
    const payload = {
      memberType: form.memberType,
      nameEn: form.nameEn.trim(),
      nameOd: form.nameOd.trim() || undefined,
      roleEn: form.roleEn.trim(),
      roleOd: form.roleOd.trim() || undefined,
      qualificationEn: form.qualificationEn.trim() || undefined,
      qualificationOd: form.qualificationOd.trim() || undefined,
      bioEn: form.bioEn.trim() || undefined,
      bioOd: form.bioOd.trim() || undefined,
      bioIsPublic: form.bioIsPublic,
      imageUrl: form.imageUrl.trim() || undefined,
      profileUrl: form.profileUrl.trim() || undefined,
      sortOrder: Number(form.sortOrder) || 0,
      isPublished: form.isPublished,
    };
    if (editId) updateMut.mutate({ id: editId, ...payload });
    else createMut.mutate(payload);
  };

  if (showForm) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              resetForm();
              setShowForm(false);
            }}
            className="text-[#555]"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {editId ? "Edit public record" : "Add public record"}
          </h2>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Only registered directors belong in the Board of Directors. Choose the
          correct section for every other person. Use Independent Statutory
          Auditor only when the appointment and firm details have been checked.
          Published roles and qualifications appear on the public page. Short
          biographies appear only if separately approved below.
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Member section
            </label>
            <select
              value={form.memberType}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  memberType: event.target.value as LeadershipMemberType,
                }))
              }
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm"
            >
              <option value="board">Board of Directors</option>
              <option value="auditor">Independent Statutory Auditor</option>
              <option value="advisor">Guiding Patron &amp; Advisors</option>
              <option value="odisha">Odisha Division Leadership</option>
              <option value="member">Core Members</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Display order
            </label>
            <Input
              type="number"
              min={0}
              max={999}
              value={form.sortOrder}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  sortOrder: Number(event.target.value),
                }))
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Name in English
            </label>
            <Input
              value={form.nameEn}
              onChange={event =>
                setForm(current => ({ ...current, nameEn: event.target.value }))
              }
            />
            <p className="mt-1 text-xs leading-5 text-[#666]">
              Use Mr. for men and Ms. for women as the standard public title.
              Use Mrs. only when the person confirms that preference. Keep CA,
              Advocate and other qualifications in the role or qualification
              field.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Name in Odia
            </label>
            <Input
              value={form.nameOd}
              onChange={event =>
                setForm(current => ({ ...current, nameOd: event.target.value }))
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Role in English
            </label>
            <Input
              value={form.roleEn}
              onChange={event =>
                setForm(current => ({ ...current, roleEn: event.target.value }))
              }
              placeholder="Example: Founder and Director"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Role in Odia
            </label>
            <Input
              value={form.roleOd}
              onChange={event =>
                setForm(current => ({ ...current, roleOd: event.target.value }))
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Qualification in English
            </label>
            <Input
              value={form.qualificationEn}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  qualificationEn: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Qualification in Odia
            </label>
            <Input
              value={form.qualificationOd}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  qualificationOd: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Short biography in English
            </label>
            <Textarea
              value={form.bioEn}
              onChange={event =>
                setForm(current => ({ ...current, bioEn: event.target.value }))
              }
              rows={5}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">
              Short biography in Odia
            </label>
            <Textarea
              value={form.bioOd}
              onChange={event =>
                setForm(current => ({ ...current, bioOd: event.target.value }))
              }
              rows={5}
            />
          </div>
          <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 text-sm text-[#333] md:col-span-2">
            <input
              type="checkbox"
              checked={form.bioIsPublic}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  bioIsPublic: event.target.checked,
                }))
              }
              className="mt-1"
            />
            Show this approved short biography on the public People card. Leave
            unchecked to keep the text only in Admin.
          </label>
          {form.memberType === "auditor" && (
            <label className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 md:col-span-2">
              <input
                type="checkbox"
                checked={auditorMediaApproved}
                onChange={event =>
                  setAuditorMediaApproved(event.target.checked)
                }
                className="mt-1"
              />
              I have written permission from the audit firm to publish a
              partner’s photo or profile link. The firm name is shown by
              default.
            </label>
          )}
          {(form.memberType !== "auditor" || auditorMediaApproved) && (
            <>
              <div className="md:col-span-2">
                <LeadershipPortraitUploader
                  value={form.imageUrl}
                  onChange={imageUrl =>
                    setForm(current => ({ ...current, imageUrl }))
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-[#333]">
                  Public profile link
                </label>
                <Input
                  value={form.profileUrl}
                  onChange={event =>
                    setForm(current => ({
                      ...current,
                      profileUrl: event.target.value,
                    }))
                  }
                  placeholder="https://www.linkedin.com/in/..."
                />
              </div>
            </>
          )}
        </div>
        <label className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={event =>
              setForm(current => ({
                ...current,
                isPublished: event.target.checked,
              }))
            }
            className="mt-1"
          />
          Show this person on the public Board, Members and Advisors page
        </label>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={createMut.isPending || updateMut.isPending}
          className="bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          {(createMut.isPending || updateMut.isPending) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save record
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Board, Members and Advisors
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#666]">
            Manage five separate public sections. The statutory auditor is
            independent, not part of the Foundation team. Use Display order
            within each section and Unpublish to hide a record without deleting
            it.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="shrink-0 bg-[#F5A623] text-[#1A1A1A] hover:bg-[#E8960E]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add public record
        </Button>
      </div>

      {isLoading ? (
        <div className="py-10 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#F5A623]" />
        </div>
      ) : members.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-[#777]">
          No public people or auditor records have been added yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member: any) => (
            <article
              key={member.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#F5EFE3]">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.nameEn}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-serif text-4xl font-bold text-[#9A6100]">
                    {member.nameEn
                      .split(" ")
                      .map((part: string) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A6100]">
                  {PEOPLE_SECTIONS.find(
                    section => section.type === member.memberType
                  )?.titleEn ?? "Public record"}
                </p>
                <h3 className="mt-2 font-serif text-xl font-bold text-[#1A1A1A]">
                  {member.nameEn}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#8A5700]">
                  {member.roleEn}
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#666]">
                  {member.isPublished ? "Live on website" : "Draft"} · Order{" "}
                  {member.sortOrder}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(member)}
                    className="h-8 px-2 text-xs"
                  >
                    <Edit2 className="mr-1 h-3 w-3" /> Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateMut.mutate({
                        id: member.id,
                        isPublished: !member.isPublished,
                      })
                    }
                    disabled={updateMut.isPending}
                    className="h-8 px-2 text-xs"
                  >
                    {member.isPublished ? (
                      <>
                        <EyeOff className="mr-1 h-3 w-3" /> Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="mr-1 h-3 w-3" /> Publish
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (
                        confirm(
                          `Delete ${member.nameEn}? Unpublish instead if you may need this profile again.`
                        )
                      )
                        deleteMut.mutate({ id: member.id });
                    }}
                    disabled={deleteMut.isPending}
                    className="h-8 border-red-200 px-2 text-xs text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function DonationsManager() {
  const { data: donations, isLoading } = trpc.donation.list.useQuery();
  const completedDonations = (donations || []).filter(
    (donation: any) =>
      donation.status === "completed" && Boolean(donation.razorpayPaymentId)
  );
  const totalAmount = completedDonations.reduce(
    (sum: number, donation: any) => sum + (donation.amount || 0),
    0
  );
  const uniqueDonors = new Set(
    completedDonations.map((donation: any) => donation.donorEmail)
  ).size;

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          Successful Donations
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#666]">
          This is a private owner view of verified successful payment records.
          Pending attempts and test rows are not counted or shown. Manual
          donation entries are disabled to protect record accuracy.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#F9F9F9] rounded-lg p-4 text-center">
          <p className="font-serif text-2xl font-bold text-[#1A1A1A]">
            ₹{totalAmount.toLocaleString("en-IN")}
          </p>
          <p className="font-mono text-[9px] tracking-wider uppercase text-[#888]">
            Verified total
          </p>
        </div>
        <div className="bg-[#F9F9F9] rounded-lg p-4 text-center">
          <p className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {completedDonations.length}
          </p>
          <p className="font-mono text-[9px] tracking-wider uppercase text-[#888]">
            Successful donations
          </p>
        </div>
        <div className="bg-[#F9F9F9] rounded-lg p-4 text-center">
          <p className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {uniqueDonors}
          </p>
          <p className="font-mono text-[9px] tracking-wider uppercase text-[#888]">
            Verified donors
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#F5A623]" />
        </div>
      ) : completedDonations.length === 0 ? (
        <div className="text-center py-12 text-[#888]">
          <IndianRupee className="h-12 w-12 mx-auto mb-3 text-[#ddd]" />
          <p className="text-sm">
            No verified successful donations are available yet.
          </p>
          <p className="text-xs mt-1">
            A record appears here only after payment verification succeeds.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-mono text-[9px] tracking-wider uppercase text-[#888]">
                  Donor
                </th>
                <th className="text-left py-3 px-2 font-mono text-[9px] tracking-wider uppercase text-[#888]">
                  Amount
                </th>
                <th className="text-left py-3 px-2 font-mono text-[9px] tracking-wider uppercase text-[#888]">
                  Cause
                </th>
                <th className="text-left py-3 px-2 font-mono text-[9px] tracking-wider uppercase text-[#888]">
                  Payment
                </th>
                <th className="text-left py-3 px-2 font-mono text-[9px] tracking-wider uppercase text-[#888]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {completedDonations.map((d: any) => (
                <tr
                  key={d.id}
                  className="border-b border-gray-100 hover:bg-[#F9F9F9]"
                >
                  <td className="py-3 px-2">
                    <p className="font-semibold text-[#1A1A1A]">
                      {d.donorName}
                    </p>
                    <p className="text-[10px] text-[#888]">{d.donorEmail}</p>
                  </td>
                  <td className="py-3 px-2 font-semibold text-[#1A1A1A]">
                    ₹{(d.amount || 0).toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-2 text-[#555] capitalize">
                    {(d.cause || "general").replace("_", " ")}
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-block rounded bg-green-100 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-green-700">
                      Verified
                    </span>
                  </td>
                  <td className="py-3 px-2 text-[#888] text-xs">
                    {d.createdAt
                      ? new Date(d.createdAt).toLocaleDateString("en-IN")
                      : ", "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { mutateAsync: createAdminRelay } =
    trpc.auth.createAdminRelay.useMutation();
  const relayStarted = useRef(false);
  const relayParams =
    typeof window === "undefined"
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
  const relayNonce = relayParams.get("relayNonce") || "";
  const relayFailed = relayParams.get("relayError") === "1";
  const requestedReturnPath = relayParams.get("returnPath") || "/admin";
  const relayReturnPath = requestedReturnPath.startsWith("/admin")
    ? requestedReturnPath
    : "/admin";
  const adminTabs: Array<DashboardMenuItem & { key: Tab }> = [
    { key: "home", label: "Control Centre", icon: LayoutDashboard },
    { key: "press", label: "Press and Media", icon: Newspaper },
    { key: "activities", label: "Monthly Reports", icon: FileText },
    { key: "media", label: "Photo Library", icon: Images },
    { key: "gallery", label: "Impact Photos", icon: Image },
    { key: "youtube", label: "Public Videos", icon: Youtube },
    { key: "settings", label: "Public Details", icon: Settings },
    { key: "social", label: "Social Links", icon: Share2 },
    { key: "leadership", label: "Board, Members and Advisors", icon: Users },
    { key: "donations", label: "Successful Donations", icon: IndianRupee },
    { key: "members", label: "Volunteer Applications", icon: Users },
  ];
  const validKeys = adminTabs.map(tab => tab.key);
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#", "") as Tab;
    return validKeys.includes(hash) ? hash : "home";
  });

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "") as Tab;
      setActiveTab(validKeys.includes(hash) ? hash : "home");
    };
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.location.origin !== OAUTH_SUPPORTED_ORIGIN ||
      !relayNonce ||
      loading ||
      !user ||
      user.role !== "admin" ||
      relayStarted.current
    ) {
      return;
    }

    relayStarted.current = true;
    void createAdminRelay({ nonce: relayNonce, returnPath: relayReturnPath })
      .then(({ relayToken, finalizeUrl }) => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = finalizeUrl;
        const tokenInput = document.createElement("input");
        tokenInput.type = "hidden";
        tokenInput.name = "relayToken";
        tokenInput.value = relayToken;
        form.appendChild(tokenInput);
        document.body.appendChild(form);
        form.submit();
      })
      .catch(() => {
        relayStarted.current = false;
        toast.error(
          "Owner sign in could not connect to the official website. Please try again."
        );
      });
  }, [createAdminRelay, loading, relayNonce, relayReturnPath, user]);

  const openTab = (tab: Tab) => {
    setActiveTab(tab);
    window.history.replaceState(
      null,
      "",
      tab === "home" ? "/admin" : `/admin#${tab}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#F5A623]" />
      </div>
    );
  }

  if (
    relayNonce &&
    typeof window !== "undefined" &&
    window.location.origin === OAUTH_SUPPORTED_ORIGIN &&
    user?.role === "admin"
  ) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#F5A623]" />
        <p className="text-sm font-semibold text-[#333]">
          Opening the official owner control centre
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    const startLogin = () => {
      const target = getOwnerLoginUrl("/admin");
      if (!target || target === "#") {
        toast.error(
          "Secure sign in is not ready. Please ask the website administrator to check the login connection."
        );
        return;
      }
      window.location.href = target;
    };
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#E8DCC6] bg-white p-8 text-center shadow-sm">
          <img
            src="/abhiara-logo.png"
            alt="Abhiara Foundation"
            className="mx-auto h-16 w-auto"
          />
          <h1 className="mt-6 font-serif text-3xl font-bold text-[#1A1A1A]">
            Owner sign in
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#555]">
            Use the Foundation owner account to manage reports, approved photos,
            public figures and donation records.
          </p>
          {relayFailed && (
            <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-[#6F4C00]">
              The previous sign in link expired or could not be verified. Please
              start again with the button below.
            </p>
          )}
          <Button
            type="button"
            onClick={startLogin}
            className="mt-7 w-full bg-[#F5A623] py-6 font-bold text-[#1A1A1A] hover:bg-[#E8960E]"
          >
            Continue to secure sign in
          </Button>
          <a
            href="/"
            className="mt-5 inline-flex text-sm font-bold text-[#9A6100] hover:underline"
          >
            Back to website
          </a>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <h1 className="text-2xl font-serif font-bold text-red-400 mb-4">
            Access Denied
          </h1>
          <p className="text-[#555] mb-6">
            You do not have admin privileges. Contact the site owner.
          </p>
          <a
            href="/"
            className="text-[#F5A623] hover:underline font-mono text-xs uppercase tracking-widest"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      menuItems={adminTabs}
      activeKey={activeTab}
      onSelect={key => openTab(key as Tab)}
    >
      {activeTab === "home" ? (
        <AdminControlCentre
          ownerName={user.name}
          onOpen={openTab}
          onLogout={() => void logout()}
        />
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          {activeTab === "media" && <VercelMediaManager />}
          {activeTab === "press" && <PressMediaManager onOpen={openTab} />}
          {activeTab === "activities" && <ActivitiesManager />}
          {activeTab === "gallery" && <GalleryManager />}
          {activeTab === "youtube" && <YoutubeManager />}
          {activeTab === "social" && <SocialLinksManager />}
          {activeTab === "settings" && <SiteSettingsManager />}
          {activeTab === "leadership" && <LeadershipManager />}
          {activeTab === "members" && <CoreMemberApplicationsManager />}
          {activeTab === "donations" && <DonationsManager />}
        </div>
      )}
    </DashboardLayout>
  );
}
