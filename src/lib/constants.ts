export const IS_BROWSER = typeof window !== "undefined"

// In RTK Query we can find tagTypes in createAPI function.
// In order to have a single place to check the tagTypes we will use this object

export const TAG_TYPES = {
  PODCASTS: "podcasts",
  EPISODES: "episodes",
}
