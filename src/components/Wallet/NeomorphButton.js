import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../Styles/colors';
import { sizing } from '../../Styles/theme';

const NeomorphButton = ({
  onPress,
  icon,
  size,
  color,
}) => {
  return (
    <Neomorph
      style={styles.neomorphContainer}
    >
      <TouchableOpacity
        onPress={onPress}>
        <Icon
          name={icon}
          size={size}
          containerStyle={{ marginRight: 2 }}
          type="material-community"
          color={color}
        />
      </TouchableOpacity>
    </Neomorph>
  );
};

const styles = StyleSheet.create({
  neomorphContainer: {
    shadowRadius: 3,
    borderRadius: 30,
    backgroundColor: colors.backgroundColor,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: sizing.x8,
  },
})
export default NeomorphButton;
