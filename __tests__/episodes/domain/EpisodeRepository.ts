import useInfiniteSearchEpisodes from '../application/episode/useInfiniteSearchEpisodes';

export interface PodcastRepository {
	useInfiniteSearchPodcasts: typeof useInfiniteSearchEpisodes;
}
