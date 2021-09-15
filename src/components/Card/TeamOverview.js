import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Icon,
  Text,
  LinearProgress,
  CheckBox,
  Divider,
} from 'react-native-elements';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import {sizing} from '../../Styles/theme';
import Typography from '../../Styles/Typography';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import {useNavigation} from '@react-navigation/native';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const TeamOverview = () => {
  return (
    <TouchableOpacity
      style={[commonStyles.centerInFlex1, {marginVertical: sizing.x16}]}>
      <Shadow inner style={styles.shadowContainer}>
        <View
          style={[
            commonStyles.rowAlignCenterJustifyBetween,
            {paddingHorizontal: sizing.x4},
          ]}>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <CheckBox
              uncheckedColor="#027ff0"
              containerStyle={styles.checkbox}
            />
            <Text style={styles.subtitle}>TEAM 1</Text>
          </View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <Icon
              name="copy"
              size={20}
              type="feather"
              color={colors.subtitleText}
            />
            <Text style={[styles.subtitle, {marginLeft: sizing.x4}]}>
              Clone
            </Text>
          </View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <Icon
              name="edit-2"
              size={20}
              type="feather"
              color={colors.subtitleText}
            />
            <Text style={[styles.subtitle, {marginLeft: sizing.x4}]}>Edit</Text>
          </View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <Icon
              name="copy"
              size={20}
              type="feather"
              color={colors.subtitleText}
            />
            <Text style={[styles.subtitle, {marginLeft: sizing.x4}]}>
              Preview
            </Text>
          </View>
        </View>
        <Divider color={colors.subtitleText} style={styles.divider} />

        <View
          style={[
            commonStyles.rowAlignCenterJustifyBetween,
            styles.teamContainer,
          ]}>
          <View style={styles.playerContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/DummyTeam.jpg')}
            />
            <Text style={styles.subtitle2}>David Villa</Text>
          </View>
          <View style={styles.playerContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/DummyTeam.jpg')}
            />
            <Text style={styles.subtitle2}>Jose Antonio</Text>
          </View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <View style={[styles.playerContainer, styles.teamContainer2]}>
              <Text style={{fontWeight: 'bold', fontSize: sizing.x12}}>
                SPA
              </Text>
              <Text style={styles.points}>5</Text>
            </View>
            <View>
              <Text>VS</Text>
            </View>
            <View style={[styles.playerContainer, styles.teamContainer2]}>
              <Text style={{fontWeight: 'bold', fontSize: sizing.x12}}>
                BRA
              </Text>
              <Text style={styles.points}>6</Text>
            </View>
          </View>
        </View>

        <Divider color={colors.subtitleText} style={styles.divider} />
        <View
          style={[
            commonStyles.rowAlignCenterJustifyBetween,
            styles.teamContainer,
          ]}>
          <Text style={styles.points2}>GK (1)</Text>
          <Text style={styles.points2}>DEF (4)</Text>
          <Text style={styles.points2}>MID (4)</Text>
          <Text style={styles.points2}>FOR (2)</Text>
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

export default TeamOverview;

const styles = StyleSheet.create({
  shadowContainer: {
    borderWidth: sizing.x2,
    borderColor: colors.secondaryColor,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 215,
    padding: sizing.x12,
  },
  subtitle: {
    color: colors.subtitleText,
    fontSize: sizing.x12,
    //  marginLeft: sizing.x4,
  },
  subtitle2: {
    color: colors.subtitleText,
    fontSize: sizing.x12,
    marginTop: sizing.x4,
  },
  checkbox: {
    marginLeft: 0,
  },
  divider: {
    marginVertical: sizing.x8,
  },
  logo: {
    width: sizing.x48,
    height: sizing.x48,
    resizeMode: 'contain',
    //marginHorizontal: '1.5%',
  },
  teamContainer: {
    margin: sizing.x8,
  },
  playerContainer: {
    alignItems: 'center',
  },
  teamContainer2: {
    marginHorizontal: sizing.x8,
  },
  points: {
    fontWeight: 'bold',
    fontSize: sizing.x16,
  },
  points2: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
