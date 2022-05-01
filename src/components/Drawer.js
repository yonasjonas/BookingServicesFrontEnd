import React, { useState } from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: "blue",
        fontSize: "20px",
    },
    icon: {
        color: "white"
    }
}));

const DrawerComponent = (props) => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer className="mainnavmobile"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                 {<List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                        <Link to="/" className={classes.link}>
                        Home
                    </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                        <Link to="/about" className={classes.link}>
                        About
                    </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                        <Link data-tour="tour-9" to="/book-services" className={classes.link}>
                        Find Services
                    </Link>
                        </ListItemText>
                    </ListItem>
                    {!props.props[0].loggedIn ? <><ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                        <Link variant="subtitle" to="/login" className={classes.link}>
                            Login
                        </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                    <Link variant="subtitle" to="/register" className={classes.link}>
                            Register
                        </Link>
                    </ListItem>
                    </>: <> <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/dashboard">Dashboard</Link>
                        </ListItemText>
                    </ListItem>
                    </>}
                </List>
                }
            </Drawer>
            <IconButton className="mobilemenu" onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    );
}
export default DrawerComponent;