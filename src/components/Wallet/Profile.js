import React, { useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Neomorph } from 'react-native-neomorph-shadows';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../Styles/colors';
import { CARD_WIDTH, sizing, WindowHeight } from '../../Styles/theme';
import BottomSheet from './BottomSheet';
import NeomorphButton from './NeomorphButton';
import TransactionCard from './TransactionCard';
const Profile = () => {
    const refProfileSheet = useRef();
    const [transactions, setTransactions] = useState([
        {
            type: 'Deposit',
            address: 'terradsafsjkdfskdfds',
            amount: '0.00',
            date: 'Thu, Dec 2, 2021, 8:39:53 PM',
            currency: 'UST',
            address: 'terradsafsjkdfskdfds',
        },
        {
            type: 'Deposit',
            address: 'terradsafsjkdfskdfds',
            amount: '10.00',
            date: 'Thu, Dec 2, 2021, 8:39:53 PM',
            currency: 'USDT',
            address: 'terradsafsjkdfskdfds',
        },
    ]);
    return (
        <>
            <Neomorph
                style={styles.neomorphContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => refProfileSheet.current.open()}>
                    <Image
                        source={{
                            uri: 'https://iconape.com/wp-content/png_logo_vector/avatar-11.png',
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </Neomorph>
            <BottomSheet
                refSheet={refProfileSheet}
                height={WindowHeight}
                closeOnDragDown={false}
            >
                <View style={styles.profileContainer}>
                    <View>
                        <View style={styles.profileHeader}>
                            <Text h2>Profile</Text>
                            <NeomorphButton
                                onPress={() => refProfileSheet.current.close()}
                                icon='times'
                                size={20}
                                color={colors.steelgrey}
                            />
                        </View>
                        <Text h3>terra...fbsdf</Text>
                    </View>
                    <View style={styles.profileBody}>
                        <View style={styles.profileBodyCard}>
                            <View style={styles.blackIcon}>
                                <Image
                                    source={require('../../assets/images/Fury.png')}
                                />
                            </View>
                            <View style={styles.profileBodyCardContent}>
                                <View>
                                    <Text h3>15,200.234345</Text>
                                </View>
                                <View>
                                    <Text>$Fury</Text>
                                </View>
                                <View styles={styles.ustText}>
                                    <Text >2342324 UST</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.address}>
                            <Text style={styles.subTitleText}>Address</Text>
                            <Text style={styles.addressText}>terra1h8ljdmae7lx05kjj79c9ekscwsyjd3yr8wyvdn</Text>
                        </View>
                        <View style={styles.transHistory}>
                            <Text style={styles.subTitleText}>Transaction History</Text>
                            {transactions.map((transaction, key) => (
                                <TransactionCard
                                    amount={transaction.amount}
                                    date={transaction.date}
                                    key={key}
                                    tranactionType={transaction.type}
                                    currency={transaction.currency}
                                    address={transaction.address}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </>
    );
};

const styles = StyleSheet.create({
    neomorphContainer: {
        shadowRadius: 3,
        borderRadius: 30,
        backgroundColor: colors.backgroundColor,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: sizing.x8,
    },
    icon: {
        width: 44,
        height: 44
    },
    profileHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: sizing.x16,
        width: CARD_WIDTH,
    },
    profileContainer: {
        flex: 1,
        width: CARD_WIDTH + 32,
        alignItems: 'center',
    },
    profileBody: {
        width: CARD_WIDTH,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: sizing.x16,
    },
    profileBodyCard: {
        width: CARD_WIDTH,
        height: 100,
        backgroundColor: colors.secondaryColor,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    blackIcon: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileBodyCardContent: {
        flexDirection: 'column',
        width: CARD_WIDTH * 0.6
    },
    ustText: {
        backgroundColor: colors.black,
        height: 40,
        width: '100%'
    },
    address: {
        width: CARD_WIDTH,
        marginVertical: sizing.x16,
    },
    subTitleText: {
        color: colors.offWhiteText,
    },
    addressText: {
        color: '#7f8489',
    },
    transHistory: {
        width: CARD_WIDTH,
    },

})
export default Profile;
