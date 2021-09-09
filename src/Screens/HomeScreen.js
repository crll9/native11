import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import Header from '../components/Header/Header';
import commonStyles from '../Styles/commonStyles';
import {sizing, theme} from '../Styles/theme';
import {colors} from '../Styles/colors';
import GameCard from '../components/Card/GameCard';
import {Shadow} from 'react-native-neomorph-shadows';

const HomeScreen = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const gameData = [
		{name: 'Football'},
		{name: 'Cricket'},
		{name: 'Basketball'},
	];
	return (
		<ScrollView>
			<Header />
			<View style={{height: 200}} />
			<View style={[commonStyles.rowAlignCenter, {marginVertical: sizing.x24}]}>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					{gameData.map(({name}, i) => {
						const color = selectedTab === i ? colors.primary : colors.dark;
						return (
							<TouchableOpacity
								style={selectedTab === i ? styles.selectedTab : styles.tab}
								activeOpacity={0.8}
								onPress={() => setSelectedTab(i)}
								key={name}>
								<View
									style={[
										commonStyles.rowAlignCenter,
										{paddingHorizontal: sizing.x8, marginHorizontal: sizing.x8},
									]}>
									<Text numberOfLines={1}>{name}</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>

			<GameCard />
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	selectedTab: {
		backgroundColor: colors.primaryTransparent,
		flex: 1,
		paddingVertical: sizing.x12,
		alignItems: 'center',
		margin: sizing.x12,
		borderRadius: sizing.x12,
	},
	tab: {
		flex: 1,
		paddingVertical: sizing.x12,
		alignItems: 'center',

		borderRadius: sizing.x12,
		margin: sizing.x12,
	},
});
