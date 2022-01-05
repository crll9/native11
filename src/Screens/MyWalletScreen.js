import React, { useEffect, useState } from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Shadow} from 'react-native-neomorph-shadows';
import {connect} from 'react-redux';
import Header from '../components/Header/Header';
import {colors} from '../Styles/colors';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import { LCDClient, Coin } from '@terra-money/terra.js';

const {width} = Dimensions.get('window');

const MyWalletScreen = ({walletData}) => {

  useEffect(() => {
    const terra = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev',
      chainID: 'bombay-12',
    });
    terra.bank.balance('terra1p7p57u43sruexzvnyywz3v6fcnc99rxhvlk49s').then(data=>{
      console.log("terra response ",data);
    }).catch(err=>{
      console.log("terra error",err)
    })
  }, [])
  return (
    <>
      <Header />
      <View style={commonStyles.background}>
        {walletData.all.map(item => (
          <Shadow inner style={styles.neomorphContainer}>
            <Text style={{fontSize: 18, textTransform: 'uppercase'}}>
              {item.denom}
            </Text>
            <Text style={{fontSize: 16, color: colors.secondaryColor}}>
              {item.amount}
            </Text>
          </Shadow>
        ))}
      </View>
    </>
  );
};

const mapStateToProps = ({auth: {walletData}}) => ({
  walletData,
});

export default connect(mapStateToProps)(MyWalletScreen);

const styles = StyleSheet.create({
  neomorphContainer: {
    shadowRadius: 5,
    borderRadius: 10,
    backgroundColor: colors.backgroundColor,
    width: width - 32,
    height: 48,
    paddingHorizontal: 12,

    marginVertical: sizing.x8,
    ...commonStyles.rowAlignCenterJustifyBetween,
  },
});
