import React, {useEffect} from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import FeedIcon from '@mui/icons-material/Feed';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import { accountService } from '../../Services';

import { Nav } from '../Account';


import ListSubheader from '@mui/material/ListSubheader';



const drawerWidth = 240;

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
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function TypographyMenu(props) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (window.innerWidth < 768) setOpen(false);
    })

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >               
            </Toolbar>

            <Paper data-tour="tour-2" sx={{ width: 230, height: 1 }}>
                <MenuList>
                    <MenuItem className={window.location.pathname === '/dashboard' && "activeMenu"} >
                        <ListItem button>
                            <ListItemIcon>
                                <PeopleIcon fontSize="small" />
                            </ListItemIcon>
                             <Link to="/dashboard" >
                                <Typography variant="inherit" noWrap />
                                <ListItemText primary="Dashboard" />
                            </Link>
                        </ListItem>
                    </MenuItem>

                    <MenuItem className={window.location.pathname === '/business-details' && "activeMenu"} data-tour="tour-5">
                        <ListItem button>
                            <ListItemIcon>
                                <PeopleIcon fontSize="small" />
                            </ListItemIcon>
                             <Link to="/business-details" >
                                <Typography variant="inherit" noWrap />
                                <ListItemText primary="Business Information" />
                            </Link>
                        </ListItem>
                    </MenuItem>
                    <MenuItem className={window.location.pathname === '/providers' && "activeMenu"} data-tour="tour-6">
                        <ListItem button>
                            <ListItemIcon>
                                <PeopleIcon fontSize="small" />
                            </ListItemIcon>
                             <Link to="/providers" >
                                <Typography variant="inherit" noWrap />
                                <ListItemText primary="Providers" />
                            </Link>
                        </ListItem>
                    </MenuItem>
                    <MenuItem className={window.location.pathname === '/services' && "activeMenu"} data-tour="tour-7">
                        <ListItem button>
                            <ListItemIcon>
                                <PeopleIcon fontSize="small" />
                            </ListItemIcon>
                             <Link to="/services" >
                                <Typography variant="inherit" noWrap />
                                <ListItemText primary="Services" />

                            </Link>
                        </ListItem>
                    </MenuItem>
                    <MenuItem className={window.location.pathname === '/bookings' && "activeMenu"} data-tour="tour-8">
                        <ListItem button>
                            <ListItemIcon>
                                <ShoppingCartIcon fontSize="small" />
                            </ListItemIcon>
                             <Link to="/bookings" >
                                <Typography variant="inherit" noWrap />
                                <ListItemText primary="Bookings" />
                            </Link>
                        </ListItem>
                    </MenuItem>
                    <MenuItem className={window.location.pathname === '/widget' && "activeMenu"} data-tour="tour-9">
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                             <Link to="/widget" >
                                <Typography variant="inherit" noWrap>
                                    Manage Widget</Typography>
                            </Link>
                        </ListItem>
                    </MenuItem>
                </MenuList>
            </Paper>
            <Divider />
            <Divider />
        </Drawer>
    );
}