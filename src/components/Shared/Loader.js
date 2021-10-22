import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {colors} from '../../Styles/colors';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
