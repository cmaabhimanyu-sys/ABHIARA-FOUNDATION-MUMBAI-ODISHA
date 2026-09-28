export const DONATION_CAUSE_VALUES = [
  "general",
  "education",
  "shiksha_sathi",
  "elderly_care",
  "medical_emergency",
  "disaster_relief",
  "animal_welfare",
  "vidyapeeth",
] as const;

export type DonationCauseValue = (typeof DONATION_CAUSE_VALUES)[number];

export const DONATION_CAUSE_LABELS: Record<DonationCauseValue, string> = {
  general: "General Fund",
  education: "Education",
  shiksha_sathi: "Abhiara Shiksha Sathi",
  elderly_care: "Elder Support",
  medical_emergency: "Medical Emergency Help",
  disaster_relief: "Disaster Relief",
  animal_welfare: "Animal Welfare",
  vidyapeeth: "Abhiara Vidyapitha",
};
