// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RawPodcasts } from '@/src/modules/posts/domain/Podcast';
import { ALL_PODCASTS_URL } from '@/src/utils/constants';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
  try{
    const podcastsResponse = await fetch(ALL_PODCASTS_URL);
    const {feed:{entry: rawPodcasts}}: RawPodcasts = await podcastsResponse.json();
    const podcasts = rawPodcasts.map(podcast => ({
      id: podcast.id.attributes['im:id'],
      title: podcast.title.label,
      author: podcast['im:artist'].label,
      description: podcast.summary.label,
      image: podcast['im:image'][2].label,
    }))
    res.status(200).json(podcasts);

  }catch(err){
    console.log(err)
    return res.status(500).send('Error')
  }
}
