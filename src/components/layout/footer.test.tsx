import type { ComponentProps } from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { Footer } from "./footer";
import enMessages from "../../../messages/en.json";
import idMessages from "../../../messages/id.json";

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/",
  Link: ({ children, href, ...props }: ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const messages = {
  nav: {
    ...enMessages.nav,
    crm: "CRM",
    chat: "Chat",
    marketing: "Marketing",
    order: "Order",
  },
  footer: {
    ...enMessages.footer,
    productHeading: "Product",
    legalHeading: "Legal",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    refund: "Return, Refund & Delivery Policy",
    rights: "All rights reserved.",
    metaPartner: "Cekat.AI is Official Meta Business Partner",
    officeHeading: "Our Office",
    jakartaOfficeName: "Jakarta Office",
    jakartaOfficeAddress:
      "Prosperity Tower unit 16i, Jl. Jenderal Sudirman No.Kav. 52-53, District 8, SCBD, South Jakarta 12190",
    tangerangOfficeName: "Tangerang Office",
    tangerangOfficeAddress:
      "Ruko Hampton Avenue Blok A no.10, Paramount, Gading Serpong, Tangerang, 15810",
    companyLegalName: "PT. Teknologi Cekat Indonesia",
    downloadApp: "Download Cekat Mobile App",
  },
};

describe("Footer", () => {
  it("renders legal links to the on-site legal pages", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText("Privacy Policy").closest("a")).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
    expect(screen.getByText("Terms & Conditions").closest("a")).toHaveAttribute(
      "href",
      "/terms-and-conditions",
    );
  });

  it("renders the Meta partner strip and office information", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>,
    );
    expect(
      screen.getByText("Cekat.AI is Official Meta Business Partner"),
    ).toBeInTheDocument();
    expect(screen.getByText("Jakarta Office")).toBeInTheDocument();
    expect(screen.getByText("Tangerang Office")).toBeInTheDocument();
    expect(screen.getByText("Download Cekat Mobile App")).toBeInTheDocument();
  });

  it("uses approved English labels for selected Indonesian footer links", () => {
    render(
      <NextIntlClientProvider locale="id" messages={idMessages}>
        <Footer />
      </NextIntlClientProvider>,
    );

    for (const label of [
      "Percakapan",
      "Pemasaran",
      "Pesanan",
      "Acara",
      "Otomatisasi pesanan",
      "Penjualan",
      "Layanan Pelanggan",
      "Kebijakan & Ketentuan",
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }

    for (const untranslatedLabel of [
      "Marketing",
      "Order",
      "Sales",
      "Customer Service",
      "WA Blast",
      "Kirim pesan WhatsApp massal",
      "Ritel & Perdagangan Daring",
      "Kebijakan Retur, Pengembalian Dana & Pengiriman",
      "Bot percakapan berbasis kecerdasan buatan",
      "Pembuat agen kecerdasan buatan tanpa kode",
      "Bot percakapan WhatsApp berbasis kecerdasan buatan",
    ]) {
      expect(screen.queryByText(untranslatedLabel)).not.toBeInTheDocument();
    }
    for (const featureTitle of [
      "AI Chatbot",
      "No-Code AI Builder",
      "WhatsApp Blast",
      "WhatsApp Chatbot",
      "Retail & E-Commerce",
      "Return, Refund & Delivery Policy",
    ]) {
      expect(
        screen.getByRole("link", { name: featureTitle }),
      ).toBeInTheDocument();
    }
    expect(screen.queryByText(/Copyright/)).not.toBeInTheDocument();
    expect(
      screen.getByText(/CekatAI\. Seluruh hak cipta dilindungi\./),
    ).toBeInTheDocument();
  });

  it("uses the shared light footer treatment", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("contentinfo")).toHaveClass("border-t", "bg-white");
    expect(screen.getByRole("img", { name: "Meta" })).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "Cekat.AI" })).toHaveLength(1);
    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "data-layout",
      "link-columns",
    );
  });

  it("keeps the existing homepage tabs unchanged and enlarges secondary-page tabs", () => {
    const { rerender } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("tab", { name: /Indonesia/ })).toHaveClass(
      "min-h-10",
    );

    rerender(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer largeTouchTargets />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("tab", { name: /Indonesia/ })).toHaveClass(
      "min-h-11",
    );
  });

  it("lays out five link groups before the separate office row", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>,
    );
    const links = container.querySelector("[data-footer-links]")!;
    const offices = container.querySelector("[data-footer-offices]")!;
    expect(links).toHaveClass(
      "grid-cols-2",
      "sm:grid-cols-3",
      "xl:grid-cols-5",
    );
    expect(links.querySelectorAll("h3")).toHaveLength(5);
    expect(screen.getByRole("tablist")).toHaveClass("grid-cols-3", "sm:flex");
    expect(
      links.compareDocumentPosition(offices) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("retains every country switch and its original office information", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole("tab", { name: /Indonesia/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    fireEvent.click(screen.getByRole("tab", { name: /Singapore/ }));
    expect(screen.getByRole("tab", { name: /Singapore/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByText(enMessages.footer.singaporeCompanyName),
    ).toBeVisible();
    expect(
      screen.getByText(enMessages.footer.singaporeOfficeAddress),
    ).toBeVisible();
    expect(screen.queryByText("Jakarta Office")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: /Malaysia/ }));
    expect(screen.getByRole("tab", { name: /Malaysia/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByText(enMessages.footer.malaysiaCompanyName),
    ).toBeVisible();
    expect(
      screen.getByText(enMessages.footer.malaysiaOfficeAddress),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("tab", { name: /Indonesia/ }));
    expect(screen.getByText("Jakarta Office")).toBeVisible();
    expect(screen.getByText("Tangerang Office")).toBeVisible();
  });
});
