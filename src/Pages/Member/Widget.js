import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessServices";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessServicesForm from '../../components/Forms/BusinessServicesForm';
import { useToasts } from "react-toast-notifications";
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
        <Container maxWidth="lg">
            <Paper>
                <Grid container>
                    <Grid item xs={3}>{<MembersMenu />}</Grid>
                    <Grid item xs={9}><h1> Widget</h1>
                        
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}



export default BusinessServices;

