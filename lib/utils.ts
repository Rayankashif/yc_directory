import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: string) {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
// post._createdAt → "2025-07-03T08:30:00Z" (ISO string)

// new Date(...) → JS Date object

// .toLocaleString(...) → "July 3, 2025" ✅ formatted

// “This function accepts any type T, and we’ll return the same type later.”
// You're saying: “I don’t know what the exact type is, but whatever it is, keep it consistent.”
export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

// “Take any response (of any shape), convert it to a plain JSON-safe object, and return it. Make sure the return type matches the input type T.”
