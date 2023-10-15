import { useInfiniteQuery } from '@tanstack/react-query';
import { TAG_TYPES } from '@lib/constants';
import { Podcasts } from 'modules/podcasts/domain/Podcast';
import { searchPodcasts } from '@lib/services/api/podcasts';

export type PodcastRequest = {
	current_page: number;
	total_pages: number;
	podcasts: Podcasts;
};

function useInfiniteSearchEpisodes({
	enabled = true,
	term,
	offset = 0,
}: {
	enabled?: boolean;
	term: string;
	offset?: number;
}) {
	return useInfiniteQuery(
		[TAG_TYPES.PODCASTS, term],
		() => searchPodcasts({ term, pageParam: { offset } }).then(res => res.data),
		{
			getPreviousPageParam: firstPage => firstPage.current_page - 1,
			getNextPageParam: lastPage => {
				return lastPage.podcasts?.length > 0
					? undefined
					: lastPage.current_page + 1;
			},
			enabled,
		},
	);
}

export default useInfiniteSearchEpisodes;
