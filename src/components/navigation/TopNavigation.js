import React, { useState, useEffect } from 'react';
import { accountService } from '../../Services';
import { Role } from '../../Helpers';


import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';
import { Link } from "react-router-dom";
import DrawerComponent from '../Drawer';

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

const TopNavigation = (...props) => {


    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
        {props[0].user.user.loggedIn ?
             <AppBar className="topBar primaryColor" position="static">
             <CssBaseline />
             
                 {props[0].user.user.loggedIn ?
                   <span>
 
                   <div>Logged in with: <a href='/business-details'>{props[0].user.user.user.email}</a> <Link onClick={props[0].user.logout} to="/">Logout</Link></div>
                   
                 </span> :
                 <p>Login</p>
                 }      
 
            
         </AppBar>
         : null}
       </>
    );
}

export default TopNavigation;



