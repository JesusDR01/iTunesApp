import { BASE_LD, IMAGE_BUCKET_ENDPOINT } from "@lib/constants"
import { CourseDate } from "@lib/services/api/courses"
import { i18n, useTranslation } from "next-i18next"
import { useMemo } from "react"

export const useLD = ({
  description,
  courseDates,
  courseImage,
  courseTitle,
  handle,
}: {
  description?: string
  courseDates?: CourseDate[]
  courseImage?: string
  courseTitle?: string
  handle: string
}) => {
  const { t } = useTranslation(["pages", "common"])

  const LD_JSON = useMemo(() => {
    const BASE_LD_OBJ = BASE_LD({
      description,
      t,
    })
    return courseDates?.map((courseDate) => {
      const startDate = new Date(courseDate.date)
      const endDate = startDate.setDate(
        startDate.getDate() + (courseDate?.duration || 0) - 1
      )

      return {
        ...BASE_LD_OBJ,

        name: courseTitle,
        image: `${IMAGE_BUCKET_ENDPOINT}/${courseImage}`,
        startDate: new Intl.DateTimeFormat("sv-SE").format(
          new Date(courseDate.date)
        ),
        endDate: new Intl.DateTimeFormat("sv-SE").format(new Date(endDate)),

        offers: BASE_LD_OBJ.offers.map((offer) => ({
          ...offer,
          availability:
            courseDate.available > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/SoldOut",
          url: `https://vientosurchile.com/${i18n?.language}/courses/${handle}#course-dates`,
        })),
      }
    })
  }, [BASE_LD])

  return LD_JSON
}
