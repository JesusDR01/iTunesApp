import { getRequest } from "@lib/util/http"
export type Review = {
  author_name: string
  author_url: string
  language: string
  original_language: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
  translated: boolean
}
export const getReviews = async (query: Record<string, any>) =>
  getRequest<Review[]>(`/reviews`, query)