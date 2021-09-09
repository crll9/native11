import {colors as ThemeColor} from 'react-native-elements';
import {colors} from './colors';
import Typography from './Typography';

export const sizing = {
  x8: 8,
  x4: 4,
  x2: 2,
  x12: 12,
  x16: 16,
  x24: 24,
  x32: 32,
  x40: 40,
  x48: 48,
  x56: 56,
  x64: 64,
};

const Text = {
  h4Style: Typography.h4Style,
  h3Style: {
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  style: {
    fontFamily: 'WorkSans-Regular',
    color: colors.white,
  },
};

const Input = {
  inputStyle: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 19,
  },
  style: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    marginBottom: -1,
  },
};

const Button = {
  containerStyle: {
    width: '95%',
    alignSelf: 'center',
  },
  titleStyle: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: Typography.fontSizes.x14,
  },
};

const CheckBox = {
  containerStyle: {
    padding: 0,
    marginRight: sizing.x2,
    marginVertical: sizing.x2,
  },
};

const Card = {
  containerStyle: {
    borderRadius: sizing.x8,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    marginHorizontal: sizing.x8,
    marginBottom: sizing.x8,
    padding: sizing.x8,
    marginTop: sizing.x8,
    borderWidth: 0,
  },
};

export const theme = {
  Text,
  Button,
  Input,
  Divider: {
    backgroundColor: colors.dividerColor,
  },
  colors: {
    ...ThemeColor,
    ...colors,
  },
  Card,
  CheckBox,
};
