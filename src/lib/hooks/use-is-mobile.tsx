import { useEffect, useState } from "react"
import useCurrentWidth from "./use-current-width"

export const useIsMobile = () => {
  const width = useCurrentWidth()
  const [isMobile, setIsMobile] = useState(width <= 768)
  useEffect(() => {
    setIsMobile(width <= 768)
  }, [width])

  return isMobile
}
