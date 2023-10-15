import React from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
export const PlayPauseBtn = ({
	isPlaying,
	className,
  classNamePause,
  classNamePlay,
	onClick,
}: {
	isPlaying: boolean;
	className?: string;
	onClick?: () => void;
  classNamePause?: string;
  classNamePlay?: string;
}) => {
	return (
		<span onClick={onClick} className="cursor-pointer">
			{isPlaying ? (
				<PauseIcon className={classNamePause ||  className} />
			) : (
				<PlayIcon className={classNamePlay || className} />
			)}
		</span>
	);
};
