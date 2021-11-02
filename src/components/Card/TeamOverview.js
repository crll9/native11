import React, {useMemo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Icon, Text, CheckBox, Divider} from 'react-native-elements';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import {sizing} from '../../Styles/theme';
import {Shadow} from 'react-native-neomorph-shadows';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const getPlayerCount = (players = []) => {
  let count = {
    GK: 0,
    FOR: 0,
    MID: 0,
    DEF: 0,
  };
  let cAndVC = {C: {}, VC: {}};
  players.forEach(player => {
    if (player.isCaptain) {
      cAndVC.C = player;
    }
    if (player.isViceCaptain) {
      cAndVC.VC = player;
    }
    switch (player.role) {
      case 'goalkeeper':
        count.GK = count.GK + 1;
        break;
      case 'defender':
        count.DEF = count.DEF + 1;
        break;
      case 'striker':
        count.FOR = count.FOR + 1;
        break;
      case 'midfielder':
        count.MID = count.MID + 1;
        break;

      default:
        break;
    }
  });

  return [count, cAndVC];
};

const TeamOverview = ({
  selected,
  onPress = () => {},
  team = {},
  onPreview = () => {},
}) => {
  const {key, playerTeam, match} = team;
  const [playerCount, {C, VC}] = useMemo(
    () => getPlayerCount(playerTeam),
    [key],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{marginVertical: sizing.x12}}>
      <Shadow
        inner
        style={{...styles.shadowContainer, borderWidth: selected ? 1 : 0}}>
        <View
          style={[
            commonStyles.rowAlignCenterJustifyBetween,
            {paddingHorizontal: sizing.x4},
          ]}>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <CheckBox
              uncheckedColor={colors.secondaryColor}
              checkedColor={colors.secondaryColor}
              containerStyle={styles.checkbox}
              checked={selected}
            />
            <Text style={styles.subtitle}>TEAM 1</Text>
          </View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <Icon name="copy" size={20} type="feather" color={colors.light} />
            <Text style={[styles.subtitle, {marginLeft: sizing.x4}]}>
              Clone
            </Text>
          </View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <Icon name="edit-2" size={20} type="feather" color={colors.light} />
            <Text style={[styles.subtitle, {marginLeft: sizing.x4}]}>Edit</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPreview(team)}
            style={commonStyles.rowAlignCenterJustifyBetween}>
            <Icon name="copy" size={20} type="feather" color={colors.light} />
            <Text style={[styles.subtitle, {marginLeft: sizing.x4}]}>
              Preview
            </Text>
          </TouchableOpacity>
        </View>
        <Divider color={colors.light} style={styles.divider} />

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
            <Text style={styles.subtitle2}>{C.name}</Text>
          </View>
          <View style={styles.playerContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/DummyTeam.jpg')}
            />
            <Text style={styles.subtitle2}>{VC.name}</Text>
          </View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <View style={styles.teamPlayer}>
              <Text style={styles.points}>{Object.keys(match)[0]}</Text>
              <Text style={styles.points}>{match[Object.keys(match)[0]]}</Text>
            </View>
            <View>
              <Text>VS</Text>
            </View>
            <View style={styles.teamPlayer}>
              <Text style={styles.points}>{Object.keys(match)[1]}</Text>
              <Text style={styles.points}>{match[Object.keys(match)[1]]}</Text>
            </View>
          </View>
        </View>

        <Divider color={colors.light} style={styles.divider} />
        <View
          style={[
            commonStyles.rowAlignCenterJustifyBetween,
            styles.teamContainer,
            {marginTop: 'auto'},
          ]}>
          {Object.keys(playerCount).map(item => (
            <Text
              key={item}
              style={styles.points2}>{`${item} (${playerCount[item]})`}</Text>
          ))}
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
    height: 200,
    padding: sizing.x12,
  },
  subtitle: {
    color: colors.light,
    fontSize: sizing.x12,
    //  marginLeft: sizing.x4,
  },
  subtitle2: {
    color: colors.white,
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    //marginHorizontal: '1.5%',
  },
  teamContainer: {
    margin: sizing.x8,
  },
  playerContainer: {
    alignItems: 'center',
    position: 'relative',
  },

  points: {
    fontWeight: 'bold',
    fontSize: sizing.x16,
  },
  points2: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  teamPlayer: {
    width: 60,
    alignItems: 'center',
  },
});
