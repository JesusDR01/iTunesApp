import React from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import { CircularProgress } from '@mui/material';
import { clsx } from 'clsx';
export const PlayPauseBtn = ({
	isLoading,
	isPlaying,
	className,
	classNamePause,
	classNamePlay,
	onClick,
}: {
	isLoading?: boolean;
	isPlaying: boolean;
	className?: string;
	onClick?: () => void;
	classNamePause?: string;
	classNamePlay?: string;
}) => {
	if (isLoading) {
		return (
			<div className={clsx(className, 'flex items-center justify-center')}>
				<CircularProgress className={clsx('!text-white')} />
			</div>
		);
	}
	return (
		<span onClick={onClick} className="cursor-pointer" data-testid="play-pause">
			{isPlaying ? (
				<PauseIcon className={classNamePause || className} />
			) : (
				<PlayIcon className={classNamePlay || className} />
			)}
		</span>
	);
};
