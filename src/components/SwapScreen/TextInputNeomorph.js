import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import { colors } from '../../Styles/colors';
import { CARD_WIDTH } from '../../Styles/theme';

const TextInputNeomorph = ({
    placeholder,
    editable,
    value,
    setstate,
}) => {
  return (
    <Neomorph
    inner
    style={styles.neomorphContainer}
    >
    <TextInput
        keyboardType='numeric'
        style={styles.textInput}
        placeholder={placeholder}
        editable={editable}
        selectTextOnFocus={editable}
        onChangeText={(text) => setstate({
            ...value,
            amount: text,
        })}
    />
    </Neomorph>
  );
};

const styles = StyleSheet.create({
    neomorphContainer: {
        alignItems:'center',
        justifyContent:'center',
        shadowRadius: 5,
        borderRadius: 16,
        backgroundColor: colors.backgroundColor,
        width: CARD_WIDTH*0.4,
        height: 50,
    },
    textInput:{
        height: 40,
        flex:1,
    }
});
export default TextInputNeomorph;
