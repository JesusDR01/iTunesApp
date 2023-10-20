import InputBase from '@mui/material/InputBase';
import { useSearch } from 'context/search-context';
import { useEffect, useRef } from 'react';

export function Searchbar(): JSX.Element {
	const {
		useSearch: [search, setSearch],
	} = useSearch();
	const inputRef = useRef<HTMLInputElement | null>();
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current?.focus();
		}
	}, [inputRef]);

	return (
		<div className="w-full  bg-[#1a1a1a]  flex items-center h-[50px] !text-white placeholder:text-white relative rounded-[15px]  px-[20px]">
			<svg
				className="inline-block mr-[16px]"
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M19.7558 18.5775L14.7816 13.6033C16.1371 11.9455 16.8036 9.83008 16.6431 7.69464C16.4827 5.55919 15.5076 3.56711 13.9196 2.13044C12.3316 0.69376 10.2521 -0.0775884 8.11131 -0.0240619C5.97052 0.0294646 3.93219 0.903771 2.41795 2.41801C0.90371 3.93225 0.0294036 5.97058 -0.0241229 8.11137C-0.0776494 10.2522 0.693699 12.3316 2.13037 13.9197C3.56705 15.5077 5.55913 16.4828 7.69457 16.6432C9.83002 16.8037 11.9454 16.1372 13.6033 14.7817L18.5774 19.7558C18.7346 19.9076 18.9451 19.9916 19.1636 19.9897C19.3821 19.9878 19.5911 19.9002 19.7456 19.7457C19.9001 19.5912 19.9878 19.3822 19.9897 19.1637C19.9916 18.9452 19.9076 18.7347 19.7558 18.5775ZM8.33327 15C7.01473 15 5.7258 14.609 4.62947 13.8765C3.53314 13.1439 2.67866 12.1027 2.17408 10.8846C1.66949 9.66638 1.53747 8.32594 1.7947 7.03273C2.05194 5.73953 2.68688 4.55164 3.61923 3.61929C4.55158 2.68694 5.73947 2.052 7.03267 1.79477C8.32588 1.53753 9.66632 1.66955 10.8845 2.17414C12.1027 2.67872 13.1439 3.53321 13.8764 4.62953C14.6089 5.72586 14.9999 7.01479 14.9999 8.33333C14.998 10.1008 14.2949 11.7954 13.0451 13.0452C11.7953 14.295 10.1008 14.998 8.33327 15Z"
					fill="white"
				/>
			</svg>

			<InputBase
				inputRef={inputRef}
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder="podcast"
				className="!text-white h-[20px] w-full"
			/>
		</div>
	);
}
