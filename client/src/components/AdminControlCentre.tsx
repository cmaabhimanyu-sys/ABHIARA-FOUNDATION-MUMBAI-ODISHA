import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileImage,
  FileText,
  Globe2,
  IndianRupee,
  LockKeyhole,
  LogOut,
  MessageCircle,
  Newspaper,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

export type AdminTab =
  | "home"
  | "press"
  | "activities"
  | "media"
  | "gallery"
  | "youtube"
  | "social"
  | "settings"
  | "leadership"
  | "members"
  | "donations";

type AdminControlCentreProps = {
  ownerName?: string | null;
  onOpen: (tab: AdminTab) => void;
  onLogout: () => void;
};

const quickActions: Array<{
  tab: AdminTab;
  title: string;
  body: string;
  icon: typeof FileText;
  colour: string;
}> = [
  {
    tab: "press",
    title: "Manage Press and Media",
    body: "Add verified reports, approved programme photos, public videos, and official social links here.",
    icon: Newspaper,
    colour: "bg-amber-50 text-amber-800",
  },
  {
    tab: "activities",
    title: "Add a field report",
    body: "Add a verified activity with date, general location, result and one approved photo. Published education records appear under Monthly Reports.",
    icon: FileText,
    colour: "bg-amber-50 text-amber-800",
  },
  {
    tab: "media",
    title: "Upload a beneficiary photo",
    body: "Upload to the Vercel photo library. The latest approved beneficiary photo appears on Student Impact.",
    icon: FileImage,
    colour: "bg-blue-50 text-blue-800",
  },
  {
    tab: "gallery",
    title: "Impact Photos",
    body: "Edit captions, choose a cause, and publish or unpublish reviewed photos on the homepage and Impact Gallery.",
    icon: BookOpen,
    colour: "bg-emerald-50 text-emerald-800",
  },
  {
    tab: "youtube",
    title: "Add a public video",
    body: "Paste an approved YouTube link. Education videos appear with the public monthly record.",
    icon: Video,
    colour: "bg-red-50 text-red-800",
  },
  {
    tab: "settings",
    title: "Update public figures",
    body: "Change reviewed student, activity, family and district figures, plus the public email and WhatsApp channel.",
    icon: Globe2,
    colour: "bg-violet-50 text-violet-800",
  },
  {
    tab: "leadership",
    title: "Board and Advisory Members",
    body: "Add, edit, order, publish or unpublish confirmed directors and advisors shown on the public website.",
    icon: Users,
    colour: "bg-indigo-50 text-indigo-800",
  },
  {
    tab: "donations",
    title: "Review successful donations",
    body: "See successful donation records. Payment setup and security keys stay locked outside this screen.",
    icon: IndianRupee,
    colour: "bg-orange-50 text-orange-800",
  },
];

export default function AdminControlCentre({
  ownerName,
  onOpen,
  onLogout,
}: AdminControlCentreProps) {
  const { data: activities = [] } = trpc.cms.activities.list.useQuery();
  const { data: donations = [] } = trpc.donation.list.useQuery();
  const { data: mediaStatus } = trpc.cms.media.status.useQuery();

  const publishedReports = activities.filter(
    (item: any) => item.isPublished
  ).length;
  const successfulDonations = donations.filter(
    (item: any) =>
      item.status === "completed" && Boolean(item.razorpayPaymentId)
  ).length;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-[#17130D] text-white">
        <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              Owner control centre
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl">
              Welcome{ownerName ? `, ${ownerName.split(" ")[0]}` : ""}.
            </h2>
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/70 md:text-base">
              Use this page to update the website. Choose a task, fill in the
              form, and publish only verified information.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://www.abhiarafoundation.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-[#F5A623] px-5 py-3 text-sm font-bold text-[#1A1A1A]"
              >
                Open live website <ExternalLink size={16} />
              </a>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded border border-white/25 px-5 py-3 text-sm font-bold text-white hover:border-white/60"
              >
                Sign out <LogOut size={16} />
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="font-serif text-xl font-bold">System status</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/65">Website and database</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-300">
                  <CheckCircle2 size={15} /> Ready
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/65">Vercel photo library</span>
                <span
                  className={`inline-flex items-center gap-1.5 font-bold ${mediaStatus?.configured ? "text-emerald-300" : "text-amber-300"}`}
                >
                  <CheckCircle2 size={15} />{" "}
                  {mediaStatus?.configured ? "Ready" : "Needs connection"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/65">Published field reports</span>
                <span className="font-bold text-white">{publishedReports}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/65">
                  Successful payment records
                </span>
                <span className="font-bold text-white">
                  {successfulDonations}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9A6100]">
              Common work
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[#1A1A1A]">
              What do you want to do?
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map(action => (
            <button
              key={action.tab}
              type="button"
              onClick={() => onOpen(action.tab)}
              className="group rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#F5A623] hover:shadow-md"
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${action.colour}`}
              >
                <action.icon size={21} />
              </span>
              <h3 className="mt-4 font-serif text-xl font-bold text-[#1A1A1A]">
                {action.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#666]">
                {action.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#9A6100]">
                Open <ArrowRight size={14} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-emerald-700" />
            <h2 className="font-serif text-xl font-bold text-emerald-950">
              Before you publish
            </h2>
          </div>
          <ul className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-emerald-950/80">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 shrink-0" size={16} />
              Use only verified dates, places and results.
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 shrink-0" size={16} />
              Use child or beneficiary photos only after written consent.
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 shrink-0" size={16} />
              Never upload Aadhaar, bank passbooks, phone numbers, addresses,
              school records or payment details.
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 shrink-0" size={16} />
              Use a district or broad location, not a child’s home or school
              address.
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-3">
            <LockKeyhole className="text-amber-800" />
            <h2 className="font-serif text-xl font-bold text-amber-950">
              Protected changes
            </h2>
          </div>
          <p className="mt-4 font-sans text-sm leading-relaxed text-amber-950/80">
            Legal registrations, tax status, payment keys, bank details, the QR
            code, navigation and website design are locked to protect legal and
            payment information. Board records in Admin must always match the
            Foundation&apos;s official company documents.
          </p>
          <button
            type="button"
            onClick={() => onOpen("members")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-900"
          >
            Review volunteer applications <Users size={16} />
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-[#FAF8F3] p-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="text-[#B56A22]" />
          <h2 className="font-serif text-xl font-bold">
            Simple monthly routine
          </h2>
        </div>
        <ol className="mt-4 grid gap-3 font-sans text-sm text-[#555] md:grid-cols-4">
          {[
            "Upload approved photos",
            "Add the field report",
            "Check the public page",
            "Review successful donations",
          ].map((step, index) => (
            <li key={step} className="rounded-lg bg-white p-4">
              <span className="font-serif text-2xl font-bold text-[#F5A623]">
                {index + 1}
              </span>
              <p className="mt-2 font-bold text-[#1A1A1A]">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
