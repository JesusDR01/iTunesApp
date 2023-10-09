import { Podcast } from '../domain/Podcast';
import { PodcastDataCreate } from '../domain/PodcastDataCreate';
import { PodcastDataResponse } from '../domain/PodcastDataResponse'; 
import { PodcastRepository } from '../domain/PodcastRepository';

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

export function createApiPodcastRepository(): PodcastRepository {
	const cache = new Map<number, Podcast>();

	async function get(PodcastId: number): Promise<Podcast> {
		if (cache.has(PodcastId)) {
			return cache.get(PodcastId) as Podcast;
		}

		const response = await fetch(`${JSONPLACEHOLDER_URL}/Podcasts/${PodcastId}`);
		const Podcast = await response.json();
		cache.set(PodcastId, Podcast);

		return Podcast;
	}

	async function getAllWithPagination(
		limit: number,
		page: number,
	): Promise<Podcast[]> {
		const offset = (page - 1) * limit;
		const response = await fetch(
			`${JSONPLACEHOLDER_URL}/Podcasts?_start=${offset}&_limit=${limit}`,
		);
		const Podcasts = await response.json();

		return Podcasts;
	}

	async function getAll(): Promise<Podcast[]> {
		if (cache.size > 0) {
			return Array.from(cache.values());
		}

		const response = await fetch(`${JSONPLACEHOLDER_URL}/Podcasts`);
		const Podcasts = await response.json();

		Podcasts.forEach((Podcast: Podcast) => cache.set(Podcast.id, Podcast));

		return Podcasts;
	}

	async function getByUser(userId: number): Promise<Podcast[]> {
		if (cache.size > 0) {
			return Array.from(cache.values()).filter(Podcast => Podcast.userId === userId);
		}

		const response = await fetch(
			`${JSONPLACEHOLDER_URL}/users/${userId}/Podcasts`,
		);
		const Podcasts = await response.json();

		Podcasts.forEach((Podcast: Podcast) => cache.set(Podcast.id, Podcast));

		return Podcasts;
	}

	async function create(Podcast: PodcastDataCreate): Promise<PodcastDataResponse> {
		const { title, body, userId } = Podcast;

		const response = await fetch(`${JSONPLACEHOLDER_URL}/Podcasts`, {
			method: 'Podcast',
			body: JSON.stringify({
				title,
				body,
				userId,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});

		const createdPodcast = await response.json();

		return createdPodcast;
	}

	return {
		create,
		get,
		getAllWithPagination,
		getAll,
		getByUser,
	};
}





import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { AxiosError } from 'axios'
import type { Movie, NoMovieID } from 'types'
import { INITIAL_PAGE, PER_PAGE_DEFAULT } from './constants'

const MOVIES_URL = `${process.env.NEXT_PUBLIC_API_SERVER}/api/movies`

const getMovies = async ({
  pageParam = INITIAL_PAGE,
  filters
}:{
  pageParam?: number
  filters?: Partial<NoMovieID>
}): Promise<{
  current_page: number
  movies: ReadonlyArray<Movie>
  total_pages: number
}> => {
  const response = await axios.post(`${MOVIES_URL}/search?page=${pageParam}&per_page=${PER_PAGE_DEFAULT}`, filters)

  return  response.data
}

export const useGetMovies = (params?:{filters?:Partial<NoMovieID>}) => {
  return useInfiniteQuery(['GetMovies', params?.filters], ({pageParam}) => getMovies({filters: params?.filters, pageParam: pageParam}), {
    getPreviousPageParam: (firstPage) => firstPage.current_page - 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page + 1 > lastPage.total_pages
        ? undefined
        : lastPage.current_page + 1
    },
  })
}

interface GetMovieParams {
  readonly id: string | undefined
}

const getMovie = async ({
  movieID,
}: {
  readonly movieID: number
}): Promise<Movie> => {
  const response = await axios.get(`${MOVIES_URL}/${movieID}`)

  return response.data
}

export const useGetMovie = ({ id }: GetMovieParams) => {
  const movieID =
    typeof id === 'string' && !isNaN(Number.parseInt(id))
      ? Number.parseInt(id)
      : undefined

  return useQuery(
    ['GetMovie', id],
    () => getMovie({ movieID: movieID as number }),
    {
      refetchOnWindowFocus: false,
      enabled: movieID !== undefined,
    },
  )
}
