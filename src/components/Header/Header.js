import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Header as ElHeader, Text} from 'react-native-elements';
import Typography from '../../Styles/Typography';
import {colors} from '../../Styles/colors';

const Header = () => {
	return (
		<ElHeader
			leftComponent={{icon: 'menu', color: '#fff', iconStyle: {color: '#fff'}}}
			centerComponent={{text: 'App Logo Here', style: {color: '#fff'}}}
			rightComponent={{text: 'Wallet', style: {color: '#fff'}}}
			containerStyle={{elevation: 5}}
			backgroundColor="#696969"
		/>
	);
};

export default Header;

const styles = StyleSheet.create({
	title: {
		fontSize: Typography.fontSizes.x24,
		fontFamily: Typography.fontFamily.semiBold,
		color: colors.black,
	},
});
