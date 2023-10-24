import { render } from '@testing-library/react';

import HomePage from 'pages/index';

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

describe('Home screen', () => {
	it('should render the home screen without crashing', () => {
		const { container } = render(<HomePage />, { wrapper: AllTheProviders });
		expect(container).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		const { baseElement } = render(<HomePage />, { wrapper: AllTheProviders });
		expect(baseElement).toMatchSnapshot();
	});
});
