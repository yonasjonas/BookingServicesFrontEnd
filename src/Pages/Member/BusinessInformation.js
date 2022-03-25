import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessInformation";
import * as fileActions from '../../actions/file';
import { Grid, Paper, TableBody, TableCell, TableRow, TableContainer, Table, TableHead, withStyles, Container, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BookingsForm from '../../components/Forms/BookingsForm';
import { useToasts } from "react-toast-notifications";
import MembersMenu from '../../components/navigation/MemberMenu';
import { accountService, alertService } from '../../services';
import BusinessInformationForm from "../../components/Forms/BusinessInformationForm";
import FileUpload from '../../components/FormElements/FileUpload';
import HeroImage from '../../components/media/HeroImage';


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



const BusinessInformation = (props, classes) => {
    //const user = JSON.parse(localStorage.getItem('user'))
    const user = JSON.parse(localStorage.getItem('user'))
    //const { addToast } = useToasts();

    const loadImage = () => {

        console.log("image loaded")
    }

    useEffect(() => {
        //props.fetchImage();
        //props.fetchBusinessInfo(user.id);
        console.log({ props });
    });

    const [currentId, setCurrentId] = useState(0);

    return (
        <>
            <HeroImage />
            <Container maxWidth="lg">

                {9 == 7 ?

                    <FileUpload /> : null}
                <Paper>
                    <Grid container>
                        <Grid item xs={3}>{<MembersMenu />}</Grid>
                        <Grid item xs={9}>
                            <BusinessInformationForm props={props} />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    BusinessInformation: state.businessInformation,
    FileInformation: state.fileReducer,
});

//console.log({ mapStateToProps });

const mapActionsToProps = {
    fetchBusinessInfo: actions.fetchById,
    deleteBusinessService: actions.deleteData,
    //fetchImage: fileActions.fetchAll,
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(BusinessInformation));
