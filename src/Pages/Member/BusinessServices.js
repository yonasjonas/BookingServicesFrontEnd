import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessServices";
import * as provideractions from "../../actions/businessProvidersActions";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessServicesForm from '../../components/Forms/BusinessServicesForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import BusinessProviders from "./BusinessProvidersContainer";
import { accountService } from '../../services';
//import Dashboard from "./DashBoardSideMenu";





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

    const { addToast } = useToasts();

    const [currentId, setCurrentId] = useState("");
    //console.log("useState(0)" ,props)

    useEffect(() => {
        props.fetchAllBusinessServices();
        //props.fetchAllProviders();
    }, [])

    const onDelete = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteBusinessService(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    }
    let temp = [];
    let i = 0;
    const user = JSON.parse(localStorage.getItem('user'))



    return (
        <Container maxWidth="false">
            <TableContainer> 
            <Grid container>               
                <Grid item xs={3}>{<MembersMenu />}</Grid>
                <Grid item xs={9}>
                <h1>Business Services</h1>
                <h1>Hi {user.firstName}!</h1>
                    <BusinessServicesForm {...({ currentId, setCurrentId })} />
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Service Name</TableCell>
                                <TableCell>Time Slot</TableCell>
                                <TableCell>Weekdays</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                props.businessServicesList.map((record, index) => {
                                    console.log("record", record)
                                    return (<TableRow key={index}>
                                        <TableCell>{record.serviceName}</TableCell>
                                        <TableCell>{record.timeSlotDuration}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{record.price}</TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id) }} /></Button>
                                                <Button><DeleteIcon color="secondary" onClick={() => { onDelete(record.id) }} /></Button>
                                            </ButtonGroup>
                                        </TableCell>

                                    </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Grid>
                </Grid>
            </TableContainer>
        </Container>
    )
}

const mapStateToProps = state => ({
    businessServicesList: state.businessService.list,
    businessProviders: state.businessProvider.list
});

const mapActionsToProps = {
    fetchAllBusinessServices: actions.fetchAll,
    deleteBusinessService: actions.deleteData,
    fetchAllProviders: provideractions.fetchAll
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessServices));

