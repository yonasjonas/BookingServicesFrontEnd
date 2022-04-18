import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessServices";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import MainImages from "../../components/media/MainImages";
import MembersMenu from '../../components/navigation/MemberMenu';


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
                        <Grid item xs={3}>{<MembersMenu />}</Grid>
                        <Grid item xs={9}><h1> Widget</h1>
                            <p>Widget coming soon...</p>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}



export default BusinessServices;

