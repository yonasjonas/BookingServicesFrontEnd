import './App.css';
import { store } from "./actions/store";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
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
import TopNavigation from "./components/navigation/TopNavigation";
import MemberMenu from "./components/navigation/MemberMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Public/Home";
import About from "./Pages/Public/About";
import Contact from "./Pages/Public/Contact";
import BookNow from "./Pages/Public/ListOfServices";
import Login from "./Pages/Account/Login";
import Register from "./Pages/Account/Register";
import DashBoard from "./Pages/Member/Dashboard";
import { ToastProvider } from "react-toast-notifications";
import { Profile } from './components/profile';

function App() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return (

        <Provider store={store}>
            <Router>
                <TopNavigation />
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
                        <Route path="/book-services" component={BookNow} />
                        {/* <Route path="/services" component={BusinessServices} /> */}
                        <Route path="/providers" component={BusinessProviders} />
                        <Route path="/widget" component={Widget} />
                        <PrivateRoute path="/profile" component={Profile} />
                        <PrivateRoute path="/business" component={Business} />
                        <PrivateRoute path="/bookings" component={Bookings} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </ToastProvider>

            </Router>
        </Provider>
    );
}

export default App;
