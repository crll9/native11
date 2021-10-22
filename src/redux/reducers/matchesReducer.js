import {MATCHES} from '../types';

const initialState = {
  loading: true,
  matches: [],
  pools: [],
};

const matchesReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case MATCHES.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case MATCHES.FETCH_SUCCESS:
      return {
        ...state,
        matches: payload,
        loading: false,
      };
    case MATCHES.FETCH_FAILED:
      return {
        ...state,
        matches: [],
        loading: false,
      };
    case MATCHES.FETCH_POOLS:
      return {
        ...state,
        pools: payload,
      };
    default: {
      return state;
    }
  }
};

export default matchesReducer;
