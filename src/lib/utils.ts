import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractIdFromUrl(url: string): string {
  const urlObject = new URL(url);
  const path = urlObject.pathname;
  const id = path.split('/').pop();

  if (!id) {
    throw new Error(`Invalid id: ${id}`)
  }

  return id;
}

export function trimDecimalPlaces(str: string) {
  const num = parseFloat(str);
  if (isNaN(num)) {
    throw new Error(`Invalid input: ${str}`);
  }
  return num.toFixed(0);
}
