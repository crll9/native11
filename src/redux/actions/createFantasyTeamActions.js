import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import { CONTRACT, CREATE_FANTASY, MATCHES } from '../types';
import { getPoolDetailsByKey } from './matchDetailsAction';
import { getAuthHeaders } from './matchesActions';
import { LCDClient, Coin, MnemonicKey } from '@terra-money/terra.js';
import { ContractConstants } from '../../components/Shared/ContractConstants';
import { MsgExecuteContract } from '@terra-money/terra.js';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

export const placeBet =
  (FteamId, onComplete = () => { }) =>
    async (dispatch, getState) => {
      try {
        const {
          matchDetails: { matchDetails, selectedPricePool },
          auth: {
            user: { userId },
          },
        } = getState();
        const body = {
          poolId:selectedPricePool.poolId,
          //poolId: selectedPricePool.key,
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
          payload: { key: selectedPricePool.key, data: poolData },
        });
        onComplete(true);
        SimpleToast.show('Joined successfully');
      } catch (error) {
        console.log(error.response);
        onComplete(false);
        SimpleToast.show('Failed to join contest!');
      }
    };
export const convertJsonToBase64 = (jsonObj) => {
  let objJsonStr = JSON.stringify(jsonObj);
  let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
  return objJsonB64;
}

export const executeContractMsg = (terra, wallet, senderId, mintingContractAddress, matchContractAddress, amount,msg) => {
  return new Promise((resolve, reject) => {
    console.log('executeContractMsg');
    let messageBody = {
      "send": {
        "contract": matchContractAddress, //contract_address you can get from matchAPI   
        "amount":amount+"", //get this from the getPools API (backend )
        "msg": msg  //this is betting payload - comes from the above step placeâBet
      }
    }
    console.log('wallet ', wallet.key.accAddress + ' match ' + matchContractAddress + ' senderId ' + senderId + ' mintingContractAddress ' + mintingContractAddress);
    console.log()
    console.log('messageBody executeContractMsg', messageBody);

    const execute = new MsgExecuteContract(
      senderId, // sender
      mintingContractAddress, // contract account address
      messageBody // handle msg
    );
    console.log('MsgExecuteContract', execute);
    wallet.createAndSignTx({
      msgs: [execute]
    }).then(executeTx => {
      console.log('executeContractMsg createAndSignTx data', executeTx)
      terra.tx.broadcast(executeTx).then(data => {
        console.log('executeContractMsg data', data)
        resolve(data);
      }).catch(err => {
        console.log('executeContractMsg error', err)
        reject(err);
      })
    }).catch(err1 => {
      console.log('executeContractMsg createAndSignTx error', err1);
      console.log('executeContractMsg createAndSignTx error response', err1.response || '');
      reject(err1);
    })
  })


}
export const getDummyWallet = (terra) => {
  const mk = new MnemonicKey({
    mnemonic: 'bread jazz excite lemon multiply pumpkin radar cereal scatter midnight party off embody stage phone pledge disease bronze tooth begin quote mule neck loud',
  });
  let wallet = terra.wallet(mk);
  return wallet;
}
export const placeBetSmartQuery =
  (team, terraWalletAdd, contractAddress, poolType, poolId, poolFee,platformFee,onComplete, onError) =>{
      
      //code to place smart query bid
      const terra = new LCDClient({
        URL: 'https://bombay-lcd.terra.dev',
        chainID: 'bombay-12',
      });
      console.log('contractAddress', contractAddress);


      console.log('team details', team);
      // let queryData = {
      //   "game_pool_bid_submit": {
      //     "gamer": terraWalletAdd,
      //     "pool_type": 'H2H',
      //     "pool_id": team?team.poolId:'1',
      //     "team_id": team?team._id:'1'
      //   }
      // };

      console.log('game_pool_bid_submit request data', queryData)
      let wallet = getDummyWallet(terra);//wallet need to get
      let queryData = {
        "game_pool_bid_submit": {
          "gamer": wallet.key.accAddress,
          "pool_type": poolType,
          "pool_id": poolId,
          "team_id": team._id,
          "poolFee": poolFee
        }
      };
      executeContractMsg(terra, wallet, wallet.key.accAddress, 'terra1gs22hrmrtrfpqxtcn5ncykhazga9hmjlcyrlgs', contractAddress,Number(poolFee)+Number(platformFee), convertJsonToBase64(queryData)).then(data=>{
        onComplete(data);
      }).catch(err=>{
        onError(err);
      })

    };

export const getFantasyData = () => async (dispatch, getState) => {

  const {
    matchDetails: {
      matchDetails: { key },
    },
  } = getState();
  console.log('getFantasyData match key', key);
  dispatch({ type: CREATE_FANTASY.LOADING_PLAYERS });
  console.log('getFantasyData URL', `${API_URL}/fantasy/fancredit/${key}`);
  console.log('headers', getAuthHeaders(getState()));
  try {
    const response = await axios.get(
      `${API_URL}/fantasy/fancredit/${key}`,
      getAuthHeaders(getState()),
    );
    console.log('getFantasyData api ' + key, JSON.stringify(response));
    const { fantasy, players, team } =
      response.data?.data?.[0] || response.data.data.data || response.data.data;
    let teamArray = Object.values(team);
    console.log('fantasy', fantasy);
    console.log('fantasy?.credits[0]', fantasy?.credits);

    const playerData = fantasy?.credits.map(item => {
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
      payload: { players: playerData, teams: teamArray },
    });
  } catch (error) {
    console.log('getFantasyData error ', error);
    console.log('getFantasyData error ', error.response?.data || error.message);
    dispatch({ type: CREATE_FANTASY.FETCH_FAILED_PLAYERS });
  }
};

export const saveSelectedPlayers = (players, members) => dispatch => {
  dispatch({
    type: CREATE_FANTASY.COMPLETE_SELECTING_ELEVEN,
    payload: { players, members },
  });
};


export const saveFantasyTeam =
  (playerTeam, match, onComplete = () => { }) =>
    async (dispatch, getState) => {
      try {
        const {
          matchDetails: { matchDetails, selectedPricePool },
          createTeam: { createdTeams },
          auth: {
            user: { userId },
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
      user: { userId },
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
    dispatch({ type: CREATE_FANTASY.FETCH_CREATED_TEAMS, payload: teams });
  } catch (error) {
    dispatch({ type: CREATE_FANTASY.FETCH_CREATED_TEAMS, payload: [] });
    console.log(error.response?.data);
  }
};
