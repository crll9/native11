import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {colors} from '../Styles/colors';
import {sizing} from '../Styles/theme';

const {width} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={authStyles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={authStyles.logo}
      />
      <Text style={authStyles.heading}>Login</Text>
      <Text style={authStyles.label}>Email</Text>
      <Neomorph inner style={authStyles.inputContainer}>
        <TextInput
          placeholder="user@email.com"
          placeholderTextColor="rgba(255,255,255,.3)"
          style={authStyles.input}
        />
      </Neomorph>
      <View style={{height: sizing.x16}} />
      <Text style={authStyles.label}>Password</Text>
      <Neomorph inner style={authStyles.inputContainer}>
        <TextInput
          placeholder="*******"
          secureTextEntry
          placeholderTextColor="rgba(255,255,255,.3)"
          style={authStyles.input}
        />
      </Neomorph>
      <View style={authStyles.link}>
        <Text style={{color: colors.white}}>Don't have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('RegisterScreen')}
          style={authStyles.textBtn}>
          <Text style={{color: colors.secondaryColor}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: sizing.x16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 135,
    width: 110,
  },
  label: {
    width: '100%',
    color: colors.white,
    fontSize: 15,
    marginVertical: sizing.x8,
  },
  inputContainer: {
    width: width - 2 * sizing.x16,
    height: 60,
    shadowRadius: 7,
    borderRadius: 16,
    backgroundColor: colors.backgroundColor,
  },
  input: {
    height: 60,
    borderRadius: 16,
    fontSize: 18,
    color: colors.white,
    paddingHorizontal: sizing.x16,
  },
  heading: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: sizing.x8,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizing.x8,
  },
  textBtn: {
    paddingHorizontal: 8,
    marginLeft: 0,
    paddingVertical: 8,
  },
});
