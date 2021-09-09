import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';

const MainRoot = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator screenOptions={{cardStyle: {backgroundColor: '#A9A9A9'}}}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{headerShown: false}}
			/>
			<Tab.Screen name="Contests" component={HomeScreen} />
			<Tab.Screen name="My Wallet" component={HomeScreen} />
			<Tab.Screen name="More" component={HomeScreen} />
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({});

export default MainRoot;
