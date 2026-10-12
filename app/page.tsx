import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos, promises, reviews } from "@/content/clinic";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { doctors, services } from "@/lib/schedule";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = buildMetadata(site, { path: "/" });

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const initials = (name: string) => name.replace("Dr ", "").split(" ").map((p) => p[0]).join("");

export default function HomePage() {
  return (
    <main id="main">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-14">
        <div className="grid content-start gap-7">
          <h1 className="font-display text-5xl font-semibold leading-[1.08] sm:text-6xl">
            Gentle dentistry for the whole family.
          </h1>
          <p className="max-w-lg text-lg text-muted">
            Check-ups, hygiene, fillings, implants and aligners in one calm clinic on Linden Avenue. Book online in
            under a minute and see the price before you come in.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book" className="btn-pill">
              Book an appointment
            </Link>
            <Link href="/#treatments" className="btn-pill-ghost">
              See prices
            </Link>
          </div>
          <p className="text-sm text-muted">
            Open six days a week. New patients welcome, children from age 2.
          </p>
        </div>
        <div className="relative">
          <Image
            src={unsplash(photos.office, 1200)}
            alt="Bright, modern treatment room with a dental chair"
            width={1200}
            height={1400}
            sizes="(min-width: 768px) 480px, 100vw"
            loading="eager"
            fetchPriority="high"
            className="arch aspect-[6/7] h-auto w-full bg-surface object-cover"
          />
          <div className="card absolute -bottom-6 left-4 max-w-[15rem] p-4 shadow-lg sm:-left-8">
            <p className="text-sm text-muted">Next free check-up</p>
            <p className="font-display text-xl font-semibold">Tomorrow, 10:30</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {promises.map((p) => (
            <li key={p.title} className="rounded-3xl bg-surface p-6">
              <h2 className="font-display text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="treatments" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <div className="grid content-start gap-4">
            <h2 className="font-display text-4xl font-semibold">Treatments and prices</h2>
            <p className="text-muted">
              Prices include the consultation and any X-rays needed for that visit. Payment plans are available for
              treatment over $500.
            </p>
            <Image
              src={unsplash(photos.chair, 900)}
              alt="Dental chair and equipment in a clean treatment room"
              width={900}
              height={600}
              sizes="(min-width: 768px) 360px, 100vw"
              className="mt-2 aspect-[3/2] h-auto w-full rounded-3xl bg-surface object-cover"
            />
          </div>
          <div className="card overflow-hidden">
            <table className="w-full text-left">
              <caption className="sr-only">Treatments, duration and price</caption>
              <thead className="bg-surface text-sm">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Treatment</th>
                  <th scope="col" className="hidden px-5 py-3 font-bold sm:table-cell">Time</th>
                  <th scope="col" className="px-5 py-3 text-right font-bold">Price</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-t border-border">
                    <th scope="row" className="px-5 py-4 font-normal">
                      <span className="block font-semibold">{s.name}</span>
                      <span className="text-sm text-muted">{s.note}</span>
                    </th>
                    <td className="hidden whitespace-nowrap px-5 py-4 text-muted sm:table-cell">{s.minutes} min</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-semibold">{s.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="doctors" className="scroll-mt-24 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-4xl font-semibold">Doctors</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d) => (
              <li key={d.id} className="card grid content-start gap-4 p-6">
                <span aria-hidden="true" className="arch grid h-24 w-20 place-items-center bg-accent font-display text-2xl text-white">
                  {initials(d.name)}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{d.name}</h3>
                  <p className="text-muted">{d.focus}</p>
                </div>
                <p className="text-sm">
                  {d.days.map((n) => DAY[n]).join(", ")}
                  <br />
                  <span className="text-muted">
                    {d.start}:00 to {d.end}:00
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <Image
          src={unsplash(photos.smile, 1000)}
          alt="Woman with long dark hair smiling"
          width={1000}
          height={1100}
          sizes="(min-width: 768px) 460px, 100vw"
          className="arch aspect-[10/11] h-auto w-full bg-surface object-cover"
        />
        <div className="grid gap-8">
          <h2 className="font-display text-4xl font-semibold">What patients tell us</h2>
          {reviews.map((r) => (
            <figure key={r.name} className="grid gap-3">
              <blockquote className="font-display text-2xl leading-snug">“{r.text}”</blockquote>
              <figcaption className="text-muted">{r.name}</figcaption>
            </figure>
          ))}
          <Link href="/book" className="btn-pill justify-self-start">
            Book your visit
          </Link>
        </div>
      </section>
    </main>
  );
}
