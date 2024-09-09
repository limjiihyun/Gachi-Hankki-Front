import React from 'react';
import {TextInput} from 'react-native';
import colors from '../../constants/colors/colors';

export default function CustomShortTextInput({
  inputValue,
  onChangeText,
  placeholder,
  onFocus,
  keyboardType,
  secureTextEntry,
}) {
  return (
    <TextInput
      onFocus={onFocus}
      style={{
        borderWidth: 1,
        borderColor: colors.grey300,
        padding: 10,
        width: '83%',
        height: '80%',
        borderRadius: 10,
        marginTop: 10,
        color: colors.grey900,
        marginRight: 8,
      }}
      onChangeText={onChangeText}
      value={inputValue?.toString()}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
}
