import isDev from "./isDev";

export default function log(...message: any[]) {
  if (!isDev()) return;
  console.log(...message);
}
