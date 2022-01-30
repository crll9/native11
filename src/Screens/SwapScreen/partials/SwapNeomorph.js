import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Neomorph } from 'react-native-neomorph-shadows';
import { colors } from '../../../Styles/colors';
import { sizing } from '../../../Styles/theme';

const SwapNeomorph = ({
  onPress,
}) => {
  return (
    <Neomorph 
    swapShadows
    style={styles.verticalSwap}>
        <TouchableOpacity
        onPress={onPress}
        >
        <Icon
          name="swap-vertical"
          size={35}
          type="material-community"
          color={colors.secondaryColor}
        />
        </TouchableOpacity>
      </Neomorph>
  )
};

const styles = StyleSheet.create({
    verticalSwap: {
        shadowRadius: 5,
        borderRadius: 30,
        backgroundColor: colors.backgroundColor,
        width: 50,
        height: 50,
        padding: sizing.x8,
        margin: sizing.x8,
    },
});
export default SwapNeomorph;
