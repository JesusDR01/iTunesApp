import { usePlayer } from 'context/player-context';
import { Inter } from 'next/font/google';
import { ReactEventHandler, useEffect, useState } from 'react';
import VolumeInput from './VolumeInput';
import AudioProgressBar from './AudioProgressBar';
import clsx from 'clsx';
import { PlayPauseBtn } from 'components/PlayPauseBtn';
import { VolumeIcon } from './VolumeIcon';

const inter = Inter({ subsets: ['latin'] });

function formatDurationDisplay(duration: number) {
	const min = Math.floor(duration / 60);
	const sec = Math.floor(duration - min * 60);

	const formatted = [min, sec].map(n => (n < 10 ? '0' + n : n)).join(':');

	return formatted;
}

export function Player(): JSX.Element {
	const {
		useControls: [
			{ volume, randomMode, isPlaying, currentPodcast, loopMode },
			update,
		],
		audioRef,
	} = usePlayer();

	const [duration, setDuration] = useState(0);
	const [currrentProgress, setCurrrentProgress] = useState(0);
	const [buffered, setBuffered] = useState(0);
	const [isReady, setIsReady] = useState(false);

	const durationDisplay = formatDurationDisplay(duration);
	const elapsedDisplay = formatDurationDisplay(currrentProgress);

	useEffect(() => {
		audioRef.current?.pause();

		const timeout = setTimeout(() => {
			audioRef.current?.play();
		}, 500);
		setIsReady(false);
		return () => {
			clearTimeout(timeout);
		};
	}, [currentPodcast, audioRef]);
	console.log(currentPodcast)
	const handleBufferProgress: ReactEventHandler<HTMLAudioElement> = e => {
		const audio = e.currentTarget;
		const dur = audio.duration;
		if (dur > 0) {
			for (let i = 0; i < audio.buffered.length; i++) {
				if (
					audio.buffered.start(audio.buffered.length - 1 - i) <
					audio.currentTime
				) {
					const bufferedLength = audio.buffered.end(
						audio.buffered.length - 1 - i,
					);
					setBuffered(bufferedLength);
					break;
				}
			}
		}
	};

	const handleVolumeChange = (volumeValue: number) =>
		update({ type: 'volume', volume: volumeValue });

	return (
		<div
			className={clsx(
				`${inter.className}  fixed bottom-0 h-[110px] w-full  flex items-center  bg-zinc-900 `,
				currentPodcast?.episodeUrl ? 'justify-between' : 'justify-center',
			)}
		>
			{currentPodcast && (
				<audio
					key={currentPodcast.episodeUrl}
					ref={audioRef}
					preload="metadata"
					onDurationChange={e => setDuration(e.currentTarget.duration)}
					onPlaying={() => update({ type: 'play' })}
					onPause={() => update({ type: 'pause' })}
					onEnded={() => update({ type: 'end' })}
					onCanPlay={e => {
						e.currentTarget.volume = volume;
						setIsReady(true);
					}}
					onTimeUpdate={e => {
						setCurrrentProgress(e.currentTarget.currentTime);
						handleBufferProgress(e);
					}}
					onProgress={handleBufferProgress}
					onVolumeChange={e =>
						update({ type: 'volume', volume: e.currentTarget.volume })
					}
				>
					<source
						key={currentPodcast.episodeUrl}
						type="audio/mpeg"
						src={currentPodcast.episodeUrl}
					/>
				</audio>
			)}

			<section className=" flex max-md:flex-col max-md:items-stretch max-md:gap-0 w-full mr-[30px] h-[110px]">
				{currentPodcast?.imagePlayer && (
					<div className="flex flex-col items-stretch h-full w-[110px] ">
						<img
							loading="lazy"
							src={currentPodcast.imagePlayer}
							className="aspect-square object-cover object-center min-w-[110px] overflow-hidden shrink-0 max-md:mt-5"
							alt={currentPodcast.title}
						/>
					</div>
				)}
				<div className="flex flex-col items-stretch w-[22%] ml-5 max-md:w-full">
					<div className="items-start flex flex-col my-auto max-md:mt-12 pr-[59px] w-full overflow-hidden  ">
						<h2 className="text-white text-base font-medium overflow-hidden text-ellipsis w-full whitespace-nowrap h-[20px] ">
							{currentPodcast?.title}
						</h2>
						<p className="text-white text-opacity-30 text-base font-medium">
							{currentPodcast?.author}
						</p>
					</div>
				</div>
				<div className="flex flex-col items-stretch w-[61%] ml-5 max-md:w-full">
					<div className="items-start flex w-[831px] max-w-full justify-between gap-5 my-auto max-md:flex-wrap max-md:mt-12">
						<div
							className={`${inter.className} gap-[20px] flex items-center justify-center`}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="cursor-pointer"
								onClick={() =>
									update({ type: 'randomMode', randomMode: !randomMode })
								}
							>
								<g clip-path="url(#clip0_2_582)">
									<path
										d="M23.421 16.583L20.13 13.292C20.0383 13.1943 19.9279 13.1161 19.8053 13.0619C19.6827 13.0077 19.5505 12.9788 19.4166 12.9767C19.2826 12.9746 19.1496 12.9995 19.0254 13.0498C18.9012 13.1001 18.7884 13.1749 18.6937 13.2697C18.599 13.3645 18.5243 13.4773 18.474 13.6016C18.4238 13.7258 18.399 13.8588 18.4012 13.9928C18.4033 14.1268 18.4324 14.259 18.4867 14.3815C18.5409 14.504 18.6193 14.6144 18.717 14.706L21.007 17C19.7621 17.0028 18.5293 16.7566 17.381 16.2757C16.2328 15.7948 15.1924 15.0891 14.321 14.2C14.2242 14.1109 14.1106 14.0421 13.9867 13.9978C13.8629 13.9535 13.7314 13.9345 13.6001 13.9419C13.4687 13.9494 13.3403 13.9832 13.2222 14.0413C13.1042 14.0993 12.999 14.1805 12.913 14.28L12.9 14.3C12.7319 14.4956 12.6458 14.7486 12.6598 15.0061C12.6738 15.2636 12.7867 15.5058 12.975 15.682C14.0248 16.7437 15.2767 17.5843 16.6567 18.1542C18.0367 18.7241 19.517 19.0117 21.01 19L18.717 21.293C18.6125 21.3829 18.5277 21.4934 18.468 21.6176C18.4082 21.7418 18.3748 21.877 18.3698 22.0147C18.3647 22.1524 18.3882 22.2897 18.4388 22.4179C18.4893 22.5461 18.5658 22.6625 18.6635 22.7598C18.7612 22.857 18.8779 22.933 19.0063 22.983C19.1347 23.033 19.2721 23.0559 19.4098 23.0503C19.5475 23.0447 19.6826 23.0107 19.8065 22.9504C19.9304 22.8901 20.0406 22.8049 20.13 22.7L23.421 19.409C23.7953 19.034 24.0056 18.5259 24.0056 17.996C24.0056 17.4662 23.7953 16.958 23.421 16.583Z"
										fill={randomMode ? '#5c67de' : 'white'}
									/>
									<path
										d="M21.007 6.99999L18.717 9.28999C18.6975 9.31631 18.6795 9.34369 18.663 9.37199C18.5016 9.56874 18.422 9.81998 18.4407 10.0738C18.4593 10.3275 18.5748 10.5645 18.7632 10.7355C18.9516 10.9066 19.1985 10.9987 19.4529 10.9928C19.7073 10.9869 19.9497 10.8835 20.13 10.704L21.836 8.99999L23.422 7.41499C23.6902 7.14475 23.8756 6.80359 23.9566 6.43159C24.0375 6.0596 24.0106 5.67223 23.879 5.31499C23.7819 5.04154 23.6255 4.79294 23.421 4.58699L20.13 1.29999C20.0387 1.2008 19.9283 1.12109 19.8054 1.06566C19.6825 1.01023 19.5497 0.98021 19.4149 0.977418C19.2802 0.974626 19.1462 0.999113 19.0211 1.04941C18.8961 1.09971 18.7824 1.17477 18.6871 1.2701C18.5918 1.36542 18.5167 1.47903 18.4664 1.60411C18.4161 1.72918 18.3916 1.86314 18.3944 1.99792C18.3972 2.1327 18.4272 2.26552 18.4827 2.38841C18.5381 2.51129 18.6178 2.6217 18.717 2.71299L21.01 5.00499C16.077 5.01699 13.373 7.67899 10.921 10.479C8.66901 7.93699 6.00001 5.39999 1.48701 5.04599L1.00601 4.99999C0.740795 4.99999 0.486442 5.10535 0.298905 5.29288C0.111369 5.48042 0.00601196 5.73477 0.00601196 5.99999C0.0111321 6.2636 0.118133 6.51499 0.304571 6.70143C0.491009 6.88787 0.742399 6.99487 1.00601 6.99999C1.07801 6.99999 1.29301 7.03299 1.29301 7.03299C5.18901 7.32799 7.42501 9.52199 9.60001 12C7.43801 14.466 5.21701 16.7 1.35301 16.96L0.953012 16.981C0.689785 16.9974 0.44387 17.1178 0.269368 17.3155C0.0948652 17.5133 0.00606854 17.7723 0.022512 18.0355C0.0389554 18.2987 0.159292 18.5446 0.357049 18.7191C0.554806 18.8936 0.813785 18.9824 1.07701 18.966C1.23301 18.959 1.48701 18.953 1.61201 18.943C6.63201 18.556 9.35501 15.343 11.783 12.534C14.235 9.69999 16.551 7.01799 21.007 6.99999Z"
										fill={randomMode ? '#5c67de' : 'white'}
									/>
								</g>
								<defs>
									<clipPath id="clip0_2_582">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<svg
								onClick={() => update({ type: 'prev' })}
								className="cursor-pointer"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_2_587)">
									<path
										d="M4 6.56815e-06C4.553 6.56815e-06 5 0.448007 5 1.00001V8.48201L14.637 0.783007C15.875 -0.125993 17.435 -0.255993 18.81 0.440007C20.182 1.13601 21 2.46901 21 4.00701V20C21 21.538 20.182 22.872 18.809 23.568C18.232 23.86 17.62 24.008 16.992 24.008C16.149 24.008 15.335 23.737 14.604 23.199L5 15.516V22.999C5 23.551 4.553 23.999 4 23.999C3.447 23.999 3 23.551 3 22.999V1.00001C3 0.448007 3.447 6.56815e-06 4 6.56815e-06ZM5.851 13.637L15.821 21.613C16.439 22.066 17.22 22.131 17.906 21.783C18.601 21.43 19.001 20.781 19.001 20V4.00701C19.001 3.22701 18.602 2.57701 17.907 2.22501C17.604 2.07201 17.289 1.99601 16.981 1.99601C16.58 1.99601 16.19 2.12301 15.853 2.37001L5.817 10.388C5.298 10.768 5.001 11.355 5.001 11.999C5.001 12.643 5.299 13.23 5.852 13.636L5.851 13.637Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_2_587">
										<rect
											width="24"
											height="24"
											fill="white"
											transform="matrix(-1 0 0 1 24 0)"
										/>
									</clipPath>
								</defs>
							</svg>
							<PlayPauseBtn
								isLoading={Boolean(!isReady && currentPodcast?.episodeUrl)}
								onClick={() =>
									currentPodcast &&
									update({ type: isPlaying ? 'pause' : 'play' })
								}
								isPlaying={isPlaying}
								className="bg-[#5c67de] min-h-[50px] min-w-[50px] rounded-full text-white self-start  left-0 top-0"
							/>

							<svg
								onClick={() => update({ type: 'next' })}
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								className="cursor-pointer"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_2_580)">
									<path
										d="M20 6.56815e-06C19.447 6.56815e-06 19 0.448007 19 1.00001V8.48201L9.363 0.783007C8.125 -0.125993 6.565 -0.255993 5.19 0.440007C3.818 1.13601 3 2.46901 3 4.00701V20C3 21.538 3.818 22.872 5.191 23.568C5.768 23.86 6.38 24.008 7.008 24.008C7.851 24.008 8.665 23.737 9.396 23.199L19 15.516V22.999C19 23.551 19.447 23.999 20 23.999C20.553 23.999 21 23.551 21 22.999V1.00001C21 0.448007 20.553 6.56815e-06 20 6.56815e-06ZM18.149 13.637L8.179 21.613C7.561 22.066 6.78 22.131 6.094 21.783C5.399 21.43 4.999 20.781 4.999 20V4.00701C4.999 3.22701 5.398 2.57701 6.093 2.22501C6.396 2.07201 6.711 1.99601 7.019 1.99601C7.42 1.99601 7.81 2.12301 8.147 2.37001L18.183 10.388C18.702 10.768 18.999 11.355 18.999 11.999C18.999 12.643 18.701 13.23 18.148 13.636L18.149 13.637Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_2_580">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<div
								className={clsx(
									'cursor-pointer relative',
									loopMode === 'one' &&
										`
									  before:content-['1']
										before:absolute
										before:top-0
										before:right-0 
										before:bottom-0
										before:flex
										before:items-center
										before:text-center
										before:text-[1rem]
										before:left-0 
										before:z-[-1] 
										before:bg-[#5c67de] 
										before:pl-[8px]
										before:text-white
										before:rounded-full 
										before:transform
										before:scale-[0.7]
									`,
								)}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									onClick={() => {
										if (loopMode === 'none') {
											update({ type: 'loopMode', loopMode: 'all' });
										} else if (loopMode === 'one') {
											update({ type: 'loopMode', loopMode: 'none' });
										} else {
											update({ type: 'loopMode', loopMode: 'one' });
										}
									}}
								>
									<g clip-path="url(#clip0_2_585)">
										<path
											d="M21.962 12.875C21.7692 15.1548 20.8027 17.3002 19.2229 18.9552C17.6431 20.6102 15.545 21.6754 13.2766 21.9739C11.0082 22.2725 8.70586 21.7866 6.75163 20.5967C4.79739 19.4069 3.30868 17.5846 2.53249 15.4324C1.75631 13.2801 1.73929 10.9271 2.48428 8.76383C3.22926 6.60055 4.69146 4.75699 6.62829 3.53901C8.56512 2.32103 10.8602 1.80184 13.1326 2.06758C15.4051 2.33332 17.5184 3.36801 19.122 5H16C15.7348 5 15.4804 5.10536 15.2929 5.29289C15.1054 5.48043 15 5.73478 15 6C15 6.26522 15.1054 6.51957 15.2929 6.70711C15.4804 6.89464 15.7348 7 16 7H20.143C20.6354 6.99974 21.1076 6.804 21.4558 6.45581C21.804 6.10761 21.9997 5.63543 22 5.143V1C22 0.734784 21.8946 0.48043 21.7071 0.292893C21.5196 0.105357 21.2652 0 21 0C20.7348 0 20.4804 0.105357 20.2929 0.292893C20.1054 0.48043 20 0.734784 20 1V3.078C17.9887 1.28073 15.4299 0.214484 12.7375 0.0517113C10.0451 -0.111061 7.37645 0.639157 5.16325 2.18103C2.95006 3.72291 1.32169 5.96628 0.54151 8.54832C-0.23867 11.1304 -0.125041 13.9001 0.864018 16.4095C1.85308 18.919 3.65973 21.0214 5.99179 22.3768C8.32384 23.7322 11.0449 24.2614 13.715 23.8786C16.385 23.4958 18.8479 22.2236 20.7052 20.2676C22.5625 18.3116 23.7058 15.7863 23.95 13.1C23.9629 12.9607 23.9467 12.8203 23.9023 12.6877C23.858 12.555 23.7865 12.4331 23.6924 12.3296C23.5983 12.2261 23.4837 12.1434 23.3559 12.0866C23.2281 12.0299 23.0899 12.0004 22.95 12C22.706 11.9971 22.4697 12.085 22.2871 12.2468C22.1045 12.4085 21.9886 12.6325 21.962 12.875Z"
											fill={loopMode !== 'none' ? '#5c67de' : 'white'}
										/>
									</g>
									<defs>
										<clipPath id="clip0_2_585">
											<rect width="24" height="24" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>

						<div className="self-center flex grow shrink-0 basis-auto gap-3.5 my-auto max-md:max-w-full max-md:flex-wrap max-md:justify-center relative items-center">
							<div className="text-white text-base font-medium self-stretch">
								{elapsedDisplay}
							</div>
							<div className="relative w-full">
								{audioRef.current ? (
									<AudioProgressBar
										duration={duration}
										currentProgress={currrentProgress}
										buffered={buffered}
										onChange={e => {
											if (!audioRef.current) return;

											audioRef.current.currentTime =
												e.currentTarget.valueAsNumber;

											setCurrrentProgress(e.currentTarget.valueAsNumber);
										}}
									/>
								) : (
									<div className="bg-white bg-opacity-30 self-center flex  h-[5px] flex-col my-auto rounded-xl" />
								)}
							</div>
							<div className="text-white text-opacity-30 text-base font-medium self-stretch">
								{durationDisplay}
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-stretch w-[9%] ml-5 max-md:w-full">
					<div className="flex gap-3 my-auto max-md:mt-12 items-center min-w-[100px]">
						<VolumeIcon volume={volume} onVolumeChange={handleVolumeChange} />
						<VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
					</div>
				</div>
			</section>
		</div>
	);
}
