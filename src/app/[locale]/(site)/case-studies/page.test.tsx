import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { describe, expect, it, vi } from "vitest";
import { CASE_STUDIES } from "@/lib/case-studies";
import CaseStudiesIndexPage from "./page";

vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: async () => (key: string) => key,
}));

type NodeProps = {
  className?: string;
  children?: ReactNode;
  href?: unknown;
};

function byClass(
  node: ReactNode,
  className: string,
): ReactElement<NodeProps>[] {
  if (!isValidElement<NodeProps>(node)) return [];
  return [
    ...(node.props.className === className ? [node] : []),
    ...Children.toArray(node.props.children).flatMap((child) =>
      byClass(child, className),
    ),
  ];
}

function studySlug(link: ReactElement<NodeProps>) {
  const href = link.props.href as {
    pathname: string;
    params: { slug: string };
  };
  expect(href.pathname).toBe("/case-studies/[slug]");
  return href.params.slug;
}

async function page(category?: string) {
  return CaseStudiesIndexPage({
    params: Promise.resolve({ locale: "id" }),
    searchParams: Promise.resolve(category ? { category } : {}),
  });
}

describe("case study directory layout", () => {
  it("leads with Euromedica and shows the other six stories once each", async () => {
    const tree = await page();
    const featured = byClass(tree, "r-case-index__featured-link");
    const grid = byClass(tree, "r-case-index__card");

    expect(featured.map(studySlug)).toEqual(["euromedica"]);
    expect(grid.map(studySlug)).toHaveLength(6);
    expect(new Set([...featured, ...grid].map(studySlug))).toEqual(
      new Set(CASE_STUDIES.map((study) => study.slug)),
    );
  });

  it.each([
    ["healthcare", ["euromedica"]],
    ["professional-services", ["kb-insurance", "asuransi-simas-insurtech"]],
  ])(
    "places all %s results in the grid without a featured duplicate",
    async (category, slugs) => {
      const tree = await page(category);

      expect(byClass(tree, "r-case-index__featured-link")).toHaveLength(0);
      expect(byClass(tree, "r-case-index__card").map(studySlug)).toEqual(slugs);
    },
  );

  it("treats an unknown filter as the complete directory", async () => {
    const tree = await page("unknown");

    expect(byClass(tree, "r-case-index__featured-link")).toHaveLength(1);
    expect(byClass(tree, "r-case-index__card")).toHaveLength(6);
  });
});
