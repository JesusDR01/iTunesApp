import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useRef, useState } from 'react';
import useInfiniteGetPodcast from '@modules/podcasts/application/get/useInfiniteGetPodcast';
import VerifiedIcon from '@mui/icons-material/Verified';
import { PodcastHero } from './PodcastHero';
import { Loader } from 'components/Loader';
import { OFFSET_STEP } from '@lib/services/api/consts';
import { PodcastRow } from './PodcastRow';
import { PlayPauseBtn } from 'components/PlayPauseBtn';
import { usePlayer } from 'context/player-context';
import { PodcastHeader } from './PodcastHeader';
import { Order } from 'components/Order';
import { Podcasts } from '@modules/podcasts/domain/Podcast';
import { InfiniteData } from '@tanstack/react-query';

export function PodcastsDetailList({
	podcastId,
}: {
	podcastId: string;
}): JSX.Element {
	const [currentPodcasts, setCurrentPodcasts] = useState<
		| InfiniteData<{
				current_page: number;
				podcastDetails: Podcasts;
		  }>
		| undefined
	>(undefined);

	const {
		data: podcastDetails,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfiniteGetPodcast({
		podcastId,
	});

	const { ref: nextPageRef, inView } = useInView({
		threshold: 0,
	});
	const offsetRef = useRef(0);

	useEffect(() => {
		const isFinished = podcastDetails?.pages.at(-1)?.podcastDetails.length;
		if (inView && isFinished !== 0 && !isFetchingNextPage) {
			offsetRef.current += OFFSET_STEP;
			fetchNextPage({
				pageParam: { offset: offsetRef.current || OFFSET_STEP },
			});
		}
	}, [inView, fetchNextPage, podcastDetails?.pages, isFetchingNextPage]);
	const {
		useControls: [{ isPlaying, currentPodcast }, update],
	} = usePlayer();

	const [sort, setSort] = useState('Title');

	useEffect(() => {
		setCurrentPodcasts(podcastDetails);

		update({
			type: 'setPodcastList',
			podcastList:
				currentPodcasts?.pages.flatMap(pages => pages.podcastDetails) || [],
		});
	}, [currentPodcasts, update, podcastDetails]);

	const handleSort = useCallback(
		(sort: string) => {
			setSort(sort);
			setCurrentPodcasts(prev => {
				if (prev !== undefined) {
					const currentPodcastsCopy = { ...prev };
					currentPodcastsCopy.pages.forEach(page => {
						page.podcastDetails.sort((a, b) => {
							if (sort === 'Title') return a.title.localeCompare(b.title);
							if (sort === 'Topic' && a.description && b.description)
								return a.description.localeCompare(b.description);

							if (
								sort === 'Duration' &&
								a.originalDuration &&
								b.originalDuration
							)
								return a.originalDuration - b.originalDuration;

							const original = podcastDetails?.pages.flatMap(
								page => page.podcastDetails,
							);
							const aIndex =
								original?.findIndex(
									podcast => podcast.episodeUrl === a.episodeUrl,
								) || 0;
							const bIndex =
								original?.findIndex(
									podcast => podcast.episodeUrl === b.episodeUrl,
								) || 0;
							return aIndex - bIndex;
						});
					});
					return currentPodcastsCopy;
				}
			});
		},
		[setSort, podcastDetails],
	);

	return (
		<div className="w-full" key={sort}>
			<div className="flex items-center justify-center flex-col max-w-[832px] m-auto">
				{podcastDetails?.pages[0] && (
					<>
						<PodcastHero />

						<div className="flex w-full justify-center items-center relative h-[60px]">
							<PlayPauseBtn
								onClick={() => {
									if (currentPodcast) {
										update({ type: isPlaying ? 'pause' : 'play' });
									} else {
										update({
											type: 'setPodcast',
											podcast: podcastDetails.pages[0]?.podcastDetails[0],
										});
									}
								}}
								isPlaying={isPlaying}
								className="bg-[#5c67de] min-h-[60px] min-w-[60px] rounded-full text-white self-start absolute left-0 top-0"
							/>
							<h1 className="text-[32px] max-w-[344px] whitespace-nowrap overflow-hidden text-ellipsis text-white flex items-center gap-[10px]">
								{podcastDetails.pages[0]?.podcastTitle}{' '}
								<VerifiedIcon htmlColor="#2a94e2" />
							</h1>
							<Order
								duration={podcastDetails.pages
									.flatMap(page => page.podcastDetails)
									.some(podcast => podcast.duration)}
								handleSort={handleSort}
								className="absolute right-0"
							/>
						</div>
					</>
				)}
				<PodcastHeader className="mt-[20px]" showDuration />
				{podcastDetails?.pages.flatMap(page => page.podcastDetails)?.length &&
					currentPodcasts?.pages.map(page =>
						page.podcastDetails.map(podcastDetail => (
							<PodcastRow
								podcast={podcastDetail}
								key={podcastDetail.episodeUrl}
							/>
						)),
					)}
				{isFetchingNextPage && <Loader />}
				<div ref={nextPageRef}>.</div>
			</div>
		</div>
	);
}
