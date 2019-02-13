import React, { Component } from 'react';
import Header from './Header';
import Navigator from './Navigator';
import RoutesComponent from './RouteContent';
// import {BrowserRouter as Router, Route} from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './main.scss';

class Main extends Component {
	render() {
		return (
			<Router>
				<Route
					render={({ location }) => (
						<div className="container">
							<Header />
							<Navigator location={location} />
							<RoutesComponent location={location} />
						</div>
					)}
				/>
			</Router>
		);
	}
}

export default Main;