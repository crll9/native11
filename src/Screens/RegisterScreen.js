import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Neomorph} from 'react-native-neomorph-shadows';
import SimpleToast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {register} from '../redux/actions/authActions';
import {colors} from '../Styles/colors';
import {sizing} from '../Styles/theme';
import {authStyles} from './LoginScreen';

const RegisterScreen = ({register}) => {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletId, setWalletId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    if (!walletId || !password || !email) {
      SimpleToast.show('All fields are required!');
      return;
    }
    setLoading(true);
    await register({walletId, password}, success => {
      if (success) {
        SimpleToast.show('Logging you in!');
        Keyboard.dismiss();
      }
    });
    setLoading(false);
  };

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
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{flex: 1}}
      contentContainerStyle={authStyles.container}>
      {!isKeyboardVisible && (
        <Image
          source={require('../assets/images/logo.png')}
          style={authStyles.logo}
        />
      )}
      <View style={{height: sizing.x16}} />
      <Text style={authStyles.heading}>Register</Text>

      <Text style={authStyles.label}>Email</Text>
      <Neomorph inner style={authStyles.inputContainer}>
        <TextInput
          placeholder="user@email.com"
          placeholderTextColor="rgba(255,255,255,.3)"
          style={authStyles.input}
          value={email}
          onChangeText={setEmail}
        />
      </Neomorph>
      <View style={{height: sizing.x16}} />
      <Text style={authStyles.label}>Wallet Id</Text>
      <Neomorph inner style={authStyles.inputContainer}>
        <TextInput
          placeholder="f2e41bsdfhjrk"
          placeholderTextColor="rgba(255,255,255,.3)"
          style={authStyles.input}
          value={walletId}
          onChangeText={setWalletId}
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
          value={password}
          onChangeText={setPassword}
        />
      </Neomorph>
      <View style={{height: sizing.x24}} />
      <Button
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        title="Register"
        onPress={handleRegister}
        loading={loading}
        containerStyle={{width: '100%'}}
        buttonStyle={{borderRadius: sizing.x12}}
      />
      <View style={authStyles.link}>
        <Text style={{color: colors.white}}>Already have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Keyboard.dismiss();
            navigation.navigate('LoginScreen');
          }}
          style={authStyles.textBtn}>
          <Text style={{color: colors.secondaryColor}}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {register})(RegisterScreen);
