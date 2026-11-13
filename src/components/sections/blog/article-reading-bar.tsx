"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";

/**
 * Slim in-flow bar under the navbar with the article title, a back link, and a
 * reading progress indicator. It scrolls away with the article content.
 */
export function ArticleReadingBar({
  title,
  backLabel,
}: {
  title: string;
  backLabel: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-12 items-center gap-4">
        <Link
          href="/blog"
          aria-label={backLabel}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center gap-1 font-numeric text-sm font-semibold text-primary hover:text-primary-dark"
        >
          <span aria-hidden>←</span>
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>
        <span aria-hidden className="h-4 w-px shrink-0 bg-border" />
        <p className="truncate font-numeric text-sm font-semibold text-foreground">
          {title}
        </p>
      </Container>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
