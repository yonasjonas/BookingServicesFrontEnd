import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/businessInformation";
import {
  Grid,
  Paper,
  withStyles,
  Container,
} from "@material-ui/core";
import MembersMenu from "../../components/navigation/MemberMenu";
import BusinessInformationForm from "../../components/Forms/BusinessInformationForm";
import MainImages from "../../components/media/MainImages";


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
