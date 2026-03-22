/**
 * Form submission utility for Abhiara Foundation
 *
 * Uses FormSubmit.co — a free service that sends form data
 * directly to info@abhiarafoundation.org with no API key needed.
 *
 * First submission triggers a one-time email verification from FormSubmit.co.
 * After confirming, all future submissions go straight to your inbox.
 */

const TARGET_EMAIL = "info@abhiarafoundation.org";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

interface FormPayload {
  [key: string]: string;
}

interface SubmitResult {
  success: boolean;
  message: string;
}

/**
 * Submit form data via FormSubmit.co → delivers to info@abhiarafoundation.org
 */
export async function submitForm(
  data: FormPayload,
  subject: string
): Promise<SubmitResult> {
  try {
    const response = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `[Abhiara Foundation] ${subject}`,
        _template: "table",
        _captcha: "false",
        ...data,
      }),
    });

    const result = await response.json();

    if (result.success === "true" || result.success === true) {
      return {
        success: true,
        message: "Your message has been sent successfully!",
      };
    } else {
      throw new Error(result.message || "Submission failed");
    }
  } catch (error) {
    console.error("FormSubmit.co failed, opening mailto fallback:", error);

    // Fallback: open mailto link
    const body = Object.entries(data)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n\n");

    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
      `[Website] ${subject}`
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoUrl, "_blank");

    return {
      success: true,
      message:
        "Your email client has been opened with the form details. Please click Send.",
    };
  }
}

/**
 * Submit newsletter subscription
 */
export async function submitNewsletter(email: string): Promise<SubmitResult> {
  return submitForm(
    { Email: email, Message: `New newsletter subscription from: ${email}` },
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
      Name: data.name,
      Email: data.email,
      Type: formatLabel(data.type),
      Subject: data.subject || "General Inquiry",
      Message: data.message,
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
      Qualification: data.qualification,
      Email: data.email,
      "Social Profile": data.socialProfile,
      "Area of Interest": formatLabel(data.areaOfInterest),
    },
    `Volunteer Application — ${data.fullName}`
  );
}

/**
 * Submit birthday registration form
 */
export async function submitBirthdayForm(data: {
  fullName: string;
  email: string;
  phone: string;
  birthdayDate: string;
  celebrationType: string;
  message: string;
}): Promise<SubmitResult> {
  return submitForm(
    {
      "Full Name": data.fullName,
      Email: data.email,
      Phone: data.phone,
      "Birthday Date": data.birthdayDate,
      "Celebration Type": formatLabel(data.celebrationType),
      Message: data.message || "No additional message",
    },
    `Birthday Registration — ${data.fullName} (${data.birthdayDate})`
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
