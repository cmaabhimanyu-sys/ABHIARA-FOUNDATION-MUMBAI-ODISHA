import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  EDUCATION_REGISTER_KEY,
  ODISHA_REGISTER_DISTRICTS,
  parseEducationRegister,
  type RegisterDistrict,
} from "@shared/educationRegister";

export default function EducationRegisterEditor() {
  const utils = trpc.useUtils();
  const { data, isLoading, error } = trpc.cms.settings.get.useQuery({
    key: EDUCATION_REGISTER_KEY,
  });
  const [reportedOn, setReportedOn] = useState("");
  const [students, setStudents] = useState("");
  const [districts, setDistricts] = useState<RegisterDistrict[]>([]);
  const [isPublished, setPublished] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  useEffect(() => {
    const snapshot = parseEducationRegister(data?.settingValue);
    if (!snapshot) return;
    setReportedOn(snapshot.reportedOn);
    setStudents(String(snapshot.students));
    setDistricts(snapshot.districts);
    setPublished(snapshot.isPublished);
    setReviewed(false);
  }, [data]);
  const save = trpc.cms.settings.upsert.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.cms.settings.listPublic.invalidate(),
        utils.cms.settings.list.invalidate(),
        utils.cms.settings.get.invalidate({ key: EDUCATION_REGISTER_KEY }),
      ]);
      setReviewed(false);
      toast.success("ରେଜିଷ୍ଟର ଅପଡେଟ ସଞ୍ଚୟ ହେଲା। / Register update saved.");
    },
    onError: error => toast.error(error.message),
  });
  const submit = () => {
    if (!/^[1-9]\d{0,5}$/.test(students.trim())) {
      toast.error(
        "ଛାତ୍ରଛାତ୍ରୀଙ୍କ ସଠିକ୍ ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା ଦିଅନ୍ତୁ। / Enter the register’s whole-number student count."
      );
      return;
    }
    const snapshot = parseEducationRegister(
      JSON.stringify({
        reportedOn,
        students: Number(students),
        districts,
        isPublished,
      })
    );
    if (!snapshot || (isPublished && !reviewed)) {
      toast.error(
        "ସଠିକ୍ ତାରିଖ, ଜିଲ୍ଲା ଓ ରେକର୍ଡ ଯାଞ୍ଚ ଆବଶ୍ୟକ। / Check the reporting date, districts and aggregate review."
      );
      return;
    }
    save.mutate({
      settingKey: EDUCATION_REGISTER_KEY,
      settingValue: JSON.stringify(snapshot),
      label:
        "Student register: aggregate count and Odisha district representation",
      category: "stats",
    });
  };
  return (
    <details
      className="mb-8 rounded-xl border border-[#D8C7A5] bg-[#FFFDF8] p-6"
      data-testid="education-register-editor"
    >
      <summary className="cursor-pointer font-serif text-xl font-bold text-[#1A1A1A]">
        ଛାତ୍ରଛାତ୍ରୀ ରେଜିଷ୍ଟର ଅପଡେଟ / Student register update
      </summary>
      <p className="mt-4 text-sm leading-7 text-[#555]">
        କେବଳ ମୋଟ ସଂଖ୍ୟା ଓ ଜିଲ୍ଲା ଦିଅନ୍ତୁ। ନାମ, ପୂର୍ଣ୍ଣ ଠିକଣା ବା ରେଜିଷ୍ଟର ଫାଇଲ
        ଏଠାରେ ଦିଅନ୍ତୁ ନାହିଁ। / Enter aggregate counts and districts only—not
        student names, full addresses or the register file. District totals are
        calculated from your selections. This does not publish a monthly tuition
        count.
      </p>
      {isLoading ? (
        <p className="mt-4">Loading…</p>
      ) : error ? (
        <p className="mt-4 text-red-800">
          The register setting could not be loaded. Refresh before editing.
        </p>
      ) : (
        <div className="mt-5 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label
              className="text-sm font-semibold text-[#333]"
              htmlFor="register-reported-on"
            >
              ଅପଡେଟ ତାରିଖ / Update shared on
              <Input
                id="register-reported-on"
                type="date"
                value={reportedOn}
                onChange={event => {
                  setReportedOn(event.target.value);
                  setReviewed(false);
                }}
                className="mt-2 bg-white"
                disabled={save.isPending}
              />
            </label>
            <label
              className="text-sm font-semibold text-[#333]"
              htmlFor="register-students"
            >
              ରେଜିଷ୍ଟରରେ ଥିବା ଛାତ୍ରଛାତ୍ରୀ / Students listed
              <Input
                id="register-students"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={students}
                onChange={event => {
                  setStudents(event.target.value);
                  setReviewed(false);
                }}
                className="mt-2 bg-white"
                disabled={save.isPending}
              />
            </label>
          </div>
          <fieldset disabled={save.isPending}>
            <legend className="mb-3 text-sm font-semibold text-[#333]">
              ରେକର୍ଡ ଠିକଣାରେ ଥିବା ଜିଲ୍ଲା / Districts in recorded addresses (
              {districts.length})
            </legend>
            <div className="grid max-h-64 gap-3 overflow-y-auto rounded border border-[#E8DCC6] bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
              {ODISHA_REGISTER_DISTRICTS.map(district => (
                <label
                  key={district.en}
                  className="flex items-start gap-2 text-sm leading-6 text-[#333]"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 accent-[#9A6100]"
                    checked={districts.includes(district.en)}
                    onChange={event => {
                      setDistricts(current =>
                        event.target.checked
                          ? [...current, district.en]
                          : current.filter(value => value !== district.en)
                      );
                      setReviewed(false);
                    }}
                  />
                  <span>
                    {district.od} / {district.en}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex items-start gap-3 text-sm leading-6 text-[#333]">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#9A6100]"
              checked={reviewed}
              onChange={event => setReviewed(event.target.checked)}
              disabled={save.isPending}
            />
            <span>
              ମୋଟ ସଂଖ୍ୟା ଓ ଜିଲ୍ଲା ରେକର୍ଡ ସହ ଯାଞ୍ଚ କରିଛି। / I checked the
              aggregate count and district selections against the current
              register.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm leading-6 text-[#333]">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#9A6100]"
              checked={isPublished}
              onChange={event => setPublished(event.target.checked)}
              disabled={save.isPending}
            />
            <span>
              ୱେବସାଇଟରେ ପ୍ରକାଶ କରନ୍ତୁ। / Publish this register summary on Home
              and Student Impact. Uncheck and save to hide it.
            </span>
          </label>
          <Button
            onClick={submit}
            disabled={save.isPending || (isPublished && !reviewed)}
            className="bg-[#F5A623] font-bold text-[#1A1A1A] hover:bg-[#E8960E]"
          >
            {save.isPending
              ? "ସଞ୍ଚୟ ହେଉଛି… / Saving…"
              : "ରେଜିଷ୍ଟର ଅପଡେଟ ସଞ୍ଚୟ / Save register update"}
          </Button>
        </div>
      )}
    </details>
  );
}
