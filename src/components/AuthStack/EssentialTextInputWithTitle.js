import React from 'react';
import TitleWithRequiredText from './TitleWithRequiredText';
import CustomTextInput from './CustomTextInput';
import {View} from 'react-native';

export default function EssentialInputWithTitle({
  title,
  placeholder,
  value,
  onChangeText,
  onFocus,
  keyboardType,
  secureTextEntry,
}) {
  return (
    <>
        <TitleWithRequiredText title={title} />
        <CustomTextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
    </>
  );
}
