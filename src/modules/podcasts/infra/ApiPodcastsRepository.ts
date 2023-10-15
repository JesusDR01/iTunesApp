import { PodcastRepository } from '../domain/PodcastRepository';
import useInfiniteGetPodcast from '../application/get/useInfiniteGetPodcast';
import useInfiniteSearchPodcasts from '../application/search/useInfiniteSearchPodcasts';
import useListTopPodcasts from '../application/top/useListTopPodcasts';

export function createApiPodcastRepository(): PodcastRepository {
	return {
		useInfiniteSearchPodcasts,
		useInfiniteGetPodcast,
		useListTopPodcasts,
	};
}