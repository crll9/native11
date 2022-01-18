import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import {USER} from '../types';

export const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

export const logOut = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('user');
    dispatch({type: USER.LOGOUT});
  } catch (error) {
    console.log(error);
  }
};

export const getWalletData = walletId => async dispatch => {
  try {
    const res = await axios.get(
      `https://lcd.terra.dev/bank/balances/${walletId}`,
    );

    const item = res.data?.result?.find(item => item.denom === 'uusd') ||
      res.data.results?.[0] || {
        amount: 'not-added',
      };
    const payload = {
      item,
      all: res.data?.result,
    };
    dispatch({type: USER.WALLET_DATA_FETCH_SUCCESS, payload});
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER.WALLET_DATA_FETCH_FAILED,
      payload: {
        item: {
          amount: 'not-found',
        },
        all: [],
      },
    });
  }
};

export const login =
  (data, onComplete = () => {}) =>
  async dispatch => {
  console.log('login action working')
    try {
      axios.interceptors.request.use(
        (req) => {
           // Add configurations here
           console.log('interceptor request',req);
           return req;
        },
        (err) => {
           return Promise.reject(err);
        }
     );

     // For POST requests
     axios.interceptors.response.use(
        (res) => {
           // Add configurations here
           if (res.status === 201) {
              console.log('Posted Successfully');
           }
           return res;
        },
        (err) => {
           return Promise.reject(err);
        }
     );
      const res = await axios.post(`${API_URL}/users/login`, data, {
        headers: {
          'content-type': 'application/json',
        },
      });
      const user = res.data.data;

      await AsyncStorage.setItem('user', JSON.stringify(user));
      onComplete(true);
      dispatch({type: USER.FETCH_SUCCESS, payload: user});

      getWalletData(data.email)(dispatch);
    } catch (error) {
      console.log('login error',error)
      dispatch({type: USER.FETCH_FAILED});

      const msg = error.response?.data?.message || error.message;

      if (msg === 'Invalid Credentials') {
        const {email, password} = data;
        register({walletId: email, password}, success => onComplete(success))(
          dispatch,
        );
      } else {
        // SimpleToast.show(msg);
      }
    }
  };
export const getUser = () => async dispatch => {
  dispatch({type: USER.LOADING_START});
  try {
    const user = await AsyncStorage.getItem('user');

    dispatch({type: USER.FETCH_SUCCESS, payload: JSON.parse(user)});

    getWalletData(JSON.parse(user).terraWalletAdd)(dispatch);
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
      getWalletData(data.walletId)(dispatch);
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
