import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, LogBox, Platform} from 'react-native';
import withThemeAndSafeArea from './src/components/HigherOrder/withThemeAndSafeArea';
// import MainRoot from './src/navigation/MainRoot';
import store from './src/redux/storeConfig/store';
import {Provider} from 'react-redux';
import './global';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import WalletConnectTest from './src/components/WalletConnectTest';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs([
  'NativeUIManager.getConstantsForViewManager',
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

const App = () => {
  // Create a connector
  // const connector = new WalletConnect({
  //   bridge: "https://walletconnect.terra.dev/",
  //   qrcodeModal: QRCodeModal,
  // });
  // React.useEffect(() => {
  //   connector.connect()
  //   if (!connector.connected) {
  //     // create new session
  //     connector.createSession();
  //     console.log('connector', connector);
  //   }

  //   // Subscribe to connection events
  //   connector.on("connect", (error, payload) => {
  //     if (error) {
  //       console.log('error-connect', error);

  //       throw error;
  //     }

  //     // Get provided accounts and chainId
  //     const { accounts, chainId } = payload.params[0];
  //     console.log('payload', payload);

  //     connector.on("session_update", (error, payload) => {
  //       if (error) {
  //         console.log('payload-sessionUpdate', error);
  //         throw error;

  //       }

  //       // Get updated accounts and chainId
  //       const { accounts, chainId } = payload.params[0];
  //       console.log('payload-sessionUpdate', payload);
  //     });

  //   });
  // }, []);
  return (
    <Provider store={store}>
      <WalletConnectProvider
        redirectUrl={
          Platform.OS === 'web' ? window.location.origin : 'fantasysports://'
        }
        storageOptions={{
          asyncStorage: AsyncStorage,
        }}
        bridge="https://walletconnect.terra.dev/">
        <NavigationContainer>
          {/* <MainRoot /> */}
          <WalletConnectTest />
        </NavigationContainer>
      </WalletConnectProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default withThemeAndSafeArea(App);
