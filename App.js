/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, LogBox} from 'react-native';
import withThemeAndSafeArea from './src/components/HigherOrder/withThemeAndSafeArea';
import MainRoot from './src/navigation/MainRoot';
import store from './src/redux/storeConfig/store';
import {Provider} from 'react-redux';

LogBox.ignoreLogs([
  'NativeUIManager.getConstantsForViewManager',
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

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
