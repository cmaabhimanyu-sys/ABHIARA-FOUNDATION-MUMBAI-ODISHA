/**
 * Impact Gallery — Redirects to Activities page Gallery tab
 * The gallery is now managed dynamically from the CMS via the Activities page
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ImpactGallery() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/activities?tab=gallery");
  }, [setLocation]);

  return null;
}
