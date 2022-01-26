import './App.css';
import { store } from "./actions/store";
import React from "react";
import { Provider } from "react-redux";
import BusinessServices from './Pages/Member/BusinessServices';
import Business from './Pages/Member/Business';
import Widget from './Pages/Member/Widget';
import BusinessProviders from './Pages/Member/BusinessProviders';
import Bookings from './Pages/Member/Bookings';
import TopNavigation from "./components/navigation/TopNavigation";
import MemberMenu from "./components/navigation/MemberMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Public/Home";
import About from "./Pages/Public/About";
import Contact from "./Pages/Public/Contact";
import { ToastProvider } from "react-toast-notifications";

function App() {
	return (
		<Provider store={store}>
			<Router>
                <TopNavigation />
                <ToastProvider autoDismiss={true}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/services" component={BusinessServices} />
                    <Route path="/providers" component={BusinessProviders} />
                    <Route path="/widget" component={Widget} />
                    <Route path="/business" component={Business} />
                    <Route path="/bookings" component={Bookings} />
                </Switch>
                </ToastProvider>
                
            </Router>			
		</Provider>
	);
}

export default App;
