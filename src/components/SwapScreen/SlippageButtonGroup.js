import React from 'react';
import { Neomorph } from 'react-native-neomorph-shadows';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Styles/colors';
import { sizing } from '../../Styles/theme';

const SlippageButtonGroup = ({
    array,
    suffix,
    onPress,
    currentValue,
}) => {
  return (
    <View style={styles.slippageSelectionContainer}>
        {array.map((item, index) => {
            return (
                <Neomorph
                swapShadows
                style={{...styles.slippageSelector, backgroundColor: item == currentValue ? colors.secondaryColor : colors.backgroundColor}}
                >
                    <TouchableOpacity
                    onPress={() => onPress(item)}
                    >
                        <Text 
                        style={styles.text}
                        >{item}{suffix}</Text>
                    </TouchableOpacity>
                </Neomorph>
            )
        })}
    </View>
  )
};
const styles = StyleSheet.create({
    slippageSelector: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        borderRadius: 16,
        backgroundColor: colors.backgroundColor,
        width: 70,
        height: 50,
        padding: sizing.x12,
        marginVertical: sizing.x8,
        marginHorizontal: sizing.x4,
    },
    text: {
        color: colors.white,
    },
    slippageSelectionContainer: {
        flexDirection: 'row',
    },
})
export default SlippageButtonGroup;
