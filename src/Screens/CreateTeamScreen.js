import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  LogBox,
} from 'react-native';
import {Text, Icon, Button} from 'react-native-elements';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';
import {useNavigation} from '@react-navigation/native';
import {
  getFantasyData,
  saveSelectedPlayers,
} from '../redux/actions/createFantasyTeamActions';
import {connect} from 'react-redux';
import Loader from '../components/Shared/Loader';
import {TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';
import {placeBet,placeBetSmartQuery} from '../redux/actions/createFantasyTeamActions';
import {useSelector} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';

const CARD_WIDTH = Dimensions.get('window').width - 32;

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain']);

const initialState = [
  {name: 'GK', fullName: 'goalkeeper'},
  {name: 'DEF', fullName: 'defender'},
  {name: 'MID', fullName: 'midfielder'},
  {name: 'FOR', fullName: 'striker'},
];

const FANTASY_RULES = {
  striker: {
    min: 1,
    max: 3,
  },
  maxFromTeam: 7,
  defender: {
    min: 3,
    max: 5,
  },
  goalkeeper: {
    min: 1,
    max: 1,
  },
  midfielder: {
    min: 3,
    max: 5,
  },
};

const getAddPlayerError = (playersMap, playerType) => {
  const remainingPlayer =
    11 -
    playersMap.midfielder -
    playersMap.defender -
    playersMap.goalkeeper -
    playersMap.striker;

  const requiredMid =
    FANTASY_RULES.midfielder.min - playersMap.midfielder < 0
      ? 0
      : FANTASY_RULES.midfielder.min - playersMap.midfielder;

  const requiredDef =
    FANTASY_RULES.defender.min - playersMap.defender < 0
      ? 0
      : FANTASY_RULES.defender.min - playersMap.defender;

  const requiredGK =
    FANTASY_RULES.goalkeeper.min - playersMap.goalkeeper < 0
      ? 0
      : FANTASY_RULES.goalkeeper.min - playersMap.goalkeeper;

  const requiredStriker =
    FANTASY_RULES.striker.min - playersMap.striker < 0
      ? 0
      : FANTASY_RULES.striker.min - playersMap.striker;

  const requiredRemainingPlayer =
    requiredMid + requiredDef + requiredStriker + requiredGK;

  if (
    playersMap.midfielder === FANTASY_RULES.midfielder.max &&
    playerType === 'midfielder'
  ) {
    return {
      msg: `Team can have maximum of ${FANTASY_RULES.midfielder.max} midfielder`,
      toast: true,
    };
  }
  if (
    playersMap.defender === FANTASY_RULES.defender.max &&
    playerType === 'defender'
  ) {
    return {
      msg: `Team can have maximum of ${FANTASY_RULES.defender.max} defender`,
      toast: true,
    };
  }
  if (
    playersMap.goalkeeper === FANTASY_RULES.goalkeeper.max &&
    playerType === 'goalkeeper'
  ) {
    return {
      msg: `Team can have maximum of ${FANTASY_RULES.goalkeeper.max} goalkeeper`,
      toast: true,
    };
  }
  if (
    playersMap.striker === FANTASY_RULES.striker.max &&
    playerType === 'striker'
  ) {
    return {
      msg: `Team can have maximum of ${FANTASY_RULES.striker.max} striker`,
      toast: true,
    };
  }

  if (remainingPlayer === requiredRemainingPlayer) {
    let playerTypeOfRemaining = [];
    if (requiredStriker) {
      playerTypeOfRemaining.push('striker');
    }
    if (requiredMid) {
      playerTypeOfRemaining.push('midfielder');
    }
    if (requiredDef) {
      playerTypeOfRemaining.push('defender');
    }
    if (requiredGK) {
      playerTypeOfRemaining.push('goalkeeper');
    }

    let proceed = playerTypeOfRemaining.find(i => i === playerType);

    if (proceed) {
      return null;
    }
    const playersToAdd = playerTypeOfRemaining[0];
    let toast = '';
    if (playersToAdd === 'midfielder') {
      toast = `You need to ${requiredMid} more midfielder`;
    } else if (playersToAdd === 'striker') {
      toast = 'You need a striker';
    } else if (playersToAdd === 'defender') {
      toast = `You need to ${requiredDef} more defender`;
    } else if (playersToAdd === 'goalkeeper') {
      toast = 'You need to a goalkeeper';
    }

    return {
      msg: toast,
      toast: true,
    };
  }

  return null;
};

const suggestPlayerCount = playerType => {
  if (playerType !== 'goalkeeper') {
    return `${FANTASY_RULES[playerType].min} - ${FANTASY_RULES[playerType].max}`;
  }
  return '1';
};

const CreateTeamScreen = ({
  getFantasyData,
  loading,
  players,
  saveSelectedPlayers,
  placeBetSmartQuery,
  teams: [team1, team2],
}) => {
  const [selectedType, setSelectedType] = useState('goalkeeper');
  const [credits, setCredits] = useState(100.0);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [playersMap, setPlayersMap] = useState({
    goalkeeper: 0,
    defender: 0,
    midfielder: 0,
    striker: 0,
  });
  const [teamPlayerCount, setTeamPlayerCount] = useState({
    team1: 0,
    team2: 0,
  });
  const navigation = useNavigation();
  const user = useSelector(sel=>sel.auth.user);
  const matchDetails = useSelector(res=>res.matchDetails.matchDetails);

  useEffect(() => {
    getFantasyData();
    console.log('user details',user);
     console.log('CreateTeamScreen useEffect',matchDetails)
    //  if(matchDetails && matchDetails.contract_address && matchDetails.contract_address.startsWith('terra')){
    //     placeBetSmartQuery(undefined,user.terraWalletAdd, matchDetails.contract_address, success => {
    //      console.log('onCompletePlaceBetsmartQuery',success);
    //    });
    //    }else{
    //      SimpleToast.show('No contract address found');
    //    }
  }, []);

  const addPlayer = (item, playerType) => {
    setTeamPlayerCount({
      team1:
        item.team === team1.code
          ? teamPlayerCount.team1 + 1
          : teamPlayerCount.team1,
      team2:
        item.team === team2.code
          ? teamPlayerCount.team2 + 1
          : teamPlayerCount.team2,
    });
    setCredits(+(credits - item.credits).toFixed(2));
    setSelectedPlayers([...selectedPlayers, item]);
    setPlayersMap({
      ...playersMap,
      [item.key]: item,
      [playerType]: playersMap[playerType] + 1,
    });
  };

  const removePlayer = (item, playerType) => {
    setTeamPlayerCount({
      team1:
        item.team === team1.code
          ? teamPlayerCount.team1 - 1
          : teamPlayerCount.team1,
      team2:
        item.team === team2.code
          ? teamPlayerCount.team2 - 1
          : teamPlayerCount.team2,
    });

    const newPlayersMap = playersMap;
    delete newPlayersMap[item.key];
    setPlayersMap({
      ...newPlayersMap,
      [playerType]: playersMap[playerType] - 1,
    });
    setCredits(+(credits + item.credits).toFixed(2));
    setSelectedPlayers(selectedPlayers.filter(i => i.key !== item.key));
  };

  const handleFantasyPlayerPress = item => {
    const alreadyAdded = playersMap[item.key];
    const playerType = item.role;
    if (alreadyAdded) {
      removePlayer(item, playerType);
      return;
    }
    if (selectedPlayers.length === 11) {
      return;
    }
    if (item.credits > credits) {
      Toast.show('Not enough credit to add this player.');
      return;
    }
    if (
      (teamPlayerCount.team1 === 7 && item.team === team1.code) ||
      (teamPlayerCount.team2 === 7 && item.team === team2.code)
    ) {
      Toast.show('Maximum 7 players from each team');
      return;
    }
    const error = getAddPlayerError(playersMap, playerType);
    if (error) {
      if (error.toast) {
        Toast.show(error.msg);
      }

      return;
    }
    addPlayer(item, playerType);
  };

  const renderFantasyListItemIcon = item => {
    const alreadyAdded = playersMap[item.key];
    const iconType = alreadyAdded ? 'entypo' : 'ionicon';
    const iconName = alreadyAdded ? 'circle-with-cross' : 'ios-add-circle';
    const iconColor = alreadyAdded ? colors.danger : colors.secondaryColor;

    return (
      <Icon
        type={iconType}
        containerStyle={[styles.centerInText, {elevation: 2, marginLeft: 0}]}
        onPress={() => {
          handleFantasyPlayerPress(item);
        }}
        name={iconName}
        color={iconColor}
        size={24}
      />
    );
  };

  const resetState = () => {
    setPlayersMap({
      goalkeeper: 0,
      defender: 0,
      midfielder: 0,
      striker: 0,
    });
    setTeamPlayerCount({team1: 0, team2: 0});
    setSelectedPlayers([]);
  };

  const navigateToCaptainAndVc = () => {
    if (selectedPlayers.length !== 11) {
      Toast.show('Select 11 players to continue!');
      return;
    }
    saveSelectedPlayers(selectedPlayers, {
      [team1.code]: teamPlayerCount.team1,
      [team2.code]: teamPlayerCount.team2,
    });

    navigation.navigate('CaptainChoose', {
      onComplete: () => resetState(),
    });
  };

  return (
    <>
      <TeamHeader />
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          key="upper"
          contentContainerStyle={{alignItems: 'center'}}
          style={{backgroundColor: colors.backgroundColor}}>
          <View style={{marginTop: sizing.x8}} />

          <Shadow inner style={styles.teamSelectOverview}>
            <Text style={styles.shadowHeading}>
              You may only select 7 players from each team
            </Text>
            <View style={styles.container}>
              <View style={styles.cardHalf}>
                <View style={styles.cardInside}>
                  <Text style={styles.subtitle}>Players</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.teamName}>
                      {selectedPlayers.length}/
                    </Text>
                    <Text style={[styles.subtitle, {paddingTop: sizing.x2}]}>
                      11
                    </Text>
                  </View>
                </View>
                <View style={styles.teamContainer}>
                  <Image
                    style={styles.teamLogo}
                    source={require('../assets/images/DummyTeam.jpg')}
                  />
                  <View style={styles.teamContainerInner}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={styles.teamName}>
                      {team1?team1.code:'unknown code'}
                    </Text>
                    <Text>{teamPlayerCount.team1}</Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  color: colors.subtitleText,
                  fontSize: sizing.x40,
                  marginRight: sizing.x8,
                }}>
                /
              </Text>
              <View style={styles.cardHalf}>
                <View style={styles.teamContainer}>
                  <View style={styles.teamContainerInner}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={styles.teamName}>
                      {team2?team2.code:'unknown code'}
                    </Text>
                    <Text>{teamPlayerCount.team2}</Text>
                  </View>
                  <Image
                    style={styles.teamLogo}
                    source={require('../assets/images/DummyTeam.jpg')}
                  />
                </View>
                <View style={{alignItems: 'flex-end', ...styles.cardInside}}>
                  <Text style={styles.subtitle}>Credits</Text>
                  <Text>{credits}</Text>
                </View>
              </View>
            </View>
            <View style={commonStyles.rowAlignCenterJustifyBetween}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => {
                const backgroundColor =
                  selectedPlayers.length >= item
                    ? colors.secondaryColor
                    : colors.backgroundColor;
                return (
                  <Neomorph
                    key={item.toString()}
                    style={{...styles.neomorphTile, backgroundColor}}
                  />
                );
              })}
            </View>
          </Shadow>

          <View
            style={[
              commonStyles.rowAlignCenterJustifyBetween,
              {width: CARD_WIDTH},
            ]}>
            {initialState.map(({name, value, fullName}) => {
              // can vary the color of the buttons here
              const backgroundColor =
                fullName === selectedType
                  ? colors.backgroundColor
                  : colors.secondaryColor;

              return (
                <TouchableOpacity
                  key={name}
                  disabled={selectedType === fullName}
                  onPress={() => setSelectedType(fullName)}>
                  <Neomorph
                    key={name}
                    style={{...styles.neomorphButton, backgroundColor}}>
                    <Text>
                      {name} ({playersMap[fullName]})
                    </Text>
                  </Neomorph>
                </TouchableOpacity>
              );
            })}
          </View>

          <Shadow inner style={styles.teamTable}>
            <Text style={styles.shadowHeading}>
              You may select {suggestPlayerCount(selectedType)} {selectedType}
            </Text>
            <View style={styles.leaderboardTab}>
              <Text style={{flex: 7}}>Players</Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.centerInText}>
                Points
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.centerInText}>
                Credits
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.centerInText}></Text>
            </View>
            <FlatList
              data={players.filter(item => item.role === selectedType)}
              nestedScrollEnabled
              keyExtractor={item => item.key}
              renderItem={({item}) => {
                const {credits, name, team, role} = item;
                return (
                  <View style={styles.rowContainer}>
                    <View style={[commonStyles.rowAlignCenter, {flex: 7}]}>
                      <Image
                        style={styles.logo}
                        source={require('../assets/images/DummyTeam.jpg')}
                      />
                      <View style={{marginLeft: sizing.x8}}>
                        <Text style={{fontWeight: 'bold'}}>{name}</Text>
                        <Text
                          style={{
                            color:
                              team === team1 && team1.code
                                ? colors.primary
                                : colors.secondaryColor,
                            fontWeight: 'bold',
                          }}>
                          {team}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.centerInText}>----</Text>
                    {/* <View style={{flex: 1}}>
                      <Text style={[styles.subtitle]}>{points}</Text> */}
                    <Text style={[styles.centerInText, styles.points]}>
                      {credits}
                    </Text>
                    {renderFantasyListItemIcon(item)}
                  </View>
                );
              }}
            />
          </Shadow>

          <View style={{height: 60}} />
        </ScrollView>
      )}
      <Button
        title="Continue"
        onPress={navigateToCaptainAndVc}
        buttonStyle={commonStyles.bottomBtn}
        titleStyle={{fontSize: 14, fontWeight: '800'}}
        containerStyle={commonStyles.absolutePositionedBtn}
      />
    </>
  );
};

