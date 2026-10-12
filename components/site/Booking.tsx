"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { submitLead } from "@/app/actions";
import { LeadForm } from "@/components/LeadForm";
import { bookableDays, doctors, formatDay, freeSlots, services, type Doctor } from "@/lib/schedule";

const noop = () => () => {};
const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

function StepTitle({ n, children }: { n: number; children: string }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-2xl font-semibold">
      <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-accent text-base text-white">
        {n}
      </span>
      {children}
    </h2>
  );
}

export function Booking() {
  // "Today" only exists in the browser; the server renders the form without dates.
  const today = useSyncExternalStore(noop, todayIso, () => null);
  const [serviceId, setServiceId] = useState(services[0]!.id);
  const [doctorId, setDoctorId] = useState<string>("any");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const service = services.find((s) => s.id === serviceId)!;
  const days = useMemo(() => (today ? bookableDays(today, 12) : []), [today]);
  const activeDate = date ?? days[0] ?? null;
  const candidates: Doctor[] = doctorId === "any" ? doctors : doctors.filter((d) => d.id === doctorId);

  const slots = useMemo(() => {
    if (!activeDate) return [];
    const byTime = new Map<string, Doctor>();
    for (const doc of candidates) for (const t of freeSlots(doc, service, activeDate)) if (!byTime.has(t)) byTime.set(t, doc);
    return [...byTime.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [activeDate, candidates, service]);

  const chosen = slots.find(([t]) => t === time);
  const summary =
    chosen && activeDate
      ? `Booking request: ${service.name} with ${chosen[1].name} on ${formatDay(activeDate).long} at ${chosen[0]}.`
      : undefined;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="grid content-start gap-10">
        <section className="grid gap-4">
          <StepTitle n={1}>Treatment</StepTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <label key={s.id} className="card flex cursor-pointer items-start justify-between gap-3 border-2 border-transparent p-4 has-[:checked]:border-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2">
                <input type="radio" name="service" value={s.id} checked={serviceId === s.id} onChange={() => { setServiceId(s.id); setTime(null); }} className="sr-only" />
                <span>
                  <span className="block font-semibold">{s.name}</span>
                  <span className="text-sm text-muted">{s.minutes} min</span>
                </span>
                <span className="whitespace-nowrap font-semibold">{s.price}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <StepTitle n={2}>Doctor</StepTitle>
          <div className="flex flex-wrap gap-2">
            {[{ id: "any", name: "Any doctor" }, ...doctors].map((d) => (
              <label key={d.id} className="cursor-pointer rounded-full border border-border bg-[var(--card)] px-4 py-2 text-sm font-semibold has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-2">
                <input type="radio" name="doctor" value={d.id} checked={doctorId === d.id} onChange={() => { setDoctorId(d.id); setTime(null); }} className="sr-only" />
                {d.name}
              </label>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <StepTitle n={3}>Day and time</StepTitle>
          {!today ? (
            <p className="text-muted">Loading the diary…</p>
          ) : (
            <>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2" role="radiogroup" aria-label="Day">
                {days.map((d) => {
                  const f = formatDay(d);
                  const selected = d === activeDate;
                  return (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={f.long}
                      onClick={() => { setDate(d); setTime(null); }}
                      className={`grid min-w-16 shrink-0 justify-items-center rounded-2xl px-3 py-3 ${selected ? "bg-accent text-white" : "bg-[var(--card)]"}`}
                    >
                      <span className="text-xs">{f.weekday}</span>
                      <span className="font-display text-2xl font-semibold">{f.day}</span>
                      <span className="text-xs">{f.month}</span>
                    </button>
                  );
                })}
              </div>
              {slots.length === 0 ? (
                <p className="rounded-2xl bg-surface p-4 text-muted">
                  No free times that day. Try another day or choose any doctor.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Time">
                  {slots.map(([t, doc]) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={time === t}
                      onClick={() => setTime(t)}
                      title={doc.name}
                      className={`rounded-full px-4 py-2 font-semibold tabular-nums ${time === t ? "bg-accent text-white" : "bg-[var(--card)] hover:bg-surface"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card grid gap-5 p-6">
          <StepTitle n={4}>Your details</StepTitle>
          <div className="rounded-2xl bg-surface p-4 text-sm" aria-live="polite">
            {summary ?? "Choose a day and time and it will appear here."}
          </div>
          <LeadForm key={summary ?? "empty"} action={submitLead} defaultMessage={summary} submitLabel="Request this appointment" />
          <p className="text-xs text-muted">Demo diary. Reception confirms every request by phone or email.</p>
        </div>
      </aside>
    </div>
  );
}
