import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessBookings";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BookingsForm from '../../components/Forms/BookingsForm';
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

const BusinessInformation = (props, classes) => {

    const { addToast } = useToasts();

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        //props.fetchAllBookings()
    }, [])

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
                        <TableContainer>
                        <Grid container><BookingsForm {...({currentId, setCurrentId})}/></Grid>
                            <h1> Bookings</h1>


                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Booked Service</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Accept/Decline</TableCell>
                                    
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {
                                        props.businessBookingsList.map((record, index) => {
                                            return (<TableRow key={index}>
                                                <TableCell>{record.id}</TableCell>
                                                <TableCell>{record.businessName}</TableCell>
                                                <TableCell>{record.businessId}</TableCell>
                                                <TableCell>{record.serviceId}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon color="primary" onClick={()=>{setCurrentId(record.id)}}/></Button>
                                                        <Button><DeleteIcon color="secondary" onClick={()=>{onDelete(record.id)}}/></Button>
                                                    </ButtonGroup>
                                                </TableCell>

                                            </TableRow>
                                            )
                                        })
                                    } */}
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
    //businessBookingsList: state.businessBooking.list
});

//console.log({ mapStateToProps });

const mapActionsToProps = {
    //fetchAllBookings: actions.fetchAll,
    //deleteBusinessService: actions.deleteData
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessInformation));

