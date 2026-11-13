"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { gsap as Gsap } from "gsap";

/** Animation is progressive enhancement: server markup starts fully visible. */
export function RevampMotion({
  children,
  className = "",
  tone,
}: {
  children: ReactNode;
  className?: string;
  tone?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || media.matches || typeof IntersectionObserver === "undefined")
      return;
    let cancelled = false;
    let context: ReturnType<typeof Gsap.context> | undefined;
    let observer: IntersectionObserver | undefined;
    const stop = () => {
      cancelled = true;
      observer?.disconnect();
      context?.revert();
    };
    void import("gsap")
      .then(({ gsap }) => {
        if (cancelled || media.matches) return;
        context = gsap.context(() => {
          const hero = root.querySelectorAll("[data-r-hero]");
          gsap.from(hero, {
            y: 20,
            opacity: 0.55,
            stagger: 0.09,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "all",
          });
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting || cancelled || media.matches) return;
                // Observer callbacks run after context creation. Register their
                // tweens explicitly so route changes / reduced motion revert them.
                context?.add(() => {
                  gsap.fromTo(
                    entry.target,
                    { y: 24, opacity: 0.4 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: 0.8,
                      ease: "power3.out",
                      clearProps: "all",
                    },
                  );
                });
                observer?.unobserve(entry.target);
              });
            },
            { threshold: 0.1 },
          );
          root
            .querySelectorAll("[data-r-reveal]")
            .forEach((el) => observer?.observe(el));
        }, root);
      })
      .catch(() => {
        /* Content remains visible if the optional chunk fails. */
      });
    media.addEventListener("change", stop);
    return () => {
      cancelled = true;
      stop();
      media.removeEventListener("change", stop);
    };
  }, []);
  return (
    <div ref={ref} className={`r-page ${className}`} data-r-tone={tone}>
      {children}
    </div>
  );
}
