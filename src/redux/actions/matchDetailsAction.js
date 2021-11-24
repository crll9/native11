import {MATCHES, MATCH_DETAILS} from '../types';
import axios from 'axios';
import {API_URL} from './authActions';

export const getPoolDetailsByKey = async (matchKey, poolKey) => {
  try {
    const res = await axios.get(
      `${API_URL}/users/isPoolActive/${matchKey}/${poolKey}`,
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const setMatchDetail = id => async (dispatch, getState) => {
  dispatch({type: MATCH_DETAILS.LOADING_START});
  try {
    const {
      matches: {matches, pools},
    } = getState();
    const payload = matches.find(item => item._id === id);

    const key = payload.key;
    const poolDetails = await Promise.all(
      pools.map(item => getPoolDetailsByKey(key, item.key)),
    );
    const _pools = pools.map((item, index) => ({
      ...item,
      active: poolDetails[index].status >= 400 ? false : true,
      data: poolDetails[index],
    }));
    dispatch({type: MATCHES.UPDATE_POOLS, payload: _pools});
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
