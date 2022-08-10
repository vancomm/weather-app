import { Maybe } from "../types";

export default function formatDate(date: Maybe<Date>) {
  if (!date) return "--";
  const today = new Date();
  return date.getDate() === today.getDate()
    ? "Today"
    : date.toLocaleDateString("en-GB", { weekday: "short" });
}
