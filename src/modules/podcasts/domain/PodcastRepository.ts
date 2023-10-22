import useGetPodcast from '../application/get/useGetPodcast';
import useInfiniteSearchPodcasts from '../application/search/useInfiniteSearchPodcasts';
import useListTopPodcasts from '../application/top/useListTopPodcasts';

export interface PodcastRepository {
	useInfiniteSearchPodcasts: typeof useInfiniteSearchPodcasts;
	useListTopPodcasts: typeof useListTopPodcasts;
	useInfiniteGetPodcast: typeof useGetPodcast;
}
