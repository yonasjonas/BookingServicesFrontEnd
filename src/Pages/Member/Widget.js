import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions/businessServices";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import MainImages from "../../Components/Media/MainImages";
import MembersMenuOld from '../../Components/Navigation/MemberMenuOld';
import MembersMenu from '../../Components/Navigation/MemberMenu';


const style = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "2.25rem",
            fontWeight: "800!important",
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    }
});

const showFields = () => {
}

const hideFields = () => {
}

const refreshFields = () => {
}

const BusinessServices = (props, classes) => {



    return (
        <>
            <MainImages />
            <Container maxWidth="lg">
                <Paper>
                    <Grid container>
                    <Grid item xs={3} md={3}><MembersMenu /></Grid>
                        <Grid item xs={9} md={9}><h1 style={{    marginTop: "89px"}}> Widget</h1>
                            <p style={{    minHeight: "389px"}}>Widget coming soon...</p>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}



export default BusinessServices;

