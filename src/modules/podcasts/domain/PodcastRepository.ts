import useInfiniteGetPodcast from '../application/get/useInfiniteGetPodcast';
import useInfiniteSearchPodcasts from '../application/search/useInfiniteSearchPodcasts';
import useListTopPodcasts from '../application/top/useListTopPodcasts';

export interface PodcastRepository {
	useInfiniteSearchPodcasts: typeof useInfiniteSearchPodcasts;
	useListTopPodcasts: typeof useListTopPodcasts;
	useInfiniteGetPodcast: typeof useInfiniteGetPodcast;
}
