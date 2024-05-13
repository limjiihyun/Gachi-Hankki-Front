import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../constants/colors/colors';

export default function BottomBarButton({onPress, title}) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '100%',
          height: 58,
          backgroundColor: colors.brown,
          borderRadius: 13,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text
          style={{
            color: colors.white,
            textAlign: 'center',
            fontSize: 17,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
}
