import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import {sizing} from '../../Styles/theme';

const {height, width} = Dimensions.get('window');

const SHEET_HEIGHT = height;

const getPlayerNameSort = player => {
  try {
    const playerNameArr = player.split(' ');
    if (playerNameArr.length === 1) {
      return player;
    }
    const sort = playerNameArr[0].split('')[0];
    return `${sort}. ${playerNameArr[1]}`;
  } catch (error) {
    return player;
  }
};

export const FantasyTeamPlayerCard = ({player, playerTeam}) => {
  const color = playerTeam === 'team1' ? colors.white : colors.textGrey;
  const backgroundColor = playerTeam === 'team1' ? colors.black : colors.white;

  return (
    <View style={{alignItems: 'center', position: 'relative', minWidth: 70}}>
      <Image
        source={require('../../assets/images/DummyTeam.jpg')}
        style={styles.playerImage}
      />
      <View style={[styles.textContainer, {backgroundColor}]}>
        <Text numberOfLines={1} style={[styles.playerName, {color}]}>
          {getPlayerNameSort(player.name)}
        </Text>
      </View>
      {(player.isCaptain || player.isViceCaptain) && (
        <View
          style={[
            styles.cap,
            {
              backgroundColor: player.isViceCaptain
                ? colors.secondaryColor
                : colors.primary,
            },
          ]}>
          <Text
            style={{
              color: colors.white,
            }}>
            {player.isCaptain ? 'C' : 'VC'}
          </Text>
        </View>
      )}
    </View>
  );
};

const TeamPreview = ({visibility, team, setVisibility}) => {
  const types = ['striker', 'midfielder', 'defender', 'goalkeeper'];
  if (!team) {
    return <View />;
  }
  const {playerTeam, match} = team;
  const [team1] = Object.keys(match);
  return (
    <Modal
      onBackButtonPress={() => setVisibility(false)}
      isVisible={visibility}
      //   animationOut="slideOutDown"
      //   animationIn="fadeIn"
      //   animationInTiming={300}
      //   animationOutTiming={300}
      style={{margin: 0}}>
      <View style={styles.teamName}>
        <Icon
          name="cross"
          type="entypo"
          size={28}
          color={colors.white}
          onPress={() => setVisibility(false)}
          containerStyle={{marginRight: sizing.x12}}
        />
        <View>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.teamText}>Fantasy Team name</Text>
        </View>
      </View>
      <ImageBackground
        style={styles.preview}
        source={require('../../assets/images/football_field.png')}>
        {types.map(type => (
          <View key={type} style={styles.playerRow}>
            {playerTeam.map(player => {
              if (player.role === type) {
                return (
                  <FantasyTeamPlayerCard
                    key={player.key}
                    playerTeam={
                      (player.teamName || player.team) === team1
                        ? 'team2'
                        : 'team1'
                    }
                    player={player}
                  />
                );
              }
            })}
          </View>
        ))}
      </ImageBackground>
    </Modal>
  );
};

export default TeamPreview;

const styles = StyleSheet.create({
  playerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  playerName: {
    textAlign: 'center',
    color: colors.white,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizing.x4,
    maxWidth: width / 4,
    borderRadius: sizing.x3,
    paddingHorizontal: sizing.x5,
  },
  cap: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerImage: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
    borderRadius: sizing.x8,
    marginBottom: sizing.x2,
  },
  preview: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
  teamName: {
    ...commonStyles.rowAlignCenter,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  username: {
    fontSize: 14,
    color: colors.white,
  },
  teamText: {
    fontSize: 12,
    color: colors.white,
  },
});
