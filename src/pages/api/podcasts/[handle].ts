import { GET_EPISODES_URL } from '@lib/services/api/constants';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { formatRelease } from '@lib/util/format-release';
import { Podcasts, RawPodcastDetail } from '@modules/podcasts/domain/Podcast';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
    
    const {
      handle: podcastId,
    } = req.query
    
    if (typeof podcastId === 'string'){
      const episodesResponse = await fetch(GET_EPISODES_URL({podcastId}));
    
		const {results: rawEpisodes}: {
      resultCount: number;
      results: RawPodcastDetail[];
    } = await episodesResponse.json();

    const podcastDetails: Podcasts = rawEpisodes.filter(episode => {
      const timeDifference = Date.now() - new Date(episode.releaseDate).getTime()
      return timeDifference > 0
    }).sort((prevEpisode, currentEpisode) => new Date(currentEpisode.releaseDate).getTime() - new Date(prevEpisode.releaseDate).getTime() ).map(episode => ({
			id: episode.collectionId.toString(),
			title: episode.trackName,
			author: episode.collectionName,
      episodeUrl: episode.episodeUrl,
			description: episode.description,
      released: formatRelease(episode.releaseDate),
      duration: episode.trackTimeMillis ? new Date(episode.trackTimeMillis).toISOString().substr(11, 8) : '',
      originalDuration: episode.trackTimeMillis,
			image: episode.artworkUrl60,
      imagePlayer: episode.artworkUrl160,
      
		})).filter(episode => episode.episodeUrl !== undefined);

		res.status(200).json({podcastDetails, podcastTitle: rawEpisodes[0].collectionName});
  }else{
    res.status(500).send('Error getting parameters');
  }
	} catch (err) {
		console.log(err);
		return res.status(500).send('Error getting podcasts');
	}
}
