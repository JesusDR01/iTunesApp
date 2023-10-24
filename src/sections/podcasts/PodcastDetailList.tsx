import { useCallback, useEffect, useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { PodcastHero } from './PodcastHero';
import { PodcastRow } from './PodcastRow';
import { PlayPauseBtn } from 'components/PlayPauseBtn';
import { usePlayer } from 'context/player-context';
import { PodcastHeader } from './PodcastHeader';
import { Order } from 'components/Order';
import { createApiPodcastRepository } from '@modules/podcasts/infra/ApiPodcastsRepository';

const { useGetPodcast } = createApiPodcastRepository();

export function PodcastsDetailList({
	podcastId,
}: {
	podcastId: string;
}): JSX.Element {
	const { data } = useGetPodcast({
		podcastId,
	});
	const { podcastTitle, podcastDetails } = data || {};
	const [currentPodcasts, setCurrentPodcasts] =
		useState<typeof podcastDetails>(podcastDetails);

	const {
		useControls: [{ isPlaying, currentPodcast }, update],
	} = usePlayer();

	const [sort, setSort] = useState('Title');

	useEffect(() => {
		if (!currentPodcasts) return setCurrentPodcasts(podcastDetails);

		update({
			type: 'setPodcastList',
			podcastList: currentPodcasts || [],
		});
	}, [currentPodcasts, update, podcastDetails]);

	const handleSort = useCallback(
		(sort: string) => {
			setSort(sort);
			setCurrentPodcasts(prev => {
				if (prev !== undefined) {
					const currentPodcastsCopy = [...prev];
					// debugger;
					currentPodcastsCopy.sort((a, b) => {
						if (sort === 'Title') return a.title.localeCompare(b.title);
						if (sort === 'Topic' && a.description && b.description)
							return a.description.localeCompare(b.description);

						if (sort === 'Duration' && a.originalDuration && b.originalDuration)
							return a.originalDuration - b.originalDuration;

						const aIndex =
							podcastDetails?.findIndex(
								podcast => podcast.episodeUrl === a.episodeUrl,
							) || 0;
						const bIndex =
							podcastDetails?.findIndex(
								podcast => podcast.episodeUrl === b.episodeUrl,
							) || 0;
						return aIndex - bIndex;
					});
					return currentPodcastsCopy;
				}
			});
		},
		[setSort, podcastDetails],
	);

	return (
		<div className="w-full" key={sort}>
			<div className="flex items-center justify-center flex-col max-w-[832px] m-auto pb-[100px]">
				{currentPodcasts && (
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
											podcast: currentPodcasts[0],
										});
									}
								}}
								isPlaying={isPlaying}
								className="bg-[#5c67de] min-h-[60px] min-w-[60px] rounded-full text-white self-start absolute left-0 top-0"
							/>
							<h1 className="text-[32px] max-w-[344px] whitespace-nowrap overflow-hidden text-ellipsis text-white flex items-center gap-[10px]">
								{podcastTitle} <VerifiedIcon htmlColor="#2a94e2" />
							</h1>
							<Order
								duration={currentPodcasts.some(podcast => podcast.duration)}
								handleSort={handleSort}
								className="absolute right-0"
							/>
						</div>
					</>
				)}
				<PodcastHeader className="mt-[20px]" showDuration />
				{currentPodcasts?.length &&
					currentPodcasts?.map(podcastDetail => (
						<PodcastRow
							podcast={podcastDetail}
							key={podcastDetail.episodeUrl}
						/>
					))}
			</div>
		</div>
	);
}
