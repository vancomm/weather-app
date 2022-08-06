export default function round(num: number, places: number) {
  return +(Math.round(+(num + "e+" + places)) + "e-" + places);
}
