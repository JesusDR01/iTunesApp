import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import useInfiniteGetPodcast from '@modules/podcasts/application/get/useInfiniteGetPodcast';
import VerifiedIcon from '@mui/icons-material/Verified';
import { PodcastHero } from './PodcastHero';
import { Loader } from 'components/Loader';
import { OFFSET_STEP } from '@lib/services/api/consts';
import { PodcastRow } from './PodcastRow';
import { PlayPauseBtn } from 'components/PlayPauseBtn';
import { usePlayer } from 'context/player-context';

export function PodcastsDetailList({
	podcastId,
}: {
	podcastId: string;
}): JSX.Element {
	const {
		data: podcastDetails,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfiniteGetPodcast({
		podcastId,
	});
	console.log(podcastDetails, 'podcastDetails');

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
		usePlay: [isPlaying, setIsPlaying],
	} = usePlayer();
	return (
		<div className="w-full">
			<div className="flex items-center justify-center flex-col max-w-[832px] m-auto">
				{podcastDetails?.pages[0] && (
					<>
						<PodcastHero />

						<div className="flex w-full justify-center items-center relative h-[60px]">
							<PlayPauseBtn
								onClick={() => {
									if (!isPlaying) {
										setIsPlaying(true);
									} else {
										setIsPlaying(false);
									}
								}}
								isPlaying={isPlaying}
								className="bg-[#5c67de] min-h-[60px] min-w-[60px] rounded-full text-white self-start absolute left-0 top-0"
							/>
							<h1 className="text-[32px] max-w-[344px] whitespace-nowrap overflow-hidden text-ellipsis text-white flex items-center gap-[10px]">
								{podcastDetails.pages[0]?.podcastTitle}{' '}
								<VerifiedIcon htmlColor="#2a94e2" />
							</h1>
						</div>
					</>
				)}
				{podcastDetails?.pages.flatMap(page => page.podcastDetails)?.length &&
					podcastDetails?.pages.map(page =>
						page.podcastDetails.map(podcastDetail => (
							<PodcastRow
								podcast={podcastDetail}
								key={podcastDetail.episodeUrl}
							/>
							// <Link
							// 	href={`/podcast/${podcastDetail.id}`}
							// 	key={podcastDetail.id}
							// 	className="w-full"
							// >
							// 	<div className="flex justify-between items-center my-5">
							// 		<div className="flex gap-[20px] items-center">
							// 			<PlayArrowIcon />
							// 			<img
							// 				alt={podcastDetail.description}
							// 				src={podcastDetail.image}
							// 				height={45}
							// 				width={45}
							// 				className="rounded-lg"
							// 			/>
							// 			<div className="max-w-[198px] h-[38px]">
							// 				<Typography className="overflow-hidden text-ellipsis whitespace-nowrap h-[20px] text-white">
							// 					{podcastDetail.title}
							// 				</Typography>
							// 				<Typography className="overflow-hidden text-ellipsis whitespace-nowrap ">
							// 					{podcastDetail.author}
							// 				</Typography>
							// 			</div>
							// 		</div>
							// 		<div className="flex-[5_1_0] justify-center flex">
							// 			<Typography className="overflow-hidden text-ellipsis max-w-[210px]  break-words h-[45px] line-clamp-2  ">
							// 				{podcastDetail.description}
							// 			</Typography>
							// 		</div>
							// 		<div className="flex-[1_1_0]">
							// 			<Typography>{podcastDetail.released}</Typography>
							// 		</div>
							// 	</div>
							// </Link>
						)),
					)}
				{isFetchingNextPage && <Loader />}
				<div ref={nextPageRef}>.</div>
			</div>
		</div>
	);
}
