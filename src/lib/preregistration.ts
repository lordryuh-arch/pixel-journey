export const PRE_REGISTRATION_OPENS_AT = new Date("2026-11-07T17:00:00-03:00");

export function isPreRegistrationOpen(now: number) {
  return now >= PRE_REGISTRATION_OPENS_AT.getTime();
}

export function registrationCountdown(now: number) {
  const seconds = Math.max(0, Math.ceil((PRE_REGISTRATION_OPENS_AT.getTime() - now) / 1000));
  return { hours: Math.floor(seconds / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60 };
}