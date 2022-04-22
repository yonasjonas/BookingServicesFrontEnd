import React from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
    Typography,
    makeStyles,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    
}));
 function MainLogo() {

    const classes = useStyles();
    return <a className="mainlogo" href="/">
        <Typography variant="h4" className={classes.logo}>
            My <ThumbUpIcon /> nixer

        </Typography>
        <p>DECLARED</p>
    </a>;
}

export default MainLogo;
