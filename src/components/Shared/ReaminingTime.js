import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';
import commonStyles from '../../Styles/commonStyles';

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';
import {colors} from '../../Styles/colors';

const getTimeDifference = _date => {
  const date = new Date(_date);
  const currentDate = Date.now();

  const days = Math.abs(differenceInDays(date, currentDate));
  const hours = Math.abs(differenceInHours(date, currentDate));
  const mins = Math.abs(differenceInMinutes(date, currentDate));

  const resArray = [];
  if (days > 0) {
    resArray.push(`${days}d `);
  }
  if (hours > 0) {
    resArray.push(`${hours % 24}h `);
  }
  if (mins > 0) {
    resArray.push(`${mins % 60}m`);
  }

  return resArray;
};

const ReaminingTime = ({start_date}) => {
  return (
    <View style={commonStyles.rowAlignCenterJustifyBetween}>
      {getTimeDifference(start_date.gmt).map((item, i) => (
        <Shadow inner key={i.toString()} style={styles.timer}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.timerText}>
            {item}
          </Text>
        </Shadow>
      ))}
    </View>
  );
};

export default ReaminingTime;

const styles = StyleSheet.create({
  timer: {
    height: 28,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 2.5,
    borderRadius: 4,
    marginTop: 3,
  },
  timerText: {
    color: colors.secondaryColor,
    fontSize: 14,
  },
});
