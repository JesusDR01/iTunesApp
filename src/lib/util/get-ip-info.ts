import { NextApiRequest } from "next"

const currencyMap = {
  cl: "CLP",
  us: "USD",
  ca: "USD",
  br: "BRL",
} as const

export const getIpInfo = async (
  ipAddress?: string
): Promise<
  | {
      currency: "CLP" | "USD" | "BRL" | "EUR"
      priceMultiplier: number
    }
  | undefined
> => {
  if (!ipAddress) {
    return
  }
  const country = (
    (await (await fetch(`https://api.country.is/${ipAddress}`)).json()) as {
      country: string
    }
  )?.country?.toLowerCase()
  console.log(
    country,
    "country",
    currencyMap[country as keyof typeof currencyMap]
  )

  if (country in currencyMap) {
    const baseUrl = `https://rates.vientosurchile.com/EUR/${
      currencyMap[country as keyof typeof currencyMap]
    }`
    const priceMultiplier = (
      (await (await fetch(baseUrl)).json()) as { rate: number }
    )?.rate

    const currency: (typeof currencyMap)[keyof typeof currencyMap] | "EUR" =
      currencyMap[country as keyof typeof currencyMap]
    console.log(currency, priceMultiplier)
    return {
      currency,
      priceMultiplier,
    }
  }
}

export const getIp = (req: NextApiRequest) => {
  const forwarded = req.headers["x-forwarded-for"]

  const ip =
    typeof forwarded === "string"
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress

  if (ip === "::1") {
    const BR = "104.112.112.0"
    const CA = "100.42.240.1"
    const CL = "128.201.227.255"
    const US = "139.28.219.134"
    return US
  }
  return ip
}
