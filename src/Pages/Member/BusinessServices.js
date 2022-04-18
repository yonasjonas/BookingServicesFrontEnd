import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessServices";
import * as provideractions from "../../actions/businessProvidersActions";
import { Grid, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessServicesForm from '../../components/Forms/BusinessServicesForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import MainImages from "../../components/media/MainImages";

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
    const [services, setServices] = useState(props.businessServicesList);

    useEffect(() => {
        props.authentication.user.id && props.fetchAllBusinessServices(props.authentication.user.id);
        setServices(props.businessServicesList);
        //console.log({ props });
    }, [])

    const onDelete = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteBusinessService(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    }

    return (
        <>
            <MainImages />
            <Container maxWidth="lg">
                <TableContainer>
                    <Grid container>
                        <Grid item xs={3}>{<MembersMenu />}</Grid>
                        <Grid item xs={9}>
                            <h1>Business Services</h1>
                            <BusinessServicesForm {...({ currentId, setCurrentId })} />
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                            <TableCell><h3>Image</h3></TableCell>
                                            <TableCell><h3>Name</h3></TableCell>
                                            <TableCell><h3>Duration</h3></TableCell>
                                            <TableCell><h3>Providers</h3></TableCell>
                                            <TableCell><h3>Price</h3></TableCell>
                                            <TableCell><h3>Manage</h3></TableCell> 
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.businessServicesList && props.businessServicesList.map((record, index) => {
                                            //console.log("record", record)
                                            return (<TableRow key={index}>
                                                <TableCell><img className="serviceImage" src={"https://nixerwebapi.azurewebsites.net/images/business/" + record.businessId + "/service/serviceImage_"+ record.id +".jpg"} /></TableCell>
                                                <TableCell className="secondaryTextColor bold"><strong>{record.serviceName}</strong></TableCell>
                                                <TableCell><strong>{record.timeSlotDuration}min.</strong></TableCell>
                                                <TableCell>{typeof record.providerId === 'string' && record.providerId.split(',').map(i => {
                                                    return (<div style={{maxWidth:'140px'}} className="providerNames secondaryOutlineButton alignCenter">{props.businessProviders.find(j => j.id == i) ? props.businessProviders.find(j => j.id == i).name + " " : ""}</div>)
                                                })}
                                                </TableCell>
                                                <TableCell><strong>{record.price}€</strong></TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon className="primary" onClick={() => { setCurrentId(record.id) }} /></Button>
                                                        <Button><DeleteIcon color="secondary" onClick={() => { onDelete(record.id) }} /></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </TableContainer>
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    businessServicesList: state.businessService.list,
    businessProviders: state.businessProvider.list,
    authentication: state.authentication
});

const mapActionsToProps = {
    fetchAllBusinessServices: actions.fetchAll,
    deleteBusinessService: actions.deleteData,
    fetchAllProviders: provideractions.fetchAll
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessServices));

