import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Platform} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../Styles/colors';

const BackAction = ({popToEnd}) => {
  const navigation = useNavigation();
  return Platform.OS === 'ios' ? (
    <Icon
      name="chevron-back"
      containerStyle={styles.iconContainer}
      color={colors.white}
      onPress={() => {
        if (popToEnd) {
          navigation.navigate('HomeScreen');
        } else {
          navigation.goBack();
        }
      }}
      type="ionicon"
    />
  ) : (
    <Icon
      name="arrowleft"
      color={colors.white}
      onPress={() => {
        if (popToEnd) {
          navigation.navigate('HomeScreen');
        } else {
          navigation.goBack();
        }
      }}
      containerStyle={styles.iconContainer}
      type="ant-design"
    />
  );
};

export default BackAction;

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 12,
    marginRight: 18,
  },
});
