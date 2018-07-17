import React, { Component } from 'react';
import Particles from 'react-particles-js';
import SignIn from '../../features/Signin/SignIn';
import HomePage from '../../features/HomePage/HomePage';
import Register from '../../features/Register/Register';
import { Switch, Route } from 'react-router-dom';
import './App.css';

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {
	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Switch>
					<Route path="/register" component={Register} />
					<Route path="/homepage" component={HomePage} />
					<Route path="/" component={SignIn} />
				</Switch>
			</div>
		);
	}
}

export default App;
