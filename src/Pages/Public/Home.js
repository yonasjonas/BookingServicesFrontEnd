import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import HomepageCards from "../../components/HomepageCard";
import hero from '../../images/hero.jpg';
import { Grid, Paper, Button } from '@material-ui/core';
import * as businessesActions from "../../actions/businesses";
import { styled } from '@mui/material/styles';

import FemaleIcon from '@mui/icons-material/Female';
import HandymanIcon from '@mui/icons-material/Handyman';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import CarRentalIcon from '@mui/icons-material/CarRental';
import AirlineSeatFlatAngledOutlinedIcon from '@mui/icons-material/AirlineSeatFlatAngledOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#5e535324',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Home = (props) => {

    useEffect(() => {
        props.businessInfo.length === 0 && props.fetchAllBusinesses();
        console.log("UploadPage", process.env);
    });

    return (
        <>
            <img className="heroimage" src={hero} alt="Image a girl managing booking on the go" />

            <div className="heroText">
                <h1 className="secondaryTextColor titleOnly">Welcome to MyNixer!</h1>
                <h2 className="thirdTextColor titleOnly hidemobile">Here you can become a service provider and provide services like </h2>
                <Item className="cateogrieshp hidemobile">
                    <div className="secondaryColor"><PetsOutlinedIcon fontSize="large"/><br/>Pet Services</div>
                    <div className="secondaryColor"><SchoolOutlinedIcon fontSize="large"/><br/>Tutoring Lessons</div>
                    <div className="secondaryColor"><ChildCareOutlinedIcon fontSize="large"/><br/>Child Minding</div>
                    <div className="secondaryColor"><FemaleIcon fontSize="large"/><br/>Beauty Services</div>
                    <div className="secondaryColor"><HandymanIcon fontSize="large"/><br/>Handyman / Construction</div>
                    <div className="secondaryColor"><SportsMartialArtsIcon fontSize="large"/><br/>Personal Trainer</div>
                    <div className="secondaryColor"><CarRentalIcon fontSize="large"/><br/>Driving Instructor</div>
                    <div className="secondaryColor"><AirlineSeatFlatAngledOutlinedIcon fontSize="large"/><br/>Massage</div>
                    <div className="secondaryColor"><SupportOutlinedIcon fontSize="large"/><br/>Consulting</div>
                    <div className="secondaryColor"><HouseOutlinedIcon fontSize="large"/><br/>Household</div>
                    <div className="secondaryColor"><LanOutlinedIcon fontSize="large"/><br/>IT Services</div>
                    <div className="secondaryColor"><MopedOutlinedIcon fontSize="large"/><br/>Delivery</div>
                </Item>
                <Item className="textundercateogrieshp hidemobile">
                <p style={{textAlign:"center"}} className="thirdTextColor">
                    * Above are only the examples of services that you can offer. <br/>
                </p>
                <h2 style={{textAlign:"center"}} className="secondaryTextColor titleOnly hidemobile">And you can offer whatever you like as long as it is legal.</h2> 
                </Item>
                <Grid container spacing={2} className="thirdTextColor">
                    <Grid item xs={2} md={4}></Grid>
                    <Grid className="ctahp" item xs={12} md={4}>
                        <Button href="/book-services" className="secondaryColor" variant="outlined">Book Services</Button>
                        <Button href="/register" className="primaryColor" variant="outlined">Advertise Service</Button>
                    </Grid>
                    <Grid item xs={2} md={4}></Grid>
                </Grid>

            </div>

            <HomepageCards businessInfo={props.businessInfo} />
        </>


    )
}


const mapStateToProps = state => ({
    businessInfo: state.businesses.list
});


const mapActionsToProps = {
    fetchAllBusinesses: businessesActions.fetchAll,
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
