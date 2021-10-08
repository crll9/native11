import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import GameCard from '../components/Card/GameCard';
import {Shadow} from 'react-native-neomorph-shadows';
import ImageSlider from '../components/Carousel/ImageSlider';
import {connect} from 'react-redux';
import {fetchAllMatches} from '../redux/actions/matchesActions';
import {data} from '../redux/actions/mockData';

const dummyData = [
  {image: 'https://pbs.twimg.com/media/CoNd16dWgAA38e6.jpg', id: '1'},
  {
    image:
      'https://thumbs.dreamstime.com/z/soccer-fantasy-league-banner-poster-design-ball-purple-abstract-background-147469622.jpg',
    id: '2',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCXg9HzYyMJ3bYtdyncxXja8kP25jVosbehA&usqp=CAU',
    id: '3',
  },
];

const HomeScreen = ({loading1, matches1, fetchAllMatches}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(() => {
    fetchAllMatches();
  }, []);
  // console.log(matches1, loading1);

  const gameData = [
    {name: 'Football'},
    {name: 'Cricket'},
    {name: 'Basketball'},
  ];
  return (
    <ScrollView style={{backgroundColor: colors.backgroundColor}}>
      <Header />
      <View style={{marginTop: sizing.x8}} />
      <ImageSlider items={dummyData} />
      <View style={[commonStyles.rowAlignCenter, {marginVertical: sizing.x16}]}>
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
                  <Text numberOfLines={1} style={{fontSize: 16}}>
                    {name}
                  </Text>
                </Shadow>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {matches.map(({short_name}) => {
        return <GameCard name={short_name} />;
      })}
    </ScrollView>
  );
};

const mapStateToProps = ({matches}) => ({
  matches: matches.matches,
  loading: matches.loading,
});

export default connect(mapStateToProps, {fetchAllMatches})(HomeScreen);

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
