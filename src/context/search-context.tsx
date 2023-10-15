import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

interface SearchPodcastContext {
	useSearch: [string, Dispatch<SetStateAction<string>>];
}

export const SearchPodcastContext = createContext<SearchPodcastContext | null>(
	null,
);

export const SearchPodcastsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [search, setSearch] = useState('');

	return (
		<SearchPodcastContext.Provider
			value={{
				useSearch: [search, setSearch],
			}}
		>
			{children}
		</SearchPodcastContext.Provider>
	);
};

export const useSearch = () => {
	const context = useContext(SearchPodcastContext);

	if (context === null) {
		throw new Error('SearchPodcastContext error');
	}

	return context;
};
