import { describe, expect, test } from "vitest";
import { addDays, bookableDays, doctors, freeSlots, services, weekday } from "@/lib/schedule";

describe("dates", () => {
  test("weekday works from ISO dates without timezone drift", () => {
    expect(weekday("2026-10-12")).toBe(1);
    expect(weekday("2026-10-18")).toBe(0);
  });

  test("addDays crosses month ends", () => {
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
  });

  test("bookableDays skips Sundays and starts tomorrow", () => {
    const days = bookableDays("2026-10-12", 7);
    expect(days[0]).toBe("2026-10-13");
    expect(days).toHaveLength(7);
    expect(days.some((d) => weekday(d) === 0)).toBe(false);
  });
});

describe("freeSlots", () => {
  const cole = doctors.find((d) => d.id === "cole")!;
  const checkup = services.find((s) => s.id === "checkup")!;

  test("returns nothing on days the doctor does not work", () => {
    expect(freeSlots(cole, checkup, "2026-10-17")).toEqual([]);
  });

  test("slots fall inside working hours and leave room for the visit", () => {
    const slots = freeSlots(cole, checkup, "2026-10-13");
    expect(slots.length).toBeGreaterThan(0);
    for (const s of slots) {
      expect(s >= "09:00").toBe(true);
      expect(s <= "16:15").toBe(true);
    }
  });

  test("is deterministic, so the same day always shows the same slots", () => {
    expect(freeSlots(cole, checkup, "2026-10-14")).toEqual(freeSlots(cole, checkup, "2026-10-14"));
  });

  test("some slots are already taken", () => {
    const slots = freeSlots(cole, checkup, "2026-10-13");
    const all = (17 - 9) * 2 - 1;
    expect(slots.length).toBeLessThan(all);
  });
});
