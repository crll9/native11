import {CREATE_FANTASY} from '../types';

const initialState = {
  players: [],
  loading: true,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CREATE_FANTASY.FETCH_PLAYERS:
      return {...state, loading: false, players: payload};
    case CREATE_FANTASY.FETCH_FAILED_PLAYERS:
      return {...state, loading: false};
    case CREATE_FANTASY.LOADING_PLAYERS:
      return {...state, loading: true};

    default:
      return state;
  }
};
