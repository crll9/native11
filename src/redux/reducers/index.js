import {combineReducers} from 'redux';
import matchDetailsReducer from './matchDetailsReducer';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  matches: matchesReducer,
  matchDetails: matchDetailsReducer,
});

export default rootReducer;
