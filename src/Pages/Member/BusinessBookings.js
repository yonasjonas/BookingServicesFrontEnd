import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as bookingActions from "../../actions/businessBookings";
import * as providerActions from "../../actions/businessProvidersActions";
import * as serviceActions from "../../actions/businessServices";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookingsForm from '../../components/Forms/BookingsForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import MainImages from "../../components/media/MainImages";

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

const BusinessBookings = (props, classes) => {

    const { addToast } = useToasts();
    const [businessBookings, setBusinessBookings] = useState(props.businessBookingsList);
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {

        props.authentication.user.id && props.fetchAllBookings(props.authentication.user.id);
        //props.fetchAllBusinessServices();
        setBusinessBookings(props.businessBookingsList);
    }, [])

    const onDelete = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteBooking(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    }

    return (
        <>
            <MainImages />
            <Container maxWidth="lg">
                <Paper>
                    <Grid container>
                        <Grid item xs={3}>{<MembersMenu />}</Grid>
                        <Grid item xs={9}>
                            <TableContainer>
                                <Grid container><BookingsForm {...({ currentId, setCurrentId })} /></Grid>
                                <h1> Bookings</h1>


                                <Table>
                                    <TableHead className={classes.root}>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Provider</TableCell>
                                            <TableCell>Customer Name</TableCell>
                                            <TableCell>Customer Phone</TableCell>
                                            <TableCell>Customer Email</TableCell>
                                            <TableCell>Booking Time</TableCell>
                                            <TableCell>Service Duration</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            businessBookings.map((record, index) => {
                                                return (<TableRow key={index}>
                                                    <TableCell>{record.id}</TableCell>
                                                    <TableCell>{record.providerId}</TableCell>
                                                    <TableCell>{record.name}</TableCell>
                                                    <TableCell>{record.phone}</TableCell>
                                                    <TableCell>{record.email}</TableCell>
                                                    <TableCell>{record.bookingStartTime}</TableCell>
                                                    <TableCell>{record.bookingDuration}</TableCell>
                                                    <TableCell>
                                                        <ButtonGroup>
                                                            <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id) }} /></Button>
                                                            {<Button><RemoveRedEyeIcon color="secondary" onClick={() => { onDelete(record.id) }} /></Button>}
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
        </>
    )
}

const mapStateToProps = state => ({
    businessBookingsList: state.businessBooking.list,
    businessProviders: state.businessProvider.list,
    businessServicesList: state.businessService.list,
    authentication: state.authentication
});


const mapActionsToProps = {
    fetchAllBusinessServices: serviceActions.fetchAll,
    fetchAllBookings: bookingActions.fetchAll,
    fetchAllProviders: providerActions.fetchAll

    //deleteBusinessService: actions.deleteData
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessBookings));

