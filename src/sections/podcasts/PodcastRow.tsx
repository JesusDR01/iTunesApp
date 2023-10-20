import { Podcast } from '@modules/podcasts/domain/Podcast';
import { Typography } from '@mui/material';
import { clsx } from 'clsx';
import { PlayPauseBtn } from 'components/PlayPauseBtn';
import { usePlayer } from 'context/player-context';
import Link from 'next/link';
import React from 'react';

export const PodcastRow = ({ podcast }: { podcast: Podcast }) => {
	const {
		useControls: [{ isPlaying, currentPodcast }, update],
	} = usePlayer();
	return (
		<div
			className="flex justify-between items-center m-5 w-full gap-[20px]"
			key={podcast.episodeUrl}
		>
			<span>
				<PlayPauseBtn
					onClick={() => {
						if (
							!isPlaying ||
							currentPodcast?.episodeUrl !== podcast.episodeUrl
						) {
							update({ type: 'play' });
							update({ type: 'setPodcast', podcast: podcast });
						} else {
							update({ type: 'pause' });
						}
					}}
					isPlaying={
						currentPodcast?.episodeUrl === podcast.episodeUrl && isPlaying
					}
					className=" min-h-[15px]  min-w-[15px] rounded-full text-white self-start  left-0 top-0"
					classNamePause="bg-[#5c67de] min-h-[15px] min-w-[15px] rounded-full text-white self-start py-[3px] left-0 top-0"
				/>
			</span>

			<Link className="w-full" href={`/podcast/${podcast.id}`} key={podcast.id}>
				<div
					className={clsx(
						'grid  grid-rows-1  items-center',
						podcast.duration
							? 'grid-cols-[repeat(2,_minmax(0,_1fr))_0.5fr_0.2fr]'
							: 'grid-cols-[0.75fr_1fr_0.55fr]',
					)}
				>
					<div className="flex items-center gap-[10px]">
						<img
							alt={podcast.description}
							src={podcast.image}
							height={45}
							width={45}
							className="rounded-lg"
						/>
						<div className="max-w-[198px] h-[38px]">
							<Typography className="overflow-hidden text-ellipsis whitespace-nowrap h-[20px] text-white">
								{podcast.title}
							</Typography>
							<Typography className="overflow-hidden text-ellipsis whitespace-nowrap ">
								{podcast.author}
							</Typography>
						</div>
					</div>
					<div className="justify-center  flex">
						<Typography className="overflow-hidden text-ellipsis max-w-[210px]  break-words h-[45px] line-clamp-2  ">
							{podcast.description}
						</Typography>
					</div>
					<Typography>{podcast.released}</Typography>
					<Typography>{podcast?.duration}</Typography>
				</div>
			</Link>
		</div>
	);
};
