/**
 * Blog / Updates — Redirects to Activities page Updates tab
 * Blog posts are now managed dynamically from the CMS via the Activities page
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Blog() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/activities?tab=updates");
  }, [setLocation]);

  return null;
}
