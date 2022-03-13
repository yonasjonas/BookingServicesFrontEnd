import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessInformation";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BookingsForm from '../../components/Forms/BookingsForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import { accountService, alertService } from '../../services';
import BusinessInformationForm from "../../components/Forms/BusinessInformationForm";


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

const BusinessInformation = (props, classes) => {
    //const user = accountService.userValue;
    const { addToast } = useToasts();

    const [currentId, setCurrentId] = useState(0);

    /* const onDelete = id => {
        if(window.confirm('Are you sure?')){
            props.deleteBooking(id, () => addToast("Submitted successfully", {appearance:'info'}));
        }
    } */

    return (
        <Container maxWidth={false}>
            <Paper>
                <Grid container>
                    <Grid item xs={3}>{<MembersMenu />}</Grid>
                    <Grid item xs={9}>
                        <BusinessInformationForm/>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

const mapStateToProps = state => ({
    BusinessInformation: state.businessInformation
});

//console.log({ mapStateToProps });

const mapActionsToProps = {
    fetchBusinessInfo: actions.fetchById,
    deleteBusinessService: actions.deleteData
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessInformation));

