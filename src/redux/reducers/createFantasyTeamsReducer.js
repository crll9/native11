import {CREATE_FANTASY} from '../types';

const initialState = {
  players: [],
  loading: true,
  teams: [],
  selectedPlayers: [],
  selectedMembers: {},
  createdTeams: [],
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
      return {
        ...state,
        selectedPlayers: payload.players,
        selectedMembers: payload.members,
      };
    case CREATE_FANTASY.FETCH_CREATED_TEAMS:
      return {...state, createdTeams: payload};
    case CREATE_FANTASY.CREATED_FANTASY_TEAM:
      return {
        ...state,
        createdTeams:
          state.createdTeams.length > 0
            ? [...state.createdTeams, payload]
            : [payload],
      };

    default:
      return state;
  }
};
