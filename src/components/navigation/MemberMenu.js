import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import GridViewIcon from '@mui/icons-material/GridView';
import FeedIcon from '@mui/icons-material/Feed';
import SettingsIcon from '@mui/icons-material/Settings';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

const correctIcon = (index) => {
	if (index === 0) {
		return <GridViewIcon />
	}
	else if (index === 1) {
		return <FeedIcon />
	}
	else if (index === 2) {
		return <PeopleIcon />
	}
	else if (index === 3) {
		return <SettingsIcon />
	}
	else if (index === 4) {
		return <WidgetsIcon />
	}
}
const correctLink = (index) => {
	if (index === 0) {
		return "/dashboard"
	}
	else if (index === 1) {
		return "/business-details"
	}
	else if (index === 2) {
		return "/providers"
	}
	else if (index === 3) {
		return "/services"
	}
	else if (index === 4) {
		return "/widget"
	}
}
let checked = false;


export default function MembersMenu() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		if (window.innerWidth > 768) {
			setOpen(true);
		}
	})




	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box className="membermenu" sx={{ display: 'flex' }}>
			<CssBaseline />

			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={handleDrawerOpen}
				edge="start"
				sx={{
					marginRight: 5,
					...(open && { display: 'none' }),
					position: 'absolute',
					left: '19px',
					marginTop: '52px'
				}}
			>
				<MenuIcon />
			</IconButton>


			<Drawer
				variant="permanent"
				sx={{
					marginTop: "50px"

				}}
				open={open}>
				{window.innerWidth < 768 &&
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</DrawerHeader>}
				<Divider />
				<List>
					{['Dashboard', 'Business Information', 'Providers', 'Services', 'Widget'].map((text, index) => (

						<Link key={index} to={correctLink(index)} >
							<ListItem button>
								<ListItemIcon>
									{correctIcon(index)}
								</ListItemIcon>
								<Typography variant="inherit" noWrap />
								<ListItemText primary={text} />
							</ListItem>
						</Link>
					))}
				</List>


			</Drawer>

		</Box>
	);
}
