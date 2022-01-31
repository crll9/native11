import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Styles/colors';
import { CARD_WIDTH, sizing } from '../../Styles/theme';

const NotificationCard = ({
  title,
  content,
  onPress,
  key
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{ ...styles.container, borderTopWidth: key == 0 ? 1 : 0 }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizing.x16,
    paddingVertical: sizing.x24,
    borderBottomWidth: 1,
    borderBottomColor: colors.steelgrey,
    width: CARD_WIDTH + 32,
  },
  title: {
    fontSize: sizing.x12,
    color: colors.geryText,
  },
  content: {
    fontSize: sizing.x12,
    color: colors.offWhiteText,
  }
});
export default NotificationCard;
