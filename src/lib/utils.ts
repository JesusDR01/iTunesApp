import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

export const formatPrice = (num?: number) => {
  if (!num) return ""
  if (num >= 10000 && num < 1000000) {
    return Math.floor(num / 1000) * 1000
  } else if (num >= 1000000) {
    return Math.floor(num / 10000) * 10000
  }
  return num.toFixed()
}
