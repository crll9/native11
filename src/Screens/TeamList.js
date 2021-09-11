import React, {useState} from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	Image,
} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import GameCard from '../components/Card/GameCard';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';
import ContestCard from '../components/Card/ContestCard';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const TeamList = () => {
	return (
		<ScrollView style={{backgroundColor: colors.backgroundColor}}>
			<TeamHeader />
			<View style={{marginTop: sizing.x8}} />
			<View style={[commonStyles.centerInFlex1]}>
				<Neomorph style={styles.allContestShadow}>
					<View style={commonStyles.rowAlignCenterJustifyBetween}>
						<View style={commonStyles.rowAlignCenterJustifyBetween}>
							<Image
								style={styles.logo}
								source={require('../assets/images/DummyTeam.jpg')}
							/>
							<Text style={{fontWeight: 'bold', paddingRight: sizing.x4}}>
								View All Contests
							</Text>
							<Text style={{color: colors.primary, fontWeight: 'bold'}}>
								(98)
							</Text>
						</View>
						<Icon
							name="arrow-right-bold"
							size={20}
							type="material-community"
							color={colors.primary}
						/>
					</View>
				</Neomorph>
			</View>
			<View style={styles.contentBox}>
				<Image
					style={styles.logo2}
					source={require('../assets/images/DummyTeam.jpg')}
				/>
				<View>
					<Text
						style={{
							...Typography.h3Style,
							color: colors.secondaryColor,
							marginVertical: sizing.x2,
						}}>
						Everybody Wins
					</Text>
					<Text style={{color: colors.subtitleText}}>
						Low Investment Higher Returns
					</Text>
				</View>
			</View>

			<ContestCard />
			<ContestCard />
			<ContestCard />
			<ContestCard />
		</ScrollView>
	);
};

export default TeamList;

const styles = StyleSheet.create({
	teamName: {
		margin: sizing.x4,
		...Typography.h1Style,
		color: colors.white,
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
	allContestShadow: {
		marginVertical: sizing.x16,
		shadowRadius: 8,
		borderRadius: 16,
		backgroundColor: colors.backgroundColor,
		width: CARD_WIDTH,
		height: 60,
		padding: sizing.x16,
	},
	logo: {
		width: sizing.x32,
		height: sizing.x32,
		resizeMode: 'contain',
		marginRight: '5%',
	},
	logo2: {
		width: sizing.x40,
		height: sizing.x40,
		resizeMode: 'contain',
		marginRight: '5%',
	},
	contentBox: {
		marginVertical: sizing.x8,
		flexDirection: 'row',
		marginHorizontal: sizing.x24,
	},
});
