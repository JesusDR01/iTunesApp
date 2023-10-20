import { Podcast, Podcasts } from '@modules/podcasts/domain/Podcast';
import {
	Dispatch,
	MutableRefObject,
	createContext,
	useContext,
	useReducer,
	useRef,
} from 'react';

export type PodcastList = Podcasts;


export type State = {
	randomMode: boolean;
	currentPodcast: Podcast | null;
	podcastList?: PodcastList;
	isPlaying: boolean;
	volume: number;
	time: number;
	loopMode: 'all' | 'one' | 'none';
};

export type Action =
	| { type: 'play' }
	| { type: 'pause' }
	| { type: 'setPodcast'; podcast: Podcast }
	| { type: 'setPodcastList'; podcastList: PodcastList }
	| { type: 'loopMode'; loopMode: 'all' | 'one' | 'none' }
	| { type: 'randomMode'; randomMode: boolean }
	| { type: 'next' }
	| { type: 'end' }
	| { type: 'prev' }
	| { type: 'volume'; volume: number };

export type DispatchAction = React.Dispatch<Action>;

interface SearchPodcastContext {
	audioRef: MutableRefObject<HTMLAudioElement | null>;
	useControls: [State, Dispatch<Action>];
}

export const PlayerContext = createContext<SearchPodcastContext | null>(null);

export const PlayerContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const getInitialState = (): State => ({
		randomMode: false,
		currentPodcast: null,
		podcastList: undefined,
		isPlaying: false,
		volume: 0.3,
		time: 0,
		loopMode: 'none',
	});

	return (
		<PlayerContext.Provider
			value={{
				audioRef,
				useControls: useReducer((state: State, action: Action) => {
					switch (action.type) {
						case 'setPodcast': {
							const podcast = action.podcast;
							return {
								...state,
								currentPodcast: podcast,
							};
						}
						case 'setPodcastList': {
							const podcastList = action.podcastList;
							return {
								...state,
								podcastList: podcastList,
							};
						}
						case 'loopMode': {
							return { ...state, loopMode: action.loopMode };
						}
						case 'randomMode': {
							const randomMode = action.randomMode;
							return {
								...state,
								randomMode: randomMode,
							};
						}
						case 'prev': {
							const { podcastList, currentPodcast, loopMode } = state;
							if (loopMode === 'one' && audioRef.current) {
								audioRef.current.currentTime = 0;
								return {
									...state,
								};
							}
							if (podcastList && currentPodcast) {
								const currentPodcastIndex = podcastList.findIndex(
									podcast => podcast.episodeUrl === currentPodcast?.episodeUrl,
								);
								const prevPodcast = podcastList[currentPodcastIndex - 1];

								return {
									...state,
									currentPodcast: prevPodcast || currentPodcast,
								};
							}

							return {
								...state,
							};
						}
						case 'next': {
							const { podcastList, currentPodcast, randomMode, loopMode } =
								state;

							if (podcastList && currentPodcast) {
								const currentPodcastIndex = podcastList.findIndex(
									podcast => podcast.episodeUrl === currentPodcast?.episodeUrl,
								);

								const nextPodcast =
									podcastList[
										randomMode
											? Math.floor(Math.random() * podcastList.length)
											: currentPodcastIndex + 1
									];
								return {
									...state,
									currentPodcast: nextPodcast || currentPodcast,
									loopMode:
										loopMode === 'one' || loopMode === 'all'
											? ('all' as const)
											: ('none' as const),
								};
							}

							return {
								...state,
							};
						}
						case 'end': {
							const { podcastList, currentPodcast, randomMode, loopMode } =
								state;

								if (loopMode === 'one' && audioRef.current) {
									audioRef.current.currentTime = 0;
									audioRef.current.play();
									return {
										...state,
									};
								}

							if (podcastList && currentPodcast) {
								const currentPodcastIndex = podcastList.findIndex(
									podcast => podcast.episodeUrl === currentPodcast?.episodeUrl,
								);

								const nextPodcast =
									podcastList[
										randomMode
											? Math.floor(Math.random() * podcastList.length)
											: currentPodcastIndex + 1
									];
								return {
									...state,
									currentPodcast: nextPodcast || currentPodcast,
								};
							}

							return {
								...state,
							};
						}
						case 'play': {
							audioRef.current?.play();
							return { ...state, isPlaying: true };
						}
						case 'pause': {
							audioRef.current?.pause();
							return { ...state, isPlaying: false };
						}
						case 'volume': {
							const volume = action.volume;
							if (audioRef.current) {
								audioRef.current.volume = volume;
							}
							return {
								...state,
								volume: volume,
							};
						}
						default: {
							return state;
						}
					}
				}, getInitialState()),
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};

export const usePlayer = () => {
	const context = useContext(PlayerContext);

	if (context === null) {
		throw new Error('SearchPodcastContext error');
	}

	return context;
};
