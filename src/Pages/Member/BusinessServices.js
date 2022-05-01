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
import * as helpers from '../../helpers';


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
                        <Grid item xs={1} md={3}><MembersMenu /></Grid>
                        <Grid className="servicesform" item xs={11} md={9}>
                            <h1>Business Services</h1>
                            <BusinessServicesForm {...({ currentId, setCurrentId })} />
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow  key="1">
                                            <TableCell className="hidemobile"><h4>Image</h4></TableCell>
                                            <TableCell><h4>Name</h4></TableCell>
                                            <TableCell className="hidemobile"><h4>Duration</h4></TableCell>
                                            <TableCell className="hidemobile"><h4>Providers</h4></TableCell>
                                            <TableCell><h4>Price</h4></TableCell>
                                            <TableCell><h4>Manage</h4></TableCell> 
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.businessServicesList && props.businessServicesList.map((record, index) => {
                                            //console.log("record", record)
                                            return (<TableRow key={record.id}>
                                                <TableCell key="1" className="hidemobile">{helpers.getServiceImage(record.id, record.businessId, "grid")}</TableCell>
                                                <TableCell key="2" className="secondaryTextColor"><strong>{record.serviceName}</strong></TableCell>
                                                <TableCell key="3" className="hidemobile"><strong>{record.timeSlotDuration}min.</strong></TableCell>
                                                <TableCell key="4" className="hidemobile">{typeof record.providerId === 'string' && record.providerId.split(',').map(i => {
                                                    if (i === "") return;
                                                    return (props.businessProviders.find(j => j.id == i) && <div key={i} style={{maxWidth:'140px'}} className="providerNames secondaryOutlineButton titleOnly">{props.businessProviders.find(j => j.id == i) ? props.businessProviders.find(j => j.id == i).name + " " : null}</div>)
                                                })}
                                                </TableCell>
                                                <TableCell key="5" >{record.price}€</TableCell>
                                                <TableCell key="6" >
                                                    <ButtonGroup>
                                                        <Button key={record.id + 5}><EditIcon className="primary" onClick={() => { setCurrentId(record.id) }} /></Button>
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

