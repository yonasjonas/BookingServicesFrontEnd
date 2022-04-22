import MainLogo from '../media/MainLogo';
import React, { useState, useEffect } from 'react';
import { accountService } from '../../services';
import { Role } from '../../helpers';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


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
        fontSize: "16px",
        lineHeight: "2.5",
        marginLeft: theme.spacing(10),
        "&:hover": {
            color: "black",
            borderBottom: "1px solid white",
        },
    },
}));

const MainNavigation = (...props) => {


    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AppBar position="static" className="secondaryColor mainnav">
            <CssBaseline />
            <Toolbar>
                
                <MainLogo />
                {isMobile ? (
                    <DrawerComponent />
                ) : <div className={classes.navlinks + " MAINNAVLINKS"} >
                    <Link to="/" className={classes.link}>
                        Home
                    </Link>
                    <Link to="/about" className={classes.link}>
                        About
                    </Link>
                    <Link data-tour="tour-10" to="/book-services" className={classes.link}>
                        Find Services
                    </Link>
                    

                </div>}
                {!props[0].loggedIn ?
                    <div className="loginregisterlinks">
                        <Link variant="subtitle" to="/login" className={classes.link}>
                            Login
                        </Link>
                        <Link variant="subtitle" to="/register" className={classes.link}>
                            Register
                        </Link>
                    </div>
                    :
                    <>
                        <Link to="/dashboard" className={classes.link + " dashboardButton primaryColor dashboardlinks"}>
                            Dashboard
                        </Link>
                    </>

                }
                
            </Toolbar>
        </AppBar>
    );
}

export default MainNavigation;



