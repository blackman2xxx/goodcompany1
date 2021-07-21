import React, {useEffect} from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import CancleIcon from '@material-ui/icons/CancelOutlined';
import {
	Modal,
	Button,
	Paper,
	Typography,
	Input,
	Grid,
	Select,
	MenuItem,
	CardActions,
	Snackbar, CardMedia,
} from '@material-ui/core';
import { uploadImage } from '../../config/firebase';
import Alert from '@material-ui/lab/Alert';
import useCoStorage from '../../hooks/coStorage';
import defaultLogo from "../../images/sample-logo.png";
const useStyles = makeStyles((theme) => ({
	modalStyle: {
		position: 'absolute',
		width: '40%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	modalTitle: {
		textAlign: 'center',
	},
	modalForm: {
		margin: theme.spacing(3, 4, 0, 0),
		width: '100%',
	},
	formInput: {
		width: '100%',
		marginBottom: theme.spacing(3),
	},
	modalAction: {
		justifyContent: 'center',
	},
	companyLogo: {
		width: 160,
		height: 200,
	},
}));

const types = ['Công nghệ', 'Thương mại', 'Khác'];

export default function ModalRequestNewCompany(props) {
	const classes = useStyles();
	const [companies, addCompany, updateCompany, removeCompany] = useCoStorage();
	const [company, setCompany] = useState(props.company);
	const [open, setOpen] = React.useState(false);
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [reload, setReload] = React.useState(false);
	const [error, setError] = React.useState('');
	const [fileUpload, setFileUpload] = React.useState('');
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setCompany(props.company);
		setOpen(false);
		setError('');
	};

	const handleChange = (event) => {
		setCompany({
			...company,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeLogo = async (event) => {
		setFileUpload(event.target.files[0]);
	};

	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar(false);
	};
	const handleSumit = async () => {
		const urlLogo = fileUpload && (await uploadImage(fileUpload));
		if (urlLogo === "") {
		} else {
			setCompany({
				...company,
				logo: urlLogo,
			});
		}
		props.onAddSubmit({
			...company,
			logo: urlLogo ? urlLogo : company.logo,
		});
		setOpen(false);
		setOpenSnackBar(true);
		setReload(!reload);
		setCompany(props.company);
		setError('');
	};
	const checkExist = (key, data) => {
		let check = false;
		companies.map((i) => {
			if (i[key] == data) {
				check = true;
			}
		});
		return check;
	};
	const onValidate = () => {
		setError('');
		if (!company.name) {
			setError('Vui lòng nhập tên công ty.');
		} else if (checkExist('name', company.name)) {
			setError('Tên công ty đã tồn tại.');
		} else if (!company.site) {
			setError('Vui lòng nhập website của công ty.');
		} else if (checkExist('site', company.site)) {
			setError('Website đã tồn tại.');
		} else {
			handleSumit();
		}
	};
	return (
		<div>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={2000}
				onClose={handleCloseSnackBar}
			>
				<Alert onClose={handleCloseSnackBar} severity='success'>
					Đã thành công yêu cầu thêm công ty
				</Alert>
			</Snackbar>
			<Button
				variant='outlined'
				size='small'
				aria-haspopup='true'
				onClick={handleOpen}
			>
				{props.title !== 'New' ? 'Chỉnh sửa' : 'Yêu cầu thêm công ty'}
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Paper className={classes.modalStyle}>
					<Typography
						component='h4'
						variant='h5'
						className={classes.modalTitle}
					>
						{props.title !== 'New' ? 'Chỉnh sửa' : 'Yêu cầu thêm công ty'}
					</Typography>
					{error !== '' ?
						<Alert variant='filled' severity='error'>
							{error}
						</Alert> : ''}
					<form className={classes.modalForm}>
						<Typography>Tên công ty</Typography>
						<Input
							placeholder='Tên công ty'
							value={company.name}
							name='name'
							id='name'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Typography>Địa chỉ</Typography>
						<Input
							placeholder='Địa chỉ'
							value={company.address}
							name='address'
							id='address'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Typography>Website</Typography>
						<Input
							placeholder='Website'
							value={company.site}
							name='site'
							id='site'
							className={classes.formInput}
							onChange={handleChange}
						/>
						<Grid container>
							<Grid item xs={3}>
								<Typography>Phân loại</Typography>
							</Grid>
							<Grid item xs={9}>
								<Select
									value={company.type}
									name='type'
									id='type'
									onChange={handleChange}
									input={<Input className={classes.formInput} />}
								>
									{types.map((type) => (
										<MenuItem value={type}>{type}</MenuItem>
									))}
								</Select>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={3}>
								<Typography>Logo</Typography>
							</Grid>
							<Grid item xs={9}>
								<Input
									id='logo'
									name='logo'
									type='file'
									className={classes.formInput}
									onChange={handleChangeLogo}
								/>
							</Grid>
						</Grid>
						<Grid container className={classes.modalAction}>
							<CardActions>
								<Button
									variant='contained'
									color='primary'
									size='small'
									onClick={() => onValidate()}
								>
									<DoneIcon />
									Gửi yêu cầu
								</Button>
								<Button
									variant='contained'
									color='secondary'
									size='small'
									onClick={handleClose}
								>
									<CancleIcon />
									Hủy
								</Button>
							</CardActions>
						</Grid>
					</form>
				</Paper>
			</Modal>
		</div>
	);
}
