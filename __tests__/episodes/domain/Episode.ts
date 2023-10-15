export interface Episode {
	id: number;
	title: string;
	author: string | undefined;
	episodeUrl: string | undefined;
	description: string | undefined;
	released: string;
	duration: string;
	image: string;
}
export type Episodes = Episode[];


export interface RawEpisode {
  wrapperType: string;
  kind: string;
  artistId?: number;
  collectionId: number;
  trackId: number;
  artistName?: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  collectionHdPrice?: number;
  releaseDate: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  trackCount?: number;
  trackTimeMillis: number;
  country: string;
  currency?: string;
  primaryGenreName?: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds?: string[];
  genres: (Genre | string)[];
  closedCaptioning?: string;
  artworkUrl160?: string;
  description?: string;
  episodeFileExtension?: string;
  episodeContentType?: string;
  previewUrl?: string;
  artistIds?: number[];
  shortDescription?: string;
  episodeUrl?: string;
  episodeGuid?: string;
}

interface Genre {
  name: string;
  id: string;
}