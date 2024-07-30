import React from 'react';
import TitleWithRequiredText from './TitleWithRequiredText';
import CustomTextInput from './CustomTextInput';
import {View} from 'react-native';

export default function EssentialInputWithTitle({
  title,
  placeholder,
  inputValue,
  onChange,
  onFocus,
  keyboardType,
  secureTextEntry
}) {
  return (
    <>
      <View style={{marginTop: 20}}>
        <TitleWithRequiredText title={title} />
        <CustomTextInput
          placeholder={placeholder}
          inputValue={inputValue}
          onChange={onChange}
          onFocus={onFocus}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </>
  );
}
