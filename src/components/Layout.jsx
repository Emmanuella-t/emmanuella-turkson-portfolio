import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils/routes";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

const RESUME_URL =
  "https://drive.google.com/file/d/14dn2VkynSd9wh2UevfpwyZAGx5UFN3jI/view?usp=sharing";

/** Parse a CSS color string ("rgb(...)" / "rgba(...)") into channels. */
function parseColor(str) {
  const m = str && str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = parts;
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return { r, g, b, a };
}

/**
 * Read the actual background of the section sitting behind the fixed header,
 * skipping fixed/sticky overlays (the header itself and any sticky sub-bar),
 * and decide whether it reads as "dark" or "light".
 */
function detectHeaderTheme() {
  if (typeof document === "undefined") return "dark";
  const hs = getComputedStyle(document.documentElement).getPropertyValue(
    "--site-header-height",
  );
  const headerH = parseFloat(hs) || 72;
  const x = Math.max(1, Math.floor(window.innerWidth / 2));
  const y = Math.floor(headerH + 4);
  const els = document.elementsFromPoint(x, y);

  for (const el of els) {
    const tag = el.tagName;
    const cs = getComputedStyle(el);
    // Skip the header and any pinned overlays so we read the real section behind.
    if (tag !== "HTML" && tag !== "BODY") {
      if (cs.position === "fixed" || cs.position === "sticky") continue;
      if (el.closest && el.closest("header")) continue;
    }
    const c = parseColor(cs.backgroundColor);
    if (!c || c.a === 0) continue;
    const luminance = 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
    return luminance < 140 ? "dark" : "light";
  }
  return "dark";
}

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerTheme, setHeaderTheme] = useState("dark");

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Adaptive logo + nav theme: follows the section currently behind the header.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setHeaderTheme(detectHeaderTheme());
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // Recompute now and after layout settles on route change.
    update();
    const t1 = setTimeout(update, 60);
    const t2 = setTimeout(update, 250);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "Home" },
    { name: "Work", path: "Work" },
    { name: "Experience", path: "Experience" },
    { name: "About", path: "About" },
    { name: "Contact", path: "Contact" },
  ];

  const isActive = (path) => {
    const currentPath = location.pathname;
    const targetPath = createPageUrl(path);
    return currentPath === targetPath || (path === "Home" && currentPath === "/");
  };

  const dark = headerTheme === "dark";

  const headerBg = dark
    ? isScrolled
      ? "border-[#3A1A10]/80 bg-[#1C0A08]/92 backdrop-blur-md"
      : "border-transparent bg-[#1C0A08]"
    : isScrolled
      ? "border-[#D5BCAD]/60 bg-[#FFEDDA]/90 backdrop-blur-md"
      : "border-transparent bg-[#FFEDDA]";

  const mobileBtn = dark
    ? "text-[#FFEDDA] hover:bg-white/10"
    : "text-[#401216] hover:bg-black/5";

  const mobilePanel = dark
    ? "border-[#3A1A10] bg-[#1C0A08]"
    : "border-[#D5BCAD]/60 bg-[#FFEDDA]";

  return (
    <div className="min-h-screen bg-background font-[var(--font-body)]">
      <style>{`
        :root {
          --site-header-height: 64px;
        }

        @media (min-width: 640px) {
          :root {
            --site-header-height: 72px;
          }
        }

        @media (min-width: 768px) {
          :root {
            --site-header-height: 80px;
          }
        }

        .logo-image {
          display: block;
          transition: opacity 0.3s ease;
        }
      `}</style>

      <div className="fixed left-0 right-0 top-0 z-50">
        <header
          className={`border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${headerBg}`}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
            <Link
              to={createPageUrl("Home")}
              className="shrink-0 transition-opacity duration-300 hover:opacity-80"
              aria-label="Emmanuella Turkson — Home"
            >
              <span className="relative block h-9 sm:h-11 md:h-12">
                <img
                  src="/logo-white.png"
                  alt="Emmanuella Turkson"
                  className={`logo-image h-full w-auto ${dark ? "opacity-100" : "opacity-0"}`}
                />
                <img
                  src="/logo-black.png"
                  alt=""
                  aria-hidden="true"
                  className={`logo-image absolute left-0 top-0 h-full w-auto ${
                    dark ? "opacity-0" : "opacity-100"
                  }`}
                />
              </span>
            </Link>

            <div className="hidden items-center gap-7 md:flex lg:gap-9">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  className={`group relative font-body text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    isActive(item.path)
                      ? dark
                        ? "text-[#E0A13A]"
                        : "text-[#BC7821]"
                      : dark
                        ? "text-[#FFEDDA]/80 hover:text-[#FFEDDA]"
                        : "text-[#401216]/75 hover:text-[#401216]"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#BC7821] transition-transform duration-300 ${
                      isActive(item.path)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={`rounded-md p-2 transition-colors md:hidden ${mobileBtn}`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          {isMobileMenuOpen && (
            <div className={`border-t px-4 py-3 md:hidden ${mobilePanel}`}>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={createPageUrl(item.path)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-3 font-body text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? dark
                          ? "bg-[#63333A]/40 text-[#E0A13A]"
                          : "bg-[#BC7821]/15 text-[#BC7821]"
                        : dark
                          ? "text-[#FFEDDA]/90 hover:bg-white/5"
                          : "text-[#401216]/90 hover:bg-black/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>
      </div>

      <main className="min-w-0" style={{ paddingTop: "var(--site-header-height)" }}>
        {children}
      </main>

      <footer className="border-t border-[#3A1A10] bg-[#140806] py-12 text-[#FFEDAD]/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
          <div>
            {/* Footer sits on a dark background → white logo variant. */}
            <img
              src="/logo-white.png"
              alt="Emmanuella Turkson"
              className="mb-4 h-11 w-auto"
            />
            <p className="font-display text-xl font-semibold text-[#FFEDAD]">
              Emmanuella Turkson
            </p>
            <a
              href="mailto:imturkson@gmail.com"
              className="mt-2 block font-body text-sm transition-colors hover:text-[#E0A13A]"
            >
              imturkson@gmail.com
            </a>
            <p className="mt-6 font-body text-xs text-[#FFEDAD]/40">
              © 2026 Emmanuella Turkson
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://www.linkedin.com/in/emmanuella-turkson"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#E0A13A]"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Emmanuella-t"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#E0A13A]"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:imturkson@gmail.com"
              className="transition-colors hover:text-[#E0A13A]"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:text-[#E0A13A]"
            >
              Résumé
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
