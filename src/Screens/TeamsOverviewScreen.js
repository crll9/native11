import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {Text, Icon, LinearProgress, Divider} from 'react-native-elements';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import GameCard from '../components/Card/GameCard';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';
import {useNavigation} from '@react-navigation/native';
import TeamOverview from '../components/Card/TeamOverview';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const TeamsOverviewScreen = () => {
  return (
    <ScrollView style={{backgroundColor: colors.backgroundColor}}>
      <TeamHeader />
      <View style={{marginTop: sizing.x8}} />

      <TeamOverview />
      <TeamOverview />
    </ScrollView>
  );
};

export default TeamsOverviewScreen;

const styles = StyleSheet.create({});
