import axios from 'axios';
import {CREATE_FANTASY} from '../types';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

export const getFantasyData =
  (id = '1434783939121254405') =>
  async dispatch => {
    dispatch({type: CREATE_FANTASY.LOADING_PLAYERS});
    try {
      const response = await axios.get(`${API_URL}/fantasy/fancredit/${id}`);
      const {fantacy, players, team} = response.data.data[0];
      let teamArray = Object.values(team);
      const playerData = fantacy?.credits.map(item => {
        delete item.prev_points;
        return {
          ...item,
          ...players[item.player_key],
          team: teamArray[0].players?.includes(item.player_key)
            ? teamArray[0].name
            : teamArray[1].name,
        };
      });
      dispatch({type: CREATE_FANTASY.FETCH_PLAYERS, payload: playerData});
    } catch (error) {
      console.log(error.message);
      dispatch({type: CREATE_FANTASY.FETCH_FAILED_PLAYERS});
    }
  };
