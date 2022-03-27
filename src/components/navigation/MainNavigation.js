import React, { useState, useEffect } from 'react';
import { accountService } from '../../services';
import { Role } from '../../helpers';


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

const MainNavigation = (...props) => {


    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    My Nixer
                </Typography>
                {isMobile ? (
                    <DrawerComponent />
                ) : <div className={classes.navlinks}>
                    <Link to="/" className={classes.link}>
                        Home
                    </Link>
                    <Link to="/about" className={classes.link}>
                        About
                    </Link>
                    <Link to="/book-services" className={classes.link}>
                        Find Services
                    </Link>
                    {!props[0].loggedIn ?
                        <>
                            <Link variant="subtitle" to="/login" className={classes.link}>
                                Login
                            </Link>
                            <Link variant="subtitle" to="/register" className={classes.link}>
                                Register
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/dashboard" className={classes.link}>
                                Dashboard
                            </Link>
                        </>

                    }

                </div>}
            </Toolbar>
        </AppBar>
    );
}

export default MainNavigation;



