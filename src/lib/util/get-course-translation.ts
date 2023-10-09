import { ExtraItemsFound } from "@lib/services/api/booking"
import { CourseProfile } from "@lib/services/api/courses"

type CourseTranslationKey = "introduction" | "title" | "metadescription"
type ExtraItemsTranslationKey = "name" | "description" | "unit"

export const getTranslation = <T extends CourseProfile | ExtraItemsFound>(
  course: T,
  key: T extends CourseProfile
    ? CourseTranslationKey
    : ExtraItemsTranslationKey,
  language?: string
): string => {
  const translatedKey = language ? `${key}_${language}` : key
  return (
    (course as unknown as Record<string, string>)[translatedKey] ||
    (course[key as keyof T] as unknown as string) ||
    ""
  )
}
