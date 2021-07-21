import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	Toolbar,
	Grid,
	Button,
	Tabs,
	Tab,
	Menu,
	MenuItem,
} from '@material-ui/core/';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/AddCircle';
import UserIcon from '@material-ui/icons/AccountCircle';
import DropDownIcon from '@material-ui/icons/ArrowDropDown';
import CompanyIcon from '@material-ui/icons/BusinessOutlined';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbarTitle: {
		flex: 1,
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0,
	},
	userArea: {
		textAlign: 'right',
		paddingTop: 20,
	},
	homeLogo: {
		textAlign: 'center',
		paddingTop: 25,
	},
}));

export default function Header(props) {
	const classes = useStyles();
	const { username } = props;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const { signOut } = useAuth();

	const history = useHistory();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (event, newValue) => {
		history.push(newValue);
	};

	async function handleLogOut() {
		try {
			await signOut();
			history.push('/');
		} catch (e) {
			console.log(e.message);
		}
	}

	return (
		<React.Fragment>
			<Toolbar className={classes.toolbar}>
				<Grid container>
					<Grid item xs={9}>
						<Tabs
							value={history.location.pathname}
							onChange={handleChange}
							aria-label='simple tabs example'
						>
							<Tab icon={<HomeIcon />} label='Trang chủ' value='/' />
							<Tab
								icon={<CompanyIcon />}
								label='Danh sách công ty'
								value='/admin/companies'
							/>
							<Tab
								icon={<AddIcon />}
								label='Yêu cầu thêm công ty'
								value='/admin/company-request-list'
							/>
							<Tab
								icon={<UserIcon />}
								label='Danh sách admin'
								value='/admin/admin-list'
							/>
						</Tabs>
					</Grid>
					<Grid item xs={3} className={classes.userArea}>
						<Button
							aria-controls='simple-menu'
							aria-haspopup='true'
							onClick={handleClick}
						>
							{username}
							<DropDownIcon />
						</Button>
						<Menu
							id='simple-menu'
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
						</Menu>
					</Grid>
				</Grid>
			</Toolbar>
		</React.Fragment>
	);
}

Header.propTypes = {
	sections: PropTypes.array,
	title: PropTypes.string,
};
