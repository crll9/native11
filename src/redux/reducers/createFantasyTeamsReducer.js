import {CREATE_FANTASY} from '../types';

const initialState = {
  players: [],
  loading: true,
  teams: [],
  selectedPlayers: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CREATE_FANTASY.FETCH_PLAYERS:
      return {...state, loading: false, ...payload};
    case CREATE_FANTASY.FETCH_FAILED_PLAYERS:
      return {...state, loading: false};
    case CREATE_FANTASY.LOADING_PLAYERS:
      return {...state, loading: true};
    case CREATE_FANTASY.COMPLETE_SELECTING_ELEVEN:
      return {...state, selectedPlayers: payload};

    default:
      return state;
  }
};
