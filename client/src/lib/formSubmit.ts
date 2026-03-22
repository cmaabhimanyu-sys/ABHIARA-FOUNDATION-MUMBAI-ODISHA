/**
 * Form submission utility for Abhiara Foundation
 * 
 * Uses Web3Forms API when WEB3FORMS_KEY is configured,
 * otherwise falls back to mailto: links.
 * 
 * To get a Web3Forms key:
 * 1. Go to web3forms.com
 * 2. Enter info@abhiarafoundation.org
 * 3. Verify email → get access key
 * 4. Add VITE_WEB3FORMS_KEY env var on Vercel
 */

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";
const FALLBACK_EMAIL = "info@abhiarafoundation.org";

interface FormData {
  [key: string]: string;
}

interface SubmitResult {
  success: boolean;
  method: "api" | "mailto";
  message: string;
}

/**
 * Submit form data via Web3Forms API or mailto fallback
 */
export async function submitForm(
  data: FormData,
  subject: string
): Promise<SubmitResult> {
  // Try Web3Forms API first
  if (WEB3FORMS_KEY) {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Abhiara Foundation] ${subject}`,
          from_name: "Abhiara Foundation Website",
          ...data,
          // Honeypot spam protection
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          method: "api",
          message: "Your message has been sent successfully!",
        };
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Web3Forms submission failed, falling back to mailto:", error);
      // Fall through to mailto
    }
  }

  // Fallback: open mailto link
  const body = Object.entries(data)
    .filter(([key, value]) => value && key !== "botcheck")
    .map(([key, value]) => `${formatLabel(key)}: ${value}`)
    .join("\n\n");

  const mailtoUrl = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
    `[Website] ${subject}`
  )}&body=${encodeURIComponent(body)}`;

  window.open(mailtoUrl, "_blank");

  return {
    success: true,
    method: "mailto",
    message: "Your email client has been opened with the form details. Please click Send.",
  };
}

/**
 * Submit newsletter subscription
 */
export async function submitNewsletter(email: string): Promise<SubmitResult> {
  return submitForm(
    { email, message: `New newsletter subscription from: ${email}` },
    "Newsletter Subscription"
  );
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  type: string;
  subject?: string;
  message: string;
}): Promise<SubmitResult> {
  return submitForm(
    {
      name: data.name,
      email: data.email,
      type: formatLabel(data.type),
      subject: data.subject || "General Inquiry",
      message: data.message,
    },
    data.subject || `${formatLabel(data.type)} — ${data.name}`
  );
}

/**
 * Submit volunteer form
 */
export async function submitVolunteerForm(data: {
  fullName: string;
  qualification: string;
  email: string;
  socialProfile: string;
  areaOfInterest: string;
}): Promise<SubmitResult> {
  return submitForm(
    {
      "Full Name": data.fullName,
      "Qualification": data.qualification,
      "Email": data.email,
      "Social Profile": data.socialProfile,
      "Area of Interest": formatLabel(data.areaOfInterest),
    },
    `Volunteer Application — ${data.fullName}`
  );
}

/** Convert camelCase/snake_case keys to readable labels */
function formatLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}
