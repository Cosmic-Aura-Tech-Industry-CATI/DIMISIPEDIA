import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates current age dynamically from an ISO birth date string ("YYYY-MM-DD").
 * As calendar time progresses, the age automatically stays accurate.
 */
export function calculateAge(birthDate: string, targetDate: Date = new Date()): number {
  const [y, m, d] = birthDate.split("-").map(Number);
  const birth = new Date(y, m - 1, d);
  let age = targetDate.getFullYear() - birth.getFullYear();
  const monthDiff = targetDate.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && targetDate.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

/** Formats an ISO birth date into a readable string like "6 May 2004". */
export function formatBirthDate(birthDate: string): string {
  const [y, m, d] = birthDate.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

/** Formats a full "Born" fact value with dynamic age and optional location. */
export function formatBornFact(birthDate: string, location?: string): string {
  const formattedDate = formatBirthDate(birthDate);
  const age = calculateAge(birthDate);
  const ageStr = `(age ${age})`;
  return location ? `${formattedDate} ${ageStr}, ${location}` : `${formattedDate} ${ageStr}`;
}
