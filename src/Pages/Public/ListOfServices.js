import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businesses";
import { TextField, Grid, Paper, TableBody, TableCell, MenuItem, Select, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button, Link } from '@material-ui/core';
import * as helpers from '../../helpers';
import { useToasts } from "react-toast-notifications";



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

const Businesses = (props, classes) => {

    const { addToast } = useToasts();
    const [category, setCategory] = useState("All");
    const [businesses, setBusinesses] = useState(null);
    const [county, setCounty] = useState("All");
    const prevBusinessesRef = useRef();

    useEffect(() => {
        //props.location.pathname === '/book-services' && setBusinesses(null);
        props.fetchAllBusinesses();
        prevBusinessesRef.current === businesses && setBusinesses(props.businesses);
        //businesses.length === 0 && props && props.businesses &&  setBusinesses(props.businesses);
        prevBusinessesRef.current = businesses;


        console.log(businesses, '- Has changed')
    }, [businesses])

    const onDelete = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteBusinessService(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    }

    // create a function to handle the form submit

    /* function calculateDaysBetweenDates(begin, end) { }

    const categorySearchFilters = (event) => {

        setCategory(event.target.value);
        //setCounty("All");
        event.target.value === "All" ? setBusinesses(props.businesses) : setBusinesses(props.businesses.filter(business => business.category === event.target.value))
    } */


    const searchFilters = (event) => {


        //setCategory("All");
        event.target.name === "Category" ? setCategory(event.target.value) : setCounty(event.target.value);

        let otherValueName = event.target.name === "Category" ? "County" : "Category";

        if (event.target.value === "All" && otherValueName === "Category" && category !== "All") {
            setBusinesses(props.businesses.filter(business => business.category === category));
        }
        else if (event.target.value === "All" && otherValueName === "County" && county === "All") {
            setBusinesses(props.businesses);
        }
        else if (event.target.value === "All" && otherValueName === "Category" && category === "All") {
            setBusinesses(props.businesses);
        }
        else if (event.target.value === "All" && otherValueName === "County" && county !== "All") {
            setBusinesses(props.businesses.filter(business => business.county === county));
        }
        else if (event.target.value !== "All" && otherValueName === "Category" && category !== "All") {
            setBusinesses(props.businesses.filter(business => business.county === event.target.value && business.category === category));
        }
        else if (event.target.value !== "All" && otherValueName === "County" && county !== "All") {
            setBusinesses(props.businesses.filter(business => business.county === county && business.category === event.target.value))
        }
        else if (event.target.value !== "All" && otherValueName === "Category" && category === "All") {
            setBusinesses(props.businesses.filter(business => business.county === event.target.value));
        }
        else if (event.target.value !== "All" && otherValueName === "County" && county === "All") {
            setBusinesses(props.businesses.filter(business => business.category === event.target.value))
        }
    }
    let businessCats = [];
    let businessCounties = [];

    const categoryFilter = () => {
        return <TextField

            className="simple-select-label"
            id="simple-select"
            name="Category"
            value={category ? category : "All"}
            type="text"
            variant="outlined"
            label="Filter by Category"
            select
            onChange={searchFilters}
        >
            <MenuItem value="All">
                <em>All</em>
            </MenuItem>
            {props.businesses && props.businesses.map(business => {
                if (!businessCats.includes(business.category) && business.isVerified) {
                    businessCats.push(business.category);
                    return <MenuItem key={business.id} value={business.category}>{business.category}</MenuItem>
                }
            })}

        </TextField>
    }

    const countyFilter = () => {
        return <TextField

            className="simple-select-label"
            id="simple-select"
            name="County"
            value={county ? county : "All"}
            select
            type="text"
            variant="outlined"
            label="Filter by County"
            onChange={searchFilters}
        >

            <MenuItem value="All">
                <em>All</em>
            </MenuItem>
            {props.businesses && props.businesses.map(business => {
                if (!businessCounties.includes(business.county) && business.isVerified) {
                    businessCounties.push(business.county);
                    return <MenuItem key={business.id} value={business.county}>{business.county}</MenuItem>
                }
            })}

        </TextField>
    }
    function getOneBusiness(record, index, classes) {
        return record.isVerified && (<Grid className="onebusiness" container spacing={2} key={index}>
            <Grid item xs={12} md={3}><div style={{ background: `url(https://nixerwebapi.azurewebsites.net/images/business/${record.id}/businessInformationCover.jpg)` }} className="listservicesimage"></div></Grid>
            <Grid item xs={12} md={3}><h2>{record.businessName.toUpperCase()}</h2>
                {helpers.getRandomInt(100, 1500, 0)} Reviews {helpers.getRandomInt(3, 5, 2)} out of 5 <img height="14px" src="../../5stars.png" alt="reviews" /></Grid>
            <Grid item xs={6} md={2}><p style={{maxWidth:"90%", textAlign:"center", }} className="providerNames primaryOutline" >{record.county}</p></Grid>
            <Grid item xs={6} md={2}><p style={{maxWidth:"90%",  textAlign:"center"}} className="providerNames secondaryOutline" >{record.category}</p></Grid>
            <Grid item xs={12} md={2}>
                <Button
                    className={classes.smMargin + " primaryOutlineButton"}
                    variant="contained"
                >
                    <Link href={"single-business/" + record.id} color="inherit">
                        Business Info and Book
                    </Link>
                </Button></Grid>
    
        </Grid>
        );
    }


    return (
        <Container className="listofservices" maxWidth="lg">
            <Paper>
                <Grid container>
                    <Grid item xs={12} md={2}></Grid>
                    <Grid style={{margin:"20px"}} item xs={12} md={6} spacing={2}>
                        <strong>Find services that are offered by various businesses. You can filter by category or county</strong>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        {props.businesses && props.businesses.length > 0 && categoryFilter(props.businesses)}
                    </Grid>
                    <Grid item xs={12} md={2}>
                        {props.businesses && props.businesses.length > 0 && countyFilter(props.businesses)}
                    </Grid>
                    <Grid item xs={12} md={2}></Grid>
                </Grid>




                {businesses && businesses.length > 0 ? businesses.map((record, index) => {
                    return getOneBusiness(record, index, classes)
                }) :
                    props.businesses && (county === "All" || category === "All") && props.businesses.map((record, index) => {
                        return getOneBusiness(record, index, classes)
                    })
                }
            </Paper >
        </Container >
    )
}

const mapStateToProps = state => ({
    businesses: state.businesses.list
});

const mapActionsToProps = {
    fetchAllBusinesses: actions.fetchAll,
    //deleteBusinessService: actions.deleteData
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(Businesses));

