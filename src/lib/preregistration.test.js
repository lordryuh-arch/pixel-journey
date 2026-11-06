import { expect, test } from "bun:test";
import { PRE_REGISTRATION_OPENS_AT, isPreRegistrationOpen, registrationCountdown } from "./preregistration.ts";

test("opens November 7 2026 at 17h Brasília", () => {
  expect(PRE_REGISTRATION_OPENS_AT.toISOString()).toBe("2026-11-07T20:00:00.000Z");
});
test("stays closed until the opening instant then opens", () => {
  expect(isPreRegistrationOpen(Date.parse("2026-11-07T19:59:59.999Z"))).toBe(false);
  expect(isPreRegistrationOpen(Date.parse("2026-11-07T20:00:00.000Z"))).toBe(true);
});
test("countdown reaches zero at opening and never goes negative", () => {
  expect(registrationCountdown(Date.parse("2026-11-06T23:00:00Z"))).toEqual({ hours: 21, minutes: 0, seconds: 0 });
  expect(registrationCountdown(Date.parse("2026-11-07T20:00:01Z"))).toEqual({ hours: 0, minutes: 0, seconds: 0 });
});