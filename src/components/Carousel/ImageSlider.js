import React, {useRef} from 'react';
import {
  Dimensions,
  Animated,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../Styles/colors';
import {sizing} from '../../Styles/theme';

const {width} = Dimensions.get('window');
const INDICATOR_WIDTH = 6;

const IMAGE_PADDING = sizing.x4;
const SCREEN_PADDING = sizing.x16;
const IMAGE_WIDTH = width - 2 * SCREEN_PADDING;

const ImageSlider = ({items}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const SLIDER_HEIGHT = !items[0].image ? 70 : 160;

  const Indicator = ({scrollX}) => {
    return (
      <View style={styles.indicatorContainer}>
        {items.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.1, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`indicator-${i}`}
              style={[
                styles.indicator,
                {
                  opacity,
                  transform: [{scale}],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <Animated.FlatList
        data={items}
        style={{maxHeight: SLIDER_HEIGHT}}
        keyExtractor={item => item?.id?.toString() || item}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{paddingHorizontal: SCREEN_PADDING}}
        snapToInterval={IMAGE_WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          if (!item.image) {
            return (
              <View style={[styles.imageContainer, {height: SLIDER_HEIGHT}]}>
                <Image
                  source={{uri: item}}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            );
          }
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {}}
              style={styles.imageContainer}>
              <Image
                source={{
                  uri: item.image.includes('http')
                    ? item.image
                    : `https://admin.sportsanalytics.in${item.image}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        }}
      />
      {items.length > 1 && <Indicator scrollX={scrollX} />}
    </View>
  );
};

export default ImageSlider;

ImageSlider.propTypes = {
  items: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  indicator: {
    height: INDICATOR_WIDTH,
    width: INDICATOR_WIDTH,
    borderRadius: INDICATOR_WIDTH / 2,
    backgroundColor: colors.lightGrey,
    marginHorizontal: sizing.x4,
    marginTop: sizing.x8,
    marginBottom: -6,
  },
  indicatorContainer: {flexDirection: 'row', alignSelf: 'center'},
  imageContainer: {
    width: IMAGE_WIDTH,

    paddingHorizontal: IMAGE_PADDING,
    paddingTop: sizing.x8,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: sizing.x8,
    borderColor: 'rgba(0,0,0,.07)',
    borderWidth: 0.7,
  },
});
