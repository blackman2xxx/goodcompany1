import {Backdrop, Button, Fade, Modal, Snackbar, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import React, { useState } from 'react';
import { createNewUser } from '../../config/firebase';
import './AddUserModal.css';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '40%',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		borderRadius: '5px',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch',
	},
	buttonGroup: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	button: {
		margin: '10px',
	},
}));

function AddUserModal({ users, setUsers }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [error, setError] = useState('');
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
		setError('');
	}

	async function handleAdd() {
		if (name === '') {
			setError('Vui lòng nhập tên bạn.');
		} else if (email === '') {
			setError('Vui lòng nhập địa chỉ email.');
		} else if (pass === '') {
			setError('Vui lòng nhập mật khẩu.');
		} else {
			try {
				await createNewUser({ name, email, pass });
				setUsers([...users, { name, email, pass }]);
				handleClose();
				setOpenSnackBar(true);
				setError('');
			} catch (err) {
				if (err) {
					setError(err.message);
				}
			}
		}

	}
	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar(false);
	};
	return (
		<div>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={2000}
				onClose={handleCloseSnackBar}
			>
				<Alert onClose={handleCloseSnackBar} severity='success'>
					Đã thành công thêm quản trị viên
				</Alert>
			</Snackbar>
			<Button
				variant='contained'
				color='primary'
				aria-haspopup='true'
				onClick={handleOpen}
			>
				<AddIcon />
				Thêm quản trị viên
			</Button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2>Thêm quản trị viên</h2>
						{error !== '' ? <Alert variant='filled' severity='error'>
							{error}
						</Alert> : ''}
						<form className={classes.root} noValidate autoComplete='off'>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='name'
								label='name'
								name='name'
								autoComplete='name'
								onChange={(e) => setName(e.target.value)}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='email'
								label='email'
								name='email'
								autoComplete='email'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='password'
								label='password'
								type='password'
								id='password'
								autoComplete='current-password'
								onChange={(e) => setPass(e.target.value)}
							/>

							<div className={classes.buttonGroup}>
								<Button
									variant='contained'
									color='primary'
									className={classes.button}
									onClick={handleAdd}
								>
									Thêm
								</Button>
								<Button
									variant='contained'
									className={classes.button}
									onClick={handleClose}
								>
									Hủy
								</Button>
							</div>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default AddUserModal;
