import Link from "next/link";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-fg no-underline">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-surface">
            <span className="h-4 w-4 rounded-full border-[3px] border-accent" />
          </span>
          <span className="font-display text-xl font-semibold">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[0.95rem] font-semibold text-fg no-underline hover:text-accent">
              {item.label}
            </Link>
          ))}
          <Link href="/book" className="btn-pill">
            Book online
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/book" className="btn-pill px-4 py-2 text-sm">
            Book
          </Link>
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-full border border-fg/30 px-3 py-2 text-sm font-semibold">Menu</summary>
            <nav aria-label="Mobile" className="absolute right-0 mt-2 grid w-60 gap-1 rounded-2xl border border-border bg-[var(--card)] p-2 shadow-xl">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-fg no-underline hover:bg-surface">
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
