import { useQuery } from "@tanstack/react-query"
import { listCourses } from "@lib/services/api/courses"
import { TAG_TYPES } from "@lib/constants"
import { AxiosRequestConfig } from "axios"
import { i18n } from "next-i18next"
import { getTranslation } from "@lib/util/get-course-translation"

function useListCourses(query: AxiosRequestConfig = {}, enabled = true) {
  return useQuery(
    [TAG_TYPES.COURSES],
    () => listCourses(query).then((res) => res.data.courseProfilesFound),
    {
      enabled,
      select: (data) => {
        const items = data.map((prod) => ({
          ...prod,
          introduction: getTranslation(prod, "introduction", i18n?.language),
          title: getTranslation(prod, "title", i18n?.language),
        }))
        return items
      },
    }
  )
}

export default useListCourses
