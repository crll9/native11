import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Header as ElHeader, Text} from 'react-native-elements';
import Typography from '../../Styles/Typography';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import {sizing} from '../../Styles/theme';
import {Shadow} from 'react-native-neomorph-shadows';
import WalletBalance from '../Wallet/WalletBalance';

const TeamHeader = () => {
  return (
    <ElHeader
      leftComponent={
        <View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            <Text style={styles.teamName}>GER</Text>
            <Text style={{color: colors.primary}}>vs</Text>
            <Text style={styles.teamName}>ENG</Text>
          </View>
          <View style={commonStyles.rowAlignCenterJustifyBetween}>
            {['00', '14', '32'].map((item, i) => (
              <Shadow inner key={i.toString()} style={styles.timer}>
                <Text style={styles.timerText}>{item}</Text>
              </Shadow>
            ))}
          </View>
        </View>
      }
      rightComponent={() => <WalletBalance />}
      backgroundColor={colors.backgroundColor}
      containerStyle={{elevation: 3, borderBottomWidth: 0}}
    />
  );
};

export default TeamHeader;

const styles = StyleSheet.create({
  teamName: {
    margin: sizing.x4,
    ...Typography.h3Style,
    color: colors.white,
    fontWeight: 'bold',
  },
  timer: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 2.5,
    borderRadius: 4,
    marginVertical: 3,
  },
  timerText: {
    color: colors.secondaryColor,
    fontSize: 16,
  },
});
