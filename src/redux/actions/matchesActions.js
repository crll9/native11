import axios from 'axios';
import {MATCHES} from '../types';
import {data} from './mockData';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

const getDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const fetchAllMatches = () => async dispatch => {
  dispatch({type: MATCHES.LOADING_START});

  const response = await axios.get(
    `${API_URL}/match/todaysmatches/${getDate()}`,
  );

  const matches = response.data.data.allMatches;
  console.log(matches.length);
  try {
    dispatch({type: MATCHES.FETCH_SUCCESS, payload: data.data.allMatches});
  } catch (error) {
    dispatch({type: MATCHES.FETCH_FAILED});
  }
};
