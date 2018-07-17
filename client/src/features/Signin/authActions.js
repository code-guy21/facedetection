import { SIGN_IN, REGISTER } from './authConstants';

export const signIn = (user, callback) => {
	return async dispatch => {
		try {
			const resp = await fetch('/signin', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user)
			});

			if (resp.status === 200) {
				const data = await resp.json();
				dispatch({ type: SIGN_IN, payload: { ...data, signedIn: true } });
				callback();
			} else {
				dispatch({ type: SIGN_IN, payload: { signedIn: false } });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const signOut = callback => {
	return async dispatch => {
		try {
			await dispatch({ type: SIGN_IN, payload: { signedIn: false } });
			await callback();
		} catch (error) {
			console.log(error);
		}
	};
};

export const register = (user, callback) => {
	return async dispatch => {
		try {
			const resp = await fetch('/register', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user)
			});
			if (resp.status === 200) {
				const data = await resp.json();
				dispatch({ type: REGISTER, payload: { ...data, signedIn: true } });
				callback();
			}
		} catch (error) {
			console.log(error);
		}
	};
};
