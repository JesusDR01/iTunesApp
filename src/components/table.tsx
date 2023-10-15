import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import Paper from '@mui/material/Paper';

import { visuallyHidden } from '@mui/utils';

interface Data {
	'#': string;
	name: string;
	description: string;
	released: string;
	time?: number;
}

function createData(
	name: string,
	description: string,
	released: string,
	time?: number,
): Data {
	return {
		'#': '#',
		name,
		description,
		released: released,
		time,
	};
}

const rows = [
	createData('Cupcake', '305', '3.7'),
	createData('Donut', '452', '25.0'),
	createData('Eclair', '262', '16.0'),
	createData('Frozen yoghurt', '159', '6.0'),
	createData('Gingerbread', '356', '16.0'),
	createData('Honeycomb', '408', '3.2'),
	createData('Ice cream sandwich', '237', '9.0'),
	createData('Jelly Bean', '375', '0.0'),
	createData('KitKat', '518', '26.0'),
	createData('Lollipop', '392', '0.2'),
	createData('Marshmallow', '318', '0'),
	createData('Nougat', '360', '19.0'),
	createData('Oreo', '437', '18.0'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof string>(
	order: Order,
	orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number,
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string | JSX.Element;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: '#',
		numeric: false,
		disablePadding: true,
		label: '#',
	},
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'name',
	},
	{
		id: 'description',
		numeric: true,
		disablePadding: false,
		label: 'Description',
	},
	{
		id: 'released',
		numeric: true,
		disablePadding: false,
		label: 'Released',
	},
	{
		id: 'time',
		numeric: true,
		disablePadding: false,
		label: (
			<svg
				width="14"
				height="14"
				viewBox="0 0 14 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7 14C3.14008 14 0 10.8599 0 7C0 3.14008 3.14008 0 7 0C10.8599 0 14 3.14008 14 7C14 10.8599 10.8599 14 7 14ZM7 1.16667C3.7835 1.16667 1.16667 3.7835 1.16667 7C1.16667 10.2165 3.7835 12.8333 7 12.8333C10.2165 12.8333 12.8333 10.2165 12.8333 7C12.8333 3.7835 10.2165 1.16667 7 1.16667ZM9.91667 7C9.91667 6.67742 9.65592 6.41667 9.33333 6.41667H7.58333V3.5C7.58333 3.17742 7.322 2.91667 7 2.91667C6.678 2.91667 6.41667 3.17742 6.41667 3.5V7C6.41667 7.32258 6.678 7.58333 7 7.58333H9.33333C9.65592 7.58333 9.91667 7.32258 9.91667 7Z"
					fill="white"
					fill-opacity="0.3"
				/>
			</svg>
		),
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data,
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		order,
		orderBy,

		onRequestSort,
	} = props;
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
          className="!text-white/30"
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default function EnhancedTable() {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<Data[] | undefined>(undefined);
	const visibleRows = React.useMemo(
		() => stableSort<Data>(rows, getComparator<Data>(order, orderBy)),
		[order, orderBy],
	);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property?: keyof Data,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }} className="!bg-transparent">
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										role="checkbox"
                    
										tabIndex={-1}
										key={row.description}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell
											component="th"
                      className="!text-white"
											id={labelId}
											scope="row"
											padding="none"
										>
											{row.name}
										</TableCell>
										<TableCell  className="!text-white" align="right">{row.description}</TableCell>
										<TableCell className="!text-white" align="right">{row.released}</TableCell>
										<TableCell className="!text-white" align="right">{row.time}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	);
}
