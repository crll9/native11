/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import withThemeAndSafeArea from './src/components/HigherOrder/withThemeAndSafeArea';
import MainRoot from './src/navigation/MainRoot';
import store from './src/redux/storeConfig/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainRoot />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default withThemeAndSafeArea(App);
