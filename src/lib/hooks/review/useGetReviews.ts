import { useQuery } from "@tanstack/react-query"
import { TAG_TYPES } from "@lib/constants"
import { AxiosRequestConfig } from "axios"
import { getReviews } from "@lib/services/api/reviews"
function useGetReviews(query: AxiosRequestConfig = {}, enabled = true) {
  return useQuery(
    [TAG_TYPES.REVIEWS],
    () => getReviews(query).then((res) => res.data),
    {
      enabled,
      keepPreviousData: true,
    }
  )
}

export default useGetReviews
