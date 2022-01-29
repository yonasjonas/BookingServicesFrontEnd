import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessServices";
import * as provideractions from "../../actions/businessProviders";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessServicesForm from '../../components/BusinessServicesForm';
import { useToasts } from "react-toast-notifications";
import Nav from '../../components/navigation/MemberMenu';
import BusinessProviders from "./BusinessProviders";


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

const BusinessServices = (props, classes) => {

    const { addToast } = useToasts();

    const [currentId, setCurrentId] = useState("");
    //console.log("useState(0)" ,props)

    useEffect(() => {
        props.fetchAllBusinessServices();
        props.fetchAllProviders();
    }, [])

    const onDelete = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteBusinessService(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    }
    let temp = [];
    let i = 0;



    return (
        <Container>
            <Paper>
                <Grid container>
                    <Grid item xs={3}>{<Nav />}</Grid>
                    <Grid item xs={9}>
                        <TableContainer>
                            <h1>Business Services</h1>

                            <Grid container><BusinessServicesForm {...({ currentId, setCurrentId })} /></Grid>
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Service Name</TableCell>
                                        <TableCell>Time Slot</TableCell>
                                        <TableCell>Weekdays</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        
                                        props.businessServicesList.map((record, index) => {
                                            return (<TableRow key={index}>
                                                <TableCell>{record.serviceName}</TableCell>
                                                <TableCell>{record.timeSlotDuration}</TableCell>
                                                <TableCell>{
                                                    //console.log(record),
                                                    
                                                   
                                                    
                                                    record.weekvalue.split(",").forEach((item) => {                                                        
                                                        setTimeout(() => {
                                                            
                                                            //console.log("item", item);
                                                            
                                                            //console.log({item});
                                                            
                                                            if (item == props.businessProviders[i].id){

                                                                console.log("nindex me is: ", i);

                                                                temp.push("name: ", props.businessProviders[i].name);
                                                                
                                                            }
                                                            console.log("temp: ", temp);
                                                            i = i+1;
                                                            

                                                                                                                   
                                                        
                                                        }, 500);


                                                    })
                                                    
                                                }</TableCell>
                                                <TableCell>{record.price}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id) }} /></Button>
                                                        <Button><DeleteIcon color="secondary" onClick={() => { onDelete(record.id) }} /></Button>
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

    businessServicesList: state.businessService.list,
    businessProviders: state.businessProvider.list
});

const mapActionsToProps = {
    fetchAllBusinessServices: actions.fetchAll,
    deleteBusinessService: actions.deleteData,
    fetchAllProviders: provideractions.fetchAll
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessServices));

