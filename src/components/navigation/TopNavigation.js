import React from 'react';
import { 
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    useTheme,
    useMediaQuery, } from '@material-ui/core';
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

const TopNavigation = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Booking Services
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
                    <Link to="/contact" className={classes.link}>
                        Contact
                    </Link>
                    <Link to="/book-services" className={classes.link}>
                        Find Services
                    </Link>
                    <Link to="/services" className={classes.link}>
                        Account
                    </Link>
                </div>}
            </Toolbar>
        </AppBar>
    );
}

export default TopNavigation;



