import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Neomorph} from 'react-native-neomorph-shadows';
import SimpleToast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {login} from '../redux/actions/authActions';
import {colors} from '../Styles/colors';
import {sizing} from '../Styles/theme';

const {width} = Dimensions.get('window');

const LoginScreen = ({login}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [walletId, setWalletId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!walletId || !password) {
      SimpleToast.show('All fields are required!');
      return;
    }
    setLoading(true);
    await login({email: walletId, password}, success => {
      if (success) {
        SimpleToast.show('Logging you in!');
        Keyboard.dismiss();
      }
    });
    setLoading(false);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{flex: 1}}
      contentContainerStyle={authStyles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={authStyles.logo}
      />
      <Text style={authStyles.heading}>Login</Text>
      <Text style={authStyles.label}>Email</Text>
      <Neomorph inner style={authStyles.inputContainer}>
        <TextInput
          placeholder="user@email.com"
          onChangeText={setWalletId}
          value={walletId}
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
          onChangeText={setPassword}
          value={password}
          placeholderTextColor="rgba(255,255,255,.3)"
          style={authStyles.input}
        />
      </Neomorph>
      <View style={{height: sizing.x24}} />
      <Button
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        title="Login"
        onPress={handleLogin}
        loading={loading}
        containerStyle={{width: '100%'}}
        buttonStyle={{borderRadius: sizing.x12}}
      />
      <View style={authStyles.link}>
        <Text style={{color: colors.white}}>Don't have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Keyboard.dismiss();
            navigation.navigate('RegisterScreen');
          }}
          style={authStyles.textBtn}>
          <Text style={{color: colors.secondaryColor}}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: sizing.x16}} />
    </ScrollView>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {login})(LoginScreen);

export const authStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: sizing.x16,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
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
