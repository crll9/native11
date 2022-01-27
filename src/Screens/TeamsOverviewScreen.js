import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import TeamHeader from '../components/Header/TeamHeader';
import TeamOverview from '../components/Card/TeamOverview';
import {connect,useSelector} from 'react-redux';
import commonStyles from '../Styles/commonStyles';
import {Button, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import {placeBet,placeBetSmartQuery} from '../redux/actions/createFantasyTeamActions';
import TeamPreview from '../components/Shared/TeamPreview';
import { LCDClient, Coin,MnemonicKey } from '@terra-money/terra.js';
import SimpleToast from 'react-native-simple-toast';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const TeamsOverviewScreen = ({teams, placeBet}) => {
  const navigation = useNavigation();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector(sel=>sel.auth.user);
  const matchDetails = useSelector(res=>res.matchDetails.matchDetails);
  const poolDetail = useSelector(res=>res.matchDetails.selectedPricePool);
  const joinContest = () => {
    setLoading(true);
    const {key} = teams[selectedTeamIndex];
    console.log('Team detail',teams[selectedTeamIndex])
    console.log('Pool detail',poolDetail)
    //placeBidToTerra(teams[selectedTeamIndex]);
    const onComplete = success => {
      setLoading(false);
      if (success) {
        navigation.navigate('TeamList');
      }
    };
    //await placeBet(key, onComplete);
     if(matchDetails && matchDetails.contract_address && matchDetails.contract_address.startsWith('terra')){
     placeBetSmartQuery(teams[selectedTeamIndex],user.terraWalletAdd, matchDetails.contract_address,poolDetail.poolType,poolDetail.poolId,poolDetail.poolFee,300000, (data)=>{
        placeBet(key, onComplete);
     },(err)=>{
       setLoading(false);
      SimpleToast.show(err.message);
     });
     }else{
      setLoading(false);
       SimpleToast.show('No contract address found');
     }
   

  };

 

  const onTeamPreview = team => {
    setSelectedTeam(team);
    setModalVisibility(true);
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
              onPreview={onTeamPreview}
            />
          ))}
          <View style={{height: 60}} />
        </ScrollView>
      )}
      {teams.length > 0 && (
        <Button
          title="Join Contest"
          onPress={joinContest}
          loading={loading}
          buttonStyle={commonStyles.bottomBtn}
          titleStyle={{fontSize: 14, fontWeight: '800'}}
          containerStyle={commonStyles.absolutePositionedBtn}
        />
      )}
      <TeamPreview
        visibility={modalVisibility}
        setVisibility={setModalVisibility}
        team={selectedTeam}
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
