/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import withThemeAndSafeArea from './src/components/HigherOrder/withThemeAndSafeArea';
import MainRoot from './src/navigation/MainRoot';
import HomeScreen from './src//Screens/HomeScreen';
import theme from './src/Styles/theme';
import TeamList from './src/Screens/TeamList';
import TournamentScreen from './src/Screens/TournamentScreen';

const App = () => {
  return (
    <NavigationContainer>
      <MainRoot />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default withThemeAndSafeArea(App);
