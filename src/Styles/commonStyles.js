import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {sizing} from './theme';

export const LOGO_SIZE = 100;

const commonStyles = StyleSheet.create({
  centerInFlex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default commonStyles;
