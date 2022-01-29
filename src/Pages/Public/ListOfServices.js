import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessServices";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessServicesForm from '../../components/BusinessServicesForm';
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

    const {addToast} = useToasts();

    //const [currentId, setCurrentId] = useState(0);
busines
    useEffect(() => {
        //props.fetchAllBusinessServices()
    }, [])

    const onDelete = id => {
        if(window.confirm('Are you sure?')){
            props.deleteBusinessService(id, () => addToast("Submitted successfully", {appearance:'info'}));
        }
    }

    return (
        <Container>
            <Paper>
                <Grid container>
                    
                    <Grid item xs={12}>
                        <TableContainer>
                            <h1> Find Services </h1>
                            
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Business Name</TableCell>
                                        <TableCell>Service Type</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Price Range</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.businessesList.map((record, index) => {
                                            return (<TableRow key={index}>
                                                <TableCell>{record.businessName}</TableCell>
                                                <TableCell>{record.type}</TableCell>
                                                <TableCell>{record.location}</TableCell>
                                                <TableCell>{record.priceRange}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><VisibilityIcon color="primary" /* onClick={()=>{setCurrentId(record.id)}} *//></Button>
                                                        
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
    )
}

const mapStateToProps = state => ({
  businessesList: state.businessesList.list
});

const mapActionsToProps = {
    fetchAllBusinesses: actions.fetchAll,
    //deleteBusinessService: actions.deleteData
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(Businesses));

