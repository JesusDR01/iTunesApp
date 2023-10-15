interface VolumeInputProps {
	volume: number;
	onVolumeChange: (volume: number) => void;
}

interface VolumeInputCssProps extends React.CSSProperties {
	'--volume-width': number;
}

export default function VolumeInput({
	volume,
	onVolumeChange,
}: VolumeInputProps) {
	const volumeStyles: VolumeInputCssProps = {
		'--volume-width': volume,
	};

	return (
		<div className="relative w-full">
			<div className="absolute h-1 -top-[4px] left-0 right-0 group">
				<input
					aria-label="volume"
					name="volume"
					type="range"
					min={0}
					step={0.05}
					max={1}
					value={volume}
					style={volumeStyles}
					// className="w-[80px] m-0 h-2 rounded-full accent-amber-600 bg-gray-700 appearance-none cursor-pointer"
					className={`
					absolute 
					w-full 
					bg-transparent 
					appearance-none 
					cursor-pointer
					rounded-l-md
					overflow-hidden
	
					[&::-webkit-slider-runnable-track]:rounded-full
				[&::-webkit-slider-runnable-track]:bg-black/25 
					[&::-webkit-slider-thumb]:h-[5px] 
					[&::-webkit-slider-thumb]:w-[5px]
					[&::-webkit-slider-thumb]:appearance-none 
					[&::-webkit-slider-thumb]:rounded-full
	
					before:absolute 
					before:inset-0 
				before:bg-[#ffff] 
					before:origin-left 
					before:scale-x-[var(--volume-width)] 
					before:z-[4] 			
				`}
					onChange={e => {
						onVolumeChange(e.currentTarget.valueAsNumber);
					}}
				/>
			</div>
		</div>
	);
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Slider from '@mui/material/Slider';
// import MuiInput from '@mui/material/Input';
// import VolumeUp from '@mui/icons-material/VolumeUp';

// const Input = styled(MuiInput)`
//   width: 42px;
// `;

// export default function InputSlider() {

//   const handleSliderChange = (event: Event, newValue: number | number[]) => {

//   };

//   return (
//     <Box sx={{ width: 250 }}>
//       <Typography id="input-slider" gutterBottom>
//         Volume
//       </Typography>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item>
//           <VolumeUp />
//         </Grid>
//         <Grid item xs>
//           <Slider
//             value={typeof value === 'number' ? value : 0}
//             onChange={() => setValue(newValue as number);}
//             aria-labelledby="input-slider"
//           />
//         </Grid>
//         <Grid item>
//           <Input
//             value={value}
//             size="small"
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 10,
//               min: 0,
//               max: 100,
//               type: 'number',
//               'aria-labelledby': 'input-slider',
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// // transition-all   accent-white
// // before:absolute before:inset-0 before:h-full before:w-full before:bg-[#ffff] before:origin-left
// // before:absolute before:h-full before:w-full before:bg-[grey] before:rounded-r-md before:scale-x-[var(--buffered-width)]
// // before:z-[3] before:scale-x-[var(--volume-width)] before:z-[4] before:origin-left
