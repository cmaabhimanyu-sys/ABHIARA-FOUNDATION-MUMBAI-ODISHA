export type SupportedSocialPlatform =
  | "Facebook"
  | "YouTube"
  | "LinkedIn"
  | "Instagram";

export type PublicSocialLink = {
  platform: SupportedSocialPlatform;
  url: string;
};

export const SOCIAL_PLATFORM_FALLBACKS: readonly PublicSocialLink[] = [
  {
    platform: "Facebook",
    url: "https://www.facebook.com/abhiarafoundation",
  },
  {
    platform: "YouTube",
    url: "https://youtube.com/@abhiarafoundation",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/company/abhiara-foundation/",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/abhiarafoundation/",
  },
] as const;

export const FOUNDER_LINKEDIN_URL =
  "https://www.linkedin.com/in/abhimanyu-mallik";

export const SOCIAL_FOLLOW_MESSAGE = {
  en: "❤️ Please follow and support Abhiara Foundation on our official social media pages.",
  od: "❤️ ଆମ ଅଧିକୃତ ସୋସିଆଲ ମିଡିଆ ପୃଷ୍ଠାରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ ଅନୁସରଣ ଓ ସହାୟତା କରନ୍ତୁ।",
} as const;

const EXPECTED_HOSTS: Record<SupportedSocialPlatform, string> = {
  Facebook: "facebook.com",
  YouTube: "youtube.com",
  LinkedIn: "linkedin.com",
  Instagram: "instagram.com",
};

function isExpectedSocialUrl(platform: SupportedSocialPlatform, value: string) {
  try {
    const url = new URL(value);
    const expectedHost = EXPECTED_HOSTS[platform];
    return (
      url.protocol === "https:" &&
      (url.hostname === expectedHost ||
        url.hostname.endsWith(`.${expectedHost}`))
    );
  } catch {
    return false;
  }
}

export function resolvePublicSocialLinks(
  activeLinks: Array<{ platform: string; url: string }>
): PublicSocialLink[] {
  return SOCIAL_PLATFORM_FALLBACKS.map(fallback => {
    const ownerLink = activeLinks.find(
      link => link.platform.toLowerCase() === fallback.platform.toLowerCase()
    );
    return ownerLink && isExpectedSocialUrl(fallback.platform, ownerLink.url)
      ? { platform: fallback.platform, url: ownerLink.url }
      : fallback;
  });
}
