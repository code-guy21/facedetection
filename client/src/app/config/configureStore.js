import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
	const middleWares = [thunk];
	const enhancedComposer = composeWithDevTools(applyMiddleware(...middleWares));

	return createStore(reducers, enhancedComposer);
};

export default configureStore;
