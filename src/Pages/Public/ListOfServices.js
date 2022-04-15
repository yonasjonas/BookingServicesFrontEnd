import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businesses";
import { TextField, Grid, Paper, TableBody, TableCell, MenuItem, Select, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button, Link } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessServicesForm from '../../components/Forms/BusinessServicesForm';
import { useToasts } from "react-toast-notifications";
import Nav from '../../components/navigation/MemberMenu';



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

    useEffect(() => {
        //props.location.pathname === '/book-services' && setBusinesses(null);
        props.fetchAllBusinesses();
        !businesses && setBusinesses(props.businesses);
        //businesses.length === 0 && props && props.businesses &&  setBusinesses(props.businesses);
    }, [])

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
            displayEmpty
            select
            onChange={searchFilters}
            renderValue={(selected) => {
                if (selected && selected.length === 0) {
                    return <em>Select Business Type</em>;
                }
                return selected;
            }}
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
            displayEmpty
            onChange={searchFilters}
            renderValue={(selected) => {
                if (selected && selected.length === 0) {
                    return <em>Select Business Type</em>;
                }
                return selected;
            }}
        >
            <MenuItem disabled value="">
                <em>Select Business Type</em>
            </MenuItem>
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

    const getRandomInt = (min, max, decimal) => {

        return (Math.random() * (max - min) + min).toFixed(decimal); //The maximum is exclusive and the minimum is inclusive
    }


    return (
        <Container maxWidth={false}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}></Grid>
                    <Grid item xs={12} md={4}>
                        Find services offers by various businesses. You can filter by category or county
                    </Grid>
                    <Grid item xs={12} md={2}>
                        {props.businesses && props.businesses.length > 0 && categoryFilter(props.businesses)}
                    </Grid>
                    <Grid item xs={12} md={2}>
                        {props.businesses && props.businesses.length > 0 && countyFilter(props.businesses)}
                    </Grid>
                    <Grid item xs={12} md={2}></Grid>

                    <Grid item xs={12}>
                        <TableContainer>
                            {/*                             <h1> Here you can Find services offers by various businesses. You can filter by category. But for now just pick the business</h1>
 */}




                            <Table>
                                <TableBody>
                                    {businesses && businesses.length > 0 ? businesses.map((record, index) => {
                                        return record.isVerified && (<TableRow key={index}>
                                            <TableCell><img height="80px" width="130px;" src={`https://nixerwebapi.azurewebsites.net/images/business/${record.id}/businessInformationProfile.jpg`} /></TableCell>
                                            <TableCell>{record.businessName.toUpperCase()}</TableCell>
                                            <TableCell>{getRandomInt(100, 1500, 0)} Reviews {getRandomInt(3, 5, 2)} out of 5 <img height="14px" src="../../5stars.png" alt="reviews" /></TableCell>
                                            <TableCell>{record.county}</TableCell>
                                            <TableCell>{record.category}</TableCell>
                                            <TableCell>
                                                <Button
                                                    className={classes.smMargin + " secondaryColor"}
                                                    variant="contained"
                                                >
                                                    <Link href={"single-business/" + record.id} color="inherit">
                                                        Business Info and Book
                                                    </Link>
                                                </Button></TableCell>

                                        </TableRow>
                                        )
                                    }) :
                                        props.businesses && props.businesses.map((record, index) => {
                                            return record.isVerified && (<TableRow key={index}>
                                                <Grid container spacing={2}>
                                                    <Grid xs={2} md={1}>
                                                        <TableCell><img height="80px" src={`https://nixerwebapi.azurewebsites.net/images/business/${record.id}/businessInformationProfile.jpg`} /></TableCell>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <TableCell><strong>{record.businessName}</strong></TableCell>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <TableCell>{record.description}</TableCell>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <TableCell>{record.county}</TableCell>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <TableCell>{record.category}</TableCell>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <TableCell>
                                                            <Button
                                                                
                                                                className={classes.smMargin + " secondaryColor"}
                                                                variant="contained"
                                                            >
                                                                <Link href={"single-business/" + record.id} color="inherit">
                                                                    Business Info and Book
                                                                </Link>
                                                            </Button>
                                                        </TableCell>
                                                    </Grid>
                                                </Grid>

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

