import type { Metadata } from "next";
import { Booking } from "@/components/site/Booking";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(site, {
  title: "Book online",
  description: "Choose a treatment, a doctor and a free time, and request your appointment.",
  path: "/book",
});

export default function BookPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-5xl font-semibold">Book online</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">
        Pick a treatment, a doctor and a time that suits you. We confirm by phone or email within working hours.
      </p>
      <div className="mt-10">
        <Booking />
      </div>
    </main>
  );
}
