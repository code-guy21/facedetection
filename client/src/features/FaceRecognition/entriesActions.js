import { UPDATE_ENTRIES } from './entriesConstants';

export const updateEntries = userId => {
	return async dispatch => {
		try {
			const resp = await fetch('/update', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId })
			});

			if (resp.status === 200) {
				const data = await resp.json();
				dispatch({
					type: UPDATE_ENTRIES,
					payload: data
				});
			}
		} catch (error) {}
	};
};
