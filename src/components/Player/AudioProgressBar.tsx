import { clsx } from 'clsx';
interface ProgressCSSProps extends React.CSSProperties {
	'--progress-width': number;
	'--buffered-width': number;
}

interface AudioProgressBarProps
	extends React.ComponentPropsWithoutRef<'input'> {
	duration: number;
	currentProgress: number;
	buffered: number;
}

export default function AudioProgressBar(props: AudioProgressBarProps) {
	const { duration, currentProgress, buffered, ...rest } = props;

	const progressBarWidth = isNaN(currentProgress / duration)
		? 0
		: currentProgress / duration;
	const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

	const progressStyles: ProgressCSSProps = {
		'--progress-width': progressBarWidth,
		'--buffered-width': bufferedWidth,
	};

	return (
		<div className="absolute h-1 -top-[4px] left-0 right-0 group">
			<input
				type="range"
				name="progress"
				className={clsx(`
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
        before:scale-x-[var(--progress-width)] 
        before:z-[4] 

        after:absolute
        after:h-full
        after:w-full
      after:bg-[grey] 
        after:rounded-r-md 
        after:scale-x-[var(--buffered-width)] 
        after:z-[3]
        after:origin-left
          `)}
				style={progressStyles}
				min={0}
				max={duration}
				value={currentProgress}
				{...rest}
			/>
		</div>
	);
}

/**
        [&::-webkit-slider-thumb]:appearance-none
 * 
 */
