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

const CARD_WIDTH = Dimensions.get('window').width - 32;

const GameCard = ({match}) => {
  console.log({match});
  const team1 = '1';
  const team2 = '2';

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('TeamList')}
      style={[commonStyles.alignItemsCenter, {marginBottom: sizing.x12}]}>
      <Shadow inner style={styles.neomorphContainer}>
        <View
          style={[
            commonStyles.rowAlignCenterJustifyBetween,
            styles.rowContainer,
          ]}>
          <Text style={{color: colors.white}}>EUROS 2020</Text>
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
            source={require('../../assets/images/FinalDummyImage.png')}
          />
          <Text style={{paddingRight: sizing.x8}}>VS</Text>
          <Image
            style={styles.logo}
            source={require('../../assets/images/FinalDummyImage.png')}
          />
          <View>
            <View style={commonStyles.rowAlignCenterJustifyBetween}>
              <Text style={styles.teamName}>{team1}</Text>
              <Text style={{color: colors.primary}}>vs</Text>
              <Text style={styles.teamName}>{team2}</Text>
            </View>
            <View style={commonStyles.rowAlignCenterJustifyBetween}>
              {['00', '14', '32'].map((item, i) => (
                <Shadow inner key={i.toString()} style={styles.timer}>
                  <Text style={styles.timerText}>{item}</Text>
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
    marginRight: '5%',
  },
  neomorphContainer: {
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 160,
    padding: sizing.x12,
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
  rowContainer: {
    marginVertical: sizing.x8,
  },
  teamName: {
    margin: sizing.x4,
    ...Typography.h1Style,
    color: colors.white,
  },
  timerText: {
    color: colors.secondaryColor,
    fontSize: 16,
  },
});
