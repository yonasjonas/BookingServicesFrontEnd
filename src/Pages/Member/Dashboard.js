import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions/businessServices";
import * as provideractions from "../../Actions/businessProvidersActions";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
import MemberMenu from '../../Components/Navigation/MemberMenu';
import MemberMenuOld from '../../Components/Navigation/MemberMenuOld';import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import MainImages from "../../Components/Media/MainImages";
import Tour from 'reactour'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PeopleIcon from '@mui/icons-material/People';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import InfoIcon from '@mui/icons-material/Info';

const tourConfig = [
    {
        selector: '[data-tour="tour-1111"]',
        content: 'Welcome! This is your dashboard. Here you can manage your business info, services, providers and bookings. This guide will help you get started.',
    },
    {
        selector: '[data-tour="tour-1"]',
        content: 'This is your dashboard navigation.',
    },
    {
        selector: '[data-tour="tour-3"]',
        content: 'Add your business logo by clicking here. * Your business will not be published till you will upload this',
    },
    {
        selector: '[data-tour="tour-4"]',
        content: 'Add your business cover picture by clicking here. * Your business will not be published till you will upload this',
    },
    {
        selector: '[data-tour="tour-business-details"]',
        content: 'In Business Information page you can change your details and password',
    },
    {
        selector: '[data-tour="tour-providers"]',
        content: 'First you need to add your business providers. If it is only you just add yourself and set your working times. You need at least one provider to publish your business.',
    },
    {
        selector: '[data-tour="tour-services"]',
        content: 'Then add your services and link it to providers. You can add multiple services to one provider and vice versa. You need at least one services that is linked to provider to publish your business.'
    },
    {
        selector: '[data-tour="tour-bookings"]',
        content: 'You will start seeing your bookings once you will finish your page setup and will start accepting bookings.',
    },
    {
        selector: '[data-tour="tour-9"]',
        content: 'Once your business is live it will be visible on the Find Services page',
    },
    {
        selector: '[data-tour="tour-11"]',
        content: 'Phew! This was a lot of information. You can always come back to this guide by clicking here.',
    }

]
let openedAlready = false;


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '2.5rem',
    height: '153px',
    lineHeight: '19px',
    margin: '10px',

}));
//import Dashboard from "./DashBoardSideMenu";





const style = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "2.25rem",
            fontWeight: "800!important",
            color: '#eb6400'
        }
    },
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    }
});

const BusinessServices = (props, classes) => {

    const { addToast } = useToasts();
    const [tourOpen, setTourOpen] = useState(false);    

    const closeTour = () => {
        setTourOpen(false);
        console.log('close tour');
        openedAlready = true
        localStorage.setItem('openedAlready', "1");
    };

    const openTour = () => {
        setTourOpen(true);        
    };
    useEffect(() => {        
        !openedAlready && openTour();
    });
    //console.log("useState(0)" ,props)

    useEffect(() => {
        props.fetchAllBusinessServices();
        localStorage.getItem("openedAlready") === "1" && setTourOpen(false);
    }, [])
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <>
            <MainImages />
            <Tour
                    steps={tourConfig}
                    isOpen={tourOpen}
                    onRequestClose={closeTour}
                    className="helper"
                    rounded={5}
                    accentColor="#5cb7b7"
                />
            <Container maxWidth={"lg"}>
                <TableContainer>
                    <Grid container>
                        <Grid item xs={1} md={3}>
                            {<>
					<MemberMenu /></>}</Grid>
                        <Grid className="dashboardpage" item xs={11} md={9}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container>
                                    <Grid item xs={6} md={4} key="1">
                                        <Link to="/services">
                                            <Item className="primaryColor dashbox" ><MiscellaneousServicesIcon/>Services</Item>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} md={4} key="2">
                                        <Link to="/providers">
                                            <Item className="primaryColor dashbox" ><PeopleIcon/>Providers</Item>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} md={4} key="3">
                                        <Link to="/bookings">
                                            <Item className="primaryColor dashbox" ><PlaylistAddCheckIcon/>Bookings</Item>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} md={6} key="4">
                                        <Link to="/widget">
                                            <Item className="secondaryColor dashbox"><DynamicFormIcon/>Get the Widget</Item>
                                        </Link>
                                    </Grid>
                                    <Grid data-tour="tour-11" item xs={12} md={6} key="5">
                                        <Link onClick={() => {setTourOpen(true) }}>
                                            <Item className="secondaryColor dashbox" ><InfoIcon/>Open Help Tour</Item>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </TableContainer>
            </Container>
        </>
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

