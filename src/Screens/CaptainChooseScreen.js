import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {Text, Icon, LinearProgress, Divider} from 'react-native-elements';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import GameCard from '../components/Card/GameCard';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';
import {useNavigation} from '@react-navigation/native';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const mockPlayers = [
  {name: 'David Villa', team: 'SPA', points: '35.8'},
  {name: 'David Villa', team: 'SPA', points: '15.8'},
  {name: 'David Villa', team: 'SPA', points: '45.8'},
];

const CaptainChooseScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{backgroundColor: colors.backgroundColor}}>
      <TeamHeader />
      <View style={{marginTop: sizing.x8}}></View>
      <View style={[commonStyles.centerInFlex1, styles.container]}>
        <Text numberOfLines={1} style={styles.header}>
          Choose your Captain & Vice-Captain
        </Text>
        <Text style={styles.subtitle}>
          Captain gets 2x points and Vice-Captain gets 1.5x points
        </Text>
      </View>

      <View style={commonStyles.centerInFlex1}>
        <Shadow inner style={styles.captainTable}>
          <View style={styles.tabTable}>
            <Text style={styles.subtitle}>Players</Text>
            <Text
              style={[styles.subtitle, {position: 'absolute', left: '53%'}]}>
              Points
            </Text>
          </View>
          {mockPlayers.map(({name, team, points}) => {
            return (
              <View
                key={points}
                style={[
                  commonStyles.rowAlignCenterJustifyBetween,
                  styles.rowContainer,
                ]}>
                <View style={commonStyles.rowAlignCenterJustifyBetween}>
                  <Image
                    style={styles.logo}
                    source={require('../assets/images/DummyTeam.jpg')}
                  />
                  <View>
                    <Text style={{fontWeight: 'bold'}}>{name}</Text>
                    <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                      {team}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.subtitle]}>{points}</Text>
                <Neomorph style={styles.captainSelectBtn}>
                  <Text style={styles.subtitle}>C</Text>
                </Neomorph>
                <Neomorph style={styles.captainSelectBtn}>
                  <Text style={styles.subtitle}>VC</Text>
                </Neomorph>
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => navigation.navigate('TeamsOverview')}>
            <Text>Press here</Text>
          </TouchableOpacity>
        </Shadow>
      </View>
    </ScrollView>
  );
};

export default CaptainChooseScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: sizing.x12,
    marginHorizontal: sizing.x12,
    padding: sizing.x8,
  },
  subtitle: {
    color: colors.subtitleText,
    fontSize: sizing.x12,
  },
  header: {
    ...Typography.h3Style,
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: sizing.x8,
  },
  captainTable: {
    marginVertical: sizing.x16,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 400,
    padding: sizing.x12,
  },
  tabTable: {
    paddingHorizontal: sizing.x16,
    backgroundColor: colors.black,
    height: sizing.x64,
    marginHorizontal: -sizing.x12,
    marginTop: -sizing.x12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...commonStyles.rowAlignCenterJustifyBetween,
  },
  rowContainer: {
    marginVertical: sizing.x16,
  },
  logo: {
    width: sizing.x40,
    height: sizing.x40,
    resizeMode: 'contain',
    marginHorizontal: '1.5%',
  },
  captainSelectBtn: {
    shadowRadius: 2.2,
    borderRadius: 17,
    backgroundColor: colors.backgroundColor,
    width: 32,
    height: 32,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
