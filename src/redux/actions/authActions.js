import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import {USER} from '../types';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

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
      const res = await axios.post(`${API_URL}/users/login`, data, {
        headers: {
          'content-type': 'application/json',
        },
      });
      const user = res.data.data;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({type: USER.FETCH_SUCCESS, payload: user});
      onComplete(true);
    } catch (error) {
      dispatch({type: USER.FETCH_FAILED});
      const msg = error.response?.data?.message || error.message;
      console.log(msg);
      SimpleToast.show(msg);
    }
  };
export const getUser = () => async dispatch => {
  dispatch({type: USER.LOADING_START});
  try {
    const user = await AsyncStorage.getItem('user');
    dispatch({type: USER.FETCH_SUCCESS, payload: JSON.parse(user)});
  } catch (error) {
    console.log(error.message);
    dispatch({type: USER.FETCH_FAILED});
  }
};

export const register =
  (data, onComplete = () => {}) =>
  async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/users/register`, data, {
        headers: {
          'content-type': 'application/json',
        },
      });
      const user = res.data.data;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({type: USER.FETCH_SUCCESS, payload: user});
      onComplete(true);
    } catch (error) {
      dispatch({type: USER.FETCH_FAILED});
      const msg = error.response?.data?.message || error.message;
      console.log(msg);
      SimpleToast.show(msg);
    }
  };
