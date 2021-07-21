import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core';
import coverApp from '../../images/cover.png';

const useStyles = makeStyles((theme) => ({
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundImage: `url(${coverApp})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		marginTop: theme.spacing(2),
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},
	mainFeaturedPostContent: {
		position: 'relative',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
}));

export default function MainFeaturedCompany() {
	const classes = useStyles();

	return (
		<Paper className={classes.mainFeaturedPost}>
			{
				<img style={{ display: 'none' }}
				/>
			}
			<div className={classes.overlay} />
			<Grid container>
				<Grid item md={6}>
					<div className={classes.mainFeaturedPostContent}>
						<Typography
							component='h2'
							variant='h3'
							color='inherit'
							gutterBottom
							style={{ height: 10, marginTop: 100, marginBottom:100 }}
						>
							Giúp bạn hiểu rõ hơn về các doanh nghiệp
						</Typography>
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
}


