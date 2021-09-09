import {colors} from './colors';

const h1Style = {
  fontSize: 22,
  fontFamily: 'WorkSans-Bold',
  color: colors.dark,
};

const h4Style = {
  fontSize: 18,
  fontFamily: 'WorkSans-Regular',
  color: colors.dark,
};

const h3Style = {
  fontSize: 15,
  fontFamily: 'WorkSans-SemiBold',
  color: colors.dark,
};

const h5Styles = {
  fontSize: 13,
  fontFamily: 'WorkSans-SemiBold',
  color: colors.dark,
};

const h2Style = {
  fontSize: 20,
  fontFamily: 'WorkSans-SemiBold',
  color: colors.dark,
};

const lightText = {
  fontSize: 13,
  fontFamily: 'WorkSans-Regular',
  color: colors.subtitleText,
};

const rowNameText = {
  color: colors.subtitleText,
  textTransform: 'capitalize',
  fontSize: 13,
  fontFamily: 'WorkSans-Regular',
};
const rowValueText = {
  color: colors.black,
  fontSize: 15,
  fontFamily: 'WorkSans-Regular',
};

const Typography = {
  h4Style,
  h3Style,
  lightText,
  h1Style,
  h2Style,
  h5Styles,
  rowNameText,
  rowValueText,
  fontSizes: {
    x10: 10,
    x12: 12,
    x13: 13,
    x14: 14,
    x15: 15,
    x16: 16,
    x17: 17,
    x18: 18,
    x19: 19,
    x20: 20,
    x24: 24,
    x28: 28,
    x32: 32,
    x36: 36,
  },
  fontFamily: {
    regular: 'WorkSans-Regular',
    semiBold: 'WorkSans-SemiBold',
    bold: 'WorkSans-Bold',
  },
};

export default Typography;
