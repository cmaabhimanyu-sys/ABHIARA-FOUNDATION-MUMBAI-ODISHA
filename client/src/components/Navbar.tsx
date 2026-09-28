import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import LanguageToggle from "@/components/LanguageToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { HEADER_NAV_GROUPS } from "@/data/focusContent";

const isRouteActive = (location: string, href: string) =>
  location === href || location.startsWith(`${href}/`);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(
    null
  );
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { language, t } = useLanguage();
  const donationActive =
    location === "/donate" || location === "/donate-for-education";
  const activeGroupKey = donationActive
    ? null
    : HEADER_NAV_GROUPS.find(
        group =>
          isRouteActive(location, group.href) ||
          group.items.some(item => isRouteActive(location, item.href))
      )?.key;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobileGroup(null);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const panel = mobileMenuRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(focusableSelector)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          scrolled
            ? "border-gray-200 bg-white/95 shadow-sm backdrop-blur"
            : "border-gray-100 bg-white"
        }`}
        aria-label={t("Main navigation", "ମୁଖ୍ୟ ନାଭିଗେସନ")}
      >
        <div className="mx-auto flex h-24 max-w-[1540px] items-center px-4 md:px-6 min-[1440px]:h-28">
          <Link
            href="/"
            className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
            aria-label={t(
              "Abhiara Foundation home",
              "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ମୂଳ ପୃଷ୍ଠା"
            )}
            aria-current={location === "/" ? "page" : undefined}
          >
            <img
              src="/abhiara-logo.png"
              alt="Abhiara Foundation"
              className="h-16 w-auto md:h-20 min-[1440px]:h-24"
            />
          </Link>

          <div className="ml-auto hidden items-center gap-0.5 min-[1440px]:flex">
            {HEADER_NAV_GROUPS.map(group => {
              const active = group.key === activeGroupKey;
              const label = language === "od" ? group.od : group.en;

              if (!group.items.length) {
                return (
                  <Link
                    key={group.key}
                    href={group.href}
                    className={`inline-flex min-h-11 items-center rounded-md px-2 font-sans text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${
                      active
                        ? "bg-[#FFF7E8] text-[#8A5700]"
                        : "text-[#333] hover:bg-[#FFF7E8] hover:text-[#8A5700]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              }

              return (
                <DropdownMenu key={group.key}>
                  <div
                    className={`flex min-h-11 items-stretch rounded-md transition-colors ${
                      active
                        ? "bg-[#FFF7E8] text-[#8A5700]"
                        : "text-[#333] hover:bg-[#FFF7E8] hover:text-[#8A5700]"
                    }`}
                  >
                    <Link
                      href={group.href}
                      className="inline-flex items-center rounded-l-md py-2 pl-3 pr-1 font-sans text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                      aria-current={
                        isRouteActive(location, group.href) ? "page" : undefined
                      }
                    >
                      {label}
                    </Link>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex w-11 items-center justify-center rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                        aria-label={t(
                          `Open ${group.en} menu`,
                          `${group.od} ମେନୁ ଖୋଲନ୍ତୁ`
                        )}
                      >
                        <ChevronDown size={14} aria-hidden="true" />
                      </button>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent
                    align="center"
                    sideOffset={8}
                    className="w-72 rounded-xl border-[#E8DCC6] bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                  >
                    {group.items.map(item => {
                      const itemActive = isRouteActive(location, item.href);
                      return (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link
                            href={item.href}
                            className={`block min-h-11 cursor-pointer rounded-lg px-3 py-3 font-sans text-[13px] leading-snug outline-none ${
                              itemActive
                                ? "bg-[#FFF7E8] font-bold text-[#8A5700]"
                                : "font-medium text-[#333] focus:bg-[#FFF7E8] focus:text-[#8A5700]"
                            }`}
                            aria-current={itemActive ? "page" : undefined}
                          >
                            {language === "od" ? item.od : item.en}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </div>

          <div className="ml-3 hidden shrink-0 items-center gap-3 border-l border-gray-200 pl-4 min-[1440px]:flex">
            <LanguageToggle />
            <Link
              href="/donate"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#F5A623] px-5 py-3 font-sans text-[13px] font-bold text-[#1A1A1A] transition hover:bg-[#E8960E] active:scale-[0.97]"
              aria-current={donationActive ? "page" : undefined}
            >
              {t("Donate once", "ଏକକ ଦାନ")} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 min-[1440px]:hidden">
            <div className="hidden min-[370px]:block">
              <LanguageToggle />
            </div>
            <Link
              href="/donate"
              className="inline-flex min-h-11 items-center rounded-md bg-[#F5A623] px-3 font-sans text-xs font-bold text-[#1A1A1A]"
              aria-current={donationActive ? "page" : undefined}
            >
              {t("Donate", "ଦାନ")}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(value => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-[#1A1A1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={
                mobileOpen
                  ? t("Close menu", "ମେନୁ ବନ୍ଦ କରନ୍ତୁ")
                  : t("Open menu", "ମେନୁ ଖୋଲନ୍ତୁ")
              }
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("Website menu", "ୱେବସାଇଟ ମେନୁ")}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-5 pb-10 pt-28 min-[1440px]:hidden"
          >
            <div className="mx-auto max-w-lg">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  {t("Menu", "ମେନୁ")}
                </p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-[#1A1A1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                  aria-label={t("Close menu", "ମେନୁ ବନ୍ଦ କରନ୍ତୁ")}
                >
                  <X size={22} />
                </button>
              </div>

              <Link
                href="/donate"
                className="mb-3 flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#F5A623] px-6 py-3 font-sans text-sm font-bold text-[#1A1A1A] active:scale-[0.97]"
                aria-current={donationActive ? "page" : undefined}
              >
                {t("Make a one time donation", "ଏକକାଳୀନ ଦାନ କରନ୍ତୁ")}
                <ArrowRight size={15} />
              </Link>

              <div className="mb-3 min-[370px]:hidden">
                <LanguageToggle />
              </div>

              <Link
                href="/"
                className={`flex min-h-11 items-center border-b border-gray-100 py-3 font-sans text-[15px] font-bold ${
                  location === "/" ? "text-[#8A5700]" : "text-[#222]"
                }`}
                aria-current={location === "/" ? "page" : undefined}
              >
                {t("Home", "ମୂଳ ପୃଷ୍ଠା")}
              </Link>

              <div className="divide-y divide-gray-100">
                {HEADER_NAV_GROUPS.map(group => {
                  const expanded = expandedMobileGroup === group.key;
                  const label = language === "od" ? group.od : group.en;
                  if (!group.items.length) {
                    return (
                      <Link
                        key={group.key}
                        href={group.href}
                        className={`flex min-h-12 items-center py-3 font-sans text-[15px] font-bold ${
                          isRouteActive(location, group.href)
                            ? "text-[#8A5700]"
                            : "text-[#222]"
                        }`}
                        aria-current={
                          isRouteActive(location, group.href)
                            ? "page"
                            : undefined
                        }
                      >
                        {label}
                      </Link>
                    );
                  }
                  return (
                    <section key={group.key} className="py-2">
                      <div className="flex min-h-12 items-stretch">
                        <Link
                          href={group.href}
                          className={`flex flex-1 items-center py-3 pr-3 font-sans text-[15px] font-bold ${
                            isRouteActive(location, group.href)
                              ? "text-[#8A5700]"
                              : "text-[#222]"
                          }`}
                          aria-current={
                            isRouteActive(location, group.href)
                              ? "page"
                              : undefined
                          }
                        >
                          {label}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMobileGroup(current =>
                              current === group.key ? null : group.key
                            )
                          }
                          className="flex h-12 w-12 items-center justify-center rounded-md text-[#333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                          aria-expanded={expanded}
                          aria-controls={`mobile-group-${group.key}`}
                          aria-label={t(
                            `${expanded ? "Close" : "Open"} ${group.en} menu`,
                            `${group.od} ମେନୁ ${expanded ? "ବନ୍ଦ କରନ୍ତୁ" : "ଖୋଲନ୍ତୁ"}`
                          )}
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${
                              expanded ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {expanded && (
                        <div
                          id={`mobile-group-${group.key}`}
                          className="border-l-2 border-[#F5A623] pb-2 pl-4"
                        >
                          {group.items.map(item => {
                            const itemActive = isRouteActive(
                              location,
                              item.href
                            );
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`flex min-h-11 items-center py-2.5 font-sans text-[14px] leading-snug ${
                                  itemActive
                                    ? "font-bold text-[#8A5700]"
                                    : "font-medium text-[#444]"
                                }`}
                                aria-current={itemActive ? "page" : undefined}
                              >
                                {language === "od" ? item.od : item.en}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-5 border-t border-gray-200 pt-4 font-sans text-xs font-semibold text-[#555]">
                <Link href="/privacy" className="flex min-h-11 items-center">
                  {t("Privacy and safeguarding", "ଗୋପନୀୟତା ଓ ସୁରକ୍ଷା")}
                </Link>
                <Link href="/contact" className="flex min-h-11 items-center">
                  {t("Contact", "ଯୋଗାଯୋଗ")}
                </Link>
                <Link
                  href="/donation-and-refund-policy"
                  className="flex min-h-11 items-center"
                >
                  {t("Donation policy", "ଦାନ ନୀତି")}
                </Link>
                <Link href="/terms" className="flex min-h-11 items-center">
                  {t("Terms", "ସର୍ତ୍ତାବଳୀ")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
