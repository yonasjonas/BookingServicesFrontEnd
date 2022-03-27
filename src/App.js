import './App.css';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
//import { Role } from '@/helpers';
import { accountService } from './services';
import { PrivateRoute, CustomAlert } from './components/account';
import BusinessServices from './Pages/Member/BusinessServices';
import BusinessBookings from './Pages/Member/BusinessBookings';
import Business from './Pages/Member/Business';
import Widget from './Pages/Member/Widget';
import BusinessProviders from './Pages/Member/BusinessProvidersContainer';
import Bookings from './Pages/Member/BusinessBookings';
import BusinessInformation from './Pages/Member/BusinessInformation';
import MainNavigation from "./components/navigation/MainNavigation";
import TopNavigation from "./components/navigation/TopNavigation";
import MemberMenu from "./components/navigation/MemberMenu";
import { Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Public/Home";
import About from "./Pages/Public/About";
import Contact from "./Pages/Public/Contact";
import BusinessPage from "./Pages/Public/BusinessPage";
import BookNow from "./Pages/Public/ListOfServices";
import connectedLoginPage from "./Pages/Account/Login";
import Register from "./Pages/Account/Register";
import DashBoard from "./Pages/Member/Dashboard";
import { ToastProvider } from "react-toast-notifications";
import { Profile } from './components/profile';
import { history } from './helpers';
import { alertActions } from './actions/alert.actions';
import { userActions } from './actions/user.actions';


function App(...props) {

    
    return (
        <>
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
            
                <TopNavigation user={props[0]}/>
                <MainNavigation loggedIn={props[0].user.loggedIn}/>
                <CustomAlert />
                <ToastProvider autoDismiss={true}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/contact" component={Contact} />
                        <PrivateRoute exact path="/services" component={BusinessServices} />
                        <PrivateRoute exact path="/bookings" component={BusinessBookings} />
                        <PrivateRoute exact path="/dashboard" component={DashBoard} />
                        <PrivateRoute exact path="/business-details" component={BusinessInformation} />
                        <Route path={"/book-services"} component={BookNow} />
                        {/* <Route path="/services" component={BusinessServices} /> */}
                        <Route path="/providers" component={BusinessProviders} />
                        <Route path="/widget" component={Widget} />
                        <PrivateRoute path="/profile" component={Profile} />
                        <PrivateRoute path="/business" component={Business} />
                        <PrivateRoute path="/bookings" component={Bookings} />
                        <Route path="/login" component={connectedLoginPage} />
                        <Route path="/register" component={Register} />
                        <Route exact path="/single-business/:id" component={BusinessPage} />
                    </Switch>
                </ToastProvider>
            </Router>
        </>
    );
}

const mapStateToProps = state =>({
    //const { alert } = state;
    user: state.authentication


    //user: state.authentication.loggedIn;

    //return { alert };
});

const mapActionsToProps = {
    clearAlerts: alertActions.clear,
    userActions: userActions.refreshToken,
    logout: userActions.logout

};

export default connect(mapStateToProps, mapActionsToProps)(App);

