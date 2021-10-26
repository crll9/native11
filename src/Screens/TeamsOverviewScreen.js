import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import TeamHeader from '../components/Header/TeamHeader';
import TeamOverview from '../components/Card/TeamOverview';
import {connect} from 'react-redux';
import commonStyles from '../Styles/commonStyles';
import {Button, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import {placeBet} from '../redux/actions/createFantasyTeamActions';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const TeamsOverviewScreen = ({teams, placeBet}) => {
  const navigation = useNavigation();
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const joinContest = async () => {
    setLoading(true);
    const {key} = teams[selectedTeamIndex];
    const onComplete = success => {
      setLoading(false);
      if (success) {
        navigation.navigate('TeamList');
      }
    };
    await placeBet(key, onComplete);
  };
  return (
    <>
      <TeamHeader popToEnd />
      {teams.length === 0 ? (
        <View style={commonStyles.centerInFlex1}>
          <Text style={styles.emptyText}>No teams found!</Text>
          <Button
            title="Create Team"
            onPress={() => {
              navigation.navigate('CreateTeam');
            }}
            containerStyle={{width: CARD_WIDTH}}
            buttonStyle={{
              backgroundColor: colors.secondaryColor,
              paddingVertical: sizing.x12,
            }}
          />
        </View>
      ) : (
        <ScrollView
          style={{backgroundColor: colors.backgroundColor}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={{marginTop: sizing.x8}} />

          {teams.map((team, i) => (
            <TeamOverview
              key={team.key}
              onPress={() => setSelectedTeamIndex(i)}
              selected={selectedTeamIndex === i}
              team={team}
            />
          ))}
        </ScrollView>
      )}
      <Button
        title="Join Contest"
        onPress={joinContest}
        loading={loading}
        buttonStyle={commonStyles.bottomBtn}
        titleStyle={{fontSize: 14, fontWeight: '800'}}
        containerStyle={commonStyles.absolutePositionedBtn}
      />
    </>
  );
};

const mapStateToProps = ({createTeam: {createdTeams}}) => ({
  teams: createdTeams,
});

export default connect(mapStateToProps, {placeBet})(TeamsOverviewScreen);

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 22,
    color: colors.white,
    marginBottom: sizing.x16,
  },
});
