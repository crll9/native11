import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';

const MoreScreen = () => {
  return (
    <>
      <Header />
      <View style={commonStyles.centerInFlex1}>
        <Text>More ...</Text>
      </View>
    </>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({});
