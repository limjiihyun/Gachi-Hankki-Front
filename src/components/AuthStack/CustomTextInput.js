import React from 'react';
import {View, TextInput} from 'react-native';
import colors from '../../constants/colors/colors';

export default function CustomTextInput({
  inputValue,
  onChange,
  placeholder,
  onFocus,
  keyboardType,
}) {
  let changeFunction = onChange;

  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        onFocus={onFocus}
        style={{
          borderWidth: 1,
          borderColor: colors.grey300,
          padding: 10,
          width: '100%',
          height: '80%',
          borderRadius: 10,
          marginTop: 10,
          color: colors.grey900,
        }}
        onChangeText={changeFunction}
        value={inputValue?.toString()}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}
