import axios from 'axios';
import {MATCHES} from '../types';
import {data} from './mockData';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

const getDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getAuthHeaders = ({
  auth: {
    user: {token},
  },
}) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchAllMatches = () => async (dispatch, getState) => {
  dispatch({type: MATCHES.LOADING_START});

  try {
    const response = await axios.get(
      `${API_URL}/match/todaysmatches/`,
      getAuthHeaders(getState()),
    );

    const matches = response.data.data.allMatches;
    dispatch({type: MATCHES.FETCH_SUCCESS, payload: matches});
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    console.log(msg);
    dispatch({type: MATCHES.FETCH_FAILED});
  }
};

export const fetchPools = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `${API_URL}/users/getpools`,
      getAuthHeaders(getState()),
    );
    const pools = res.data?.data;
    dispatch({type: MATCHES.FETCH_POOLS, payload: pools});
  } catch (error) {
    console.log(error.message);
  }
};
