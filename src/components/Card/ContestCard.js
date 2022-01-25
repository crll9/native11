import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Icon, Text, LinearProgress} from 'react-native-elements';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import {sizing} from '../../Styles/theme';
import Typography from '../../Styles/Typography';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import {useNavigation} from '@react-navigation/native';
import {setSelectedContest} from '../../redux/actions/matchDetailsAction';
import {fetchPoolDetails} from '../../redux/actions/matchesActions';
import {connect,useSelector} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import { useState } from 'react';

const CARD_WIDTH = Dimensions.get('window').width - 32;

export const getPoolMembers = data => {
  try {
    const res = data.data.betsInPlace;
    return res;
  } catch (error) {
    return 0;
  }
};

const ContestCard = ({
  pool: {poolFee, minTeamsForPool,maxTeamsForPool, members, _id, key, data,poolType},
  active,
  setSelectedContest,
  matchKey,
  fetchPoolDetails
}) => {
  const navigation = useNavigation();
  const matchDetails = useSelector(res=>res.matchDetails.matchDetails);
  const [poolDetail,setPoolDetail] = useState({});
  useEffect(()=>{
    fetchPoolDetails(_id,matchDetails.contract_address,(pd)=>{
      setPoolDetail(pd)
      console.log('pool detail loaded',pd);
    });
  },[])
  const handleCardPress = () => {
    navigation.navigate('Tournament', {matchKey, poolKey: key});
    setSelectedContest(_id,poolDetail.poolId);
  };
  const navigateToTeamList = () => {
    if (!poolDetail || poolDetail.poolState!='ACTIVE') {
      SimpleToast.show('Pool not active now!');
      return;
    }
    setSelectedContest(_id,poolDetail.poolId);
    navigation.navigate('TeamsOverview');
  };
  return (
    <TouchableOpacity
      onPress={handleCardPress}
      activeOpacity={0.8}
      style={[commonStyles.alignItemsCenter, {marginVertical: sizing.x12}]}>
      <Shadow inner style={styles.neomorphContainer}>
        <View
          style={[commonStyles.rowAlignCenterJustifyBetween, styles.container]}>
          <Text style={styles.subtitle}>PRIZE POOL</Text>
          <Text style={styles.subtitle}>ENTRY</Text>
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
          <TouchableOpacity activeOpacity={0.8} onPress={navigateToTeamList}>
            <Neomorph style={styles.valueContainer}>
              <Text
                style={{
                  color: colors.secondaryColor,
                  fontSize: Typography.fontSizes.x18,
                }}>
                 {poolFee/1000000}
              </Text>
              <Text
                style={{
                  color: colors.secondaryColor,
                  fontSize: Typography.fontSizes.x13,
                  marginTop: 2,
                }}>
                $Fury
              </Text>
            </Neomorph>
          </TouchableOpacity>
        </View>

        <View
          style={[commonStyles.rowAlignCenterJustifyBetween, styles.container]}>
          <Text>{maxTeamsForPool} Teams</Text>
          <Text>{minTeamsForPool} Teams</Text>
        </View>
        <LinearProgress
          color="primary"
          value={maxTeamsForPool / minTeamsForPool}
          variant="determinate"
        />
        <Shadow inner style={styles.bottomShadow}>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <View style={[commonStyles.rowAlignCenterJustifyBetween]}>
              <Icon name="trophy" size={25} type="evilicon" color="#FFD700" />
              <Text style={[{marginHorizontal: sizing.x4}, styles.subtitle]}>
                1st Prize
              </Text>
              <Text style={{color: colors.primary}}>10,000</Text>
            </View>
            <View style={commonStyles.rowAlignCenterJustifyBetween}>
              <Text style={[styles.subtitle, {marginHorizontal: sizing.x12}]}>
                65% Winners
              </Text>
              <Text style={{color: colors.primary}}>1200</Text>
            </View>
            <View style={{marginLeft: sizing.x24}}>
              <Text style={styles.subtitle}>Entries</Text>
            </View>
          </View>
        </Shadow>
      </Shadow>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {setSelectedContest,fetchPoolDetails})(ContestCard);

const styles = StyleSheet.create({
  neomorphContainer: {
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 225,
    padding: sizing.x12,
    paddingBottom: 0,
  },
  subtitle: {
    color: colors.subtitleText,
    fontSize: sizing.x12,
  },
  container: {
    marginVertical: sizing.x8,
  },
  valueContainer: {
    shadowRadius: 3,
    borderRadius: 12,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH * 0.24,
    height: 44,
    padding: sizing.x8,
    paddingHorizontal: sizing.x4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomShadow: {
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 53,
    padding: sizing.x12,
    ...commonStyles.rowAlignCenterJustifyBetween,
    marginLeft: -sizing.x12,
    marginTop: 'auto',
    //  borderTopLeftRadius: 0,
  },
});
