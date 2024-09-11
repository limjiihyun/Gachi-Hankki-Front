import React from 'react';
import {View} from 'react-native';
import colors from '../constants/colors/colors';

export default function HorizontalLine() {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: colors.grey300,
      }}
    />
  );
}
