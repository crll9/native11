import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Image} from 'react-native';
import {Text, Icon, Button} from 'react-native-elements';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import {Neomorph} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';
import ContestCard from '../components/Card/ContestCard';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {fetchUserFantasyTeams} from '../redux/actions/createFantasyTeamActions';
import { LCDClient, Coin,MnemonicKey } from '@terra-money/terra.js';
import { useSelector} from 'react-redux';
import {fetchPools} from '../redux/actions/matchesActions';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const MatchContestScreen = ({
  loading,
  matchDetails,
  pools,
  fetchUserFantasyTeams,fetchPools,
  route: {params},
}) => {
  const navigation = useNavigation();
  const user = useSelector(sel=>sel.auth.user);
  const contractAddress = useSelector(res=>res.auth.contractAddress);
  console.log("user from redux",user);
  console.log("user from terraWalletAdd",user.terraWalletAdd);

  useEffect(() => {
    console.log('params',params);
    if (params?.key) {
      fetchUserFantasyTeams(params?.key);
      fetchFantacyTeam(params?.key)
    }

    if(params?._id){
      console.log('fetchPools calles');
    fetchPools(params?._id,contractAddress);
    }

  }, [ params]);

  const fetchFantacyTeam=(key)=>{
    console.log("Game id",key);
    const terra = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev',
      chainID: 'bombay-12',
    });
    let queryData = {
      'get_all_pools_in_game': { "game_id": key }

    };
    console.log('fetchFantacyTeam get_all_pools_in_game query data',queryData)
      terra.wasm.contractQuery(
        //'terra1m5smuazxlcz5jp53amn62ztmpumhw3xndwaxfs',
          //'terra1n3rxe7jsq8razp6vf5lxncayvtlgpcrtkvruw6',
          //user.terraWalletAdd,
          //'terra1lugnxn39q4d8xv2w939pxx0ag7ag6w5fd0k0uh',
          contractAddress, queryData// query msg
        ).then(data=>{
          console.log('fetchFantacyTeam get_all_pools_in_game response',data);
        }).catch(err=>{
          console.log('fetchFantacyTeam get_all_pools_in_game error',JSON.stringify(err))
        });
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor, flex: 1}}>
      <TeamHeader />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <ScrollView>
          <View style={{marginTop: sizing.x8}} />
          <View style={commonStyles.centerInFlex1}>
            <Neomorph style={styles.allContestShadow}>
              <View style={commonStyles.rowAlignCenterJustifyBetween}>
                <View style={commonStyles.rowAlignCenterJustifyBetween}>
                  <Image
                    style={styles.logo}
                    source={require('../assets/images/DummyTeam.jpg')}
                  />
                  <Text style={{fontWeight: 'bold', paddingRight: sizing.x4}}>
                    View All Contests
                  </Text>
                  <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                    (98)
                  </Text>
                </View>
                <Icon
                  name="arrow-right-bold"
                  size={20}
                  type="material-community"
                  color={colors.primary}
                />
              </View>
            </Neomorph>
          </View>
          <View style={styles.contentBox}>
            <Image
              style={styles.logo2}
              source={require('../assets/images/DummyTeam.jpg')}
            />
            <View>
              <Text
                style={{
                  ...Typography.h3Style,
                  color: colors.secondaryColor,
                  marginVertical: sizing.x2,
                }}>
                Everybody Wins
              </Text>
              <Text style={{color: colors.subtitleText}}>
                Low Investment Higher Returns
              </Text>
            </View>
          </View>

          {pools.map(pool => (
            <ContestCard
              matchKey={matchDetails?.key}
              active={pool.active}
              key={pool._id}
              pool={pool}
            />
          ))}
          <View style={{height: 60}} />
        </ScrollView>
      )}
      <Button
        title="Create A New Team"
        onPress={() => navigation.navigate('CreateTeam')}
        buttonStyle={{
          backgroundColor: colors.secondaryColor,
          paddingVertical: 14,
          borderRadius: 14,
        }}
        titleStyle={{fontSize: 14, fontWeight: '800'}}
        containerStyle={commonStyles.absolutePositionedBtn}
      />
    </View>
  );
};

const mapStateToProps = ({
  matchDetails: {loading, matchDetails},
  matches: {pools},
}) => ({
  loading,
  matchDetails,
  pools,
});

export default connect(mapStateToProps, {fetchUserFantasyTeams,fetchPools})(
  MatchContestScreen,
);

const styles = StyleSheet.create({
  teamName: {
    margin: sizing.x4,
    ...Typography.h1Style,
    color: colors.white,
  },
  timer: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 2.5,
    borderRadius: 4,
    marginVertical: 3,
  },
  timerText: {
    color: colors.secondaryColor,
    fontSize: 16,
  },
  allContestShadow: {
    marginVertical: sizing.x16,
    shadowRadius: 8,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 60,
    padding: sizing.x16,
  },
  logo: {
    width: sizing.x32,
    height: sizing.x32,
    resizeMode: 'contain',
    marginRight: '5%',
  },
  logo2: {
    width: sizing.x40,
    height: sizing.x40,
    resizeMode: 'contain',
    marginRight: '5%',
  },
  contentBox: {
    marginVertical: sizing.x8,
    flexDirection: 'row',
    marginHorizontal: sizing.x24,
  },
  loader: {
    height: 120,
    justifyContent: 'center',
  },
});
