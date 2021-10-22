import {combineReducers} from 'redux';
import matchDetailsReducer from './matchDetailsReducer';
import createFantasyTeamsReducer from './createFantasyTeamsReducer';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  matches: matchesReducer,
  matchDetails: matchDetailsReducer,
  createTeam: createFantasyTeamsReducer,
});

export default rootReducer;
