import { TAG_TYPES } from '@lib/constants';
import { listTopPodcasts } from '@lib/services/api/podcasts';
import { Podcasts } from '@modules/podcasts/domain/Podcast';
import { QueryClient } from '@tanstack/react-query';

export const getTopPodcastsHandles = async (): Promise<string[]> => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery([TAG_TYPES.PODCASTS, 'top'], () =>
		listTopPodcasts({}).then(res => res.data),
	);

	const podcastsFound = queryClient.getQueryData<Podcasts>([
		TAG_TYPES.PODCASTS,
		'top',
	]);

	const handles: string[] = [];

	if (podcastsFound) {
		for (const podcast of podcastsFound) {
			if (podcast.id) {
				handles.push(podcast.id);
			}
		}
	}
	return handles;
};
