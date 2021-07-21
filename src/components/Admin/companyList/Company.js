import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Typography,
	Grid,
	Card,
	CardActionArea,
	CardContent,
	CardActions,
	Button,
	CardMedia,
} from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import RemoveIcon from '@material-ui/icons/DeleteOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import BusinessIcon from '@material-ui/icons/Business';
import LanguageIcon from '@material-ui/icons/Language';
import ModalCompany from './ModalCompany';
import defaultLogo from '../../../images/sample-logo.png';

const useStyles = makeStyles({
	card: {
		display: 'flex',
		height: 'auto',
	},
	cardActionArea: {
		display: 'flex',
	},
	companyDetails: {
		flex: 1,
	},
	cardMedia: {
		width: 160,
		height: '100%',
	},
	title: {
		display: 'flex',
		paddingRight: 10,
		marginBottom: 10,
	},
	oneCompany: {
		marginTop: 10,
		marginBottom: 10,
	},
	companyInfo__location: {
		display: 'flex',

	},
	companyInfo__type: {
		display: 'flex',

	},
	companyInfo__site: {
		display: 'flex',
	},
});

export default function Company(props) {
	const classes = useStyles();
	const company = props.company;

	const totalStar = [0, 0, 0, 0, 0];
	const fillStar = (stars) => {
		for (let i = 0; i < stars; i++) {
			totalStar[i] = 1;
		}
	};
	const resetStar = () => {
		totalStar.map((i) => 0);
	};

	const handleRemove = async (item) => {
		await props.onRemove(item);
		props.setOpenSnackBar(true);
	};

	return (
		<Grid item xs={12} className={classes.oneCompany}>
			<Card className={classes.card}>
				<CardActionArea
					component='a'
					href='#'
					className={classes.cardActionArea}
				>
					<CardMedia
						className={classes.cardMedia}
						image={company.logo !== "" ? company.logo : defaultLogo}
						title={company.name + '-text'}
					/>
					<CardContent className={classes.companyDetails}>
						<Typography
							className={classes.title}
							component='h2'
							variant='h5'
							style={{ color: '#1188b8' }}>
							{company.name}
						</Typography>
						{fillStar(company.rating)}
						{totalStar.map((i) =>
							i == 1 ? (
								<GradeIcon style={{ color: 'yellow' }} />
							) : (
								<StarOutlineIcon />
							)
						)}
						{resetStar()}
						<div className={classes.companyInfo__type}>
							<WorkOutlineIcon />
							<Typography variant='subtitle1' color='textSecondary'>
								{company.type}
							</Typography>
						</div>
						<div className={classes.companyInfo__site}>
							<LanguageIcon />
							<a href={company.site} target="_blank" style={{ fontSize: 16, color: '#34a8eb' }}>
								{company.site}
							</a>
						</div>
						<div className={classes.companyInfo__location}>
							<BusinessIcon />
							<Typography variant='subtitle1' color='textSecondary'>
								{company.address}
							</Typography>
						</div>
					</CardContent>
				</CardActionArea>

				<CardActions>
					<ModalCompany
						className={classes.btn}
						company={company}
						title='Modify'
						onUpdate={props.onUpdate}
					/>
					<Button
						variant='contained'
						color='secondary'
						size='small'
						style={{ width: 100 }}
						onClick={() => handleRemove(company)}
					>
						<RemoveIcon />
						Xóa công ty
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}
