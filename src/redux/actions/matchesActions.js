import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import {MATCHES,CONTRACT} from '../types';
import {logOut} from './authActions';
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
      `${API_URL}/match/todaysmatches/2022-01-18`,
      getAuthHeaders(getState()),
    );

    const matches = response.data.data.allMatches;
    dispatch({type: MATCHES.FETCH_SUCCESS, payload: matches});
    console.log('match list',matches);
    //code to get contract_address
    // if(matches && matches.length>0 && matches[0].contract_address)
    // dispatch({
    //   type: CONTRACT.ADD_CONTRACT_ADDRESS,
    //   payload: matches[0].contract_address,
    // });
  } catch (error) {
    console.log('match list error',error)
    if (error.response.data === 'Invalid Token') {
      SimpleToast.show('Session expired!');
      logOut()(dispatch);
      return;
    }
    const msg = error.response?.data || error.message;
    console.log(msg);
    dispatch({type: MATCHES.FETCH_FAILED});
  }
};

export const fetchPools = (matchId,contractAddress) => async (dispatch, getState) => {
  console.log('inside fetchPools '+matchId+' '+contractAddress);
  try {
    console.log('api call poolType',`${API_URL}/poolType`);
    const res = await axios.get(
      `${API_URL}/poolType`,
      getAuthHeaders(getState()),
    );
    // const res = await axios.get(
    //   `${API_URL}/users/getpools/`+matchId+`/`+contractAddress,
    //   getAuthHeaders(getState()),
    // );
    const pools = res.data?.data;
    console.log('pools data',pools);
    dispatch({type: MATCHES.FETCH_POOLS, payload: pools});
  } catch (error) {
    console.log('pools error',error);
  }
};

export const fetchPoolDetails = (poolTypeId,matchContractAddress, callback) => async (dispatch, getState) => {
  
  try {
    console.log('api call poolType',`${API_URL}/pool/${matchContractAddress}/${poolTypeId}`);
    const res = await axios.get(
      `${API_URL}/pool/${matchContractAddress}/${poolTypeId}`,
      getAuthHeaders(getState()),
    );
    // const res = await axios.get(
    //   `${API_URL}/users/getpools/`+matchId+`/`+contractAddress,
    //   getAuthHeaders(getState()),
    // );
    const poolDetail = res.data?.data;
    console.log('pools detail',poolDetail);
    if(callback)
    callback(poolDetail);
     poolDetail
  } catch (error) {
    console.log('pools error',error);
  }
};
