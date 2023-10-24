import { PodcastRepository } from '../domain/PodcastRepository';
import useGetPodcast from '../application/get/useGetPodcast';
import useInfiniteSearchPodcasts from '../application/search/useInfiniteSearchPodcasts';
import useListTopPodcasts from '../application/top/useListTopPodcasts';

export function createApiPodcastRepository(): PodcastRepository {
	return {
		useInfiniteSearchPodcasts,
		useGetPodcast,
		useListTopPodcasts,
	};
}
