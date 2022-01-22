import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import { Toolbar } from '@material-ui/core';


export default function TypographyMenu() {
    return (
        <Paper sx={{ width: 230, height: 1 }}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <DraftsIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/services" >
                        <Typography variant="inherit" noWrap>
                            Manage Business
                        </Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SendIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/providers" >
                            <Typography fontSize="large" variant="inherit">Providers</Typography>
                        </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PeopleIcon fontSize="large" />
                    </ListItemIcon>
                    <Link to="/bookings" >
                        <Typography variant="inherit">Bookings</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DraftsIcon fontSize="large" />
                    </ListItemIcon>

                    <Link to="/widget" >
                        <Typography variant="inherit" noWrap>Manage Widget</Typography>
                    </Link>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}