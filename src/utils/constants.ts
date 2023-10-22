export const ITUNES_BASE = 'https://itunes.apple.com';

export const ALL_PODCASTS_URL = `${ITUNES_BASE}/us/rss/toppodcasts/limit=100/genre=1310/json`;

// We tried to implement infinite scroll using lookup api but it seems is only available through amp-api.music.apple.com ... Paid api (developer program)
const MAX_LIMIT = 200;

export const GET_EPISODES_URL = ({
	podcastId,
}: {
	podcastId: string;
}) =>
	`${ITUNES_BASE}/lookup?id=${podcastId}&country=US&media=podcast&entity=podcastEpisode&limit=${MAX_LIMIT}`;

export const SEARCH_PODCASTS_URL = ({
	term,
	offset,
	limit,
}: {
	term: string;
	offset: number;
	limit: number;
}) =>
	`${ITUNES_BASE}/search?entity=podcastEpisode&term=${term}&media=podcast&offset=${offset}&limit=${limit}`;
