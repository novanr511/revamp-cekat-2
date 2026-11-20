import { afterEach, describe, expect, it } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import retail from "@/content/industries/retail/id.json";
import { IndustryDemo, IndustryPreview } from "./industry-preview";

afterEach(cleanup);

describe("industry previews", () => {
  it("cycles through the industry's own use cases", () => {
    render(
      <IndustryPreview cases={retail.hero.useCases}>
        <span>Foto</span>
      </IndustryPreview>,
    );
    expect(screen.getByText(retail.hero.useCases[0])).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Contoh berikutnya" }));
    expect(screen.getByText(retail.hero.useCases[1])).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Contoh sebelumnya" }));
    expect(screen.getByText(retail.hero.useCases[0])).toBeVisible();
  });

  it("switches benefits and sourced FAQ examples, then resets", () => {
    render(
      <IndustryDemo
        benefits={retail.benefits.map(({ title, body }) => ({ title, body }))}
        faq={retail.faq}
      />,
    );
    const feature = document.querySelector(".industry-feature") as HTMLElement;
    fireEvent.click(
      screen.getByRole("button", {
        name: new RegExp(
          retail.benefits[1].title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        ),
      }),
    );
    expect(within(feature).getByText(retail.benefits[1].title)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Pertanyaan 2" }));
    expect(screen.getByText(retail.faq[1].q)).toBeVisible();
    expect(screen.getByText(retail.faq[1].a)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Mulai ulang contoh" }));
    expect(within(feature).getByText(retail.benefits[0].title)).toBeVisible();
    expect(screen.getByText(retail.faq[0].q)).toBeVisible();
  });
});
