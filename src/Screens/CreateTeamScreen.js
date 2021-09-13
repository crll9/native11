import React, {useState} from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	Image,
} from 'react-native';
import {Text, Icon, LinearProgress, Divider} from 'react-native-elements';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';
import {sizing} from '../Styles/theme';
import {colors} from '../Styles/colors';
import GameCard from '../components/Card/GameCard';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import Typography from '../Styles/Typography';
import TeamHeader from '../components/Header/TeamHeader';

const CARD_WIDTH = Dimensions.get('window').width - 32;

const dummyButton = [
	{name: 'GK', value: '1'},
	{name: 'DEF', value: '3'},
	{name: 'MID', value: '2'},
	{name: 'FOR', value: '5'},
];

const mockPlayers = [
	{name: 'David Villa', team: 'SPA', points: '35.8', credits: '9.0'},
	{name: 'David Villa', team: 'SPA', points: '35.8', credits: '8.0'},
	{name: 'David Villa', team: 'SPA', points: '35.8', credits: '7.0'},
];

const CreateTeamScreen = () => {
	return (
		<ScrollView style={{backgroundColor: colors.backgroundColor}}>
			<TeamHeader />
			<View style={{marginTop: sizing.x8}} />
			<View style={commonStyles.centerInFlex1}>
				<Shadow inner style={styles.teamSelectOverview}>
					<Text style={styles.shadowHeading}>
						You may only select 7 players from each team
					</Text>
					<View
						style={[
							commonStyles.rowAlignCenterJustifyBetween,
							styles.container,
						]}>
						<View>
							<Text style={styles.subtitle}>Players</Text>
							<View style={{flexDirection: 'row'}}>
								<Text style={{fontWeight: 'bold', fontSize: sizing.x16}}>
									11/
								</Text>
								<Text style={[styles.subtitle, {paddingTop: sizing.x2}]}>
									11
								</Text>
							</View>
						</View>
						<View style={commonStyles.rowAlignCenterJustifyBetween}>
							<Image
								style={styles.logo}
								source={require('../assets/images/DummyTeam.jpg')}
							/>
							<View>
								<Text style={{fontWeight: 'bold', fontSize: sizing.x16}}>
									SPA
								</Text>
								<Text>5</Text>
							</View>
						</View>
						<View style={styles.slashBar}>
							<Text
								style={{
									color: colors.subtitleText,
									fontSize: sizing.x40,
								}}>
								/
							</Text>
						</View>
						<View style={commonStyles.rowAlignCenterJustifyBetween}>
							<View>
								<Text style={{fontWeight: 'bold', fontSize: sizing.x16}}>
									SPA
								</Text>
								<Text>5</Text>
							</View>
							<Image
								style={styles.logo}
								source={require('../assets/images/DummyTeam.jpg')}
							/>
						</View>
						<View>
							<Text style={styles.subtitle}>Credits Left</Text>
							<Text
								style={{
									marginLeft: sizing.x48,
									fontWeight: 'bold',
									fontSize: sizing.x16,
								}}>
								4.0
							</Text>
						</View>
					</View>
					<View style={commonStyles.rowAlignCenterJustifyBetween}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => {
							return (
								<Neomorph key={item} style={styles.neomorphTile}></Neomorph>
							);
						})}
					</View>
				</Shadow>
			</View>

			<View
				style={[
					commonStyles.rowAlignCenterJustifyBetween,
					{marginHorizontal: sizing.x16},
				]}>
				{dummyButton.map(({name, value}) => {
					// can vary the color of the buttons here
					return (
						<Neomorph key={name} style={styles.neomorphButton}>
							<Text>{name} (1)</Text>
						</Neomorph>
					);
				})}
			</View>

			<View style={commonStyles.centerInFlex1}>
				<Shadow inner style={styles.teamTable}>
					<Text style={styles.shadowHeading}>
						You may only select 3 forwards
					</Text>
					<View
						style={[
							commonStyles.rowAlignCenterJustifyBetween,
							styles.leaderboardTab,
						]}>
						<Text>Players</Text>
						<Text style={{paddingLeft: sizing.x32}}>Points</Text>
						<Text style={{paddingRight: sizing.x24}}>Credits</Text>
					</View>
					{mockPlayers.map(({name, team, points, credits}) => {
						return (
							<View
								key={credits}
								style={[
									commonStyles.rowAlignCenterJustifyBetween,
									styles.rowContainer,
								]}>
								<View style={commonStyles.rowAlignCenterJustifyBetween}>
									<Image
										style={styles.logo}
										source={require('../assets/images/DummyTeam.jpg')}
									/>
									<View>
										<Text style={{fontWeight: 'bold'}}>{name}</Text>
										<Text style={{color: colors.primary, fontWeight: 'bold'}}>
											{team}
										</Text>
									</View>
								</View>
								<Text style={[styles.subtitle]}>{points}</Text>
								<Text style={{paddingLeft: sizing.x24}}>{credits}</Text>
								<Icon name="plus" size={21} solid type="font-awesome-5" />
							</View>
						);
					})}
				</Shadow>
			</View>
		</ScrollView>
	);
};

export default CreateTeamScreen;

const styles = StyleSheet.create({
	neomorphTile: {
		marginVertical: sizing.x12,
		shadowRadius: 8.2,
		borderRadius: 6,
		backgroundColor: colors.secondaryColor,
		width: 25,
		height: 25,
		padding: sizing.x12,
		...commonStyles.alignItemsCenter,
	},
	teamSelectOverview: {
		marginVertical: sizing.x24,
		shadowRadius: 12,
		borderRadius: 16,
		backgroundColor: colors.backgroundColor,
		width: CARD_WIDTH,
		height: 175,
		padding: sizing.x12,
	},
	logo: {
		width: sizing.x40,
		height: sizing.x40,
		resizeMode: 'contain',
		marginHorizontal: '1.5%',
	},
	container: {
		marginVertical: sizing.x12,
		marginHorizontal: sizing.x4,
	},
	subtitle: {
		color: colors.subtitleText,
		fontSize: sizing.x12,
	},
	slashBar: {},
	neomorphButton: {
		marginVertical: sizing.x12,
		shadowRadius: 8.2,
		borderRadius: 16,
		backgroundColor: colors.secondaryColor,
		width: 80,
		height: 48,
		padding: sizing.x16,
		...commonStyles.alignItemsCenter,
	},
	teamTable: {
		marginVertical: sizing.x24,
		shadowRadius: 12,
		borderRadius: 16,
		backgroundColor: colors.backgroundColor,
		width: CARD_WIDTH,
		height: 400,
		padding: sizing.x12,
	},
	shadowHeading: {
		...commonStyles.rowAlignCenter,
		...Typography.h5Style,
		fontSize: sizing.x12,
		color: colors.subtitleText,
		textAlign: 'center',
		paddingVertical: sizing.x2,
	},
	leaderboardTab: {
		backgroundColor: colors.black,
		marginHorizontal: -sizing.x12,
		paddingHorizontal: sizing.x24,
		height: sizing.x56,
		marginVertical: sizing.x12,
	},
	rowContainer: {
		marginVertical: sizing.x16,
	},
});
