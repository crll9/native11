import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import {Shadow} from 'react-native-neomorph-shadows';

const ContestScreen = () => {
  return (
    <>
      <Header />
      <View style={commonStyles.centerInFlex1}>
        <Text>Contest Screen</Text>
      </View>
    </>
  );
};

export default ContestScreen;

const styles = StyleSheet.create({});
