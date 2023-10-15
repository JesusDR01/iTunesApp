import { getRequest } from '@lib/util/http';
import { PER_PAGE_DEFAULT, podcastController } from './consts';
import { AxiosRequestConfig } from 'axios';
import { PodcastDetails, Podcasts } from '@modules/podcasts/domain/Podcast';

export type PodcastsSearchQuery = () => Promise<{
	current_page: number;
	podcasts: Podcasts;
}>;
export type PodcastSearchResponse = Awaited<ReturnType<PodcastsSearchQuery>>;

export type PodcastsTopQuery = () => Promise<Podcasts>;
export type PodcastsTopResponse = Awaited<ReturnType<PodcastsTopQuery>>;

export type PodcastQuery = () => Promise<{
	current_page: number;
	podcastDetails: PodcastDetails;
  heroImage?: string
  podcastTitle?: string
}>;
export type PodcastResponse = Awaited<ReturnType<PodcastQuery>>;

export const listTopPodcasts = async (query: AxiosRequestConfig = {}) =>
	getRequest<PodcastsTopResponse>(`${podcastController}/top`, query);

export const searchPodcasts = async ({
	term,
	pageParam,
	query = {},
}: {
	term: string;
	pageParam?: { offset: number };
	query?: AxiosRequestConfig;
}) =>
	getRequest<PodcastSearchResponse>(
		`${podcastController}/search?offset=${
			pageParam?.offset ?? 0
		}&limit=${PER_PAGE_DEFAULT}&term=${term}`,
		query,
	);

  export const getPodcast = async ({
    podcastId,
    pageParam,
    query = {},
  }: {
    podcastId: string;
    pageParam?: { offset: number };
    query?: AxiosRequestConfig;
  }) =>
    getRequest<PodcastResponse>(
      `${podcastController}/${podcastId}?offset=${
        pageParam?.offset ?? 0
      }&limit=${PER_PAGE_DEFAULT}`,
      query,
    );
