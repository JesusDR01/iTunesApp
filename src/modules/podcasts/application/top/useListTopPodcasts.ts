import { useQuery } from '@tanstack/react-query';
import { listTopPodcasts } from '@lib/services/api/podcasts';
import { TAG_TYPES } from '@lib/constants';
import { AxiosRequestConfig } from 'axios';

function useListTopPodcasts(
	{
		enabled,
		query,
	}: {
		enabled?: boolean;
		query?: AxiosRequestConfig;
	} = {
		enabled: true,
		query: {},
	},
) {
	return useQuery(
		[TAG_TYPES.PODCASTS, 'top'],
		() => listTopPodcasts(query).then(res => res.data),
		{
			enabled,
		},
	);
}

export default useListTopPodcasts;
