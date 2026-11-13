import { expect, test } from "bun:test";
import {
  GAME_OPENS_AT,
  PRE_REGISTRATION_OPENS_AT,
  gameCountdown,
  isGameOpen,
  isPreRegistrationOpen,
  registrationCountdown,
} from "./preregistration.ts";

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

test("game opens November 14 2026 at 22h Brasília", () => {
  expect(GAME_OPENS_AT.toISOString()).toBe("2026-11-15T01:00:00.000Z");
});
test("game stays closed until the opening instant then opens", () => {
  expect(isGameOpen(Date.parse("2026-11-15T00:59:59.999Z"))).toBe(false);
  expect(isGameOpen(Date.parse("2026-11-15T01:00:00.000Z"))).toBe(true);
});
test("game countdown rolls days into hours and stops at zero", () => {
  expect(gameCountdown(Date.parse("2026-11-13T13:00:00Z"))).toEqual({ days: 1, hours: 12, minutes: 0, seconds: 0 });
  expect(gameCountdown(Date.parse("2026-11-14T01:00:00Z"))).toEqual({ days: 1, hours: 0, minutes: 0, seconds: 0 });
  expect(gameCountdown(Date.parse("2026-11-15T01:00:01Z"))).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
});