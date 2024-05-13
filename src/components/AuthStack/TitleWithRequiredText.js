import React from 'react';
import {View, Text, Image} from 'react-native';
import colors from '../../constants/colors/colors';

export default function TitleWithRequiredText({title}) {
  return (
    <View style={{flexDirection: 'row', alignContent: 'center'}}>
      <Text style={{color: colors.grey010}}>{title}</Text>
      <Image
        style={{width: 6, height: 6, marginTop: 5}}
        source={require('../../assets/essential-red-mark.png')}
      />
    </View>
  );
}
