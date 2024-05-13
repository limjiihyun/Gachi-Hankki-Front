import React from 'react';
import {Image, View, Text} from 'react-native';
import ProfileSettingStyle from '../styles/ProfileSettingStyle';
import EssentialInputWithTitle from '../components/AuthStack/EssentialTextInputWithTitle';
import CustomTextInput from '../components/AuthStack/CustomTextInput';

function ProfileSettingScreen() {
  return (
    <>
      <View style={ProfileSettingStyle.container}>
        <View style={ProfileSettingStyle.imageContainer}>
          <View style={ProfileSettingStyle.imageBorder}>
            <Image
              style={ProfileSettingStyle.characterImage}
              source={require('../assets/character/1.png')}
            />
            <Image
              style={ProfileSettingStyle.editImage}
              source={require('../assets/profile-edit.png')}
            />
          </View>
          <Text>정보통신</Text>
        </View>
        <View style={ProfileSettingStyle.contentContainer}>
          <Text>프로필 이름을 설정해주세요!</Text>
          <CustomTextInput placeholder={'프로필 이름'} />
          <Text>나를 한줄로 소개해 보세요!</Text>
          <CustomTextInput placeholder={'한줄 소개 작성'} />
        </View>
      </View>
    </>
  );
}
export default ProfileSettingScreen;
