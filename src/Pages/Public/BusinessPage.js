import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as bookingActions from "../../Actions/businessBookings";
import * as providerActions from "../../Actions/businessProvidersActions";
import * as serviceActions from "../../Actions/businessServices";
import * as businessesActions from "../../Actions/businesses";
import { Box, Grid, Paper, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookingsForm from '../../Components/Forms/BookingsForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../Components/Navigation/MemberMenu';
import MainImages from "../../Components/Media/MainImages";
import { useHistory, useParams } from 'react-router-dom';

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const BusinessPage = (props, classes) => {

    //const { addToast } = useToasts();

    var { id } = useParams();

    //const [businessInfo, setBusinessInfo] = useState(props[0].businessInfo.filter(business => business.id === id));
    const [businessInfo, setBusinessInfo] = useState(null);
    useEffect(() => {
        console.log({ id })

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
            <MainImages user={id} frontEnd={true} />

            <Container maxWidth="lg">
                <Grid container>
                <Grid className="pagetitle"  item xs={12} md={3}>
                    
                </Grid>

                    <Grid className="bizinfo" item xs={12} md={6}>
                        <Item className="pagetitle primaryTextColor" ><h2><strong>{businessInfo && businessInfo.businessName}</strong></h2></Item>

                        <Item className="pagetitle" >1671 Reviews 5 out of 5 <img src="https://nixerwebapi.azurewebsites.net/images/5stars.png" alt="reviews" /></Item>

                        <Item className="pagetitle" >
                            <h3>Business Information</h3><p>{businessInfo && businessInfo.description}</p>
                        </Item>

                    </Grid>

                    <Grid item xs={12} md={3}></Grid>
                    <Grid item xs={12} md={12}>
                        <BookingsForm id={id} />
                    </Grid>
                </Grid>



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

