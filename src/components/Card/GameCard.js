import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Dimensions,
} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {colors} from '../../Styles/colors';
import commonStyles from '../../Styles/commonStyles';
import {sizing} from '../../Styles/theme';
import Typography from '../../Styles/Typography';
import {Shadow} from 'react-native-neomorph-shadows';
import {Neomorph} from 'react-native-neomorph-shadows';

const CARD_WIDTH = Dimensions.get('window').width * 0.9;

const GameCard = () => {
	return (
		<TouchableOpacity style={[commonStyles.alignItemsCenter]}>
			<Shadow inner style={styles.neomorphContainer}>
				<View
					style={[
						commonStyles.rowAlignCenterJustifyBetween,
						styles.rowContainer,
					]}>
					<Text>EUROS 2020</Text>
					<Text>Bell Icon</Text>
				</View>
				<View
					style={[
						commonStyles.rowAlignCenterJustifyAround,
						styles.rowContainer,
					]}>
					<Image
						style={styles.logo}
						source={require('../../assets/images/DummyTeam.jpg')}
					/>
					<Text style={{paddingRight: sizing.x8}}>VS</Text>
					<Image
						style={styles.logo}
						source={require('../../assets/images/DummyTeam.jpg')}
					/>
					<View style={commonStyles.rowAlignCenterJustifyBetween}>
						<Text style={styles.teams}>GER</Text>
						<Text style={{color: colors.primary}}>vs</Text>
						<Text style={styles.teams}>ENG</Text>
					</View>
				</View>
			</Shadow>
		</TouchableOpacity>
	);
};

export default GameCard;

const styles = StyleSheet.create({
	container: {},
	logo: {
		width: sizing.x64,
		height: sizing.x64,
		resizeMode: 'contain',
		marginRight: '5%',
	},
	neomorphContainer: {
		shadowRadius: 18,
		borderRadius: 22,
		backgroundColor: '#A9A9A9',
		width: CARD_WIDTH,
		height: 170,
		padding: sizing.x16,
	},
	rowContainer: {
		marginVertical: sizing.x8,
	},
	teams: {
		margin: sizing.x4,
		...Typography.h4Style,
	},
});
