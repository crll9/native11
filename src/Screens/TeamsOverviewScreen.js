import React from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import TeamHeader from '../components/Header/TeamHeader';
import TeamOverview from '../components/Card/TeamOverview';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const TeamsOverviewScreen = () => {
  return (
    <ScrollView style={{backgroundColor: colors.backgroundColor}}>
      <TeamHeader popToEnd />
      <View style={{marginTop: sizing.x8}} />

      <TeamOverview />
      <TeamOverview />
    </ScrollView>
  );
};

export default TeamsOverviewScreen;

const styles = StyleSheet.create({});
