import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessProviders";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ProvidersForm from '../../components/ProvidersForm';
import { useToasts } from "react-toast-notifications";
import Nav from '../../components/navigation/MemberMenu';


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

const BusinessProviders = (props, classes) => {

    const {addToast} = useToasts();

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllProviders()
    }, [])

    const onDelete = id => {
        if(window.confirm('Are you sure?')){
            props.deleteProvider(id, () => addToast("Submitted successfully", {appearance:'info'}));
        }
    }

    return (
        <Container>
            <Paper>
                <Grid container>
                    <Grid item xs={3}>{<Nav />}</Grid>
                    <Grid item xs={9}>
                        <TableContainer>
                            <h1> Providers</h1>
                            <Grid container><ProvidersForm {...({currentId, setCurrentId})}/></Grid>
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Weekdays</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.providersList.map((record, index) => {
                                            return (<TableRow key={index}>
                                                <TableCell>{record.name}</TableCell>
                                                <TableCell>{record.email}</TableCell>
                                                <TableCell>{record.weekvalue}</TableCell>
                                                <TableCell>{record.phone}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon color="primary" onClick={()=>{setCurrentId(record.id)}}/></Button>
                                                        <Button><DeleteIcon color="secondary" onClick={()=>{onDelete(record.id)}}/></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

const mapStateToProps = state => ({
    providersList: state.businessProvider.list
});

const mapActionsToProps = {
    fetchAllProviders: actions.fetchAll,
    deleteProvider: actions.deleteData

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessProviders));