const mapStateToProps = ({createTeam: {loading, players, teams}}) => ({
  loading,
  players,
  teams,
});

export default connect(mapStateToProps, {getFantasyData, saveSelectedPlayers,placeBetSmartQuery})(
  CreateTeamScreen,
);

const styles = StyleSheet.create({
  neomorphTile: {
    shadowRadius: 2,
    borderRadius: 6,
    backgroundColor: colors.secondaryColor,
    width: 22,
    height: 22,
    padding: sizing.x12,
    ...commonStyles.alignItemsCenter,
  },
  teamSelectOverview: {
    marginVertical: sizing.x12,
    marginBottom: sizing.x24,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 150,
    padding: sizing.x12,
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    borderRadius: 18,
  },
  container: {
    marginVertical: sizing.x12,
    marginHorizontal: sizing.x4,
    flexDirection: 'row',
  },
  subtitle: {
    color: colors.subtitleText,
    fontSize: sizing.x12,
  },
  neomorphButton: {
    ...commonStyles.alignItemsCenter,
    shadowRadius: 2,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: colors.secondaryColor,
    width: 76,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamTable: {
    marginVertical: sizing.x12,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 400,
    padding: sizing.x12,
  },
  shadowHeading: {
    ...commonStyles.rowAlignCenter,
    ...Typography.h5Style,
    fontSize: sizing.x12,
    color: colors.subtitleText,
    textAlign: 'center',
  },
  leaderboardTab: {
    backgroundColor: colors.black,
    marginHorizontal: -sizing.x12,
    paddingHorizontal: sizing.x12,
    height: 40,
    marginTop: sizing.x12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(255,255,255,.1)',
    borderBottomWidth: 1,
    paddingVertical: sizing.x8,
  },
  centerInText: {
    flex: 2,
    textAlign: 'center',
  },
  points: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
  },
  teamLogo: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  teamContainer: {
    flexDirection: 'row',
    width: 88,
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  cardHalf: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInside: {
    width: 60,
  },
  teamName: {fontWeight: 'bold', fontSize: 13},
  teamContainerInner: {
    alignItems: 'center',
    width: 72,
  },
});
