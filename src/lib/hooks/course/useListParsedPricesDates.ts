import { useQuery } from "@tanstack/react-query"
import { TAG_TYPES } from "@lib/constants"
import { AxiosRequestConfig } from "axios"
import { listParsedPricesDate } from "@lib/services/api/parsedPrices"

function useListParsedPricesDates(
  courseId: string,
  query: AxiosRequestConfig = {},
  enabled = true
) {
  return useQuery(
    [`${TAG_TYPES.PARSED_PRICES_PROFILES}${courseId}`],
    () => listParsedPricesDate(courseId, query).then((res) => res.data),
    {
      enabled,
    }
  )
}

export default useListParsedPricesDates
