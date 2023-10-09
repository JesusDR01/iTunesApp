import axios, { AxiosRequestConfig } from "axios"

export type ParsedPriceProfile = {
  [key: string]: {
    price: number
    priceDiscount?: number | undefined
    currency: "CLP" | "USD" | "BRL" | "EUR"
  }
}

export type ParsedPriceDate = {
  [key: string]: {
    price: number
    priceExclusive?: number | undefined
    priceDiscount?: number | undefined
    currency: "CLP" | "USD" | "BRL" | "EUR"
  }
}

export type parsedPricesProfileQuery = () => Promise<ParsedPriceProfile>
export type parsedPricesProfileResponse = Awaited<
  ReturnType<parsedPricesProfileQuery>
>

export type parsedPricesDateQuery = () => Promise<ParsedPriceDate>
export type parsedPricesDateResponse = Awaited<
  ReturnType<parsedPricesDateQuery>
>

export const listParsedPricesProfile = async (query: AxiosRequestConfig) =>
  axios.get<parsedPricesProfileResponse>("/api/getParsedPricesProfiles", query)

// getRequest<parsedPricesResponse>(`${courseController}`, query)

export const listParsedPricesDate = async (
  courseLink: string,
  query: AxiosRequestConfig
) =>
  axios.get<parsedPricesDateResponse>(
    `/api/getParsedPricesDates${courseLink}`,
    query
  )
