import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as bookingActions from "../../actions/businessBookings";
import * as providerActions from "../../actions/businessProvidersActions";
import * as serviceActions from "../../actions/businessServices";
import { Chip, Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookingsForm from '../../components/Forms/BookingsForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import MainImages from "../../components/media/MainImages";
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

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
    const [accepted, setAccepted] = useState(null);

    useEffect(() => {

        props.fetchAllBookings(props.authentication.user.id);
        !props.authentication && setBusinessBookings(props.businessBookingsList);

        props.businessProviders.length === 0  && props.fetchAllProviders(props.authentication.user.id);

    }, [])

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const convertDate = (date) => {
        let localdate = new Date(date.replace(/['"]+/g, ''))
        return localdate.getDay() + " " + monthNames[localdate.getMonth()] + " " + localdate.getFullYear() + " " + localdate.getHours() + ":" + checkMinutes(localdate.getMinutes());

    }

    const checkMinutes = (minutes) => {
        return minutes < 10 ? minutes + "0" : minutes;
    }

    const acceptOrRejectBooking = (id, accepted) => {
        if (id !== 0) {
            if (accepted !== null) {
                props.confirmBooking(id, accepted);
            }
        }
    }

    return (
        <>
            <MainImages />
            <Container maxWidth="lg">
                <Paper>
                    <Grid container>
                    <Grid item xs={1} md={3}><MembersMenu /></Grid>
                        <Grid className="bookingsform" item xs={11} md={9}>
                            <TableContainer>
                                <Grid container><BookingsForm {...({ currentId, setCurrentId })} accept={accepted} admin={true} /></Grid>
                                <h1> Bookings</h1>
                                <Table>
                                    <TableHead className={classes.root}>
                                        <TableRow>
                                            <TableCell><h3>Provider</h3></TableCell>
                                            <TableCell><h3>Name</h3></TableCell>
                                            <TableCell><h3>Phone</h3></TableCell>
                                            <TableCell><h3>Price Agreed</h3></TableCell>
                                            <TableCell><h3>Booking Time</h3></TableCell>
                                            <TableCell><h3>Duration</h3></TableCell>
                                            <TableCell><h3>Accept Or Reject</h3></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            props.businessBookingsList.map((record, index) => {
                                                return (<TableRow key={index}>
                                                    <TableCell className="secondaryTextColor bold"><strong>{record.providerName}</strong></TableCell>
                                                    <TableCell className="secondaryTextColor bold"><strong>{record.name}</strong></TableCell>
                                                    <TableCell className="secondaryTextColor bold"><strong>{record.phone}</strong></TableCell>
                                                    <TableCell className="secondaryTextColor bold"><strong>30€</strong></TableCell>
                                                    <TableCell className="secondaryTextColor bold"><strong>{record.bookingStartTime && convertDate(record.bookingStartTime)}</strong></TableCell>
                                                    <TableCell className="secondaryTextColor bold"><strong>{record.bookingDuration} min.</strong></TableCell>
                                                    {!record.accepted || record.accepted == "null" ? <>
                                                        <TableCell>
                                                            <ButtonGroup>
                                                                {<Button><CheckIcon color="secondary" onClick={() => { setCurrentId(record.id); setAccepted(true); acceptOrRejectBooking(record.id, true) }} /></Button>}
                                                                <Button><HighlightOffIcon color="secondary" onClick={() => { setCurrentId(record.id); setAccepted(false); acceptOrRejectBooking(record.id, false) }} /></Button>
                                                            </ButtonGroup>
                                                        </TableCell>
                                                    </>
                                                        : record.accepted && record.accepted === "false" ?
                                                            <TableCell>
                                                                <Chip
                                                                    label="Rejected"
                                                                    className="rejected-chip"
                                                                    icon={<SentimentDissatisfiedIcon />} />
                                                            </TableCell>
                                                            :
                                                            <TableCell>
                                                                <Chip
                                                                    className="accepted-chip"
                                                                    label="Accepted"
                                                                    icon={<TagFacesIcon />} />
                                                            </TableCell>
                                                    }
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
    fetchAllProviders: providerActions.fetchAll,
    confirmBooking: bookingActions.confirmBooking
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessBookings));

