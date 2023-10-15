import { CircularProgress } from '@mui/material';
import { Grid } from '@mui/material';
export const Loader = ({ minHeight = '70vh' }) => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			className={`min-h-[${minHeight}]`}
			style={{ minHeight: minHeight }}
		>
			<Grid item xs={3}>
				<CircularProgress className="!text-white" />
			</Grid>
		</Grid>
	);
};
