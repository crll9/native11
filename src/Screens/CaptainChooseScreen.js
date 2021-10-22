import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-elements';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import SimpleToast from 'react-native-simple-toast';
import {saveFantasyTeam} from '../redux/actions/createFantasyTeamActions';

const {height} = Dimensions.get('window');

const CARD_WIDTH = Dimensions.get('window').width - 32;

const CaptainChooseScreen = ({selectedPlayers, saveFantasyTeam}) => {
  const [players, setPlayers] = useState(selectedPlayers);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const saveTeam = async () => {
    let CSelected = false;
    let VCSelected = false;
    players.forEach(item => {
      if (item.isCaptain) {
        CSelected = true;
      }
      if (item.isViceCaptain) {
        VCSelected = true;
      }
    });
    if (!CSelected || !VCSelected) {
      SimpleToast.show('Select Captain and Vice-Captain!');
      return;
    }
    setLoading(true);
    await saveFantasyTeam(players);
    setLoading(false);
    navigation.navigate('TeamsOverview');
  };

  const makeCaptain = key => {
    setPlayers(
      players.map(item => {
        if (item.key === key) {
          return {
            ...item,
            isCaptain: true,
            isViceCaptain: false,
          };
        }
        return {...item, isCaptain: false};
      }),
    );
  };

  const makeViceCaptain = key => {
    setPlayers(
      players.map(item => {
        if (item.key === key) {
          return {
            ...item,
            isCaptain: false,
            isViceCaptain: true,
          };
        }
        return {...item, isViceCaptain: false};
      }),
    );
  };
  return (
    <>
      <TeamHeader />
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={{backgroundColor: colors.backgroundColor}}>
        <View style={styles.container}>
          <Text numberOfLines={1} style={styles.header}>
            Choose your Captain & Vice-Captain
          </Text>
          <Text style={styles.subtitle}>
            Captain gets 2x points and Vice-Captain gets 1.5x points
          </Text>
        </View>

        <Shadow inner style={styles.captainTable}>
          <View style={styles.tabTable}>
            <Text style={[styles.secondaryText, {flex: 7}]}>Players</Text>
            <Text
              style={[styles.secondaryText, {flex: 2, textAlign: 'center'}]}>
              Credits
            </Text>
            <View style={{flex: 2}} />
            <View style={{flex: 2}} />
          </View>
          <FlatList
            data={players}
            nestedScrollEnabled
            keyExtractor={item => item.key}
            renderItem={({
              item: {name, team, credits, key, isCaptain, isViceCaptain},
            }) => {
              const captainBg = isCaptain
                ? colors.secondaryColor
                : colors.backgroundColor;
              const viceCaptainBg = isViceCaptain
                ? colors.secondaryColor
                : colors.backgroundColor;

              const captainText = isCaptain
                ? colors.white
                : colors.subtitleText;
              const viceCaptainText = isViceCaptain
                ? colors.white
                : colors.subtitleText;

              return (
                <View key={key} style={styles.rowContainer}>
                  <View style={{...commonStyles.rowAlignCenter, flex: 7}}>
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
                  <Text
                    style={[
                      styles.secondaryText,
                      {flex: 2, textAlign: 'center'},
                    ]}>
                    {credits}
                  </Text>
                  <View style={{flex: 2}}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => makeCaptain(key)}>
                      <Neomorph
                        style={[
                          styles.captainSelectBtn,
                          {backgroundColor: captainBg},
                        ]}>
                        <Text style={[styles.subtitle, {color: captainText}]}>
                          C
                        </Text>
                      </Neomorph>
                    </TouchableOpacity>
                  </View>

                  <View style={{flex: 2}}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => makeViceCaptain(key)}>
                      <Neomorph
                        style={[
                          styles.captainSelectBtn,
                          {backgroundColor: viceCaptainBg},
                        ]}>
                        <Text
                          style={[styles.subtitle, {color: viceCaptainText}]}>
                          VC
                        </Text>
                      </Neomorph>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </Shadow>
        <View style={{height: 80}} />
      </ScrollView>
      <Button
        title="Save Team"
        onPress={saveTeam}
        loading={loading}
        buttonStyle={commonStyles.bottomBtn}
        titleStyle={{fontSize: 14, fontWeight: '800'}}
        containerStyle={commonStyles.absolutePositionedBtn}
      />
    </>
  );
};

const mapStateToProps = ({createTeam: {selectedPlayers}}) => ({
  selectedPlayers,
});

export default connect(mapStateToProps, {saveFantasyTeam})(CaptainChooseScreen);

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
  secondaryText: {
    color: colors.white,
    fontSize: 14,
  },
  header: {
    ...Typography.h3Style,
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  captainTable: {
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: height * 0.64,
    padding: sizing.x12,
  },
  tabTable: {
    paddingHorizontal: sizing.x16,
    backgroundColor: colors.black,
    height: 48,
    marginHorizontal: -sizing.x12,
    marginTop: -sizing.x12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...commonStyles.rowAlignCenterJustifyBetween,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(255,255,255,.1)',
    borderBottomWidth: 1,
    paddingVertical: sizing.x8,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 16,
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
