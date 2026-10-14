import { Link } from "wouter";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import {
  activityPublicText,
  mustafapurActivity,
} from "@/data/mustafapurActivity";

export default function MustafapurImpactStory({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { language, t } = useLanguage();
  const { data: activities = [] } = trpc.cms.activities.listPublished.useQuery(
    undefined,
    { retry: false }
  );
  const story = mustafapurActivity(activities);
  if (!story) return null;
  const text = (value: string | null | undefined) =>
    activityPublicText(value, language);

  return (
    <article
      id={compact ? undefined : "mustafapur-august-2026"}
      className={`${compact ? "mt-8" : "container my-12 max-w-6xl scroll-mt-28"} rounded-xl border border-[#E8DCC6] bg-[#FFFDF8] p-6 text-[#1A1A1A] md:p-8`}
    >
      <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#8A5700]">
        {t("Flood relief in Mustafapur", "ମୁସ୍ତାଫାପୁରରେ ବନ୍ୟା ସହାୟତା")}
      </p>
      <h2
        className={`${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"} mt-3 font-serif font-bold leading-snug`}
      >
        {text(story.title)}
      </h2>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-6 text-[#655845]">
        <p className="flex items-center gap-2">
          <CalendarDays size={16} aria-hidden="true" />
          {text(story.date)}
        </p>
        <p className="flex items-start gap-2">
          <MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />
          {text(story.location)}
        </p>
      </div>
      {!compact && (
        <p className="mt-6 max-w-4xl text-base leading-8 text-[#444]">
          {text(story.description)}
        </p>
      )}
      {story.beneficiariesCount && (
        <p className="mt-5 border-l-4 border-[#F5A623] pl-4 text-base font-semibold leading-7 text-[#333]">
          {text(story.beneficiariesCount)}
        </p>
      )}
      {compact && (
        <Link
          href="/disaster-relief#mustafapur-august-2026"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8A5700]"
        >
          {t("Read this programme update", "ଏହି କାର୍ଯ୍ୟକ୍ରମର ବିବରଣୀ ପଢ଼ନ୍ତୁ")}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}
