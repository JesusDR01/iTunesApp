import { PodcastRepository } from '../domain/EpisodeRepository';
import useInfiniteSearchEpisodes from '../application/episode/useInfiniteSearchEpisodes';

export function createApiPodcastRepository(): PodcastRepository {

	return {
		useInfiniteSearchPodcasts: useInfiniteSearchEpisodes,
	};
}