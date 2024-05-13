import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../constants/colors/colors';

function TextButton({title, textColor, onPress}) {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: textColor}}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}
export default TextButton;
