import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import {
  Text,
  Icon,
  LinearProgress,
  Divider,
  Button,
} from 'react-native-elements';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import {Shadow} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';
import {useNavigation} from '@react-navigation/native';
import {connect,useSelector} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPoolMembers} from '../components/Card/ContestCard';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList} from 'react-native';
import {setSelectedContest} from '../redux/actions/matchDetailsAction';
import { LCDClient, Coin,MnemonicKey } from '@terra-money/terra.js';

const API_URL =
  'http://backend-env.eba-tvmadbz2.ap-south-1.elasticbeanstalk.com';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const getLeaderBoardData = async (matchId, poolId) => {
  //getPoolDetails(poolId);
  try {
    const user = await AsyncStorage.getItem('user');

    const response = await axios.get(
      `${API_URL}/bet/getleaderboard/${matchId}/${poolId}`,
      {
        headers: {
          Authorization: user.token,
        },
      },
    );

    return response.data?.data?.leaderBoard?.teams;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};



const ContestDetailsScreen = ({pool, route: {params}, setSelectedContest}) => {
  const navigation = useNavigation();

  const {minTeamsForPool,maxTeamsForPool, price, data, _id} = pool;
  const [poolMembers, setPoolMembers] = useState([]);
  const poolDetail = useSelector(res=>res.matchDetails.selectedPricePool);

  const init = async () => {
    const res = await getLeaderBoardData(params?.matchKey, params?.poolKey);

    setPoolMembers(res);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        <TeamHeader />
        <View style={{marginTop: sizing.x8}} />

        <Shadow inner style={styles.shadowStyle}>
          <View
            style={[
              commonStyles.rowAlignCenterJustifyBetween,
              styles.container,
            ]}>
            <Text style={styles.subtitle}>PRIZE POOL</Text>
            <Text style={styles.subtitle}>{maxTeamsForPool} ENTRIES</Text>
          </View>

          <View
            style={[
              commonStyles.rowAlignCenterJustifyBetween,
              styles.container,
              {marginBottom: sizing.x12},
            ]}>
            <View style={[commonStyles.rowAlignCenter, styles.container]}>
              <Text
                style={[
                  Typography.h3Style,
                  {
                    fontWeight: 'bold',
                    fontSize: sizing.x24,
                    color: 'white',
                    marginRight: sizing.x4,
                  },
                ]}>
                50,000
              </Text>
              <Text
                style={[
                  Typography.h3Style,
                  {
                    fontWeight: 'bold',
                    fontSize: sizing.x12,
                    color: 'white',
                    paddingTop: sizing.x4,
                  },
                ]}>
                $Fury
              </Text>
            </View>
            <View
              style={[
                commonStyles.rowAlignCenterJustifyBetween,
                {paddingHorizontal: sizing.x4},
              ]}>
              <Icon name="trophy" size={27} type="evilicon" color="#FFD700" />
              <Text style={{marginHorizontal: sizing.x4}}>1st Prize</Text>
              <Text style={[Typography.h3Style, {color: colors.primary}]}>
                5,000
              </Text>
            </View>
          </View>
          <LinearProgress
            color="primary"
            value={maxTeamsForPool / minTeamsForPool}
            variant="determinate"
          />
          <View
            style={[
              commonStyles.rowAlignCenterJustifyBetween,
              styles.container,
            ]}>
            <Text style={[Typography.h3Style, {color: colors.secondaryColor}]}>
              {maxTeamsForPool} Teams
            </Text>
            <Text>{minTeamsForPool} Teams</Text>
          </View>
        </Shadow>

        <Shadow inner style={styles.teamListContainer}>
          <Text style={[Typography.h2Style, {color: colors.white}]}>
            Leaderboard
          </Text>

          <View
            style={[
              commonStyles.rowAlignCenterJustifyBetween,
              styles.leaderboardTab,
            ]}>
            <Text>Team Name</Text>
            <Text>Points</Text>
            <Text>Rank</Text>
          </View>
          <FlatList
            data={poolMembers}
            nestedScrollEnabled
            ListEmptyComponent={() => (
              <Text style={styles.empty}>Be the first to join</Text>
            )}
            renderItem={({item: {_id, name, points, rank, userId}}) => (
              <View key={_id} style={styles.teamRow}>
                <View style={styles.leaderBoardItem}>
                  <Text style={styles.poolText}>{userId}</Text>
                  <Text style={styles.poolText}></Text>
                  <Text style={styles.poolText}>{'#1'}</Text>
                </View>
                <Divider />
              </View>
            )}
          />
        </Shadow>

        <View style={{height: 80}} />
      </ScrollView>
      <LinearGradient
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        colors={[colors.backgroundColor, 'transparent']}
        style={styles.btnContainer}>
        <Button
          title="Create Team"
          onPress={() => navigation.navigate('CreateTeam')}
          buttonStyle={{
            backgroundColor: colors.secondaryColor,
            padding: sizing.x12,
            borderRadius: sizing.x8,
          }}
          containerStyle={{flex: 1, margin: sizing.x16, marginRight: sizing.x8}}
          titleStyle={styles.title}
        />
        <Button
          title="Join Contest"
          onPress={() => {
            setSelectedContest(_id,poolDetail?poolDetail.poolId:'');
            navigation.navigate('TeamsOverview');
          }}
          containerStyle={{flex: 1, margin: sizing.x16, marginLeft: sizing.x8}}
          buttonStyle={{
            padding: sizing.x12,
            borderRadius: sizing.x8,
          }}
          titleStyle={styles.title}
        />
      </LinearGradient>
    </View>
  );
};

const mapStateToProps = ({matchDetails: {selectedPricePool}}) => ({
  pool: selectedPricePool,
});

export default connect(mapStateToProps, {setSelectedContest})(
  ContestDetailsScreen,
);

const styles = StyleSheet.create({
  shadowStyle: {
    marginVertical: sizing.x8,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 130,
    padding: sizing.x12,
  },
  subtitle: {
    color: colors.subtitleText,
    fontSize: sizing.x12,
  },
  container: {
    marginVertical: sizing.x4,
  },
  teamListContainer: {
    marginVertical: sizing.x8,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 440,
    padding: sizing.x12,
  },
  leaderboardTab: {
    backgroundColor: colors.black,
    marginHorizontal: -sizing.x12,
    paddingHorizontal: sizing.x12,
    height: 48,
    marginTop: sizing.x12,
  },
  teamRow: {
    height: sizing.x32,
    marginVertical: sizing.x8,
  },
  leaderBoardItem: {
    ...commonStyles.rowAlignCenterJustifyBetween,
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: sizing.x32,
    fontSize: 18,
  },
  poolText: {color: colors.white, fontSize: 15},
  title: {fontSize: 14, fontWeight: '800', textTransform: 'uppercase'},
  btnContainer: {
    ...commonStyles.rowAlignCenter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
