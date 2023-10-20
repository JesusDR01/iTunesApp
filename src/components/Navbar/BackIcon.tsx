import Link from 'next/link';
import React, { useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSearch } from 'context/search-context';

export const BackIcon = () => {
	const {
		useSearch: [, setSearch],
	} = useSearch();

	useEffect(() => {
		return () => {
			setSearch('');
		};
	}, [setSearch]);

	return (
		<Link
			className="bg-zinc-900 justify-center items-center h-[50px] flex flex-col px-5 rounded-2xl"
			href={'/'}
		>
			<span className="">
				<ArrowBackIosIcon className="text-white" />
			</span>
		</Link>
	);
};
