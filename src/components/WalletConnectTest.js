import {useWalletConnect} from '@walletconnect/react-native-dapp';
import React from 'react';
import {Text, View} from 'react-native';

const WalletConnectTest = () => {
  const connector = useWalletConnect();
  React.useEffect(() => {
    console.log('connector', JSON.stringify(connector, null, 4));
    if (!connector.connected) {
      connector?.createSession && connector?.createSession();
    } else {
      console.log('DONE!!!');
    }
  }, [connector]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
      }}>
      <Text>Test</Text>
    </View>
  );
};

export default WalletConnectTest;
