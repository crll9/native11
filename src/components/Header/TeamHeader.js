import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header as ElHeader, Text} from 'react-native-elements';
import Typography from '../../Styles/Typography';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import WalletBalance from '../Wallet/WalletBalance';
import BackAction from '../Shared/BackAction';
import ReaminingTime from '../Shared/ReaminingTime';
import {connect} from 'react-redux';

const TeamHeader = ({short_name, start_date}) => {
  const [team1, team2] = short_name.split('vs');
  return (
    <ElHeader
      leftComponent={
        <View style={commonStyles.rowAlignCenter}>
          <BackAction />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.teamName}>{team1}</Text>
              <Text style={{color: colors.primary, marginHorizontal: 12}}>
                vs
              </Text>
              <Text style={styles.teamName}>{team2}</Text>
            </View>
            <ReaminingTime sm start_date={start_date} />
          </View>
        </View>
      }
      rightComponent={() => (
        <View style={styles.walletContainer}>
          <WalletBalance />
        </View>
      )}
      backgroundColor={colors.backgroundColor}
      containerStyle={{elevation: 5, borderBottomWidth: 0}}
    />
  );
};

const mapStateToProps = ({matchDetails: {matchDetails}}) => ({
  short_name: matchDetails?.short_name || '',
  start_date: matchDetails?.start_date || {gmt: '2021-08-29T12:00:00.000Z'},
});

export default connect(mapStateToProps)(TeamHeader);

const styles = StyleSheet.create({
  teamName: {
    fontSize: Typography.fontSizes.x15,
    color: colors.white,
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
  walletContainer: {
    height: 56,
    justifyContent: 'center',
  },
});
