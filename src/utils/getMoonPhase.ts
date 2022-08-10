/**
 * Description:
 *  Get moon phase by Date, written in TypeScript.
 *  Accurate from year 1900 to 2199 inclusive.
 *
 * Source:
 *  https://gist.github.com/datatypevoid/f4dd1f6439feaa588bb2aaf4f8f4361f?permalink_comment_id=4209872#gistcomment-4209872
 *
 * Authors:
 *  https://gist.github.com/datatypevoid
 *  https://gist.github.com/EricHech
 */

export const MOON_ICONS = [
  "🌑",
  "🌒",
  "🌓",
  "🌔",
  "🌕",
  "🌖",
  "🌗",
  "🌘",
] as const;

export const MOON_PHASE_NAMES = [
  "New",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
] as const;

/**
 * Reference: http://individual.utoronto.ca/kalendis/lunar/#FALC - Also known as a synodic month.
 * An average synodic month takes 29 days, 12 hours, 44 minutes, 3 seconds.
 */
export const LUNAR_CYCLE = 29.5305882; // 29.53058770576

export const DAYS_PER_YEAR = 365.25;

export const DAYS_PER_MONTH = 30.6;

/** The number of days between `0 AD` and the new moon on `1900-01-01`. */
export const NEW_MOON_REFERENCE = 694039.09;

// Ported from `http://www.voidware.com/moon_phase.htm`.
export default function getMoonPhase(date: Date = new Date()) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  if (month < 3) {
    year -= 1;
    month += 12;
  }

  month += 1;

  const daysSinceZeroAd = DAYS_PER_YEAR * year + DAYS_PER_MONTH * month + day;
  const daysSinceNewMoonReference = daysSinceZeroAd - NEW_MOON_REFERENCE;

  const numberOfCyclesSinceReference = daysSinceNewMoonReference / LUNAR_CYCLE;

  const percentageOfCycleComplete =
    numberOfCyclesSinceReference - Math.trunc(numberOfCyclesSinceReference);

  // Scale fraction from 0 to 8
  let phase = Math.round(percentageOfCycleComplete * 8);
  if (phase >= 8) phase = 0; // `0` and `8` are the same so turn `8` into `0`.

  // Scale fraction from 0 to `LUNAR_CYCLE`
  const lunarDay = Math.round(percentageOfCycleComplete * LUNAR_CYCLE);

  if (!MOON_PHASE_NAMES[phase]) throw new Error(`Invalid moon phase: ${phase}`);

  return { lunarDay, name: MOON_PHASE_NAMES[phase], icon: MOON_ICONS[phase] };
}
