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
    case MATCHES.UPDATE_POOLS:
      return {
        ...state,
        pools: payload,
      };
    case MATCHES.UPDATE_SINGLE_POOL:
      return {
        ...state,
        pools: state.pools.map(item => {
          if (item.key === payload.key) {
            return {
              ...item,
              data: payload.data,
            };
          }
          return item;
        }),
      };
    default: {
      return state;
    }
  }
};

export default matchesReducer;
