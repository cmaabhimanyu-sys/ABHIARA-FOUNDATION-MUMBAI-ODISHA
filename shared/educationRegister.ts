export const EDUCATION_REGISTER_KEY = "stat_education_student_register";
export const EDUCATION_REGISTER_LABEL =
  "Student register: aggregate count and Odisha district representation";

export const ODISHA_REGISTER_DISTRICTS = [
  { en: "Angul", od: "ଅନୁଗୋଳ" },
  { en: "Balangir", od: "ବଲାଙ୍ଗୀର" },
  { en: "Balasore", od: "ବାଲେଶ୍ୱର" },
  { en: "Bargarh", od: "ବରଗଡ଼" },
  { en: "Bhadrak", od: "ଭଦ୍ରକ" },
  { en: "Boudh", od: "ବୌଦ୍ଧ" },
  { en: "Cuttack", od: "କଟକ" },
  { en: "Deogarh", od: "ଦେବଗଡ଼" },
  { en: "Dhenkanal", od: "ଢେଙ୍କାନାଳ" },
  { en: "Gajapati", od: "ଗଜପତି" },
  { en: "Ganjam", od: "ଗଞ୍ଜାମ" },
  { en: "Jagatsinghpur", od: "ଜଗତସିଂହପୁର" },
  { en: "Jajpur", od: "ଯାଜପୁର" },
  { en: "Jharsuguda", od: "ଝାରସୁଗୁଡ଼ା" },
  { en: "Kalahandi", od: "କଳାହାଣ୍ଡି" },
  { en: "Kandhamal", od: "କନ୍ଧମାଳ" },
  { en: "Kendrapara", od: "କେନ୍ଦ୍ରାପଡ଼ା" },
  { en: "Keonjhar", od: "କେନ୍ଦୁଝର" },
  { en: "Khordha", od: "ଖୋର୍ଦ୍ଧା" },
  { en: "Koraput", od: "କୋରାପୁଟ" },
  { en: "Malkangiri", od: "ମାଲକାନଗିରି" },
  { en: "Mayurbhanj", od: "ମୟୂରଭଞ୍ଜ" },
  { en: "Nabarangpur", od: "ନବରଙ୍ଗପୁର" },
  { en: "Nayagarh", od: "ନୟାଗଡ଼" },
  { en: "Nuapada", od: "ନୂଆପଡ଼ା" },
  { en: "Puri", od: "ପୁରୀ" },
  { en: "Rayagada", od: "ରାୟଗଡ଼ା" },
  { en: "Sambalpur", od: "ସମ୍ବଲପୁର" },
  { en: "Subarnapur", od: "ସୁବର୍ଣ୍ଣପୁର" },
  { en: "Sundargarh", od: "ସୁନ୍ଦରଗଡ଼" },
] as const;

export type RegisterDistrict = (typeof ODISHA_REGISTER_DISTRICTS)[number]["en"];
export type EducationRegisterSnapshot = {
  reportedOn: string;
  students: number;
  districts: RegisterDistrict[];
  isPublished: boolean;
};

/** Only aggregate registration and district representation—not assistance or outcomes. */
export function parseEducationRegister(
  raw: string | null | undefined,
  now: number = Date.now()
): EducationRegisterSnapshot | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (typeof value !== "object" || !value || Array.isArray(value))
      return null;
    const keys = Object.keys(value);
    if (
      keys.length !== 4 ||
      keys.some(
        key =>
          !["reportedOn", "students", "districts", "isPublished"].includes(key)
      )
    )
      return null;
    const { reportedOn, students, districts, isPublished } = value;
    if (
      typeof reportedOn !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(reportedOn)
    )
      return null;
    const date = new Date(`${reportedOn}T00:00:00Z`);
    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== reportedOn ||
      date.getTime() > now
    )
      return null;
    if (
      !Number.isInteger(students) ||
      students < 1 ||
      students > 999999 ||
      typeof isPublished !== "boolean"
    )
      return null;
    if (
      !Array.isArray(districts) ||
      districts.length < 1 ||
      districts.length > ODISHA_REGISTER_DISTRICTS.length ||
      districts.length > students ||
      new Set(districts).size !== districts.length
    )
      return null;
    if (
      districts.some(
        district =>
          !ODISHA_REGISTER_DISTRICTS.some(item => item.en === district)
      )
    )
      return null;
    return { reportedOn, students, districts, isPublished };
  } catch {
    return null;
  }
}

export function publishedEducationRegister(
  settings: ReadonlyArray<{ settingKey: string; settingValue: string }>
): EducationRegisterSnapshot | null {
  const snapshot = parseEducationRegister(
    settings.find(item => item.settingKey === EDUCATION_REGISTER_KEY)
      ?.settingValue
  );
  return snapshot?.isPublished ? snapshot : null;
}

export function registerDistrictName(
  district: RegisterDistrict,
  odia: boolean
): string {
  const item = ODISHA_REGISTER_DISTRICTS.find(item => item.en === district)!;
  return odia ? item.od : item.en;
}
