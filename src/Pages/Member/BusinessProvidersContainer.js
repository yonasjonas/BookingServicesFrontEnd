import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions/businessProvidersActions";
import { Chip, Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ProvidersForm from '../../Components/Forms/ProvidersForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../Components/Navigation/MemberMenu';
import MembersMenuOld from '../../Components/Navigation/MemberMenuOld';
import MainImages from "../../Components/Media/MainImages";
import * as helpers from '../../Helpers';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';



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

    let days = [];

    let showDays = (allDays) => {

        /* days = []
        const weekvalue = helpers.convertStringToObject(allDays);

        return (weekvalue && Object.keys(weekvalue).map(i => {

            (weekvalue[i] && weekvalue[i].dayIndex && <div>{weekvalue[i].dayIndex}</div>)


        })) */
        //return days.join(",");

        days = []
        const weekvalue = helpers.convertStringToObject(allDays);

        weekvalue && Object.keys(weekvalue).map(i => {
            weekvalue[i] && days.push(
                " " + weekvalue[i].dayIndex
            )
            /* return <TableCell>
                <Chip
                    label={weekvalue[i].dayIndex}
                    className="rejected-chip"
                    icon={<SentimentDissatisfiedIcon />} />
            </TableCell> */
        })
        return days.join(",");


    }

    function imageExists(image_url) {

        var http = new XMLHttpRequest();

        http.open('HEAD', image_url, false);
        http.send();

        return http.status != 404;

    }


    return (
        <><MainImages />
            <Container maxWidth="lg">
                <Paper>
                    <Grid container>
                        <Grid item xs={1} md={3}><MembersMenu /></Grid>
                        <Grid className="providersform" item xs={11} md={9}>
                            <TableContainer>
                                <h1> Providers</h1>
                                <Grid container><ProvidersForm {...({ currentId, setCurrentId })} /></Grid>
                                <Table>
                                    <TableHead className={classes.root}>
                                        <TableRow>
                                            <TableCell className="hidemobile"><h4>Profile Picture</h4></TableCell>
                                            <TableCell><h4>Name</h4></TableCell>
                                            <TableCell className="hidemobile"><h4>Working days</h4></TableCell>
                                            <TableCell className="hidemobile"><h4>Phone</h4></TableCell>
                                            <TableCell className="hidemobile"><h4>Email</h4></TableCell>
                                            <TableCell><h4>Manage</h4></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            props.providersList && props.providersList.map((record, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell className="hidemobile">{helpers.getProviderImage(record.id, record.businessId, "grid")}</TableCell>
                                                        <TableCell className="secondaryTextColor">{record.name}</TableCell>
                                                        <TableCell  className="secondaryTextColor hidemobile" style={{ maxWidth: '140px' }}>{showDays(record.weekvalue)}</TableCell>
                                                        <TableCell className="secondaryTextColor hidemobile">{record.phone}</TableCell>
                                                        <TableCell className="secondaryTextColor hidemobile">{record.email}</TableCell>
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

