import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Header as ElHeader } from 'react-native-elements';
import Typography from '../../Styles/Typography';
import { colors } from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import WalletBalance from '../Wallet/WalletBalance';
import { connect } from 'react-redux';
import { logOut } from '../../redux/actions/authActions';
import { Alert } from 'react-native';
import Profile from '../Wallet/Profile';

const Header = ({ logOut }) => {
  return (
    <ElHeader
      leftComponent={() => (<Profile logout={logOut} />)}
      centerComponent={() => (
        <Image
          source={require('../../assets/images/logo.png')}
          resizeMode="cover"
          style={[commonStyles.logo, { marginBottom: -10, marginTop: -16 }]}
        />
      )}
      rightComponent={() => <WalletBalance />}
      backgroundColor={colors.backgroundColor}
      containerStyle={{
        elevation: 3,
        borderBottomWidth: 0,
      }}
    />
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { logOut })(Header);

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.fontSizes.x24,
    fontFamily: Typography.fontFamily.semiBold,
    color: colors.black,
  },
});
