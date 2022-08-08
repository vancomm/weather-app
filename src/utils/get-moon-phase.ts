import { Moon } from "lunarphase-js";

export default function getMoonPhase() {
  return Moon.lunarPhase() as MoonPhase;
}
