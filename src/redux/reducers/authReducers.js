import {CONTRACT, USER} from '../types';
import { ContractConstants } from '../../components/Shared/ContractConstants';

const initialState = {
  user: null,
  loading: false,
  walletLoading: false,
  walletData: null,
  contractAddress:null
};
const authReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CONTRACT.ADD_CONTRACT_ADDRESS:
      return {
        ...state,
        contractAddress:payload
      }
    case USER.LOADING_START:
      return {
        ...state,
        loading: true,
      };

    case USER.FETCH_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        walletLoading: true,
      };
    case USER.WALLET_DATA_FETCH_SUCCESS:
      return {
        ...state,
        walletData: payload,
        walletLoading: false,
      };
    case USER.WALLET_DATA_FETCH_FAILED:
      return {
        ...state,
        walletData: payload,
        walletLoading: false,
      };
    case USER.LOGOUT:
    case USER.FETCH_FAILED:
      return initialState;
    default: {
      return state;
    }
  }
};

export default authReducer;
