export const PRE_REGISTRATION_OPENS_AT = new Date("2026-11-07T17:00:00-03:00");

/** The game itself opens November 14, 2026 at 10:00 PM Brasília time. */
export const GAME_OPENS_AT = new Date("2026-11-14T22:00:00-03:00");

export function isPreRegistrationOpen(now: number) {
  return now >= PRE_REGISTRATION_OPENS_AT.getTime();
}

export function isGameOpen(now: number) {
  return now >= GAME_OPENS_AT.getTime();
}

export function registrationCountdown(now: number) {
  const seconds = Math.max(0, Math.ceil((PRE_REGISTRATION_OPENS_AT.getTime() - now) / 1000));
  return { hours: Math.floor(seconds / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60 };
}

export function gameCountdown(now: number) {
  const seconds = Math.max(0, Math.ceil((GAME_OPENS_AT.getTime() - now) / 1000));
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}