import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MyWalletScreen,
  HomeScreen,
  ContestScreen,
  MoreScreen,
} from '../Screens';

const MainRoot = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{cardStyle: {backgroundColor: '#A9A9A9'}}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Contests" component={ContestScreen} />
      <Tab.Screen name="My Wallet" component={MyWalletScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainRoot;
