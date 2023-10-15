import { GET_EPISODES_URL } from 'utils/constants';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { formatRelease } from '@lib/utils';
import { Podcasts, RawPodcastDetail } from '@modules/podcasts/domain/Podcast';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
    
    const DEFAULT_LIMIT = 100;
    const DEFAULT_OFFSET = 0;
    
    const {
      handle: podcastId,
      offset = DEFAULT_OFFSET.toString(),
      limit = DEFAULT_LIMIT.toString(),
    } = req.query
    
    if (typeof podcastId === 'string'  && typeof offset === 'string' && typeof limit === 'string'){
      const episodesResponse = await fetch(GET_EPISODES_URL({podcastId, offset: parseInt(offset), limit: parseInt(limit)}));
    
		const {results: rawEpisodes}: {
      resultCount: number;
      results: RawPodcastDetail[];
    } = await episodesResponse.json();
    console.log(rawEpisodes, 'rawEpisodes')
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
			image: episode.artworkUrl60,
      imagePlayer: episode.artworkUrl160,
      
		})).filter(episode => episode.episodeUrl !== undefined);
    const heroImage = `${rawEpisodes[0].artworkUrl600.replace('600x600bb', '832x320bb')}`

		res.status(200).json({podcastDetails, podcastTitle: rawEpisodes[0].collectionName, heroImage,current_page: parseInt(offset)/parseInt(limit)});
  }else{
    res.status(500).send('Error getting parameters');
  }
	} catch (err) {
		console.log(err);
		return res.status(500).send('Error getting podcasts');
	}
}
