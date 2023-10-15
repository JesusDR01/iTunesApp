import { useState, useEffect } from 'react';

import { useLocalStorage } from 'hooks/useLocalStorage';
import { PodcastRepository } from '@modules/podcasts/domain/PodcastRepository';
import { getInfinitePodcasts } from '@modules/podcasts/application/top/getInfinitePodcasts';
import { Podcasts } from '@modules/podcasts/domain/Podcast';

export function usePagination(
	podcastsRepository: PodcastRepository,
	initialPosts: Podcasts,
	initialPage: number,
	itemsPerPage: number,
): [Podcasts, number, (page: number) => void] {
	const [currentPosts, setCurrentPodcasts] = useState<Podcasts>(initialPosts);
	const [currentPage, setCurrentPage] = useLocalStorage<number>(
		'currentPage',
		initialPage,
	);

	const fetchMorePodcasts = async () => {
		const fetchedPosts: Podcasts = await getInfinitePodcasts(
			podcastsRepository,
			itemsPerPage,
			currentPage,
		)();
		setCurrentPodcasts(fetchedPosts);
	};

	useEffect(() => {
		fetchMorePodcasts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	return [currentPosts, currentPage, setCurrentPage];
}

export default usePagination;
