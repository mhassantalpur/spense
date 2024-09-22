import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// convert amount from db for client side
export function converAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

// create amount to store integer value in db
export function converAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}