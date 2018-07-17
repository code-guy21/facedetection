import { SIGN_IN, REGISTER } from './authConstants';
import { UPDATE_ENTRIES } from '../FaceRecognition/entriesConstants';

const initialState = {
	signedIn: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return action.payload;
		case REGISTER:
			return action.payload;
		case UPDATE_ENTRIES:
			return { ...state, entries: action.payload };
		default:
			return state;
	}
};
