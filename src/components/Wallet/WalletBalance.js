import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { colors } from '../../Styles/colors';
import { CARD_WIDTH, sizing, WindowHeight } from '../../Styles/theme';
import { Neomorph } from 'react-native-neomorph-shadows';
import BottomSheet from './BottomSheet';
import NeomorphButton from './NeomorphButton';
import NotificationCard from './NotificationCard';

const WalletBalance = ({ walletData, walletLoading }) => {
  const refWalletSheet = useRef();
  const refNotificationSheet = useRef();
  const [notifications, setNotifications] = useState([
    {
      title: 'Notification 1',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 2',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 3',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 4',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 5',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 6',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 1',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 2',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 3',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 4',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 5',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    },
    {
      title: 'Notification 6',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    }
  ]);
  return (
    <>
      <View style={styles.neomorphOpacities}>
        <NeomorphButton
          onPress={() => refNotificationSheet.current.open()}
          icon='bell'
          size={20}
          color={colors.steelgrey}
        />
        <NeomorphButton
          onPress={() => refWalletSheet.current.open()}
          icon='wallet'
          size={20}
          color={colors.steelgrey}
        />
      </View>

      <BottomSheet
        refSheet={refWalletSheet}
        height={WindowHeight * 0.75}
        closeOnDragDown={true}
        draggableIcon
      >
        <Text>Test</Text>
      </BottomSheet>

      <BottomSheet
        refSheet={refNotificationSheet}
        height={WindowHeight}
        closeOnDragDown={false}
      >
        <View style={styles.notficationContainer}>
          <View style={styles.notificationHeader}>
            <Text h2>Notifications</Text>
            <NeomorphButton
              onPress={() => refNotificationSheet.current.close()}
              icon='times'
              size={20}
              color={colors.steelgrey}
            />
          </View>
          <ScrollView style={styles.notificationArray}>
            {notifications.map((notification, key) => (
              <NotificationCard
                title={notification.title}
                content={notification.content}
                key={key}
              />
            ))}
            <View style={styles.notificationBSfooter}>
              <Neomorph
                style={styles.neomorphContainer}
              >
                <TouchableOpacity
                  onPress={() => console.log('Load More')}>
                  <Text style={styles.loadMore}>Load More</Text>
                </TouchableOpacity>
              </Neomorph>
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </>
  );
};

const mapStateToProps = ({ auth: { walletLoading, walletData } }) => ({
  walletData,
  walletLoading,
});

export default connect(mapStateToProps, {})(WalletBalance);

const styles = StyleSheet.create({
  neomorphContainer: {
    shadowRadius: 3,
    borderRadius: 30,
    backgroundColor: colors.backgroundColor,
    width: CARD_WIDTH / 2,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: sizing.x8,
  },
  neomorphOpacities: {
    flexDirection: 'row',
  },
  notificationHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: sizing.x16,
    width: CARD_WIDTH,
  },
  notficationContainer: {
    flex: 1,
    width: CARD_WIDTH + 32,
    alignItems: 'center',
  },
  notificationArray: {
    height: WindowHeight,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.steelgrey,
    marginTop: sizing.x16,
  },
  notificationBSfooter: {
    width: CARD_WIDTH + 32,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMore: {
    color: colors.offWhiteText,
  }
});
