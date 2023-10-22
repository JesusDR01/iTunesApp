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

// const filters = [
// 	{ type: 'sport', value: 'football', name: 'Football' },
// 	{ type: 'competition', value: 'premier-league', name: 'Premier League' },
// ];

// const mockUseFilters = {
// 	filters,
// 	removeFilter: jest.fn(),
// 	addFilter: jest.fn(),
// 	loading: false,
// };
// jest.mock('hooks/use-stored-filters', () => ({
// 	useStoredFilters: () => mockUseFilters,
// }));

// const useScheduleData = {
// 	isLoading: false,
// 	dates: [],
// 	events: [],
// 	update: jest.fn(),
// };

// jest.mock('./hooks/use-schedule', () => () => useScheduleData);

describe('Home screen', () => {
	it('should render the home screen without crashing', () => {
		const { container } = render(<HomePage />, { wrapper: AllTheProviders });
		expect(container).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		const { baseElement } = render(<HomePage />, { wrapper: AllTheProviders });
		expect(baseElement).toMatchSnapshot();
	});

	// it('should check filters', () => {
	// 	const { getByTestId } = render(<HomePage />, { wrapper: AllTheProviders });

	// 	expect(getByTestId(ID_FILTERS)).toHaveTextContent(filters[0].name);
	// 	expect(getByTestId(ID_FILTERS)).toHaveTextContent(filters[1].name);
	// });

	// it('should remove filter and focus the next one', async () => {
	// 	const { getByTestId, getByText, rerender } = render(<HomePage />, {
	// 		wrapper: AllTheProviders,
	// 	});

	// 	mockUseFilters.removeFilter.mockImplementation(filter => {
	// 		const idx = filters.findIndex(
	// 			f => f.type === filter.type && f.value === filter.value,
	// 		);
	// 		idx !== -1 && filters.splice(idx, 1);
	// 	});

	// 	const firstFilter = mockUseFilters.filters[0];
	// 	await fireEvent.click(getByText(firstFilter.name));
	// 	rerender(<HomePage />);
	// 	expect(mockUseFilters.removeFilter).toHaveBeenCalled();
	// 	expect(getByTestId(ID_FILTERS)).not.toHaveTextContent(firstFilter.name);
	// });
});
