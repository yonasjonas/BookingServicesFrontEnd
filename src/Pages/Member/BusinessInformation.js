import React from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions/businessInformation";
import {
  Grid,
  Paper,
  withStyles,
  Container,
} from "@material-ui/core";
import MembersMenu from "../../Components/Navigation/MemberMenu";
import BusinessInformationForm from "../../Components/Forms/BusinessInformationForm";
import MainImages from "../../Components/Media/MainImages";


const style = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "2.25rem",
      fontWeight: "800!important",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const BusinessInformation = (props) => {

  return (
    <>
      <MainImages />
      <Container maxWidth="lg">
        <Paper>
          <Grid container>
            <Grid item xs={1} md={3}>
              {<MembersMenu />}
            </Grid>
            <Grid item xs={11} md={9}>
              <BusinessInformationForm props={props} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  BusinessInformation: state.businessInformation,
});

const mapActionsToProps = {
  fetchBusinessInfo: actions.fetchById,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(BusinessInformation));
