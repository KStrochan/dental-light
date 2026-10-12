import Link from "next/link";
import { PhotoCredits } from "@/components/PhotoCredits";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-10 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="grid content-start gap-3">
          <p className="font-display text-2xl font-semibold">{site.name}</p>
          <p className="text-sm text-muted">{site.description}</p>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <p className="font-bold">Opening hours</p>
          <p className="text-muted">{site.contact.hours}</p>
          <p className="font-bold">Address</p>
          <p className="text-muted">{site.contact.address}</p>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <p className="font-bold">Appointments</p>
          <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="text-lg font-semibold">
            {site.contact.phone}
          </a>
          <Link href="/book">Book online</Link>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 py-5 text-xs text-muted sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Demo project by{" "}
            <a href="https://github.com/KStrochan">Konstantyn Strochan</a>; the clinic, doctors and reviews are fictional.
          </p>
          <PhotoCredits credits={site.photoCredits} />
        </div>
      </div>
    </footer>
  );
}
