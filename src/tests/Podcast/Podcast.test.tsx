import { render } from '@testing-library/react';

import PodcastPage from 'pages/podcast/[handle]';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchPodcastsProvider } from 'context/search-context';
import { PlayerContextProvider } from 'context/player-context';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<PlayerContextProvider>
				<SearchPodcastsProvider>{children}</SearchPodcastsProvider>
			</PlayerContextProvider>
		</QueryClientProvider>
	);
};

const DEFAULT_PODCAST_ID = '1535809341';

// Mock IntersectionObserver
class IntersectionObserver {
	observe = jest.fn();
	disconnect = jest.fn();
	unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: IntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: IntersectionObserver,
});


describe('Podcast screen', () => {
	it('should render the podcast screen without crashing', () => {
		const { container } = render(
			<PodcastPage podcastId={DEFAULT_PODCAST_ID} />,
			{ wrapper: AllTheProviders },
		);
		expect(container).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		const { baseElement } = render(
			<PodcastPage podcastId={DEFAULT_PODCAST_ID} />,
			{ wrapper: AllTheProviders },
		);
		expect(baseElement).toMatchSnapshot();
	});
});
