import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessServices";
import * as provideractions from "../../actions/businessProvidersActions";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import MainImages from "../../components/media/MainImages";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '2.5rem',
    height: '80px',
    lineHeight: '35px',
    margin: '20px',

}));
//import Dashboard from "./DashBoardSideMenu";





const style = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "2.25rem",
            fontWeight: "800!important",
        }
    },
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
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
    const user = JSON.parse(localStorage.getItem('user'))



    return (
        <>
            <MainImages />
            <Container maxWidth={"lg"}>
                <TableContainer>
                    <Grid container>
                        <Grid item xs={3}>
                            {<MembersMenu />}</Grid>
                        <Grid item xs={9}>
                            <h5>{"Hi: " + user.businessName}</h5>
                            <h2>{"Admin Dashboard: "}</h2>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container columns={{ xs: 2, sm: 2, md: 1 }}>
                                    <Grid item xs={2} sm={4} md={6} key="1">
                                        <Link to="/services">
                                            <Item>Services</Item>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={6} key="2">
                                        <Link to="/providers">
                                            <Item>Providers</Item>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={6} key="3">
                                        <Link to="/bookings">
                                            <Item>Bookings</Item>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={6} key="4">
                                        <Link to="/widget">
                                            <Item>Get the Widget</Item>
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

