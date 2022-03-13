import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessProvidersActions";
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ProvidersForm from '../../components/Forms/ProvidersForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';


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

    //const { addToast } = useToasts();

    const [currentId, setCurrentId] = useState(0);

    //setCurrentId(null)

    useEffect(() => {
        props.fetchAllProviders()
    }, [])



    //const myObjectOfDays = props.providersList;

    /* if (myObjectOfDays && currentId !== 0) {
        myObjectOfDays.map(i => {

            //i.weekvalue = JSON.parse(i.weekvalue);
        })
    } */



    //console.log("showm e the props : ", props)



    /* const onDelete = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteProvider(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    } */
    const [value, setValue] = React.useState(new Date());

    /*  const convertToObj = (value) => {
         return JSON.parse(value);
     } */
    let days = [];

    let showDays = (allDays) => {
        days = [];
        if (!!allDays && allDays !== "[object Object]") {
            console.log("inside : ", JSON.parse(allDays));
            if (typeof allDays === 'string') {
                Object.keys(JSON.parse(allDays)).map(i => {
                    //console.log("inside : ", JSON.parse(allDays));
                    days.push(JSON.parse(allDays)[i].dayIndex);
                })
            }
            else {
                Object.keys(allDays).map(i => { console.log("showDays : ", i) })
            }
        }
        return "" + days + "";
    }



    return (
        <Container maxWidth={false}>
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
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Weekdays</TableCell>
                                        <TableCell>Working Hours</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.providersList.map((record, index) => {
                                            return (
                                                    <TableRow key={index}>
                                                    <TableCell>{record.name}</TableCell>
                                                    <TableCell>{record.email}</TableCell>
                                                    <TableCell className="weekdaysClass">{showDays(record.weekvalue)}</TableCell>
                                                    <TableCell>{record.phone}</TableCell>
                                                    <TableCell>{record.phone}</TableCell>
                                                    <TableCell>{record.phone}</TableCell>
                                                    <TableCell>{record.phone}</TableCell>
                                                    <TableCell>
                                                        <ButtonGroup>
                                                            <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id) }} /></Button>
                                                            {/* <Button><DeleteIcon color="secondary" onClick={() => { onDelete(record.id) }} /></Button> */}
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
    providersList: state.businessProvider.list
});

const mapActionsToProps = {
    fetchAllProviders: actions.fetchAll,
    deleteProvider: actions.deleteData,
    updateProviderWorkinghours: actions.addProviderWorkingDays

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessProviders));

