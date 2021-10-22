import {MATCH_DETAILS} from '../types';
import axios from 'axios';

export const setMatchDetail = id => (dispatch, getState) => {
  dispatch({type: MATCH_DETAILS.LOADING_START});
  try {
    const {
      matches: {matches},
    } = getState();
    const payload = matches.find(item => item._id === id);
    // const contestDetails = await axios.get()
    dispatch({type: MATCH_DETAILS.FETCH_SUCCESS, payload});
  } catch (error) {
    console.log(error.messsage);
    dispatch({type: MATCH_DETAILS.FETCH_FAILED});
  }
};
export const setSelectedContest = id => (dispatch, getState) => {
  const {
    matches: {pools},
  } = getState();
  const payload = pools.find(item => item._id === id);
  // const contestDetails = await axios.get()
  dispatch({type: MATCH_DETAILS.SET_SELECTED_PRICE_POOL, payload});
};
