import { I18n } from "next-i18next"

export const getDateTranslation = (
  date: Date | string,
  i18n: I18n,
  options?: Intl.DateTimeFormatOptions
) => {
  const dateParsed = new Date(date)

  const defaultOptions =
    options ||
    ({
      weekday: "short",
      month: "short", // Use "short" instead of "long" for abbreviated month name
      day: "numeric",
      year: "numeric",
    } as const)

  if (i18n.language === "es") {
    return dateParsed.toLocaleDateString("es-ES", defaultOptions)
  }
  if (i18n.language === "br") {
    return dateParsed.toLocaleDateString("pt-BR", defaultOptions)
  }
  return dateParsed.toDateString()
}
