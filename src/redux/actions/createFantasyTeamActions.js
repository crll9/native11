import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import {CREATE_FANTASY, MATCHES} from '../types';
import {getPoolDetailsByKey} from './matchDetailsAction';
import {getAuthHeaders} from './matchesActions';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

export const placeBet =
  (FteamId, onComplete = () => {}) =>
  async (dispatch, getState) => {
    try {
      const {
        matchDetails: {matchDetails, selectedPricePool},
        auth: {
          user: {userId},
        },
      } = getState();
      const body = {
        poolId: selectedPricePool.key,
        // matchId: '1434783939121254405',
        matchId: matchDetails.key,
        FteamId,
        userId,
      };

      await axios.post(
        `${API_URL}/bet/placebet`,
        body,
        getAuthHeaders(getState()),
      );
      const poolData = await getPoolDetailsByKey(
        matchDetails.key,
        selectedPricePool.key,
      );
      dispatch({
        type: MATCHES.UPDATE_SINGLE_POOL,
        payload: {key: selectedPricePool.key, data: poolData},
      });
      onComplete(true);
      SimpleToast.show('Joined successfully');
    } catch (error) {
      console.log(error.response);
      onComplete(false);
      SimpleToast.show('Failed to join contest!');
    }
  };

export const getFantasyData = () => async (dispatch, getState) => {
  const {
    matchDetails: {
      matchDetails: {key},
    },
  } = getState();
  dispatch({type: CREATE_FANTASY.LOADING_PLAYERS});
  try {
    const response = await axios.get(
      `${API_URL}/fantasy/fancredit/${key}`,
      getAuthHeaders(getState()),
    );

    const {fantacy, players, team} =
      response.data?.data?.[0] || response.data.data;

    let teamArray = Object.values(team);

    const playerData = fantacy?.credits.map(item => {
      delete item.prev_points;
      return {
        ...item,
        ...players[item.player_key],
        team: teamArray[0].players?.includes(item.player_key)
          ? teamArray[0].code
          : teamArray[1].code,
        isCaptain: false,
        isViceCaptain: false,
      };
    });

    dispatch({
      type: CREATE_FANTASY.FETCH_PLAYERS,
      payload: {players: playerData, teams: teamArray},
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
    dispatch({type: CREATE_FANTASY.FETCH_FAILED_PLAYERS});
  }
};

export const saveSelectedPlayers = (players, members) => dispatch => {
  dispatch({
    type: CREATE_FANTASY.COMPLETE_SELECTING_ELEVEN,
    payload: {players, members},
  });
};

export const saveFantasyTeam =
  (playerTeam, match, onComplete = () => {}) =>
  async (dispatch, getState) => {
    try {
      const {
        matchDetails: {matchDetails, selectedPricePool},
        createTeam: {createdTeams},
        auth: {
          user: {userId},
        },
      } = getState();

      const data = {
        poolId: '2',
        userId,
        matchId: matchDetails.key,
        // matchId: '1434783939121254405',
        playerTeam,
        teamName: `team-${!createdTeams?.length ? 1 : createdTeams.length + 1}`,
        match: {
          ...match,
          matchId: matchDetails.key,
        },
      };

      let sameCreated = false;
      for (let i = 0; i < createdTeams.length; i++) {
        const team = createdTeams[i];
        if (JSON.stringify(team.playerTeam) === JSON.stringify(playerTeam)) {
          sameCreated = true;
          break;
        }
      }

      if (sameCreated) {
        SimpleToast.show('Can not create two same teams!');
        return;
      }

      const response = await axios.post(
        `${API_URL}/fantasy/createTeam`,
        data,
        getAuthHeaders(getState()),
      );
      SimpleToast.show('Team saved successfully');
      const payload = response.data.data;
      dispatch({
        type: CREATE_FANTASY.CREATED_FANTASY_TEAM,
        payload,
      });
      saveSelectedPlayers([], {})(dispatch);
      onComplete(true);
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      console.log(msg);
      SimpleToast.show(msg);
      onComplete(false);
    }
  };

export const fetchUserFantasyTeams = key => async (dispatch, getState) => {
  const {
    auth: {
      user: {userId},
    },
  } = getState();
  try {
    const response = await axios.get(
      `${API_URL}/fantasy/userFantacyTeam/${userId}/${key}`,
      getAuthHeaders(getState()),
    );
    const teamsOBJ = response.data.data;
    delete teamsOBJ.userTeamCount;
    const teams = Object.values(teamsOBJ);
    dispatch({type: CREATE_FANTASY.FETCH_CREATED_TEAMS, payload: teams});
  } catch (error) {
    dispatch({type: CREATE_FANTASY.FETCH_CREATED_TEAMS, payload: []});
    console.log(error.response?.data);
  }
};
