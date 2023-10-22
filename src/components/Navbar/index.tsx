import Link from 'next/link';
import { useRouter } from 'next/router';

import { Searchbar } from './SearchBar';
import { BackIcon } from './BackIcon';

export function Navbar(): JSX.Element {
	const router = useRouter();

	return (
		<div className="relative w-[842px] m-auto h-[100px] flex bg-transparent items-center gap-[15px] ">
			{router.asPath !== '/' && <BackIcon />}
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
