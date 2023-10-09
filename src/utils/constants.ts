export const ITUNES_BASE = 'https://itunes.apple.com'; 
export const ALL_PODCASTS_URL = `${ITUNES_BASE}/us/rss/toppodcasts/limit=100/genre=1310/json`;
export const GET_EPISODES_URL = (podcastId: string) => `${ITUNES_BASE}/lookup?id=${podcastId}&country=US&media=podcast&entity=podcastEpisode`