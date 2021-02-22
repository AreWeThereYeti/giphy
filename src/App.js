import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import MenuItem from '@material-ui/core/MenuItem';
import { Select, Button } from '@material-ui/core';

import { fetchImages } from './utils/giphy';
import _debounce from 'lodash.debounce';

const PLACEMENTS = {
	CENTER_TOP: 'center top',
	CENTER_BOTTOM: 'center bottom',
	CENTER: 'center',
};

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function App() {
	const classes = useStyles();
	const [placement, setPlacement] = useState(PLACEMENTS.CENTER_TOP);
	const [images, setImages] = useState([]);

	const debouncedFetchImages = _debounce(
		(q) => {
			setImages([]);
			fetchImages(q).then((images) => {
				setImages(images);
			});
		},
		300,
		{
			leading: true,
			trailing: false,
		},
	);

	const handleOnChange = (e) => {
		const value = e?.target?.value;

		if (!value) return;

		debouncedFetchImages(value);
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							onChange={handleOnChange}
							fullWidth
							variant="outlined"
							label="Search field"
							type="search"
						/>
					</Grid>
					<Grid item xs={3}>
						<Select
							value={placement}
							onChange={(e) => {
								setPlacement(e.target.value);
							}}>
							<MenuItem value={PLACEMENTS.CENTER_TOP}>Center top</MenuItem>
							<MenuItem value={PLACEMENTS.CENTER_BOTTOM}>
								Center bottom
							</MenuItem>
							<MenuItem value={PLACEMENTS.CENTER}>Center</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={3}>
						<Button variant="contained">Fetch 3 more</Button>
					</Grid>
				</Grid>
				<Grid container justify="flex-end">
					<GridList cellHeight={160} className={classes.gridList} cols={3}>
						{images.map((image) => (
							<GridListTile key={image.title}>
								<img src={image.url} alt={image.title} />
								<GridListTileBar title={image.title} />
							</GridListTile>
						))}
					</GridList>
				</Grid>
			</div>
		</Container>
	);
}
