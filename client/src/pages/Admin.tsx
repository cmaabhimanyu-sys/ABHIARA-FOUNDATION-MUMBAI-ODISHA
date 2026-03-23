import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  LayoutDashboard, Image, FileText, Youtube, Share2, Settings,
  Plus, Trash2, Edit2, Eye, EyeOff, Upload, ArrowLeft,
  Calendar, MapPin, Tag, Users, X, Check, Loader2, Link as LinkIcon
} from "lucide-react";

type Tab = "activities" | "gallery" | "blog" | "youtube" | "social" | "settings";

// ===== IMAGE UPLOAD HELPER =====
function useImageUpload() {
  const uploadMutation = trpc.cms.upload.useMutation();

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const base64 = (reader.result as string).split(",")[1];
          const result = await uploadMutation.mutateAsync({
            fileName: file.name,
            fileBase64: base64,
            contentType: file.type,
          });
          resolve(result.url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, [uploadMutation]);

  return { uploadImage, isUploading: uploadMutation.isPending };
}

// ===== IMAGE UPLOAD COMPONENT =====
function ImageUploader({ value, onChange, label = "Image" }: { value: string; onChange: (url: string) => void; label?: string }) {
  const { uploadImage, isUploading } = useImageUpload();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB.");
      return;
    }
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed. Try again.");
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-white/70 mb-1 block">{label}</label>
      <div className="flex gap-2 items-center">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload..."
          className="bg-white/5 border-white/10 text-white flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={isUploading}
          className="border-white/10 text-white/70 hover:text-white"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        </Button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>
      {value && (
        <img src={value} alt="Preview" className="mt-2 h-20 w-auto rounded object-contain bg-white/5" />
      )}
    </div>
  );
}

// ===== ACTIVITIES MANAGER =====
function ActivitiesManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.activities.list.useQuery();
  const createMut = trpc.cms.activities.create.useMutation({ onSuccess: () => { utils.cms.activities.list.invalidate(); setShowForm(false); resetForm(); toast.success("Activity created!"); } });
  const updateMut = trpc.cms.activities.update.useMutation({ onSuccess: () => { utils.cms.activities.list.invalidate(); setEditId(null); setShowForm(false); resetForm(); toast.success("Activity updated!"); } });
  const deleteMut = trpc.cms.activities.delete.useMutation({ onSuccess: () => { utils.cms.activities.list.invalidate(); toast.success("Activity deleted!"); } });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "", category: "education" as "education" | "elderly" | "community" | "csr", imageUrl: "", sdgTags: "", beneficiariesCount: "", isPublished: true });

  const resetForm = () => setForm({ title: "", description: "", date: "", location: "", category: "education", imageUrl: "", sdgTags: "", beneficiariesCount: "", isPublished: true });

  const startEdit = (item: any) => {
    setForm({ title: item.title, description: item.description, date: item.date, location: item.location, category: item.category, imageUrl: item.imageUrl || "", sdgTags: item.sdgTags || "", beneficiariesCount: item.beneficiariesCount || "", isPublished: item.isPublished });
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
          <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditId(null); resetForm(); }} className="text-white/60"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
          <h3 className="text-lg font-semibold text-white">{editId ? "Edit Activity" : "New Activity"}</h3>
        </div>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Activity Title *" className="bg-white/5 border-white/10 text-white" />
        <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description *" className="bg-white/5 border-white/10 text-white min-h-[100px]" />
        <div className="grid grid-cols-2 gap-3">
          <Input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="Date (e.g. October 2025) *" className="bg-white/5 border-white/10 text-white" />
          <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Location *" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))} className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm">
            <option value="education">Education</option>
            <option value="elderly">Elderly Care</option>
            <option value="community">Community</option>
            <option value="csr">CSR</option>
          </select>
          <Input value={form.beneficiariesCount} onChange={e => setForm(f => ({ ...f, beneficiariesCount: e.target.value }))} placeholder="Beneficiaries (e.g. 50+ students)" className="bg-white/5 border-white/10 text-white" />
        </div>
        <Input value={form.sdgTags} onChange={e => setForm(f => ({ ...f, sdgTags: e.target.value }))} placeholder="SDG Tags (e.g. SDG 4, SDG 10)" className="bg-white/5 border-white/10 text-white" />
        <ImageUploader value={form.imageUrl} onChange={url => setForm(f => ({ ...f, imageUrl: url }))} />
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} className="rounded" />
          <span className="text-sm text-white/70">Published (visible on public site)</span>
        </div>
        <Button onClick={handleSubmit} disabled={createMut.isPending || updateMut.isPending} className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]">
          {(createMut.isPending || updateMut.isPending) ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {editId ? "Update Activity" : "Create Activity"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Activities ({items.length})</h3>
        <Button onClick={() => { resetForm(); setShowForm(true); }} size="sm" className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]"><Plus className="h-4 w-4 mr-1" /> Add Activity</Button>
      </div>
      {isLoading ? <p className="text-white/50">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/50 mb-2">No activities yet. Click "Add Activity" to create one.</p>
          <p className="text-white/30 text-xs">Activities you add here will appear on the public Activities page.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start gap-4">
              {item.imageUrl && <img src={item.imageUrl} alt="" className="h-16 w-24 rounded object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-medium truncate">{item.title}</h4>
                  {!item.isPublished && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded uppercase">Draft</span>}
                </div>
                <p className="text-white/50 text-xs mt-1">{item.date} · {item.location} · {item.category}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(item)} className="text-white/50 hover:text-white h-8 w-8 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this activity?")) deleteMut.mutate({ id: item.id }); }} className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== GALLERY MANAGER =====
function GalleryManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.gallery.list.useQuery();
  const createMut = trpc.cms.gallery.create.useMutation({ onSuccess: () => { utils.cms.gallery.list.invalidate(); setShowForm(false); resetForm(); toast.success("Photo added!"); } });
  const updateMut = trpc.cms.gallery.update.useMutation({ onSuccess: () => { utils.cms.gallery.list.invalidate(); setEditId(null); setShowForm(false); resetForm(); toast.success("Photo updated!"); } });
  const deleteMut = trpc.cms.gallery.delete.useMutation({ onSuccess: () => { utils.cms.gallery.list.invalidate(); toast.success("Photo deleted!"); } });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", imageUrl: "", category: "education" as "education" | "elderly" | "events" | "community", location: "", dateTaken: "" });

  const resetForm = () => setForm({ title: "", description: "", imageUrl: "", category: "education", location: "", dateTaken: "" });

  const startEdit = (item: any) => {
    setForm({ title: item.title, description: item.description || "", imageUrl: item.imageUrl, category: item.category, location: item.location || "", dateTaken: item.dateTaken || "" });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.imageUrl) { toast.error("Title and image are required"); return; }
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
          <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditId(null); resetForm(); }} className="text-white/60"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
          <h3 className="text-lg font-semibold text-white">{editId ? "Edit Photo" : "Add Photo"}</h3>
        </div>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Photo Title *" className="bg-white/5 border-white/10 text-white" />
        <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description (optional)" className="bg-white/5 border-white/10 text-white" />
        <ImageUploader value={form.imageUrl} onChange={url => setForm(f => ({ ...f, imageUrl: url }))} label="Photo *" />
        <div className="grid grid-cols-3 gap-3">
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))} className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm">
            <option value="education">Education</option>
            <option value="elderly">Elderly Care</option>
            <option value="events">Events</option>
            <option value="community">Community</option>
          </select>
          <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Location" className="bg-white/5 border-white/10 text-white" />
          <Input value={form.dateTaken} onChange={e => setForm(f => ({ ...f, dateTaken: e.target.value }))} placeholder="Date taken" className="bg-white/5 border-white/10 text-white" />
        </div>
        <Button onClick={handleSubmit} disabled={createMut.isPending || updateMut.isPending} className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]">
          {(createMut.isPending || updateMut.isPending) ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {editId ? "Update Photo" : "Add Photo"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Gallery ({items.length})</h3>
        <Button onClick={() => { resetForm(); setShowForm(true); }} size="sm" className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]"><Plus className="h-4 w-4 mr-1" /> Add Photo</Button>
      </div>
      {isLoading ? <p className="text-white/50">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/50 mb-2">No photos yet. Click "Add Photo" to upload one.</p>
          <p className="text-white/30 text-xs">Photos will appear in the Gallery tab on the Activities page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item: any) => (
            <div key={item.id} className="relative group rounded-lg overflow-hidden bg-white/5 border border-white/10">
              <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
              <div className="p-2">
                <p className="text-white text-xs font-medium truncate">{item.title}</p>
                <p className="text-white/40 text-[10px]">{item.category} {item.location ? `· ${item.location}` : ""}</p>
              </div>
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={() => startEdit(item)} className="text-white bg-black/50 h-6 w-6 p-0"><Edit2 className="h-3 w-3" /></Button>
                <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this photo?")) deleteMut.mutate({ id: item.id }); }} className="text-red-400 bg-black/50 h-6 w-6 p-0"><Trash2 className="h-3 w-3" /></Button>
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
  const createMut = trpc.cms.blog.create.useMutation({ onSuccess: () => { utils.cms.blog.list.invalidate(); setShowForm(false); resetForm(); toast.success("Post created!"); } });
  const updateMut = trpc.cms.blog.update.useMutation({ onSuccess: () => { utils.cms.blog.list.invalidate(); setEditId(null); setShowForm(false); resetForm(); toast.success("Post updated!"); } });
  const deleteMut = trpc.cms.blog.delete.useMutation({ onSuccess: () => { utils.cms.blog.list.invalidate(); toast.success("Post deleted!"); } });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", imageUrl: "", author: "Abhimanyu Mallik", category: "event" as "education" | "elderly" | "csr" | "announcement" | "event", tags: "", isPublished: true });

  const resetForm = () => setForm({ title: "", excerpt: "", content: "", imageUrl: "", author: "Abhimanyu Mallik", category: "event", tags: "", isPublished: true });

  const startEdit = (item: any) => {
    setForm({ title: item.title, excerpt: item.excerpt, content: item.content, imageUrl: item.imageUrl || "", author: item.author, category: item.category, tags: item.tags || "", isPublished: item.isPublished });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.excerpt || !form.content) { toast.error("Title, excerpt, and content are required"); return; }
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
          <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditId(null); resetForm(); }} className="text-white/60"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
          <h3 className="text-lg font-semibold text-white">{editId ? "Edit Post" : "New Post"}</h3>
        </div>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Post Title *" className="bg-white/5 border-white/10 text-white" />
        <Textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short excerpt (shown in card) *" className="bg-white/5 border-white/10 text-white" rows={2} />
        <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Full content (use paragraphs separated by double newlines) *" className="bg-white/5 border-white/10 text-white min-h-[200px]" />
        <ImageUploader value={form.imageUrl} onChange={url => setForm(f => ({ ...f, imageUrl: url }))} label="Cover Image" />
        <div className="grid grid-cols-3 gap-3">
          <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Author" className="bg-white/5 border-white/10 text-white" />
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))} className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm">
            <option value="education">Education</option>
            <option value="elderly">Elderly Care</option>
            <option value="csr">CSR</option>
            <option value="announcement">Announcement</option>
            <option value="event">Event</option>
          </select>
          <Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma-separated)" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} className="rounded" />
          <span className="text-sm text-white/70">Published</span>
        </div>
        <Button onClick={handleSubmit} disabled={createMut.isPending || updateMut.isPending} className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]">
          {(createMut.isPending || updateMut.isPending) ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {editId ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Blog Posts ({items.length})</h3>
        <Button onClick={() => { resetForm(); setShowForm(true); }} size="sm" className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]"><Plus className="h-4 w-4 mr-1" /> New Post</Button>
      </div>
      {isLoading ? <p className="text-white/50">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/50 mb-2">No posts yet. Click "New Post" to write one.</p>
          <p className="text-white/30 text-xs">Blog posts will appear in the Updates tab on the Activities page.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start gap-4">
              {item.imageUrl && <img src={item.imageUrl} alt="" className="h-16 w-24 rounded object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-medium truncate">{item.title}</h4>
                  {!item.isPublished && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded uppercase">Draft</span>}
                </div>
                <p className="text-white/50 text-xs mt-1 truncate">{item.excerpt}</p>
                <p className="text-white/30 text-[10px] mt-1">{item.author} · {item.category}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(item)} className="text-white/50 hover:text-white h-8 w-8 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this post?")) deleteMut.mutate({ id: item.id }); }} className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"><Trash2 className="h-3.5 w-3.5" /></Button>
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
  const createMut = trpc.cms.youtube.create.useMutation({ onSuccess: () => { utils.cms.youtube.list.invalidate(); setShowForm(false); resetForm(); toast.success("Video added!"); } });
  const updateMut = trpc.cms.youtube.update.useMutation({ onSuccess: () => { utils.cms.youtube.list.invalidate(); setEditId(null); setShowForm(false); resetForm(); toast.success("Video updated!"); } });
  const deleteMut = trpc.cms.youtube.delete.useMutation({ onSuccess: () => { utils.cms.youtube.list.invalidate(); toast.success("Video deleted!"); } });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", youtubeUrl: "", description: "", category: "event" as "education" | "elderly" | "event" | "documentary" | "other" });

  const resetForm = () => setForm({ title: "", youtubeUrl: "", description: "", category: "event" });

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&]+)/);
    return match?.[1] || "";
  };

  const startEdit = (item: any) => {
    setForm({ title: item.title, youtubeUrl: item.youtubeUrl, description: item.description || "", category: item.category });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.youtubeUrl) { toast.error("Title and YouTube URL are required"); return; }
    if (!getYoutubeId(form.youtubeUrl)) { toast.error("Invalid YouTube URL"); return; }
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
          <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditId(null); resetForm(); }} className="text-white/60"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
          <h3 className="text-lg font-semibold text-white">{editId ? "Edit Video" : "Add YouTube Video"}</h3>
        </div>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Video Title *" className="bg-white/5 border-white/10 text-white" />
        <Input value={form.youtubeUrl} onChange={e => setForm(f => ({ ...f, youtubeUrl: e.target.value }))} placeholder="YouTube URL (paste full link) *" className="bg-white/5 border-white/10 text-white" />
        {form.youtubeUrl && getYoutubeId(form.youtubeUrl) && (
          <div className="rounded-lg overflow-hidden bg-black aspect-video max-w-md">
            <iframe src={`https://www.youtube.com/embed/${getYoutubeId(form.youtubeUrl)}`} className="w-full h-full" allowFullScreen />
          </div>
        )}
        <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description (optional)" className="bg-white/5 border-white/10 text-white" />
        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))} className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm">
          <option value="education">Education</option>
          <option value="elderly">Elderly Care</option>
          <option value="event">Event</option>
          <option value="documentary">Documentary</option>
          <option value="other">Other</option>
        </select>
        <Button onClick={handleSubmit} disabled={createMut.isPending || updateMut.isPending} className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]">
          {(createMut.isPending || updateMut.isPending) ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {editId ? "Update Video" : "Add Video"}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">YouTube Videos ({items.length})</h3>
        <Button onClick={() => { resetForm(); setShowForm(true); }} size="sm" className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]"><Plus className="h-4 w-4 mr-1" /> Add Video</Button>
      </div>
      {isLoading ? <p className="text-white/50">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/50 mb-2">No videos yet. Click "Add Video" to embed one.</p>
          <p className="text-white/30 text-xs">YouTube videos will be embedded on the Activities page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="aspect-video bg-black">
                <iframe src={`https://www.youtube.com/embed/${getYoutubeId(item.youtubeUrl)}`} className="w-full h-full" allowFullScreen />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-white/40 text-[10px]">{item.category}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(item)} className="text-white/50 hover:text-white h-8 w-8 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this video?")) deleteMut.mutate({ id: item.id }); }} className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"><Trash2 className="h-3.5 w-3.5" /></Button>
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
  const upsertMut = trpc.cms.social.upsert.useMutation({ onSuccess: () => { utils.cms.social.list.invalidate(); setShowForm(false); resetForm(); toast.success("Link saved!"); } });
  const deleteMut = trpc.cms.social.delete.useMutation({ onSuccess: () => { utils.cms.social.list.invalidate(); toast.success("Link deleted!"); } });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ platform: "", url: "", label: "" });

  const resetForm = () => setForm({ platform: "", url: "", label: "" });

  const handleSubmit = () => {
    if (!form.platform || !form.url) { toast.error("Platform and URL are required"); return; }
    upsertMut.mutate({ ...form, isActive: true });
  };

  const PLATFORMS = ["LinkedIn", "Instagram", "Facebook", "Twitter/X", "YouTube", "WhatsApp", "Email", "Website", "Other"];

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); resetForm(); }} className="text-white/60"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
          <h3 className="text-lg font-semibold text-white">Add Social Link</h3>
        </div>
        <select value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))} className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm w-full">
          <option value="">Select Platform *</option>
          {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <Input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="URL or Link *" className="bg-white/5 border-white/10 text-white" />
        <Input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="Display Label (e.g. Abhimanyu Mallik — Founder)" className="bg-white/5 border-white/10 text-white" />
        <Button onClick={handleSubmit} disabled={upsertMut.isPending} className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]">
          {upsertMut.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save Link
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Social Links ({items.length})</h3>
        <Button onClick={() => { resetForm(); setShowForm(true); }} size="sm" className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]"><Plus className="h-4 w-4 mr-1" /> Add Link</Button>
      </div>
      {isLoading ? <p className="text-white/50">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/50 mb-2">No social links yet. Add your LinkedIn, Instagram, etc.</p>
          <p className="text-white/30 text-xs">Social links will appear in the website footer.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
              <LinkIcon className="h-5 w-5 text-[#C9A84C] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{item.platform}</p>
                <p className="text-white/40 text-xs truncate">{item.url}</p>
                {item.label && <p className="text-white/30 text-[10px]">{item.label}</p>}
              </div>
              <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this link?")) deleteMut.mutate({ id: item.id }); }} className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== SITE SETTINGS MANAGER =====
function SiteSettingsManager() {
  const utils = trpc.useUtils();
  const { data: items = [], isLoading } = trpc.cms.settings.list.useQuery();
  const upsertMut = trpc.cms.settings.upsert.useMutation({ onSuccess: () => { utils.cms.settings.list.invalidate(); setShowForm(false); resetForm(); toast.success("Setting saved!"); } });
  const deleteMut = trpc.cms.settings.delete.useMutation({ onSuccess: () => { utils.cms.settings.list.invalidate(); toast.success("Setting deleted!"); } });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ settingKey: "", settingValue: "", label: "", category: "stats" });

  const resetForm = () => setForm({ settingKey: "", settingValue: "", label: "", category: "stats" });

  const handleSubmit = () => {
    if (!form.settingKey || !form.settingValue) { toast.error("Key and value are required"); return; }
    upsertMut.mutate(form);
  };

  // Pre-defined settings that can be quickly added
  const QUICK_SETTINGS = [
    { key: "stat_students_reached", label: "Students Reached (So Far)", category: "stats", placeholder: "e.g. 50+" },
    { key: "stat_elders_visited", label: "Elders Visited (So Far)", category: "stats", placeholder: "e.g. 40+" },
    { key: "stat_activities_completed", label: "Activities Completed", category: "stats", placeholder: "e.g. 2" },
    { key: "stat_students_target", label: "Students Target 2026", category: "stats", placeholder: "e.g. 500+" },
    { key: "stat_elders_target", label: "Elders Target 2026", category: "stats", placeholder: "e.g. 200+" },
    { key: "stat_activities_target", label: "Activities Target 2026", category: "stats", placeholder: "e.g. 10" },
    { key: "stat_csr_target", label: "CSR Target FY26", category: "stats", placeholder: "e.g. \u20B930L" },
    { key: "stat_districts", label: "Districts in Odisha", category: "stats", placeholder: "e.g. 3" },
    { key: "hero_tagline", label: "Hero Tagline", category: "content", placeholder: "e.g. Fearless Ray of Light" },
    { key: "whatsapp_number", label: "WhatsApp Number", category: "contact", placeholder: "e.g. 919938938321" },
    { key: "email_address", label: "Email Address", category: "contact", placeholder: "e.g. info@abhiarafoundation.org" },
  ];

  const existingKeys = items.map((i: any) => i.settingKey);
  const availableQuickSettings = QUICK_SETTINGS.filter(s => !existingKeys.includes(s.key));

  // Group items by category
  const grouped = items.reduce((acc: Record<string, any[]>, item: any) => {
    const cat = item.category || "general";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); resetForm(); }} className="text-white/60"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
          <h3 className="text-lg font-semibold text-white">Add Setting</h3>
        </div>

        {availableQuickSettings.length > 0 && (
          <div className="mb-4">
            <p className="text-white/50 text-xs mb-2">Quick Add:</p>
            <div className="flex flex-wrap gap-2">
              {availableQuickSettings.map(qs => (
                <button
                  key={qs.key}
                  onClick={() => setForm({ settingKey: qs.key, settingValue: "", label: qs.label, category: qs.category })}
                  className={`text-[10px] px-3 py-1.5 rounded border transition-all ${form.settingKey === qs.key ? "bg-[#C9A84C] text-[#0A1628] border-[#C9A84C]" : "bg-white/5 text-white/50 border-white/10 hover:border-[#C9A84C]/40"}`}
                >
                  {qs.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <Input value={form.settingKey} onChange={e => setForm(f => ({ ...f, settingKey: e.target.value }))} placeholder="Setting Key (e.g. stat_students_reached) *" className="bg-white/5 border-white/10 text-white" />
        <Input value={form.settingValue} onChange={e => setForm(f => ({ ...f, settingValue: e.target.value }))} placeholder="Value *" className="bg-white/5 border-white/10 text-white" />
        <Input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="Display Label (optional)" className="bg-white/5 border-white/10 text-white" />
        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm w-full">
          <option value="stats">Stats</option>
          <option value="content">Content</option>
          <option value="contact">Contact</option>
          <option value="general">General</option>
        </select>
        <Button onClick={handleSubmit} disabled={upsertMut.isPending} className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]">
          {upsertMut.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save Setting
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Site Settings ({items.length})</h3>
          <p className="text-white/30 text-xs mt-1">Manage homepage stats, contact info, and other site-wide settings.</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }} size="sm" className="bg-[#C9A84C] text-[#0A1628] hover:bg-[#B8942A]"><Plus className="h-4 w-4 mr-1" /> Add Setting</Button>
      </div>

      {isLoading ? <p className="text-white/50">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/50 mb-2">No settings yet.</p>
          <p className="text-white/30 text-xs">Add stats like "Students Reached", "Elders Visited", etc. to control what appears on the homepage and other pages.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, catItems]) => (
            <div key={category}>
              <p className="font-mono text-[10px] tracking-wider uppercase text-[#C9A84C] mb-3">{category}</p>
              <div className="space-y-2">
                {(catItems as any[]).map((item: any) => (
                  <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium text-sm">{item.label || item.settingKey}</p>
                        <span className="text-white/20 text-[10px] font-mono">{item.settingKey}</span>
                      </div>
                      <p className="text-[#C9A84C] text-lg font-bold mt-1">{item.settingValue}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => { setForm({ settingKey: item.settingKey, settingValue: item.settingValue, label: item.label || "", category: item.category }); setShowForm(true); }} className="text-white/50 hover:text-white h-8 w-8 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this setting?")) deleteMut.mutate({ id: item.id }); }} className="text-red-400/50 hover:text-red-400 h-8 w-8 p-0"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== MAIN ADMIN PAGE =====
export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("activities");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C]" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <h1 className="text-2xl font-serif font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-white/60 mb-6">Sign in to manage your website content.</p>
          <a href={getLoginUrl()} className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors">
            SIGN IN
          </a>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <h1 className="text-2xl font-serif font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-white/60 mb-6">You do not have admin privileges. Contact the site owner.</p>
          <a href="/" className="text-[#C9A84C] hover:underline font-mono text-xs uppercase tracking-widest">Back to Home</a>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "activities", label: "Activities", icon: LayoutDashboard },
    { key: "gallery", label: "Gallery", icon: Image },
    { key: "blog", label: "Blog Posts", icon: FileText },
    { key: "youtube", label: "YouTube", icon: Youtube },
    { key: "social", label: "Social Links", icon: Share2 },
    { key: "settings", label: "Site Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="bg-[#06101F] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </a>
            <div>
              <h1 className="text-lg font-serif font-bold text-white">Admin Dashboard</h1>
              <p className="text-[10px] font-mono tracking-wider uppercase text-[#C9A84C]">Abhiara Foundation CMS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-xs">{user.name || user.email}</span>
            <div className="h-8 w-8 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-xs font-bold">
              {(user.name || "A").charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-[#C9A84C] text-[#0A1628] font-bold"
                  : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-[#06101F] border border-white/10 rounded-xl p-6">
          {activeTab === "activities" && <ActivitiesManager />}
          {activeTab === "gallery" && <GalleryManager />}
          {activeTab === "blog" && <BlogManager />}
          {activeTab === "youtube" && <YoutubeManager />}
          {activeTab === "social" && <SocialLinksManager />}
          {activeTab === "settings" && <SiteSettingsManager />}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-white/20 text-[10px] font-mono tracking-wider uppercase">
            Content added here will automatically appear on the public website.
          </p>
        </div>
      </div>
    </div>
  );
}
