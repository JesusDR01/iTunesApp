export const removeWidthLimit = (img: string) => {
  if (img.includes("&")) {
    return img.split("&")[0]
  }
  return img
}
