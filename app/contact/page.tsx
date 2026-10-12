import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { submitLead } from "@/app/actions";
import { LeadForm } from "@/components/LeadForm";
import { photos } from "@/content/clinic";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = buildMetadata(site, {
  title: "Visit us",
  description: "Address, opening hours and how to reach Dental Light.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-2">
      <div className="grid content-start gap-6">
        <h1 className="font-display text-5xl font-semibold">Visit us</h1>
        <dl className="card grid gap-4 p-6">
          <div>
            <dt className="text-sm text-muted">Address</dt>
            <dd className="font-semibold">{site.contact.address}</dd>
            <dd className="text-sm text-muted">Free parking behind the building, step-free entrance.</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Opening hours</dt>
            <dd>{site.contact.hours}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Phone</dt>
            <dd>
              <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="font-display text-2xl font-semibold">
                {site.contact.phone}
              </a>
            </dd>
          </div>
        </dl>
        <Image
          src={unsplash(photos.patient, 1000)}
          alt="Dentist in a blue cap examining a patient's teeth"
          width={1000}
          height={667}
          sizes="(min-width: 768px) 460px, 100vw"
          className="aspect-[3/2] h-auto w-full rounded-3xl bg-surface object-cover"
        />
      </div>
      <div className="card grid content-start gap-5 p-6 sm:p-8">
        <h2 className="font-display text-3xl font-semibold">Ask us anything</h2>
        <p className="text-muted">
          Questions about treatment, prices or insurance. To book a time, use{" "}
          <Link href="/book">online booking</Link>.
        </p>
        <LeadForm action={submitLead} />
      </div>
    </main>
  );
}
