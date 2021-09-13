import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Header as ElHeader, Text} from 'react-native-elements';
import Typography from '../../Styles/Typography';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import WalletBalance from '../Wallet/WalletBalance';

const Header = () => {
  return (
    <ElHeader
      leftComponent={() => (
        <Image
          source={{
            uri: 'https://iconape.com/wp-content/png_logo_vector/avatar-11.png',
          }}
          style={{width: 44, height: 44}}
        />
      )}
      centerComponent={() => (
        <Image
          source={require('../../assets/images/logo.png')}
          resizeMode="cover"
          style={[commonStyles.logo, {marginBottom: -10, marginTop: -16}]}
        />
      )}
      rightComponent={() => <WalletBalance />}
      backgroundColor={colors.backgroundColor}
      containerStyle={{
        elevation: 3,
        borderBottomWidth: 0,
      }}
    />
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.fontSizes.x24,
    fontFamily: Typography.fontFamily.semiBold,
    color: colors.black,
  },
});
