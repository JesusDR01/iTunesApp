import { Inter } from 'next/font/google';

import { PodcastsList } from 'sections/podcasts/PodcastList';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { TAG_TYPES } from '@lib/constants';
import { listTopPodcasts } from '@lib/services/api/podcasts';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage(): JSX.Element {
	return (
		<main className={inter.className}>
			<PodcastsList />
		</main>
	);
}

export const getStaticProps = async () => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery([TAG_TYPES.PODCASTS, 'top'], () =>
		listTopPodcasts({}).then(res => res.data),
	);

	return {
		revalidate: 10,
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
