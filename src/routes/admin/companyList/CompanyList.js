import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, Container, Grid, Snackbar} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import AdminHeader from '../../../components/Admin/Header';
import ModalCompany from '../../../components/Admin/companyList/ModalCompany';
import Company from '../../../components/Admin/companyList/Company';
import Footer from '../../../components/Company/Footer';
import { useAuth } from '../../../contexts/AuthContext';
import useCoStorage from '../../../hooks/coStorage';
import Search from '../../../components/Company/Search';
import defaultLogo from '../../../images/sample-logo.png';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(3),
	},
	oneRow: {
		marginTop: theme.spacing(2),
	},
	addBtn: {
		textAlign: 'right',
		width: 'max-content',
	},
	mainPage: {
		maxWidth: 'lg',
		minHeight: 600,
	},
}));

export default function CompanyList() {
	const classes = useStyles();
	const { currentUser } = useAuth();
	const [companies, addCompany, updateCompany, removeCompany, companiesActive] =
		useCoStorage();

	const limitPerPage = 5;
	const [page, setPage] = React.useState(1);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [listCompany, setListCompany] = React.useState([]);
	const [listCompanyUpdate, setListCompanyUpdate] = React.useState([]);
	const [numberPage, setNumberPage] = React.useState(1);
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const company = {
		name: '',
		address: '',
		site: '',
		type: 'その他',
		rating: 0,
		logo: defaultLogo,
		is_active: 1,
		totalReview: 0,
	};

	const handleChangePage = (event, value) => {
		setPage(value);
	};
	useEffect(() => {
		setListCompanyUpdate(companiesActive);
	}, [companiesActive]);
	useEffect(() => {
		setListCompany(
			listCompanyUpdate.slice(
				(page - 1) * limitPerPage,
				(page - 1) * limitPerPage + limitPerPage
			)
		);
	}, [page, listCompanyUpdate]);
	useEffect(() => {
		setNumberPage(
			parseInt(listCompanyUpdate.length / limitPerPage) * limitPerPage <
				listCompanyUpdate.length
				? parseInt(listCompanyUpdate.length / limitPerPage) + 1
				: parseInt(listCompanyUpdate.length / limitPerPage)
		);
	}, [listCompanyUpdate]);
	const handleSearch = (keyword) => {
		try {
			setSearchKeyword(keyword);
			const newListCompany = companiesActive;
			const listFilteredCompanies = newListCompany.filter((company) =>
				company.name.toLowerCase().includes(keyword.toLowerCase())
			);
			setListCompanyUpdate(listFilteredCompanies);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAdd = (item) => {
		addCompany(item);
	};

	const checkExist = (key, data) => {
		let check = false;
		companies.map((i) => {
			if (i[key] === data) {
				check = true;
			}
		});
		return check;
	};
	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar(false);
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<Container className={classes.mainPage}>
				<AdminHeader username={currentUser.email} />
				<Grid container className={classes.oneRow}>
					<Grid item xs={8}>
						<Search search={handleSearch} />
					</Grid>
					<Grid item xs={4} className={classes.addBtn}>
						<ModalCompany
							key={company.name}
							company={company}
							title='New'
							onAddSubmit={handleAdd}
							onCheckValidate={checkExist}
						/>
					</Grid>
				</Grid>

				<Grid container className={classes.oneRow}>
					{listCompany.length > 0 &&
						listCompany.map((co, i) => (
							<Company
								key={co.name}
								company={co}
								onUpdate={updateCompany}
								onRemove={removeCompany}
								setOpenSnackBar = {setOpenSnackBar}
							/>
						))}
					<Pagination
						count={numberPage}
						variant='outlined'
						shape='rounded'
						page={page}
						onChange={handleChangePage}
					/>
				</Grid>
				<Snackbar
					open={openSnackBar}
					autoHideDuration={2000}
					onClose={handleCloseSnackBar}
				>
					<Alert onClose={handleCloseSnackBar} severity='success'>
						Đã thành công xóa công ty.
					</Alert>
				</Snackbar>
			</Container>
			<Footer title='Team 2' description='From team 2 with love' />
		</React.Fragment>
	);
}
