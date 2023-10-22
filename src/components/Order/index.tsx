import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

export const Order = ({
	className,
	duration,
	handleSort,
}: {
	duration: boolean;
	handleSort: (sort: string) => void;
	className?: string;
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={clsx('cursor-default ', className)}>
			<span className="text-white " onClick={handleClick}>
				Order By <KeyboardArrowDownIcon />
			</span>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				onClick={e => {
					if (e.target instanceof HTMLLIElement) {
						handleSort(e.target.dataset.sort?.toString() || '');
						setAnchorEl(null);
					}
				}}
			>
				<MenuItem data-sort="Title">Title</MenuItem>
				<MenuItem data-sort={'Topic'}>Topic</MenuItem>
				<MenuItem data-sort={'Released'}>Released</MenuItem>
				{duration && <MenuItem data-sort={'Duration'}>Duration</MenuItem>}
			</Menu>
		</div>
	);
};
