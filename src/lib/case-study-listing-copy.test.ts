import { describe, expect, it } from "vitest";
import { CASE_STUDIES } from "./case-studies";
import {
  CASE_STUDY_LISTING_COPY_ID,
  localizeCaseStudyListing,
} from "./case-study-listing-copy";

describe("Indonesian case-study listing copy", () => {
  it("has natural Indonesian titles, summaries, and result labels for every card", () => {
    expect(Object.keys(CASE_STUDY_LISTING_COPY_ID).sort()).toEqual(
      CASE_STUDIES.map((study) => study.slug).sort(),
    );

    for (const source of CASE_STUDIES) {
      const localized = localizeCaseStudyListing(source, "id");
      const featured = localized.outcomes.find(
        (outcome) => outcome.value === localized.featuredOutcome,
      );

      expect(localized.title).not.toBe(source.title);
      expect(localized.summary).not.toBe(source.summary);
      expect(featured?.label).toBe(
        CASE_STUDY_LISTING_COPY_ID[source.slug].featuredOutcomeLabel,
      );
    }
  });

  it("leaves other locales unchanged", () => {
    const source = CASE_STUDIES[0];

    expect(localizeCaseStudyListing(source, "en")).toBe(source);
  });
});
