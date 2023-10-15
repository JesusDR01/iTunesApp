import { useInfiniteQuery } from '@tanstack/react-query';
import { TAG_TYPES } from '@lib/constants';
import { getPodcast } from '@lib/services/api/podcasts';



function useInfiniteGetPodcast({
	enabled = true,
	podcastId,
	offset = 0,
}: {
	enabled?: boolean;
	podcastId: string;
	offset?: number;
}) {
	return useInfiniteQuery(
		[TAG_TYPES.PODCASTS, podcastId],
		(data) => getPodcast({ podcastId, pageParam: { offset: data?.pageParam?.offset || offset } }).then(res => res.data),
		{
			getPreviousPageParam: firstPage => firstPage.current_page - 1,
			getNextPageParam: lastPage => {
				return lastPage.podcastDetails?.length > 0
					? undefined
					: lastPage.current_page + 1;
			},
			enabled,
			select(data) {
				return {...data, heroImage: data.pages[0].heroImage}
			},
		},
	);
}

export default useInfiniteGetPodcast;
