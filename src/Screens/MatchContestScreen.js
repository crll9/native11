import React from 'react';
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

const CARD_WIDTH = Dimensions.get('window').width - 32;

const MatchContestScreen = ({loading, matchDetails, pools}) => {
  const navigation = useNavigation();
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
          <View style={[commonStyles.centerInFlex1]}>
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
            <ContestCard key={pool._id} pool={pool} />
          ))}
          <View style={{height: 60}} />
        </ScrollView>
      )}
      <Button
        title="New Team"
        onPress={() => navigation.navigate('CreateTeam')}
        buttonStyle={{
          backgroundColor: colors.secondaryColor,
          paddingVertical: 12,
          borderRadius: 14,
        }}
        titleStyle={{fontSize: 16, fontWeight: '800'}}
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

export default connect(mapStateToProps, {})(MatchContestScreen);

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
