import React, { useRef } from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export const VolumeIcon = ({
	volume,
	onVolumeChange: handleVolumeChange,
}: {
	volume: number;
	onVolumeChange: (volume: number) => void;
}) => {
	const previousVolume = useRef(volume);
	return (
		<span className='cursor-pointer'>
			{volume === 0 ? (
				<VolumeOffIcon
					onClick={() => handleVolumeChange(previousVolume.current || 1)}
				/>
			) : (
				<VolumeUpIcon
				className="text-white"
					onClick={() => {
						previousVolume.current = volume;
						handleVolumeChange(0);
					}}
				/>
			)}
		</span>
	);
};
