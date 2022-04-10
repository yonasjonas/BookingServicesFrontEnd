import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessProvidersActions";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ProvidersForm from '../../components/Forms/ProvidersForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import MainImages from "../../components/media/MainImages";
import * as convertString from '../../helpers';



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

const BusinessProviders = (props, classes) => {

    const { addToast } = useToasts();
    const [currentId, setCurrentId] = useState(0);
    const [providers, setProviders] = useState(props.providersList);
    const [curretWeekValue, setCurretWeekValue] = useState();


    //setCurrentId(null)

    useEffect(() => {
        props.authentication.user.id && props.fetchAllProviders(props.authentication.user.id)
        setProviders(props.providersList);

    }, [])



    const onDelete = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteProvider(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    }
    const [value, setValue] = React.useState(new Date());

    /*  const convertToObj = (value) => {
         return JSON.parse(value);
     } */
    let days = [];

    let showDays = (allDays) => {

        days = [];
        const weekvalue = convertString.convertStringToObject(allDays);

        weekvalue && Object.keys(weekvalue).map(i => {
            weekvalue[i] && days.push(weekvalue[i].dayIndex)
        })
        return days.join(",");

    }



    return (
        <><MainImages />
            <Container maxWidth="lg">
                <Paper>
                    <Grid container>
                        <Grid item xs={3}>{<MembersMenu />}</Grid>
                        <Grid item xs={9}>
                            <TableContainer>
                                <h1> Providers</h1>
                                <Grid container><ProvidersForm {...({ currentId, setCurrentId })} /></Grid>
                                <Table>
                                    <TableHead className={classes.root}>
                                        <TableRow>
                                            <TableCell>Profile Picture</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Working days</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Email</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            props.providersList && props.providersList.map((record, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell><img className="providerImage" src={"https://nixerwebapi.azurewebsites.net/images/business/" + record.businessId + "/provider/providerImage_" + record.id + ".jpg"} /></TableCell>
                                                       <TableCell>{record.name}</TableCell>
                                                       <TableCell className="weekdaysClass">{showDays(record.weekvalue)}</TableCell>
                                                        <TableCell>{record.phone}</TableCell>
                                                        <TableCell>{record.email}</TableCell>
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
        </>
    )
}

const mapStateToProps = state => ({
    providersList: state.businessProvider.list,
    authentication: state.authentication

});

const mapActionsToProps = {
    fetchAllProviders: actions.fetchAll,
    deleteProvider: actions.deleteData,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessProviders));

