import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessProvidersActions";
import { Chip, Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ProvidersForm from '../../components/Forms/ProvidersForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import MainImages from "../../components/media/MainImages";
import * as helpers from '../../helpers';
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

        days = []
        const weekvalue = helpers.convertStringToObject(allDays);

        weekvalue && Object.keys(weekvalue).map(i => {
            weekvalue[i] && days.push(
                weekvalue[i].dayIndex
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

    const getProviderImage = (id, businessId) => {


        let path = "https://nixerwebapi.azurewebsites.net/images/business/" + businessId + "/provider/providerImage_" + id + ".jpg";


        /* // when go live enable this
        if (imageExists(path)) {
            path = "noimage.png"
        }
        else {
            path = "noimage.png"
        } */


        return <img className="providerImage" src={path} />;

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
                                                        <TableCell>{getProviderImage(record.id, record.businessId)}</TableCell>
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

