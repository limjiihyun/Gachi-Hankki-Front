import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import colors from '../../constants/colors/colors';

export default function EssentialMark() {
  return (
    <View>
      <Text style={{color: '#D75A43', marginTop: 8, marginLeft: 2}}>*</Text>
    </View>
  );
}
