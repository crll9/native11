import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, LogBox, Platform} from 'react-native';
import withThemeAndSafeArea from './src/components/HigherOrder/withThemeAndSafeArea';
import MainRoot from './src/navigation/MainRoot';
import store from './src/redux/storeConfig/store';
import {Provider} from 'react-redux';

LogBox.ignoreLogs([
  'NativeUIManager.getConstantsForViewManager',
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  return (
    <WalletConnectProvider
      redirectUrl={
        Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      <Provider store={store}>
        <NavigationContainer>
          <MainRoot />
        </NavigationContainer>
      </Provider>
    </WalletConnectProvider>
  );
};

const styles = StyleSheet.create({});

export default withThemeAndSafeArea(App);
