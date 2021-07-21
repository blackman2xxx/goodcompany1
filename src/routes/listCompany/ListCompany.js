import { Container, CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import FeaturedPost from '../../components/Company/FeaturedCompany';
import Footer from '../../components/Company/Footer';
import Header from '../../components/Company/Header';
import AdminHeader from '../../components/Admin/Header';
import MainFeaturedPost from '../../components/Company/MainFeaturedCompany';
import Search from '../../components/Company/Search';
import { getCompaniesActive } from '../../config/firebase';
import useCoStorage from '../../hooks/coStorage';
import { useAuth } from '../../contexts/AuthContext';
const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(3),
		justifyContent: 'center',
	},
}));

export default function ListCompany() {
	const classes = useStyles();
	const limitPerPage = 5;
	const [page, setPage] = React.useState(1);
	const [numberPage, setNumberPage] = React.useState(1);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [listCompany, setListCompany] = React.useState([]);
	const [companies, addCompany, updateCompany, removeCompany, companiesActive] =
		useCoStorage();
	const [listCompanyUpdate, setListCompanyUpdate] = React.useState([]);
	const { currentUser } = useAuth();
	const handleChange = (event, value) => {
		setPage(value);
		console.log(value);
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
	async function handleSearch(keyword) {
		try {
			setSearchKeyword(keyword);
			const newListCompany = await getCompaniesActive();
			const listFilteredCompanies = newListCompany.filter((company) =>
				company.name.toLowerCase().includes(keyword.toLowerCase())
			);
			setListCompanyUpdate(listFilteredCompanies);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSort(sortValue) {
		function sortRating(company1, company2) {
			if (sortValue === 'desc') {
				return company1.rating - company2.rating;
			} else {
				return company2.rating - company1.rating;
			}
		}
		try {
			const newListCompany = await getCompaniesActive();
			let listSortedCompanies = newListCompany;
			if (searchKeyword !== '') {
				listSortedCompanies = newListCompany.filter((company) =>
					company.name.toLowerCase().includes(searchKeyword.toLowerCase())
				);
			}
			listSortedCompanies.sort(sortRating);
			setListCompanyUpdate(listSortedCompanies);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth='lg'>
				{currentUser ? (
					<AdminHeader username={currentUser.email} />
				) : (
					<Header />
				)}
				<main>
					<MainFeaturedPost />
					<Search search={handleSearch} sort={handleSort} />
					<Grid className={classes.mainGrid}>
						<Grid>
							<Pagination
								count={numberPage}
								variant='outlined'
								shape='rounded'
								page={page}
								onChange={handleChange}
							/>
							{listCompany.length > 0 &&
								listCompany.map((co, i) => (
									<FeaturedPost
										key={i}
										company={co}
										onUpdate={updateCompany}
										onRemove={removeCompany}
									/>
								))}
							<Pagination
								count={numberPage}
								variant='outlined'
								shape='rounded'
								page={page}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
				</main>
			</Container>
			<Footer title='Bùi Anh Tú' description='Đánh giá công ty' />
		</React.Fragment>
	);
}
