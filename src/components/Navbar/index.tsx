import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Searchbar } from './SearchBar';

export function Navbar(): JSX.Element {
	const router = useRouter();
	console.log(router.asPath);
	return (
		<div className="relative w-[842px] m-auto h-[100px] flex bg-transparent items-center gap-[15px] ">
			{router.asPath !== '/' && (
				<Link
					className="bg-zinc-900 justify-center items-center h-[50px] flex flex-col px-5 rounded-2xl"
					href={'/'}
				>
					<span className="">
						<ArrowBackIosIcon className="text-white" />
					</span>
				</Link>
			)}
			{router.asPath !== '/' ? (
				<Link href={'/'} className="w-full">
					<Searchbar />
				</Link>
			) : (
				<Searchbar />
			)}
		</div>
	);
}
