import {combineReducers} from 'redux';
import matchDetailsReducer from './matchDetailsReducer';
import createFantasyTeamsReducer from './createFantasyTeamsReducer';
import matchesReducer from './matchesReducer';
import auth from './authReducers';

const rootReducer = combineReducers({
  matches: matchesReducer,
  matchDetails: matchDetailsReducer,
  createTeam: createFantasyTeamsReducer,
  auth,
});

export default rootReducer;
