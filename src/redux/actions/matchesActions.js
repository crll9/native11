import {MATCHES} from '../types';
import {data} from './mockData';

export const fetchAllMatches = () => async dispatch => {
	try {
		dispatch({type: MATCHES.FETCH_SUCCESS, payload: data.data.allMatches});
	} catch (error) {
		dispatch({type: MATCHES.FETCH_FAILED});
	}
};
