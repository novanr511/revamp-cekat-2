import Image from "next/image";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { sceneArtwork } from "./scene-art";
import { SectionHeading } from "./section-heading";

type StoryBenefit = {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

/** Open chapters instead of disclosure panels. Desktop alternation gives each
 * capability room; text-first DOM order keeps mobile and screen readers linear.
 * Brand-tinted image wells isolate the existing Cekat artwork, without adding
 * invented UI. Static, lazy artwork avoids mounting a live scene for every row.
 */
export function AlternatingStory({
  eyebrow,
  heading,
  benefits,
}: {
  eyebrow?: string;
  heading: string;
  benefits: StoryBenefit[];
}) {
  if (benefits.length === 0) return null;

  return (
    <section
      className="bg-white py-16 md:py-20"
      data-layout="alternating-story"
    >
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} />
        <div className="mt-10 md:mt-14">
          {benefits.map((benefit, index) => (
            <article
              key={`${index}-${benefit.title}`}
              className={cn(
                "grid items-center gap-7 py-10 first:pt-0 last:pb-0 md:gap-10 md:py-14 lg:gap-16",
                benefit.image && "md:grid-cols-2",
                index > 0 && "border-t border-foreground/8",
              )}
            >
              <div
                className={cn(
                  "min-w-0",
                  benefit.image &&
                    index % 2 === 1 &&
                    "md:col-start-2 md:row-start-1",
                )}
              >
                <h3 className="max-w-xl text-[clamp(1.65rem,2.6vw,2.5rem)] leading-[1.16] font-semibold tracking-[-0.035em] text-balance text-[#09214c]">
                  {benefit.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3a4960] md:text-lg">
                  {benefit.body}
                </p>
              </div>
              {benefit.image && (
                <figure
                  className={cn(
                    "alternating-story__visual relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl bg-[#f3f6fd]",
                    index % 2 === 1 &&
                      "bg-[var(--soft-surface-blue)] md:col-start-1 md:row-start-1",
                  )}
                >
                  <Image
                    src={sceneArtwork(benefit.image)}
                    alt={benefit.imageAlt ?? benefit.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 600px"
                    loading="lazy"
                    className="object-contain p-4 sm:p-6 lg:p-8"
                  />
                </figure>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
