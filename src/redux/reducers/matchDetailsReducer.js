import {MATCH_DETAILS} from '../types';

const initialState = {
  loading: true,
  matchDetails: {},
  selectedPricePool: {},
};

const matchDetailsReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case MATCH_DETAILS.LOADING_START:
      return {
        ...state,
        loading: true,
        matchDetails: {},
      };
    case MATCH_DETAILS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        matchDetails: payload,
      };
    case MATCH_DETAILS.FETCH_FAILED:
      return {
        ...state,
        loading: false,
        matchDetails: {},
      };
    case MATCH_DETAILS.SET_SELECTED_PRICE_POOL:
      return {
        ...state,
        selectedPricePool: payload,
      };
    default: {
      return state;
    }
  }
};

export default matchDetailsReducer;
