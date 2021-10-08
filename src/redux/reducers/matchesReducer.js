import {MATCHES} from '../types';

const initialState = {
	loading: false,
	matches: null,
};

const matchesReducer = (state = initialState, action) => {
	const {type, payload} = action;
	switch (type) {
		case MATCHES.FETCH_SUCCESS:
			return {
				...state,
				matches: payload,
				loading: true,
			};
		case MATCHES.FETCH_FAILED:
			return {
				...state,
				matches: [],
				loading: false,
			};
		default: {
			return state;
		}
	}
};

export default matchesReducer;
