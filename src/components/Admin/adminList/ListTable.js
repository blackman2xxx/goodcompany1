import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
	},
	button: {
		marginRight: theme.spacing(1),
	},
}));

export default function ListTable({ users }) {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='center'>STT</TableCell>
						<TableCell align='center'>Tên</TableCell>
						<TableCell align='center'>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user, index) => (
						<TableRow key={index}>
							<TableCell align='center'>{index + 1}</TableCell>
							<TableCell align='center'>{user.name}</TableCell>
							<TableCell align='center'>{user.email}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
