import { useQuery } from '@tanstack/react-query';
import { TAG_TYPES } from '@lib/constants';
import { getPodcast } from '@lib/services/api/podcasts';



function useGetPodcast({
	enabled = true,
	podcastId,
}: {
	enabled?: boolean;
	podcastId: string;
}) {
	return useQuery(
		[TAG_TYPES.PODCASTS, podcastId],
		() => getPodcast({ podcastId}).then(res => res.data),
		{
			enabled,
			select(data) {
				return {...data, heroImage: data.heroImage}
			},
		},
	);
}

export default useGetPodcast;
