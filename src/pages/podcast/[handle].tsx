import { QueryClient, dehydrate } from '@tanstack/react-query';
import { TAG_TYPES } from '@lib/constants';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { getTopPodcastsHandles } from '@lib/util/get-podcast-handles';
import { getPodcast } from '@lib/services/api/podcasts';
import { PodcastDetails } from '@modules/podcasts/domain/Podcast';
import { PodcastsDetailList } from 'sections/podcasts/PodcastDetailList';

const PodcastPage = ({ podcastId }: { podcastId: string }): JSX.Element => {
	return (
		<div>
			<PodcastsDetailList podcastId={podcastId} />
		</div>
	);
};

interface Params extends NextParsedUrlQuery {
	handle: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const handles = await getTopPodcastsHandles();
	return {
		paths: handles.map(handle => ({ params: { handle } })),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async context => {
	const handle = `${context.params?.handle}` as string;

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery([TAG_TYPES.PODCASTS, handle], () =>
		getPodcast({ podcastId: handle }).then(res => res.data),
	);

	// console.log(handle, "handle")
	const queryData = queryClient.getQueryData<PodcastDetails>([
		TAG_TYPES.PODCASTS,
		handle,
	]);
	// console.log(queryData, "queryData")
	if (!queryData || Object.values(queryData).length === 0) {
		return {
			props: {
				notFound: true,
			},
		};
	}

	return {
		revalidate: 10,
		props: {
			dehydratedState: dehydrate(queryClient),
			podcastId: handle,
			notFound: false,
		},
	};
};

export default PodcastPage;
