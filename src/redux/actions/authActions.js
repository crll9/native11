import axios from 'axios';
import {USER} from '../types';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

export const setUser = user => dispatch => {
  try {
    dispatch({type: USER.FETCH_SUCCESS, payload: user});
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => async dispatch => {
  try {
    dispatch({type: USER.LOGOUT});
  } catch (error) {
    console.log(error);
  }
};

export const login =
  (data, onComplete = () => {}) =>
  async dispatch => {
    try {
      dispatch({type: USER.LOADING_START});

      const res = await axios.post(`${API_URL}/session/token`, data, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      const user = res.data.data;
      dispatch({type: USER.FETCH_SUCCESS, payload: user});
      onComplete(true);
    } catch (error) {
      dispatch({type: USER.FETCH_FAILED});
      console.log(error);
    }
  };
