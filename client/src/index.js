import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import { Provider } from 'react-redux';
import './index.css';
import 'tachyons';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './app/config/configureStore';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
