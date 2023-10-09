import { useQuery } from "@tanstack/react-query"
import { getCourse } from "@lib/services/api/courses"
import { TAG_TYPES } from "@lib/constants"
import { AxiosRequestConfig } from "axios"
import { getTranslation } from "@lib/util/get-course-translation"
import { i18n } from "next-i18next"

function useGetCourse(
  courseId: string,
  query: AxiosRequestConfig = {},
  enabled = true
) {
  return useQuery(
    [TAG_TYPES.COURSES, courseId],
    () => getCourse(courseId, query).then((res) => res.data),
    {
      enabled,
      keepPreviousData: true,
      select: (data) => ({
        ...data,
        courseProfileFound: {
          ...data.courseProfileFound,
          introduction: getTranslation(
            data.courseProfileFound,
            "introduction",
            i18n?.language
          ),
          title: getTranslation(
            data.courseProfileFound,
            "title",
            i18n?.language
          ),
          metadescription: getTranslation(
            data.courseProfileFound,
            "metadescription",
            i18n?.language
          ),
        },
      }),
    }
  )
}

export default useGetCourse
