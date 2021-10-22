import {Dimensions, StyleSheet} from 'react-native';
import {colors} from './colors';
import {sizing} from './theme';

export const LOGO_SIZE = 100;
const {width} = Dimensions.get('window');

const commonStyles = StyleSheet.create({
  centerInFlex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundColor,
  },
  background: {
    flex: 1,
    backgroundColor: colors.light,
    padding: sizing.x16,
    paddingTop: sizing.x8,
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowAlignCenterJustifyBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAlignCenterJustifyEvenly: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  rowAlignCenterJustifyAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flex1: {
    flex: 1,
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  logo: {
    height: 64,
    width: 64,
  },
  absolutePositionedBtn: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: width - 32,
  },
  bottomBtn: {
    backgroundColor: colors.secondaryColor,
    paddingVertical: 14,
    borderRadius: 14,
  },
});

export default commonStyles;
