import { useQuery } from "@tanstack/react-query"
import { TAG_TYPES } from "@lib/constants"
import { AxiosRequestConfig } from "axios"
import { getBooking } from "@lib/services/api/booking"
import { getTranslation } from "@lib/util/get-course-translation"
import { i18n } from "next-i18next"

function useGetBooking(
  courseId: string,
  query: AxiosRequestConfig = {},
  enabled = true
) {
  return useQuery(
    [TAG_TYPES.BOOKING, courseId],
    () => getBooking(courseId, query).then((res) => res.data),
    {
      enabled,
      keepPreviousData: true,
      select: (data) => ({
        ...data,
        coursesFound: data.coursesFound.map((course) => ({
          ...course,
          title: getTranslation(course, "title", i18n?.language),
        })),
        profileFound: {
          ...data.profileFound,
          introduction: getTranslation(
            data.profileFound,
            "introduction",
            i18n?.language
          ),
          title: getTranslation(data.profileFound, "title", i18n?.language),
        },
        extraItemsFound: data.extraItemsFound.map((item) => ({
          ...item,
          name: getTranslation(item, "name", i18n?.language),
          description: getTranslation(item, "description", i18n?.language),
          unit: getTranslation(item, "unit", i18n?.language),
        })),
      }),
    }
  )
}

export default useGetBooking
