import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessServices";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessServicesForm from '../../components/BusinessServicesForm';
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

const BusinessServices = (props, classes) => {

    const {addToast} = useToasts();

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllBusinessServices()
    }, [])

    const onDelete = id => {
        if(window.confirm('Are you sure?')){
            props.deleteBusinessService(id, () => addToast("Submitted successfully", {appearance:'info'}));
        }
    }

    return (
        <Container>
            <Paper>
                <Grid container>
                    <Grid item xs={3}>{<Nav />}</Grid>
                    <Grid item xs={9}><h1> Widget</h1>
                        
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

const mapStateToProps = state => ({
    businessServicesList: state.businessService.list
});

const mapActionsToProps = {
    fetchAllBusinessServices: actions.fetchAll,
    deleteBusinessService: actions.deleteData
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessServices));

