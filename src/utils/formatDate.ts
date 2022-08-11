import { Maybe } from "../types";

export default function formatDate(date: Maybe<Date>) {
  if (!date) return "--";
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  switch (date.getDate()) {
    case today.getDate():
      return "Today";
    case tomorrow.getDate():
      return "Tomorrow";
    default:
      return date.toLocaleDateString("en-GB", { weekday: "short" });
  }
}
