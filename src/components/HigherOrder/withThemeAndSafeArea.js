import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../Styles/theme';

const withThemeAndSafeArea = WrappedComponent => props => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView edges={['bottom']} style={{flex: 1}}>
        <WrappedComponent {...props} />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default withThemeAndSafeArea;
