"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { rememberLocaleFromLinkTarget } from "@/lib/locale-preference";
import { RevampHeader } from "./revamp-header";
import { Footer } from "./footer";
import { FloatingWhatsApp } from "./floating-whatsapp";
import { SiteSmoothScroll } from "./site-smooth-scroll";

/** Shared navigation and footer for the public site routes. */
export function SiteChrome({
  children,
  whatsappLabel,
}: {
  children: ReactNode;
  whatsappLabel: string;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isStandaloneContactSales = pathname === "/contact-sales";

  useEffect(() => {
    const rememberLanguageChoice = (event: MouseEvent) => {
      rememberLocaleFromLinkTarget(event.target);
    };

    document.addEventListener("click", rememberLanguageChoice);
    return () => document.removeEventListener("click", rememberLanguageChoice);
  }, []);

  useEffect(() => {
    if (
      isHomepage ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = document.querySelector<HTMLElement>(
      ".cekat-page, .contact-us-page",
    );
    if (!root || typeof IntersectionObserver === "undefined") return;
    // Redesigned secondary pages own their GSAP enhancement and teardown.
    // Don't let the legacy observer animate those same section transforms.
    if (root.querySelector(".r-page")) return;

    const sections = [
      ...root.querySelectorAll<HTMLElement>(
        ":scope > section, :scope > article, :scope > div.cv-auto, :scope > div > section, :scope > div > article",
      ),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target as HTMLElement;
          section.classList.add("is-motion-visible");
          observer.unobserve(section);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((section, index) => {
      // Existing Reveal components own their own timing and remain untouched.
      if (section.classList.contains("reveal-on-scroll")) return;
      section.dataset.pageMotion = "";
      section.style.setProperty(
        "--page-motion-delay",
        `${Math.min(index % 4, 3) * 65}ms`,
      );

      // Keep the first viewport fully visible for LCP; animate later sections
      // as they scroll into view, matching the homepage's one-way reveals.
      if (section.getBoundingClientRect().top < window.innerHeight * 0.88) {
        section.classList.add("is-motion-visible");
      } else {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        delete section.dataset.pageMotion;
        section.classList.remove("is-motion-visible");
        section.style.removeProperty("--page-motion-delay");
      });
    };
  }, [isHomepage, pathname]);

  if (isHomepage) {
    return (
      <>
        <SiteSmoothScroll />
        <RevampHeader />
        <main id="main" className="reference-home-main">
          {children}
        </main>
        <Footer />
      </>
    );
  }

  if (isStandaloneContactSales) {
    // Preserve the dedicated split-form experience; it has its own home link.
    return <main className="contact-us-page">{children}</main>;
  }

  return (
    <>
      <SiteSmoothScroll />
      <RevampHeader />
      <main id="main" className="cekat-page">
        <noscript>
          <style>{`.cekat-page .reveal-on-scroll { opacity: 1 !important; transform: none !important; }
            @layer base { .cekat-page .benefit-studio [role="region"][hidden] { display: block !important; } }`}</style>
        </noscript>
        {children}
      </main>
      <Footer largeTouchTargets />
      <aside aria-label={whatsappLabel}>
        <FloatingWhatsApp label={whatsappLabel} />
      </aside>
    </>
  );
}
