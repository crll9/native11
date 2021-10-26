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
import ReaminingTime from '../Shared/ReaminingTime';
import {setMatchDetail} from '../../redux/actions/matchDetailsAction';
import {connect} from 'react-redux';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const GameCard = ({
  match: {short_name, start_date, tournament, _id, key},
  setMatchDetail,
}) => {
  const [team1, team2] = short_name.split('vs');
  const navigation = useNavigation();
  const handleOnPress = () => {
    setMatchDetail(_id);
    navigation.navigate('TeamList', {key});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOnPress}
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
            <ReaminingTime start_date={start_date} />
          </View>
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps, {setMatchDetail})(GameCard);

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

  rowContainer: {
    marginVertical: sizing.x4,
    height: 88,
  },
  teamName: {
    margin: sizing.x4,
    ...Typography.h1Style,
    color: colors.white,
  },
});
