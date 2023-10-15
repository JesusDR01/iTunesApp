import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Player } from 'components/Player';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from 'components/Navbar';
import { SearchPodcastsProvider } from 'context/search-context';
import { PlayerContextProvider } from 'context/player-context';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<PlayerContextProvider>
				<SearchPodcastsProvider>
					<div
						className="w-full relative 
			bg-[#14151a] min-h-[100vh]"
					>
						<Navbar />
						<Component {...pageProps} />
						<Player />
					</div>
				</SearchPodcastsProvider>
			</PlayerContextProvider>
		</QueryClientProvider>
	);
}
