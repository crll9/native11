import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import {sizing} from '../../Styles/theme';

const WalletBalance = ({walletData, walletLoading}) => {
  const {item, all} = walletData || {item: {}, all: []};
  const [visibility, setVisibility] = useState(false);

  const handleModalOpen = () => {
    console.log(walletData);
    if (all?.length > 0) {
      setVisibility(true);
    }
  };
  return (
    <>
      <View style={{width: 88, alignItems: 'flex-end'}}>
        <Text style={styles.smallText}>Wallet Balance</Text>
        {!walletLoading && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleModalOpen()}
            style={commonStyles.rowAlignCenter}>
            <Icon
              name="wallet"
              size={23}
              containerStyle={{marginRight: 2}}
              type="material-community"
              color={colors.secondaryColor}
            />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.deepText}>
              {item['amount']}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        onBackButtonPress={() => setVisibility(false)}
        isVisible={visibility}
        onBackdropPress={() => setVisibility(false)}
        animationOut="slideOutDown"
        animationIn="fadeIn"
        animationInTiming={300}
        animationOutTiming={300}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: sizing.x16,
            borderRadius: sizing.x8,
          }}>
          <View style={styles.header}>
            <Text
              style={{color: colors.dark, textAlign: 'center', fontSize: 16}}>
              Wallet Balance
            </Text>
          </View>
          {all.map(item => (
            <View style={styles.row}>
              <Text
                style={{
                  color: colors.black,
                }}>
                {item.denom}
              </Text>
              <Text
                style={{
                  color: colors.secondaryColor,
                  fontSize: 15,
                  fontWeight: '700',
                }}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </Modal>
    </>
  );
};

const mapStateToProps = ({auth: {walletLoading, walletData}}) => ({
  walletData,
  walletLoading,
});

export default connect(mapStateToProps, {})(WalletBalance);

const styles = StyleSheet.create({
  smallText: {
    fontSize: 10,
    color: colors.white,
  },
  deepText: {
    fontSize: 20,
    color: colors.secondaryColor,
    fontWeight: 'bold',
  },
  header: {
    paddingBottom: sizing.x16,
    borderBottomColor: 'rgba(0,0,0,.3)',
    borderBottomWidth: 0.7,
  },
  row: {
    ...commonStyles.rowAlignCenterJustifyBetween,
    paddingVertical: sizing.x8,
    borderBottomColor: 'rgba(0,0,0,.3)',
    borderBottomWidth: 0.7,
  },
});
