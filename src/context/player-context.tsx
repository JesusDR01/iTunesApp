import { Podcast } from '@modules/podcasts/domain/Podcast';
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';
type CurrentPodcast = Podcast;

interface SearchPodcastContext {
	usePlay: [boolean, Dispatch<SetStateAction<boolean>>];
	useCurrentPodcast: [
		CurrentPodcast | undefined,
		Dispatch<SetStateAction<CurrentPodcast | undefined>>,
	];
	handleNext?: () => void;
	handlePrev?: () => void;
}

export const PlayerContext = createContext<SearchPodcastContext | null>(null);

export const PlayerContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [playing, setPlaying] = useState(false);
	const [currentPodcast, setCurrentPodcast] = useState<CurrentPodcast>();
	return (
		<PlayerContext.Provider
			value={{
				usePlay: [playing, setPlaying],
				useCurrentPodcast: [currentPodcast, setCurrentPodcast],
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};

export const usePlayer = ({
	handleNext,
	handlePrev,
}: {
	handleNext?: () => void;
	handlePrev?: () => void;
} = {}) => {
	const context = useContext(PlayerContext);

	if (context === null) {
		throw new Error('SearchPodcastContext error');
	}
	context.handleNext = handleNext ?? context.handleNext;
	context.handlePrev = handlePrev ?? context.handlePrev;

	
	return context;
};
