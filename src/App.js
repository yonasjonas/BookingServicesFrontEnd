import './App.css';
import { store } from "./actions/store";
import React from "react";
import { Provider } from "react-redux";
import BusinessServices from './components/BusinessServices';
import { Container } from '@material-ui/core';

function App() {
	return (
		<Provider store={store}>
			<Container maxWidth="lg">
				<BusinessServices />
			</Container>
		</Provider>
	);
}

export default App;
