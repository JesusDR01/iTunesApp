import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useSearch } from 'context/search-context';
import { debouncer } from '@lib/util/debouncer';
import { Loader } from 'components/Loader';
import { OFFSET_STEP } from '@lib/services/api/constants';
import { usePlayer } from 'context/player-context';
import { PodcastRow } from './PodcastRow';
import { PodcastHeader } from './PodcastHeader';

import { Order } from 'components/Order';
import { createApiPodcastRepository } from '@modules/podcasts/infra/ApiPodcastsRepository';

const debounce = debouncer();

const { useInfiniteSearchPodcasts, useListTopPodcasts } =
	createApiPodcastRepository();

export function PodcastsList(): JSX.Element {
	const {
		useSearch: [search],
	} = useSearch();

	const [term, setTerm] = useState(search);
	const { data: topPodcasts, isLoading: isTopPodcastsLoading } =
		useListTopPodcasts({ enabled: term === '' });

	const offsetRef = useRef(0);

	useEffect(() => {
		debounce.exec(() => {
			setTerm(search);
			offsetRef.current = 0;
		}, 1000);
		return () => debounce.cancel();
	}, [search]);

	const {
		data: searchPodcasts,
		fetchNextPage,
		isLoading: isSearchLoading,
		isFetchingNextPage,
	} = useInfiniteSearchPodcasts({
		term: term,
		enabled: term !== '',
	});

	const { ref: nextPageRef, inView } = useInView({
		threshold: 0,
	});

	useEffect(() => {
		const isFinished = searchPodcasts?.pages.at(-1)?.podcasts.length;
		if (inView && term !== '' && isFinished !== 0 && !isFetchingNextPage) {
			offsetRef.current += OFFSET_STEP;
			fetchNextPage({
				pageParam: { offset: offsetRef.current || OFFSET_STEP },
			});
		}
	}, [inView, fetchNextPage, term, searchPodcasts?.pages, isFetchingNextPage]);

	const {
		useControls: [, update],
	} = usePlayer();

	const [sort, setSort] = useState('');

	useEffect(() => {
		update({
			type: 'setPodcastList',
			podcastList: searchPodcasts?.pages.flatMap(pages => pages.podcasts) || [],
		});
	}, [searchPodcasts, update, sort]);

	const handleSort = useCallback(
		(sort: string) => {
			setSort(sort);
			searchPodcasts?.pages?.forEach(page => {
				page.podcasts.sort((a, b) => {
					if (sort === 'Title') {
						return a.title.localeCompare(b.title);
					}
					if (sort === 'Topic' && a.description && b.description) {
						return a.description.localeCompare(b.description);
					}
					const original = searchPodcasts?.pages.flatMap(page => page.podcasts);
					const aIndex =
						original?.findIndex(
							podcast => podcast.episodeUrl === a.episodeUrl,
						) || 0;
					const bIndex =
						original?.findIndex(
							podcast => podcast.episodeUrl === b.episodeUrl,
						) || 0;
					return bIndex - aIndex;
				});
			});
		},
		[setSort, searchPodcasts],
	);
	if ((isSearchLoading && term !== '') || isTopPodcastsLoading)
		return <Loader />;

	return (
		<>
			<div className="flex items-center justify-center flex-col max-w-[832px] m-auto min-h-[100vh] pb-[100px]">
				{searchPodcasts?.pages ? (
					<>
						<Order
							duration={searchPodcasts.pages
								.flatMap(page => page.podcasts)
								.some(podcast => podcast.duration)}
							handleSort={handleSort}
							className="self-end h-[60px] flex items-center"
						/>
						<PodcastHeader />
						{searchPodcasts?.pages.flatMap(page => page.podcasts)?.length &&
							searchPodcasts?.pages.map(page =>
								page.podcasts.map(podcast => (
									<PodcastRow podcast={podcast} key={podcast.episodeUrl} />
								)),
							)}
						{isFetchingNextPage && <Loader />}
						<div ref={nextPageRef}>...</div>
					</>
				) : (
					<>
						<h1 className="text-white text-[2rem]">Top podcasts</h1>
						{topPodcasts?.map(podcast => (
							<Link
								className="w-full"
								href={`/podcast/${podcast.id}`}
								key={podcast.id}
								data-testid="podcast-link"
							>
								<div className="flex justify-between items-center m-5">
									<div className="flex gap-[20px] items-center">
										<img
											alt={podcast.description}
											src={podcast.image}
											height={45}
											width={45}
											className="rounded-lg"
										/>
										<div className="max-w-[198px] h-[38px]">
											<Typography className="overflow-hidden text-ellipsis whitespace-nowrap h-[20px] text-white">
												{podcast.title}
											</Typography>
											<Typography>{podcast.author}</Typography>
										</div>
									</div>
									<div className="flex-[5_1_0] justify-center flex">
										<Typography className="overflow-hidden text-ellipsis max-w-[210px] h-[40px] whitespace-nowrap ">
											{podcast.description}
										</Typography>
									</div>
									<div className="flex-[1_1_0]">
										<Typography>{podcast.released}</Typography>
									</div>
								</div>
							</Link>
						))}
					</>
				)}
			</div>
		</>
	);
}
