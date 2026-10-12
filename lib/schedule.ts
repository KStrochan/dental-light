export type Service = { id: string; name: string; minutes: number; price: string; note: string };
export type Doctor = { id: string; name: string; focus: string; days: number[]; start: number; end: number };

export const services: Service[] = [
  { id: "checkup", name: "Check-up and clean", minutes: 45, price: "$120", note: "Exam, X-rays if due, scale and polish" },
  { id: "hygiene", name: "Hygienist visit", minutes: 30, price: "$95", note: "Deep clean and gum check" },
  { id: "filling", name: "Filling", minutes: 45, price: "from $160", note: "Tooth-coloured composite" },
  { id: "whitening", name: "Whitening", minutes: 60, price: "$390", note: "In-chair session plus home trays" },
  { id: "implant", name: "Implant consultation", minutes: 30, price: "Free", note: "3D scan and a written plan" },
  { id: "ortho", name: "Orthodontic consultation", minutes: 30, price: "$60", note: "Clear aligners or braces" },
  { id: "kids", name: "Children's check-up", minutes: 30, price: "$70", note: "Under 14, with a parent" },
];

/** Weekdays use 0 for Sunday. Hours are whole hours, end is when the last visit must finish. */
export const doctors: Doctor[] = [
  { id: "cole", name: "Dr Hannah Cole", focus: "General and family dentistry", days: [1, 2, 3, 4, 5], start: 9, end: 17 },
  { id: "ortiz", name: "Dr Samuel Ortiz", focus: "Implants and crowns", days: [2, 4, 6], start: 10, end: 18 },
  { id: "morgan", name: "Dr Leah Morgan", focus: "Orthodontics", days: [1, 3, 5], start: 8, end: 14 },
  { id: "petrak", name: "Dr Ivo Petrak", focus: "Children's dentistry", days: [1, 2, 3, 4], start: 12, end: 19 },
];

export function weekday(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!)).getUTCDay();
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d! + days)).toISOString().slice(0, 10);
}

/** The next `count` days the clinic is open (it closes on Sundays), starting tomorrow. */
export function bookableDays(today: string, count: number): string[] {
  const days: string[] = [];
  for (let offset = 1; days.length < count; offset++) {
    const day = addDays(today, offset);
    if (weekday(day) !== 0) days.push(day);
  }
  return days;
}

/** Small stable hash so the demo diary looks busy in the same way on every visit. */
function taken(key: string): boolean {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return (h >>> 0) % 100 < 38;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function freeSlots(doctor: Doctor, service: Service, date: string): string[] {
  if (!doctor.days.includes(weekday(date))) return [];
  const slots: string[] = [];
  for (let minutes = doctor.start * 60; minutes + service.minutes <= doctor.end * 60; minutes += 30) {
    const time = `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
    if (!taken(`${doctor.id}|${date}|${time}`)) slots.push(time);
  }
  return slots;
}

export function formatDay(iso: string): { weekday: string; day: string; month: string; long: string } {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y!, m! - 1, d!));
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...o, timeZone: "UTC" }).format(date);
  return { weekday: f({ weekday: "short" }), day: f({ day: "numeric" }), month: f({ month: "short" }), long: f({ weekday: "long", month: "long", day: "numeric" }) };
}
