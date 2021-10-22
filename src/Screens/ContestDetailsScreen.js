import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
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

const CARD_WIDTH = Dimensions.get('window').width - 32;

const mockData = [
  {
    id: '1',
    name: 'Shubhendus Eleven',
    points: '0.0',
    rank: '#1',
  },
  {
    id: '2',
    name: 'Shubhendus Eleven',
    points: '0.0',
    rank: '#2',
  },
  {
    id: '3',
    name: 'Shubhendus Eleven',
    points: '0.0',
    rank: '#3',
  },
  {
    id: '4',
    name: 'Shubhendus Eleven',
    points: '0.0',
    rank: '#4',
  },
];

const TournamentScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{backgroundColor: colors.backgroundColor}}>
      <TeamHeader />
      <View style={{marginTop: sizing.x8}} />
      <View style={[commonStyles.centerInFlex1]}>
        <Shadow inner style={styles.shadowStyle}>
          <View
            style={[
              commonStyles.rowAlignCenterJustifyBetween,
              styles.container,
            ]}>
            <Text style={styles.subtitle}>PRIZE POOL</Text>
            <Text style={styles.subtitle}>12ENTRIES</Text>
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
                $CRLL
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
          <LinearProgress color="primary" value={0.5} variant="determinate" />
          <View
            style={[
              commonStyles.rowAlignCenterJustifyBetween,
              styles.container,
            ]}>
            <Text style={[Typography.h3Style, {color: colors.secondaryColor}]}>
              2198 Teams
            </Text>
            <Text>5250 Teams</Text>
          </View>
        </Shadow>
      </View>

      <View style={commonStyles.centerInFlex1}>
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

          {mockData.map(({id, name, points, rank}) => {
            return (
              <View key={id} style={styles.teamRow}>
                <View
                  style={[
                    commonStyles.rowAlignCenterJustifyBetween,
                    {marginHorizontal: sizing.x4, marginVertical: sizing.x8},
                  ]}>
                  <Text style={{color: colors.subtitleText}}>{name}</Text>
                  <Text style={{color: colors.subtitleText}}>{points}</Text>
                  <Text style={{color: colors.subtitleText}}>{rank}</Text>
                </View>
                <Divider />
              </View>
            );
          })}
          <Button
            title="Create Team"
            onPress={() => navigation.navigate('CreateTeam')}
            containerStyle={{marginTop: 'auto'}}
          />
        </Shadow>
      </View>
    </ScrollView>
  );
};

export default TournamentScreen;

const styles = StyleSheet.create({
  shadowStyle: {
    marginVertical: sizing.x24,
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
    marginVertical: sizing.x24,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 480,
    padding: sizing.x12,
  },
  leaderboardTab: {
    backgroundColor: colors.black,
    marginHorizontal: -sizing.x12,
    paddingHorizontal: sizing.x12,
    height: 48,
    marginVertical: sizing.x12,
  },
  teamRow: {
    height: sizing.x32,
    marginVertical: sizing.x8,
  },
});
