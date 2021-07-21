import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Typography,
	Grid,
	Card,
	CardActionArea,
	CardContent,
	CardActions,
	IconButton,
	CardMedia, Snackbar,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import BusinessIcon from '@material-ui/icons/Business';
import defaultLogo from '../../../images/sample-logo.png';
import LanguageIcon from '@material-ui/icons/Language';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
	center: {
		margin: 'auto',
		marginTop: '30px',
	},
	card: {
		display: 'flex',
		height: 'auto'
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
export default function AddRequest({ companies, handleAccept, handleReject,setOpenSnackBar,setCheck}) {
	const classes = useStyles();
	return (
		<Grid container className={classes.oneRow}>
			{companies.map((company) => (
				<Grid
					item
					xs={12}
					className={classes.oneCompany}
					key={company.id}
					id={'company-card-' + company.id}
				>
					<Card className={classes.card}>
						<CardActionArea className={classes.cardActionArea}>
							<CardMedia
								className={classes.cardMedia}
								image={
									company.logo !== "" ? company.logo : defaultLogo
								}
								title={company.name + '-text'}
							/>
							<CardContent className={classes.companyDetails}>
								<Typography
									className={classes.title}
									component='h2'
									variant='h5'
									style={{ color: '#1188b8' }}
								>
									{company.name}
								</Typography>
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
							<IconButton
								variant='contained'
								color='primary'
								fontSize='large'
								onClick={() => {handleAccept(company);setCheck(0);setOpenSnackBar(true);}}
							>
								<AddCircleIcon />
							</IconButton>
							<IconButton
								variant='contained'
								color='secondary'
								fontSize='large'
								onClick={() => {handleReject(company);setCheck(1);setOpenSnackBar(true);}}
							>
								<CancelIcon />
							</IconButton>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
