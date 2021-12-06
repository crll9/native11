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
import {fetchAllMatches, fetchPools} from '../redux/actions/matchesActions';
import {ActivityIndicator} from 'react-native';

const dummyData = [
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCXg9HzYyMJ3bYtdyncxXja8kP25jVosbehA&usqp=CAU',
    id: '3',
  },
  {image: 'https://pbs.twimg.com/media/CoNd16dWgAA38e6.jpg', id: '1'},
  {
    image:
      'https://thumbs.dreamstime.com/z/soccer-fantasy-league-banner-poster-design-ball-purple-abstract-background-147469622.jpg',
    id: '2',
  },
];

const HomeScreen = ({loading, matches, fetchAllMatches, fetchPools}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    fetchAllMatches();
    fetchPools();
  }, []);

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
          horizontal
          style={{marginHorizontal: sizing.x16}}
          showsHorizontalScrollIndicator={false}>
          {gameData.map(({name}, i) => {
            const shadowRadius = selectedTab === i ? 6 : 0;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                disabled
                style={{marginRight: sizing.x8}}
                onPress={() => setSelectedTab(i)}
                key={name}>
                <Shadow inner style={{...styles.buttonGroup, shadowRadius}}>
                  <Text numberOfLines={1} style={{fontSize: 16}}>
                    {name}
                  </Text>
                </Shadow>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.white}
          style={{
            alignSelf: 'center',
            marginVertical: sizing.x16,
          }}
        />
      ) : (
        matches.map(match => {
          return <GameCard match={match} key={match._id} />;
        })
      )}
    </ScrollView>
  );
};

const mapStateToProps = ({matches}) => ({
  matches: matches.matches || [],
  loading: matches.loading,
});

export default connect(mapStateToProps, {fetchAllMatches, fetchPools})(
  HomeScreen,
);

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
