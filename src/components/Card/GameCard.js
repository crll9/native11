import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import {sizing} from '../../Styles/theme';
import Typography from '../../Styles/Typography';
import {Shadow} from 'react-native-neomorph-shadows';
import {useNavigation} from '@react-navigation/native';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const getTimeDifference = _date => {
  const date = new Date(_date);
  const currentDate = Date.now();

  const days = Math.abs(differenceInDays(date, currentDate));
  const hours = Math.abs(differenceInHours(date, currentDate));
  const mins = Math.abs(differenceInMinutes(date, currentDate));

  const resArray = [];
  if (days > 0) {
    resArray.push(`${days}d `);
  }
  if (hours > 0) {
    resArray.push(`${hours % 24}h `);
  }
  if (mins > 0) {
    resArray.push(`${mins % 60}m`);
  }

  return resArray;
};

const GameCard = ({match: {short_name, start_date, tournament}}) => {
  const [team1, team2] = short_name.split('vs');

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('TeamList')}
      style={[commonStyles.alignItemsCenter, {marginBottom: sizing.x12}]}>
      <Shadow inner style={styles.neomorphContainer}>
        <View style={[commonStyles.rowAlignCenterJustifyBetween]}>
          <Text style={{color: colors.white}}>{tournament.name}</Text>
          <Icon
            name="bell"
            size={20}
            type="material-community"
            color={colors.secondaryColor}
          />
        </View>
        <View
          style={[
            commonStyles.rowAlignCenterJustifyAround,
            styles.rowContainer,
          ]}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/country-flag.png')}
          />
          <Text style={{paddingRight: sizing.x8}}>VS</Text>
          <Image
            style={styles.logo}
            source={require('../../assets/images/country-flag.png')}
          />
          <View>
            <View style={commonStyles.rowAlignCenterJustifyBetween}>
              <Text style={styles.teamName}>{team1}</Text>
              <Text style={{color: colors.primary}}>vs</Text>
              <Text style={styles.teamName}>{team2}</Text>
            </View>
            <View style={commonStyles.rowAlignCenterJustifyBetween}>
              {getTimeDifference(start_date.gmt).map((item, i) => (
                <Shadow inner key={i.toString()} style={styles.timer}>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={styles.timerText}>
                    {item}
                  </Text>
                </Shadow>
              ))}
            </View>
          </View>
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  container: {},
  logo: {
    width: sizing.x64,
    height: sizing.x64,
    resizeMode: 'contain',
    borderRadius: sizing.x12,
  },
  neomorphContainer: {
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 138,
    padding: 10,
  },
  timer: {
    height: 28,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 2.5,
    borderRadius: 4,
    marginVertical: 3,
  },
  rowContainer: {
    marginVertical: sizing.x4,
    height: 88,
  },
  teamName: {
    margin: sizing.x4,
    ...Typography.h1Style,
    color: colors.white,
  },
  timerText: {
    color: colors.secondaryColor,
    fontSize: 14,
  },
});
