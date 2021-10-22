import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {Text, Icon, Button} from 'react-native-elements';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';
import {useNavigation} from '@react-navigation/native';
import {getFantasyData} from '../redux/actions/createFantasyTeamActions';
import {connect} from 'react-redux';
import Loader from '../components/Shared/Loader';
import {TouchableOpacity} from 'react-native';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const dummyButton = [
  {name: 'GK', value: 0, fullName: 'goalkeeper', min: 1, max: 1},
  {name: 'DEF', value: 0, fullName: 'defender', min: 3, max: 5},
  {name: 'MID', value: 0, fullName: 'midfielder', min: 3, max: 5},
  {name: 'FOR', value: '0', fullName: 'striker', min: 1, max: 3},
];

const CreateTeamScreen = ({getFantasyData, loading, players}) => {
  console.log({loading, players});
  const [selectedType, setSelectedType] = useState('goalkeeper');

  useEffect(() => {
    // getFantasyData();
  }, []);

  return (
    <>
      <TeamHeader />
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          key="upper"
          contentContainerStyle={{alignItems: 'center'}}
          style={{backgroundColor: colors.backgroundColor}}>
          <View style={{marginTop: sizing.x8}} />

          <Shadow inner style={styles.teamSelectOverview}>
            <Text style={styles.shadowHeading}>
              You may only select 7 players from each team
            </Text>
            <View
              style={[
                commonStyles.rowAlignCenterJustifyBetween,
                styles.container,
              ]}>
              <View>
                <Text style={styles.subtitle}>Players</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold', fontSize: sizing.x16}}>
                    11/
                  </Text>
                  <Text style={[styles.subtitle, {paddingTop: sizing.x2}]}>
                    11
                  </Text>
                </View>
              </View>
              <View style={commonStyles.rowAlignCenterJustifyBetween}>
                <Image
                  style={styles.logo}
                  source={require('../assets/images/DummyTeam.jpg')}
                />
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: sizing.x16}}>
                    SPA
                  </Text>
                  <Text>5</Text>
                </View>
              </View>
              <View style={styles.slashBar}>
                <Text
                  style={{
                    color: colors.subtitleText,
                    fontSize: sizing.x40,
                  }}>
                  /
                </Text>
              </View>
              <View style={commonStyles.rowAlignCenterJustifyBetween}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: sizing.x16}}>
                    SPA
                  </Text>
                  <Text>5</Text>
                </View>
                <Image
                  style={styles.logo}
                  source={require('../assets/images/DummyTeam.jpg')}
                />
              </View>
              <View>
                <Text style={styles.subtitle}>Credits Left</Text>
                <Text
                  style={{
                    marginLeft: sizing.x48,
                    fontWeight: 'bold',
                    fontSize: sizing.x16,
                  }}>
                  4.0
                </Text>
              </View>
            </View>
            <View style={commonStyles.rowAlignCenterJustifyBetween}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => {
                return (
                  <Neomorph key={item} style={styles.neomorphTile}></Neomorph>
                );
              })}
            </View>
          </Shadow>

          <View
            style={[
              commonStyles.rowAlignCenterJustifyBetween,
              {width: CARD_WIDTH},
            ]}>
            {dummyButton.map(({name, value, fullName}) => {
              // can vary the color of the buttons here
              const backgroundColor =
                fullName === selectedType
                  ? colors.backgroundColor
                  : colors.secondaryColor;

              return (
                <TouchableOpacity
                  disabled={selectedType === fullName}
                  onPress={() => setSelectedType(fullName)}>
                  <Neomorph
                    key={name}
                    style={[styles.neomorphButton, {backgroundColor}]}>
                    <Text>{name} (1)</Text>
                  </Neomorph>
                </TouchableOpacity>
              );
            })}
          </View>

          <Shadow inner style={styles.teamTable}>
            <Text style={styles.shadowHeading}>
              You may only select 3 forwards
            </Text>
            <View style={styles.leaderboardTab}>
              <Text style={{flex: 3}}>Players</Text>
              <Text style={styles.centerInText}> Points</Text>
              <Text style={styles.centerInText}>Credits</Text>
            </View>
            <FlatList
              data={players.filter(item => item.role === selectedType)}
              nestedScrollEnabled
              keyExtractor={item => item.key}
              renderItem={({item: {credits, name, team, role}}) => (
                <View style={styles.rowContainer}>
                  <View style={[commonStyles.rowAlignCenter, {flex: 3}]}>
                    <Image
                      style={styles.logo}
                      source={require('../assets/images/DummyTeam.jpg')}
                    />
                    <View style={{marginLeft: sizing.x8}}>
                      <Text style={{fontWeight: 'bold'}}>{name}</Text>
                      <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                        {team}
                        {role}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={{flex: 1}}>
                      <Text style={[styles.subtitle]}>{points}</Text> */}
                  <Text style={[styles.centerInText, styles.points]}>
                    {credits}
                  </Text>

                  <Icon
                    name="pluscircle"
                    containerStyle={[styles.centerInText, {elevation: 2}]}
                    onPress={() => {}}
                    size={21}
                    solid
                    type="ant-design"
                  />
                </View>
              )}
            />
          </Shadow>

          <View style={{height: 60}} />
        </ScrollView>
      )}
      <Button
        title="Continue"
        onPress={() => {}}
        buttonStyle={commonStyles.bottomBtn}
        titleStyle={{fontSize: 14, fontWeight: '800'}}
        containerStyle={commonStyles.absolutePositionedBtn}
      />
    </>
  );
};

const mapStateToProps = ({createTeam: {loading, players}}) => ({
  loading,
  players,
});

export default connect(mapStateToProps, {getFantasyData})(CreateTeamScreen);

const styles = StyleSheet.create({
  neomorphTile: {
    marginVertical: sizing.x12,
    shadowRadius: 6,
    borderRadius: 6,
    backgroundColor: colors.secondaryColor,
    width: 25,
    height: 25,
    padding: sizing.x12,
    ...commonStyles.alignItemsCenter,
  },
  teamSelectOverview: {
    marginVertical: sizing.x12,
    marginBottom: sizing.x24,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 170,
    padding: sizing.x12,
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    borderRadius: 18,
  },
  container: {
    marginVertical: sizing.x12,
    marginHorizontal: sizing.x4,
  },
  subtitle: {
    color: colors.subtitleText,
    fontSize: sizing.x12,
  },
  slashBar: {},
  neomorphButton: {
    ...commonStyles.alignItemsCenter,
    shadowRadius: 4,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: colors.secondaryColor,
    width: 80,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamTable: {
    marginVertical: sizing.x12,
    shadowRadius: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH,
    height: 400,
    padding: sizing.x12,
  },
  shadowHeading: {
    ...commonStyles.rowAlignCenter,
    ...Typography.h5Style,
    fontSize: sizing.x12,
    color: colors.subtitleText,
    textAlign: 'center',
  },
  leaderboardTab: {
    backgroundColor: colors.black,
    marginHorizontal: -sizing.x12,
    paddingHorizontal: sizing.x12,
    height: 40,
    marginTop: sizing.x12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(255,255,255,.1)',
    borderBottomWidth: 1,
    paddingVertical: sizing.x8,
  },
  centerInText: {
    flex: 1,
    textAlign: 'center',
  },
  points: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
  },
});
