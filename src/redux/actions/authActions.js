import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import {USER} from '../types';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

export const logOut = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('user');
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
      onComplete(true);
      dispatch({type: USER.FETCH_SUCCESS, payload: user});
    } catch (error) {
      dispatch({type: USER.FETCH_FAILED});
      const msg = error.response?.data?.message || error.message;

      if (msg === 'Invalid Credentials') {
        const {email, password} = data;
        register({walletId: email, password}, success => onComplete(success))(
          dispatch,
        );
      }
      // SimpleToast.show(msg);
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
      onComplete(true);
      dispatch({type: USER.FETCH_SUCCESS, payload: user});
    } catch (error) {
      dispatch({type: USER.FETCH_FAILED});
      const msg = error.response?.data?.message || error.message;
      console.log(msg);
      if (msg === 'User Already Exist. Please Login') {
        SimpleToast.show("Wallet id and password don't match");
        return;
      }
      SimpleToast.show(msg);
    }
  };
