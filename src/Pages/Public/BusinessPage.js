import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as bookingActions from "../../actions/businessBookings";
import * as providerActions from "../../actions/businessProvidersActions";
import * as serviceActions from "../../actions/businessServices";
import * as businessesActions from "../../actions/businesses";
import { Box, Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookingsForm from '../../components/Forms/BookingsForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import MainImages from "../../components/media/MainImages";
import { useHistory, useParams } from 'react-router-dom'

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

const BusinessPage = (props, classes) => {

    //const { addToast } = useToasts();
    
    var { id } = useParams();
    
    //const [businessInfo, setBusinessInfo] = useState(props[0].businessInfo.filter(business => business.id === id));
    const [businessInfo, setBusinessInfo] = useState(null);
    useEffect(() => {
        console.log({id})

        //id && setBusinessInfo(props.businessInfo.filter(business => business.id === parseInt(id)));
        //!businessInfo && props.fetchAllBusinessess();
        //console.log({businessInfo})
        if (props.businessInfo.list.length === 0) {
            props.fetchBusinessesData(parseInt(id));

        }
        setBusinessInfo(props.businessInfo.list[0]);
        //setBusinessInfo(props[0].businessInfo.filter(business => business.id === id));
        
    })

    

    return (
        <>
            <MainImages user={id} frontEnd={true}/>
            <Container maxWidth="lg">
                <Box className="pagetitle" ><h1><strong>{businessInfo && businessInfo.businessName}</strong></h1>
                1671 Reviews 5 out of 5 <img src="../../5stars.png" alt="reviews" />
                </Box>
                <Box className="pagetitle businessinfo" ><h3>Business Information</h3><p>{businessInfo && businessInfo.description}</p>
                </Box>
                <BookingsForm id={id}/>                        
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    businessBookingsList: state.businessBooking.list,
    businessProviders: state.businessProvider.list,
    businessServicesList: state.businessService.list,
    authentication: state.authentication,
    businessInfo: state.businesses
});


const mapActionsToProps = {
    fetchAllBusinessServices: serviceActions.fetchAll,
    fetchAllBookings: bookingActions.fetchAll,
    fetchAllProviders: providerActions.fetchAll,
    fetchBusinessesData: businessesActions.fetchById,
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessPage));

