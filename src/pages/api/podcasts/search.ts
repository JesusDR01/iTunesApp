import { SEARCH_PODCASTS_URL } from '@lib/services/api/constants';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { formatRelease } from '@lib/util/format-release';
import { Podcasts } from '@modules/podcasts/domain/Podcast';

interface SearchPodcastResponse {
	resultCount: number;
	results: Result[];
}

interface Result {
	country: string;
	feedUrl: string;
	artistIds: number[];
	closedCaptioning: string;
	collectionId: number;
	collectionName: string;
	trackTimeMillis?: number;
	artworkUrl600: string;
	episodeContentType: string;
	description: string;
	trackId: number;
	trackName: string;
	releaseDate: string;
	shortDescription: string;
	collectionViewUrl: string;
	artworkUrl60: string;
	trackViewUrl: string;
	previewUrl: string;
	episodeUrl: string;
	episodeFileExtension: string;
	artworkUrl160: string;
	genres: Genre[];
	episodeGuid: string;
	kind: string;
	wrapperType: string;
	contentAdvisoryRating?: string;
	artistViewUrl?: string;
}

interface Genre {
	name: string;
	id: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const DEFAULT_LIMIT = 100;
		const DEFAULT_OFFSET = 0;
		const {
			term,
			offset = DEFAULT_OFFSET.toString(),
			limit = DEFAULT_LIMIT.toString(),
		} = req.query;

		if (
			typeof term === 'string' &&
			typeof offset === 'string' &&
			typeof limit === 'string'
		) {
			const podcastsResponse = await fetch(
				SEARCH_PODCASTS_URL({
					term,
					offset: parseInt(offset),
					limit: parseInt(limit),
				}),
			);

			const { results: rawPodcasts }: SearchPodcastResponse =
				await podcastsResponse.json();
			const podcasts: Podcasts = rawPodcasts
				.filter(podcast => {
					const timeDifference =
						Date.now() - new Date(podcast.releaseDate).getTime();
					return timeDifference > 0;
				})
				.sort(
					(prevPodcast, currentPodcast) =>
						new Date(currentPodcast.releaseDate).getTime() -
						new Date(prevPodcast.releaseDate).getTime(),
				)
				.map(podcast => ({
					id: podcast.collectionId.toString(),
					title: podcast.trackName,
					author: podcast.collectionName,
					image: podcast.artworkUrl60,
					imagePlayer: podcast.artworkUrl160,
					released: formatRelease(podcast.releaseDate),
					description: podcast.description,
					episodeUrl: podcast.episodeUrl,
				}));

			res
				.status(200)
				.json({ podcasts, current_page: parseInt(offset) / parseInt(limit) });
		} else {
			console.log(res.statusCode, res.statusMessage, 'status');
			res.status(500).send('Error getting parameters');
		}
	} catch (err) {
		console.log(err);
		return res.status(500).send('Error getting podcasts');
	}
}
