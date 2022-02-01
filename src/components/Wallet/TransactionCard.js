import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Neomorph } from 'react-native-neomorph-shadows';
import { colors } from '../../Styles/colors';
import { CARD_WIDTH, sizing } from '../../Styles/theme';

const TransactionCard = ({
    tranactionType,
    link,
    amount,
    date,
    currency,
    address,
}) => {
    return (
        <Neomorph
            inner swapShadows
            style={styles.transHistoryCard}>
            <View style={styles.transHistoryCardContent}>
                <Text>{tranactionType}</Text>
                <Icon
                    name='external-link-alt'
                    size={15}
                    containerStyle={{ marginRight: 2 }}
                    type="material-community"
                    color={colors.secondaryColor}
                />
            </View>
            <View>
                <Text>Sent {amount} {currency} to {address}</Text>
            </View>
            <View style={styles.date}>
                <Text>Thu, Dec 2, 2021, 8:39:53 PM</Text>
            </View>
        </Neomorph>
    )
};

const styles = StyleSheet.create({
    transHistoryCard: {
        shadowRadius: 5,
        borderRadius: 16,
        backgroundColor: colors.backgroundColor,
        width: CARD_WIDTH,
        height: 80,
        padding: sizing.x12,
        marginVertical: sizing.x12,
        flexDirection: 'column',
    },
    transHistoryCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    date: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})

export default TransactionCard;
