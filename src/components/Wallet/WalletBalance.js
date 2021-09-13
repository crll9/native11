import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';

const WalletBalance = () => {
  return (
    <View style={{width: 88, alignItems: 'flex-end'}}>
      <Text style={styles.smallText}>Wallet Balance</Text>
      <View style={commonStyles.rowAlignCenter}>
        <Icon
          name="wallet"
          size={23}
          containerStyle={{marginRight: 2}}
          type="material-community"
          color={colors.secondaryColor}
        />
        <Text style={styles.deepText}>10,000</Text>
      </View>
    </View>
  );
};

export default WalletBalance;

const styles = StyleSheet.create({
  smallText: {
    fontSize: 10,
    color: colors.white,
  },
  deepText: {
    fontSize: 20,
    color: colors.secondaryColor,
    fontWeight: 'bold',
  },
});
