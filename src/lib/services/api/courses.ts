import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@lib/util/http"
import { courseController } from "./consts"
import { AxiosRequestConfig } from "axios"
import { Podcasts } from "@modules/podcasts/domain/Podcast"


export type PodcastsQuery = () => Promise<Podcasts>
export type CoursesResponse = Awaited<ReturnType<PodcastsQuery>>

export type CourseDate = {
  _id: string
  title: string
  category: string
  date: string
  introduction: string
  duration?: number
  location: string
  instructor: string
  vessel: string
  capacity: number
  available: number
  pricePerson: number
  priceDiscount?: number
  discount?: number
  priceExclusive: number
  comment: string
}

export type Course = {
  courses: CourseDate[]
  courseLink: string
  uniqueMonthsYears: string[]
  courseProfileFound: CourseProfile
  files: File[]
}

export type courseQuery = () => Promise<Course>
export type CourseResponse = Awaited<ReturnType<courseQuery>>

export const createCourse = async (course: any) =>
  postRequest(`${courseController}`, course)

export const getCourse = async (courseId: string, query: Record<string, any>) =>
  getRequest<CourseResponse>(`${courseController}/${courseId}`, query)

export const listCourses = async (query: AxiosRequestConfig) =>
  getRequest<CoursesResponse>(`${courseController}`, query)

export const updateCourse = async (
  courseId: string,
  user: Record<string, any>
) => putRequest(`${courseController}/${courseId}`, user)

export const deleteCourse = async (courseId: string) =>
  deleteRequest(`${courseController}/${courseId}`)
