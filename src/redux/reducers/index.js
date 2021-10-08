import {combineReducers} from 'redux';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  matches: matchesReducer,
});

export default rootReducer;
