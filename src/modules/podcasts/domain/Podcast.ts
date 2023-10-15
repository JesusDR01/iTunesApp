export interface Podcast {
  id: string;
  title: string;
  author: string;
  image: string;
  episodeUrl?: string;
  description?: string;
	released?: string
  imagePlayer?: string;
}

export type Podcasts = Podcast[];

export interface RawPodcasts {
	feed: {
    author: {
      name: Name;
      uri: Name;
    };
    entry: RawPodcast[];
    updated: Name;
    rights: Name;
    title: Name;
    icon: Name;
    link: {
      attributes: {
        rel: string;
        type?: string;
        href: string;
      };
    }[];
    id: Name;
  }
}

export interface RawPodcast {
	'im:name': Name;
	'im:image': {
		label: string;
		attributes: {
			height: string;
		};
	}[];
	summary: Name;
	'im:price': {
		label: string;
		attributes: {
			amount: string;
			currency: string;
		};
	};
	'im:contentType': {
		attributes: {
			term: string;
			label: string;
		};
	};
	rights?: Name;
	title: Name;
	link: {
		attributes: {
			rel: string;
			type: string;
			href: string;
		};
	};
	id: {
		label: string;
		attributes: {
			'im:id': string;
		};
	};
	'im:artist': {
    label: string;
    attributes?: {
      href: string;
    };
  };
	category: {
    attributes: {
      'im:id': string;
      term: string;
      scheme: string;
      label: string;
    };
  };
	'im:releaseDate': {
    label: string;
    attributes: Name;
  };
}

interface Name {
	label: string;
}



export interface PodcastDetail {
	id: number;
	title: string;
	author: string | undefined;
	episodeUrl: string | undefined;
	description: string | undefined;
	released: string;
	duration: string;
	image: string;
}

export type PodcastDetails = Podcast[];

export interface RawPodcastDetail {
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