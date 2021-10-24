import './App.css';
import { store } from "./actions/store";
import React from "react";
import { Provider } from "react-redux";
import BusinessServices from './components/BusinessServices';
import { Container } from '@material-ui/core';
import TopNavigation from "./components/TopNavigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

function App() {
	return (
		<Provider store={store}>
			<Router>
                <TopNavigation />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/account" component={BusinessServices} />
                </Switch>
            </Router>			
		</Provider>
	);
}

export default App;
