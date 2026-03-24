/**
 * SEO Component — Dynamic per-page Open Graph, Twitter Card, and meta tags
 * Updates document head on mount/update for rich social media previews
 */
import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULTS = {
  title: "Abhiara Foundation — Fearless Ray of Light",
  description:
    "Education for every child. Dignity for every elder. Founded by Abhimanyu Mallik. Built from the village up.",
  image:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/hero-dawn-PUfjxrVLdG8a3bgPJiAovi.webp",
  url: "https://abhiarafoundation.org",
  type: "website",
};

function setMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setNameMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  image = DEFAULTS.image,
  url = DEFAULTS.url,
  type = DEFAULTS.type,
}: SEOProps) {
  useEffect(() => {
    // Page title
    document.title = title;

    // Canonical URL — tells Google which URL is the "real" one
    setCanonical(url);

    // Standard meta
    setNameMeta("description", description);

    // Open Graph
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", image);
    setMeta("og:url", url);
    setMeta("og:type", type);
    setMeta("og:site_name", "Abhiara Foundation");
    setMeta("og:locale", "en_IN");

    // Twitter Card
    setNameMeta("twitter:card", "summary_large_image");
    setNameMeta("twitter:title", title);
    setNameMeta("twitter:description", description);
    setNameMeta("twitter:image", image);

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = DEFAULTS.title;
      setCanonical(DEFAULTS.url + "/");
      setNameMeta("description", DEFAULTS.description);
      setMeta("og:title", DEFAULTS.title);
      setMeta("og:description", DEFAULTS.description);
      setMeta("og:image", DEFAULTS.image);
      setMeta("og:url", DEFAULTS.url);
    };
  }, [title, description, image, url, type]);

  return null;
}
