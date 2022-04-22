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

const DrawerComponent = () => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="//book-services">Find Services</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/about">About</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/login">Login</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/register">Register</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/dashboard">Dashboard</Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton className="mobilemenu" onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    );
}
export default DrawerComponent;