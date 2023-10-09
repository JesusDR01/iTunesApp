import { useQuery } from "@tanstack/react-query"
import { TAG_TYPES } from "@lib/constants"
import { AxiosRequestConfig } from "axios"
import { listParsedPricesProfile } from "@lib/services/api/parsedPrices"

function useListParsedPricesProfiles(
  query: AxiosRequestConfig = {},
  enabled = true
) {
  return useQuery(
    [TAG_TYPES.PARSED_PRICES_PROFILES],
    () => listParsedPricesProfile(query).then((res) => res.data),
    {
      enabled,
    }
  )
}

export default useListParsedPricesProfiles
