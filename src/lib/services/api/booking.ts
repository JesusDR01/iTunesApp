import { getRequest, postRequest } from "@lib/util/http"
import { bookingController, courseController } from "./consts"
import { CourseDate, CourseProfile } from "./courses"

export interface BookingData {
  courseTitle: string
  sortedFutureCourseDates: CourseDate[]
  profileFound: CourseProfile
  coursesFound: CourseProfile[]
  extraItemsFound: ExtraItemsFound[]
  validCoupons: ValidCoupon[]
  stripePublicKey: string
}

export interface ExtraItemsFound {
  images: string[]
  applicableCourses: string[]
  _id: string
  name: string
  price: number
  unit: string
  inventory: null
  category: Category
  description: string
}

export enum Category {
  NonTrip = "non-trip",
}

export interface ValidCoupon {
  coupon: string
  discount: number
}

export type BookingQuery = () => Promise<BookingData>
export type BookingResponse = Awaited<ReturnType<BookingQuery>>

export const getBooking = async (
  courseId: string,
  query: Record<string, any>
) =>
  getRequest<BookingResponse>(
    `${bookingController}${courseController}/${courseId}`,
    query
  )

export type createPaymentIntentQuery = () => Promise<{
  clientSecret: string
}>
export type createPaymentIntentResponse = Awaited<
  ReturnType<createPaymentIntentQuery>
>
export interface createPaymentIntentPayload {
  price: number
  applicantInfo: { [key: string]: string }
  courseItem: CourseItem
  extraItems: any[]
  subtotal: string
  discount: string
  discountAmount: string
  total: number
  invoiceNumber: string
  timeCreated: Date
}

export interface CourseItem {
  title: string
  date: string
  preferedDate: string
  price: string
  quantity: string
}

export const postCreatePaymentIntent = async (
  paymentIntentPayload: createPaymentIntentPayload
) =>
  postRequest<createPaymentIntentResponse, createPaymentIntentPayload>(
    `${bookingController}/create-payment-intent`,
    paymentIntentPayload
  )

export interface confirmPaymentIntentPayload {
  paymentSecret: string
}

export const postConfirmPaymentIntent = async (
  paymentIntentPayload: confirmPaymentIntentPayload
) =>
  postRequest<createPaymentIntentResponse, confirmPaymentIntentPayload>(
    `${bookingController}/confirm-payment-intent`,
    paymentIntentPayload
  )
