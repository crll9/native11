import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import Header from '../../components/Header/Header';
import commonStyles from '../../Styles/commonStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import { colors } from '../../Styles/colors';
import { CARD_WIDTH, sizing } from '../../Styles/theme';
import SwapNeomorph from './partials/SwapNeomorph';
import SlippageButtonGroup from '../../components/SwapScreen/SlippageButtonGroup';
import TextInputNeomorph from '../../components/SwapScreen/TextInputNeomorph';


const SwapScreen = () => {
    const [fromState, setFromState] = useState({
        currency: 'UST',
        amount: 0,
    });
    const [toState, setToState] = useState({
        currency: 'FURY',
        amount: 0,
    });
    useEffect(() => {
        console.log('tostate', toState);
    }, [toState]);
    const [slippage, setSlippage] = useState(0.1);
    const switchSwap = () => {
        const temp = fromState.currency;
        setFromState({
            ...fromState,
            currency: toState.currency,
        })
        setToState({
            ...toState,
            currency: temp,
        })
    }
    return(
        <>
        <Header/>
        <ScrollView
        style={styles.scrollView}>
        <View style={commonStyles.centerInFlex1}>
            <View style={styles.balanceText}>
                <Text>Available </Text>
                <Text style={{color:colors.secondaryColor}}> 48,453 UST</Text>
            </View>
            <Neomorph
            swapShadows
            style={styles.neomorphContainer}
            >
                <View style={styles.formContainer}>
                    <Text>
                        From
                    </Text>
                    <View style={styles.currencyContainer}>
                        <TextInputNeomorph
                        placeholder={fromState.currency == 'UST' ? 'UST' : 'FURY'}
                        editable={false}
                        />
                        <TextInputNeomorph
                        placeholder={'90.00'}
                        editable={true}
                        value={fromState}
                        setstate={setFromState}
                        />
                    </View>
                </View>
            </Neomorph>

            <SwapNeomorph onPress={switchSwap}/>

              <Neomorph
            style={styles.neomorphContainer}
            >
                <View style={styles.formContainer}>
                    <Text>
                        To
                    </Text>
                    <View style={styles.currencyContainer}>
                    <TextInputNeomorph
                        placeholder={fromState.currency == 'UST' ? 'FURY' : 'UST'}
                        editable={false}
                        />
                        <TextInputNeomorph
                        placeholder={'120.00'}
                        editable={true}
                        value={toState}
                        setstate={setToState}
                        />
                </View>
                </View>
            </Neomorph>
            
            <View style={styles.slippageContainer}>
                <View style={styles.slippageText}>
                <Text>Slippage</Text>
                </View>
                <SlippageButtonGroup
                array={[0.1, 0.5, 1]}
                suffix={'%'}
                onPress={setSlippage}
                currentValue={slippage}
                />
            </View>

            <Neomorph 
            inner 
            swapShadows
            style={styles.neomorphContainer2}>
                <View style={styles.infoContainer}>
                <Text>Rate</Text>
                <Text>1 UST = 0.98 $FURY</Text>
                </View>
                <View style={styles.infoContainer}>
                <Text>Trading Fee</Text>
                <Text>$0.98</Text>
                </View>
                <View style={styles.infoContainer}>
                <Text>Slippage</Text>
                <Text>{slippage}%</Text>
                </View>
            </Neomorph>

            <TouchableOpacity
            style={styles.swapButton}
            >
                <Text style={styles.swapButtonText}>Swap</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </>
  );
};

const styles = StyleSheet.create({
    neomorphContainer: {
        shadowRadius: 5,
        borderRadius: 16,
        backgroundColor: colors.backgroundColor,
        width: CARD_WIDTH,
        height: 110,
        padding: sizing.x12,
        margin: sizing.x12,
      },
      neomorphContainer2: {
        flexDirection: 'column',
        shadowRadius: 5,
        borderRadius: 16,
        backgroundColor: colors.backgroundColor,
        width: CARD_WIDTH,
        height: 130,
        padding: sizing.x12,
        justifyContent: 'space-evenly',
        margin: sizing.x16,
      },
    formContainer: {
        flexDirection: 'column',
    },
    currencyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: sizing.x12,
    },
    swapButton: {
        backgroundColor: colors.secondaryColor,
        borderWidth: 1,
        borderRadius: 17,
        width: CARD_WIDTH,
        height: 50,
        alignItems: 'center',
        justifyContent : 'center',
    },
    swapButtonText: {
        color: colors.white,
    },
    slippageContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        width: CARD_WIDTH,
    },
    slippageText: {
        alignItems:'center', 
        justifyContent:'center'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    balanceText: {
        width: CARD_WIDTH,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    scrollView:{
        backgroundColor:colors.backgroundColor, 
        paddingTop: 5
    },   
});

export default SwapScreen;
