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
import {colors} from '../Styles/colors';
import Typography from '../Styles/Typography';
import {sizing} from '../Styles/theme';
import {Icon, Text} from 'react-native-elements';
import {Shadow} from 'react-native-neomorph-shadows';
import TeamList from '../Screens/TeamList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TournamentScreen from '../Screens/TournamentScreen';

const MainRoot = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TeamList" component={TeamList} />
        <Stack.Screen name="Tournament" component={TournamentScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#A9A9A9'},
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          height: 84,
        },
        tabBarActiveTintColor: colors.secondaryColor,
        tabBarLabelStyle: {
          fontSize: Typography.fontSizes.x12,
          marginBottom: 3,
        },
        tabBarItemStyle: {
          marginVertical: 5,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            const color = focused ? colors.secondaryColor : colors.subtitleText;
            const shadowRadius = focused ? 6 : 0;

            return (
              <Shadow inner style={[styles.tabBarItem, {shadowRadius}]}>
                <Icon name="home" type="material-community" color={color} />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[styles.tabBarText, {color}]}>
                  Home
                </Text>
              </Shadow>
            );
          },
        }}
      />
      <Tab.Screen
        name="Contests"
        options={{
          tabBarIcon: ({focused}) => {
            const color = focused ? colors.secondaryColor : colors.subtitleText;
            const shadowRadius = focused ? 6 : 0;
            return (
              <Shadow inner style={[styles.tabBarItem, {shadowRadius}]}>
                <Icon
                  name="checkerboard"
                  size={22}
                  type="material-community"
                  color={color}
                />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[styles.tabBarText, {color}]}>
                  Contest
                </Text>
              </Shadow>
            );
          },
        }}
        component={ContestScreen}
      />
      <Tab.Screen
        name="My Wallet"
        options={{
          tabBarIcon: ({focused}) => {
            const color = focused ? colors.secondaryColor : colors.subtitleText;
            const shadowRadius = focused ? 6 : 0;
            return (
              <Shadow inner style={[styles.tabBarItem, {shadowRadius}]}>
                <Icon
                  name="wallet"
                  size={22}
                  type="material-community"
                  color={color}
                />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[styles.tabBarText, {color}]}>
                  My Wallet
                </Text>
              </Shadow>
            );
          },
        }}
        component={MyWalletScreen}
      />
      <Tab.Screen
        name="More"
        options={{
          tabBarIcon: ({focused}) => {
            const color = focused ? colors.secondaryColor : colors.subtitleText;
            const shadowRadius = focused ? 6 : 0;
            return (
              <Shadow inner style={[styles.tabBarItem, {shadowRadius}]}>
                <Icon
                  name="dots-three-vertical"
                  size={22}
                  type="entypo"
                  color={color}
                />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[styles.tabBarText, {color}]}>
                  More
                </Text>
              </Shadow>
            );
          },
        }}
        component={MoreScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  tabBarText: {
    marginTop: 4,
    fontSize: Typography.fontSizes.x12,
  },
});

export default MainRoot;
