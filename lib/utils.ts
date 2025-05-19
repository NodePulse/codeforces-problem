import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function format(str: string) {
  let last = str[str.length - 1];
  last = last.toUpperCase();
  return str.substring(0, str.length - 1) + " - " + last;
}
