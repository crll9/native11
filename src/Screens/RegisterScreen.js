import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {colors} from '../Styles/colors';
import {sizing} from '../Styles/theme';
import {authStyles} from './LoginScreen';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const keyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const keyboardDidHide = () => {
    setKeyboardVisible(false);
  };
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);
  return (
    <View style={authStyles.container}>
      {!isKeyboardVisible && (
        <Image
          source={require('../assets/images/logo.png')}
          style={authStyles.logo}
        />
      )}
      <Text style={authStyles.heading}>Register</Text>
      <Text style={authStyles.label}>Email</Text>
      <Neomorph inner style={authStyles.inputContainer}>
        <TextInput
          placeholder="user@email.com"
          placeholderTextColor="rgba(255,255,255,.3)"
          style={authStyles.input}
        />
      </Neomorph>
      <View style={{height: sizing.x16}} />
      <Text style={authStyles.label}>Wallet Id</Text>
      <Neomorph inner style={authStyles.inputContainer}>
        <TextInput
          placeholder="f2e41bsdfhjrk"
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
        <Text style={{color: colors.white}}>Already have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('LoginScreen')}
          style={authStyles.textBtn}>
          <Text style={{color: colors.secondaryColor}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
