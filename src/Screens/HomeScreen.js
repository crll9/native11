import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import GameCard from '../components/Card/GameCard';
import {Shadow} from 'react-native-neomorph-shadows';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const gameData = [
    {name: 'Football'},
    {name: 'Cricket'},
    {name: 'Basketball'},
  ];
  return (
    <ScrollView style={{backgroundColor: colors.backgroundColor}}>
      <Header />
      <View style={{height: 200}} />
      <View style={[commonStyles.rowAlignCenter, {marginVertical: sizing.x24}]}>
        <ScrollView
          horizontal={true}
          style={{marginHorizontal: sizing.x16}}
          showsHorizontalScrollIndicator={false}>
          {gameData.map(({name}, i) => {
            const shadowRadius = selectedTab === i ? 6 : 0;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{marginRight: sizing.x8}}
                onPress={() => setSelectedTab(i)}
                key={name}>
                <Shadow inner style={[styles.buttonGroup, {shadowRadius}]}>
                  <Text numberOfLines={1}>{name}</Text>
                </Shadow>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <GameCard />
      <GameCard />
      <GameCard />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonGroup: {
    width: 100,
    height: 48,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
