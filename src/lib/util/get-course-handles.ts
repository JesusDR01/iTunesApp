import { TAG_TYPES } from "@lib/constants"
import { CourseProfile, listCourses } from "@lib/services/api/courses"
import { QueryClient } from "@tanstack/react-query"

export const getPodscastsHandles = async (): Promise<string[]> => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery([TAG_TYPES.PODCASTS], () =>
    listCourses({}).then((res) => res.data.courseProfilesFound)
  )

  const courseProfilesFound = queryClient.getQueryData<CourseProfile[]>([
    TAG_TYPES.COURSES,
  ])

  const handles: string[] = []

  if (courseProfilesFound) {
    for (const course of courseProfilesFound) {
      if (course.title) {
        handles.push(course.courseLink)
      }
    }
  }
  return handles
}
