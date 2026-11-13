import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render as renderComponent,
  screen,
} from "@testing-library/react";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import idMessages from "../../../../messages/id.json";
import enMessages from "../../../../messages/en.json";
import { ProductCanvas } from "./product-canvas";
import { HubDirectory } from "./hub-directory";
import { RevampCapabilities } from "./capabilities";
import { FeatureChapters } from "./feature-chapters";
import { INDUSTRY_CHAPTER_VISUALS } from "./industry-chapter-visuals";
import { RevampFaq } from "./shared";
import { RevampDetail } from "./detail";
import type { LandingContent } from "@/lib/registry/types";
import chatbotContent from "@/content/features/ai-agent/en.json";
import dentalContentJson from "@/content/industries/dental/en.json";
import healthcareContentJson from "@/content/industries/healthcare/en.json";
import retailContentJson from "@/content/industries/retail/en.json";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element -- Test double, not shipped UI.
    <img src={src} alt={alt} />
  ),
}));
vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string | { pathname: string; params: { slug: string } };
  }) => (
    <a
      href={
        typeof href === "string"
          ? href
          : href.pathname.replace("[slug]", href.params.slug)
      }
      {...props}
    >
      {children}
    </a>
  ),
}));
vi.mock("@/components/shared/app-anchor", () => ({
  AppAnchor: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));
afterEach(cleanup);

const dentalContent = dentalContentJson as unknown as LandingContent;
const healthcareContent = healthcareContentJson as unknown as LandingContent;
const retailContent = retailContentJson as unknown as LandingContent;

function render(ui: ReactNode, locale = "id") {
  return renderComponent(
    <NextIntlClientProvider
      locale={locale}
      messages={locale === "id" ? idMessages : enMessages}
    >
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("original product previews", () => {
  it("changes the marketing period without presenting sample data as evidence", () => {
    render(<ProductCanvas product="marketing" />);
    expect(screen.getByText("Ilustrasi produk · Data contoh")).toBeVisible();
    expect(screen.getByText("1,248")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "30 hari" }));
    expect(screen.getByText("4,962")).toBeVisible();
    expect(screen.getByRole("button", { name: "30 hari" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.queryByText(/Google Ads/)).not.toBeInTheDocument();
  });
  it("switches inbox channels and retains a meaningful static first frame", () => {
    render(<ProductCanvas product="chat" />, "en");
    expect(screen.getByText("Hi, can I book for tomorrow?")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Instagram" }));
    expect(screen.getByText("Hi, what services do you offer?")).toBeVisible();
    expect(screen.getByRole("button", { name: "Instagram" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("filters the sample pipeline by priority", () => {
    render(<ProductCanvas product="crm" />);
    expect(screen.getByText("Studio Aruna")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Prioritas" }));
    expect(screen.queryByText("Studio Aruna")).not.toBeInTheDocument();
    expect(screen.getByText("Bumi Collective")).toBeVisible();
  });
  it("opens workflow activity", () => {
    render(<ProductCanvas product="order" />);
    fireEvent.click(screen.getByRole("button", { name: "Riwayat" }));
    expect(screen.getByText("Seluruh langkah tercatat")).toBeVisible();
  });
});

const entries = [
  {
    id: "healthcare",
    slug: "kesehatan",
    category: "industry",
    title: "Kesehatan",
    tagline: "Booking pasien",
  },
  {
    id: "retail",
    slug: "ritel",
    category: "industry",
    title: "Ritel",
    tagline: "Jualan",
  },
  {
    id: "education",
    slug: "pendidikan",
    category: "industry",
    title: "Pendidikan",
  },
];
describe("solution discovery", () => {
  it("hides JavaScript-only filters with selectors that beat the directory styles", () => {
    const html = renderToStaticMarkup(
      <NextIntlClientProvider locale="id" messages={idMessages}>
        <HubDirectory entries={entries} industry heading="Temukan solusi" />
      </NextIntlClientProvider>,
    );
    expect(html).toContain(".r-page .r-directory .r-directory__filters");
    expect(html).toContain(".r-page .r-directory .r-directory__search");
    expect(html).toMatch(/<noscript>[\s\S]*display: none;[\s\S]*<\/noscript>/);
  });
  it("combines category filtering with case-insensitive search and resets an empty result", () => {
    render(
      <HubDirectory entries={entries} industry heading="Temukan solusi" />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("3 solusi");
    fireEvent.click(
      screen.getByRole("button", { name: "Layanan & kesehatan" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("1 solusi");
    expect(screen.getByRole("link", { name: /Kesehatan/ })).toHaveAttribute(
      "href",
      "/industries/kesehatan",
    );
    fireEvent.change(screen.getByRole("searchbox", { name: "Cari solusi" }), {
      target: { value: "PASiEN" },
    });
    expect(screen.getByRole("status")).toHaveTextContent("1 solusi");
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "missing" },
    });
    expect(screen.getByText("Belum menemukan yang sesuai?")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Tampilkan semua" }));
    expect(screen.getByRole("status")).toHaveTextContent("3 solusi");
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });
  it("filters features by their registry category", () => {
    render(
      <HubDirectory
        entries={[
          { id: "inbox", slug: "inbox", title: "Inbox", category: "chat" },
          { id: "deals", slug: "deals", title: "Pipeline", category: "crm" },
        ]}
        industry={false}
        heading="Features"
      />,
      "en",
    );
    fireEvent.click(screen.getByRole("button", { name: "CRM" }));
    expect(
      screen.queryByRole("link", { name: "Inbox" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pipeline" })).toHaveAttribute(
      "href",
      "/features/deals",
    );
  });
});

describe("capabilities and FAQ", () => {
  it("renders all product chapters and matching navigation targets without JavaScript", () => {
    const { container } = render(
      <FeatureChapters
        heading="Product workflow"
        product="marketing"
        benefits={[
          {
            title: "Connect campaigns",
            body: "All campaign context",
            image: "/campaigns.png",
          },
          {
            title: "Trace conversations",
            body: "Follow the conversation",
            image: "/conversations.png",
          },
          {
            title: "Review revenue",
            body: "Read real results",
            image: "/revenue.png",
          },
        ]}
      />,
    );
    expect(container.querySelectorAll(".r-chapter")).toHaveLength(3);
    for (const anchor of container.querySelectorAll<HTMLAnchorElement>(
      ".r-chapters__index a",
    )) {
      expect(container.querySelector(anchor.hash)).not.toBeNull();
    }
    expect(screen.getByText("All campaign context")).toBeVisible();
    expect(screen.getByText("Follow the conversation")).toBeVisible();
    expect(screen.getByText("Read real results")).toBeVisible();
  });
  it("does not render an empty chapter section or dead chapter links", () => {
    const { container } = render(
      <FeatureChapters heading="Workflow" product="chat" benefits={[]} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
  it("exposes one accordion panel with connected control IDs", () => {
    render(
      <RevampCapabilities
        heading="Capabilities"
        benefits={[
          {
            title: "Respond",
            body: "Instant response",
            image: "/response.png",
          },
          { title: "Book", body: "Book from chat", image: "/book.png" },
        ]}
      />,
    );
    const first = screen.getByRole("button", { name: "Respond" });
    const second = screen.getByRole("button", { name: "Book" });
    expect(first).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(
      document.getElementById(second.getAttribute("aria-controls")!),
    ).not.toHaveAttribute("hidden");
    expect(screen.getByRole("region")).toHaveAccessibleName("Book");
    expect(screen.getByRole("img", { name: "Book" })).toHaveAttribute(
      "src",
      "/book.png",
    );
  });
  it("includes every remaining capability in server-rendered no-JS copy", () => {
    const html = renderToStaticMarkup(
      <NextIntlClientProvider locale="id" messages={idMessages}>
        <RevampCapabilities
          heading="Capabilities"
          benefits={[
            { title: "Respond", body: "Instant response" },
            { title: "Book", body: "Book from chat" },
          ]}
        />
      </NextIntlClientProvider>,
    );
    expect(html).toMatch(/<noscript>[\s\S]*Book from chat[\s\S]*<\/noscript>/);
  });
  it("uses native FAQ disclosure with the first answer open", () => {
    const { container } = render(
      <RevampFaq
        heading="Questions"
        items={[
          { q: "Question one", a: "Answer one" },
          { q: "Question two", a: "Answer two" },
        ]}
      />,
    );
    expect(container.querySelectorAll("details")).toHaveLength(2);
    expect(container.querySelector("details")).toHaveAttribute("open");
  });
});

describe("detail metrics and image fallback", () => {
  function detail(
    content: LandingContent,
    industry = false,
    industryId?: string,
  ) {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <RevampDetail
          content={content}
          title="AI Chatbot"
          faqHeading="Questions"
          industry={industry}
          industryId={industryId}
        />
      </NextIntlClientProvider>,
    );
    return container;
  }

  it("uses four equal desktop columns and preserves the full metric values", () => {
    const container = detail(chatbotContent);
    const rail = container.querySelector<HTMLElement>(".r-metric-rail")!;
    expect(rail.dataset.metricColumns).toBe("4");
    expect(rail.style.getPropertyValue("--r-metric-columns")).toBe("4");
    expect(
      [...rail.querySelectorAll("strong")].map((el) => el.textContent),
    ).toEqual(chatbotContent.stats.map((stat) => stat.value));
    expect(rail.textContent).toContain("1,000,000+");
  });

  it("wraps five metrics into three roomy desktop columns instead of squeezing five", () => {
    const rail =
      detail(dentalContent).querySelector<HTMLElement>(".r-metric-rail")!;
    expect(rail.children).toHaveLength(5);
    expect(rail.dataset.metricColumns).toBe("3");
    expect(rail.style.getPropertyValue("--r-metric-columns")).toBe("3");
    expect(rail.textContent).toContain("Ready-to-book");
  });

  it("omits the metric rail when there are no metrics", () => {
    expect(
      detail({ ...chatbotContent, stats: [] }).querySelector(".r-metric-rail"),
    ).toBeNull();
  });

  it("gives products full chapters and industries separate flow and feature sections", () => {
    const product = detail(chatbotContent);
    expect(product.querySelectorAll(".r-chapter")).toHaveLength(
      chatbotContent.benefits.length,
    );
    expect(product.querySelector(".r-capabilities")).toBeNull();
    const industry = detail(dentalContent, true);
    expect(industry.querySelector(".r-capabilities")).toBeNull();
    expect(industry.querySelector(".r-solution-flow")).not.toBeNull();
    expect(
      industry.querySelectorAll(".r-industry-features .r-chapter"),
    ).toHaveLength(dentalContent.benefits.length - 1);
  });

  it("orders the industry blueprint: problem, flow, features, proof, metrics, then CTA", () => {
    const container = detail(healthcareContent, true, "healthcare");
    const sections = [...container.querySelectorAll(".r-page section")];
    const order = sections.map((section) => section.className.split(" ")[0]);
    const positions = [
      "r-detail-hero",
      "r-industry-story__challenge",
      "r-industry-story__flow",
      "r-chapters",
      "r-proof",
      "r-industry-metrics",
      "r-closer",
    ].map((className) => order.indexOf(className));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));

    expect(
      container.querySelector(".r-industry-story__challenge h2"),
    ).toHaveTextContent(healthcareContent.benefits[0].title);
    expect(
      [...container.querySelectorAll(".r-solution-flow__thread h3")].map(
        (step) => step.textContent,
      ),
    ).toEqual(healthcareContent.hero.useCases);
    expect(container.querySelector(".r-solution-flow__note")).toHaveTextContent(
      "not a customer chat transcript",
    );
    expect(
      container.querySelectorAll(".r-industry-story__flow img"),
    ).toHaveLength(0);
    expect(
      container.querySelector('[data-cta="industry-hero-whatsapp"]'),
    ).not.toBeNull();
    expect(
      [
        ...container.querySelectorAll(
          ".r-industry-features .r-chapter__copy h3",
        ),
      ].map((heading) => heading.textContent),
    ).toEqual(
      healthcareContent.benefits.slice(1).map((benefit) => benefit.title),
    );
    expect(
      container.querySelectorAll(".r-industry-features .r-industry-ui"),
    ).toHaveLength(healthcareContent.benefits.length - 1);
    healthcareContent.benefits.slice(1).forEach((benefit, index) => {
      const visual = container.querySelectorAll(
        ".r-industry-features .r-industry-ui",
      )[index];
      expect(visual).toHaveClass(
        `r-industry-ui--${INDUSTRY_CHAPTER_VISUALS.healthcare[index]}`,
      );
      expect(visual).toHaveAttribute("aria-label", benefit.visualAlt);
      expect(
        container.querySelectorAll(".r-industry-features .r-chapter img"),
      ).toHaveLength(0);
    });
    expect(container.querySelectorAll(".r-capability")).toHaveLength(0);
    expect(
      container.querySelectorAll("#industry-metrics .r-metric-rail > div"),
    ).toHaveLength(healthcareContent.stats!.length - 1);
    expect(container.querySelector("#industry-metrics")).toHaveTextContent(
      "Results and context",
    );
    expect(container.querySelector("#industry-metrics")).not.toHaveTextContent(
      "+50%",
    );
    expect(container.querySelector(".r-proof__metrics")).toHaveTextContent(
      "+50%",
    );
    expect(container.querySelector(".r-proof__metrics")).toHaveTextContent(
      "Vio Optical Clinic",
    );
    expect(container.querySelector(".r-platform-strip")).toBeNull();
    expect(container.querySelector(".r-principles")).toBeNull();
    expect(container.querySelector(".r-faq")).toBeNull();
    expect(container.querySelector(".r-related")).toBeNull();
  });

  it("keeps the authored metrics and flow when an industry has no customer proof", () => {
    const container = detail(retailContent, true);
    expect(container.querySelector(".r-industry-story__flow")).not.toBeNull();
    expect(
      container.querySelectorAll(".r-solution-flow__thread > li"),
    ).toHaveLength(retailContent.hero.useCases!.length);
    expect(container.querySelector('a[href="#industry-proof"]')).toBeNull();
    expect(container.querySelector(".r-proof")).toBeNull();
    expect(
      container.querySelectorAll("#industry-metrics .r-metric-rail > div"),
    ).toHaveLength(retailContent.stats!.length);
    expect(container.querySelector(".r-faq")).toBeNull();
    expect(container.querySelector(".r-related")).toBeNull();
    expect(container.querySelector(".r-closer")).not.toBeNull();
    expect(
      container.querySelector('.r-closer a[href="/contact-sales"]'),
    ).toBeNull();
  });

  it("keeps product pages separate from the industry narrative", () => {
    const product = detail(chatbotContent);
    expect(product.querySelector(".r-industry-story__challenge")).toBeNull();
    expect(product.querySelector(".r-industry-story__flow")).toBeNull();
    expect(product.querySelector(".r-platform-strip")).not.toBeNull();
    expect(product.querySelector(".r-metric-rail")).not.toBeNull();
    expect(
      product.querySelector<HTMLAnchorElement>(".r-actions a[href^='#']")?.hash,
    ).toBe("#capabilities");
    expect(product.querySelectorAll(".r-chapter")).toHaveLength(
      chatbotContent.benefits.length,
    );
  });

  it("uses the product fallback without a floating photo card when no photo exists", () => {
    const container = detail(dentalContent, true);
    expect(
      container.querySelector(".r-industry-visual--product"),
    ).not.toBeNull();
    expect(container.querySelector(".r-industry-visual__photo")).toBeNull();
    expect(container.querySelector(".r-industry-visual__card")).toBeNull();
  });
});
