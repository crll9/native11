import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MyWalletScreen,
  HomeScreen,
  ContestScreen,
  MoreScreen,
} from '../Screens';
import {colors} from '../Styles/colors';
import Typography from '../Styles/Typography';
import {Icon, Text} from 'react-native-elements';
import {Shadow} from 'react-native-neomorph-shadows';
import TeamList from '../Screens/MatchContestScreen';

import TournamentScreen from '../Screens/ContestDetailsScreen';
import CreateTeamScreen from '../Screens/CreateTeamScreen';
import CaptainChooseScreen from '../Screens/CaptainChooseScreen';
import TeamsOverviewScreen from '../Screens/TeamsOverviewScreen';
import LoginScreen from '../Screens/LoginScreen';
import {connect} from 'react-redux';
import Splash from '../components/Shared/Splash';
import RegisterScreen from '../Screens/RegisterScreen';
import {getUser} from '../redux/actions/authActions';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
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
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            const color = focused ? colors.secondaryColor : colors.subtitleText;
            const shadowRadius = focused ? 6 : 0;

            return (
              <Shadow inner style={{...styles.tabBarItem, shadowRadius}}>
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
              <Shadow inner style={{...styles.tabBarItem, shadowRadius}}>
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
              <Shadow inner style={{...styles.tabBarItem, shadowRadius}}>
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
              <Shadow inner style={{...styles.tabBarItem, shadowRadius}}>
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

const authRoutes = [
  {name: 'LoginScreen', component: LoginScreen},
  {name: 'RegisterScreen', component: RegisterScreen},
];

const mainRoutes = [
  {name: 'HomeScreen', component: TabScreen},
  {name: 'TeamList', component: TeamList},
  {name: 'Tournament', component: TournamentScreen},
  {name: 'CreateTeam', component: CreateTeamScreen},
  {name: 'CaptainChoose', component: CaptainChooseScreen},
  {name: 'TeamsOverview', component: TeamsOverviewScreen},
];

const MainRoot = ({user, loading, getUser}) => {
  useLayoutEffect(() => {
    getUser();
  }, [getUser]);
  const routes = authRoutes;
  if (loading && !user) {
    return <Splash />;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {routes.map(({name, component}) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
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

const mapStateToProps = ({auth: {user, loading}}) => ({
  user,
  loading,
});

export default connect(mapStateToProps, {getUser})(MainRoot);
