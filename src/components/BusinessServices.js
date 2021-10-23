import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/businessServices";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles } from '@material-ui/core';
import BusinessServicesForm from './BusinessServicesForm';

const style = theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    }
});

const BusinessServices = (props) => {

    useEffect(() => {
        props.fetchAllBusinessServices()
    }, [])

    return (
        <Paper>
            <Grid container>
                <Grid item xs={3}>Navigation</Grid>
                <Grid item xs={9}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.businessServicesList.map((record, index)=> {
                                        return(<TableRow key={index}>
                                                <TableCell>{record.name}</TableCell>
                                                <TableCell>{record.price}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container><BusinessServicesForm /></Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => ({
    businessServicesList: state.businessService.list
});

const mapActionsToProps = {
    fetchAllBusinessServices: actions.fetchAll
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessServices));

