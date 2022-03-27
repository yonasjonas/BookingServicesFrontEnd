import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businesses";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
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
    const [services, setServices] = useState(null);

    useEffect(() => {
        props.fetchAllBusinesses();
        setServices(props.businesses);
    }, [])

    const onDelete = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteBusinessService(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    }

    // create a function to handle the form submit

    function calculateDaysBetweenDates(begin, end) { }


    return (
        <Container maxWidth={false}>
            <Paper>
                <Grid container>

                    <Grid item xs={12}>
                        <TableContainer>
                            <h1> Here you can find services offers by various businesses. You can filter by category. But for now just pick the business</h1>

                            <Table>
                                <TableBody>
                                    {console.log({ services })}
                                    {console.log(props.businesses)}
                                    {

                                        props.businesses && props.businesses.map((record, index) => {
                                            return (<TableRow key={index}>
                                                <TableCell><img height="50px" src="serviceImage.png" /></TableCell>
                                                <TableCell><strong>{record.businessName}</strong></TableCell>
                                                <TableCell>{record.description}</TableCell>
                                                <TableCell>{record.county}</TableCell>
                                                <TableCell><Button
                                                    color="secondary"
                                                    className={classes.smMargin}
                                                    variant="contained"
                                                >Business Info and Book</Button></TableCell>

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

