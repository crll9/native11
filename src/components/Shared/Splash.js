import React from 'react';
import {Dimensions} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LinearProgress} from 'react-native-elements';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';

const {width} = Dimensions.get('window');

const Splash = () => {
  return (
    <View
      style={{
        backgroundColor: colors.backgroundColor,
        ...commonStyles.centerInFlex1,
      }}>
      <Image
        resizeMode="contain"
        style={{width: width - 160, height: 300}}
        source={require('../../assets/images/logo.png')}
      />
      <View style={{width: width - 60}}>
        <LinearProgress
          variant="indeterminate"
          color={colors.white}
          style={{backgroundColor: colors.secondaryColor}}
        />
        <View style={{height: 40}} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
