import React, {useEffect, useState} from 'react';
import {Image, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ProfileSettingStyle from '../styles/ProfileSettingStyle';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import {useDispatch, useSelector} from 'react-redux';
import CHARACTER_IMAGE from '../constants/data/character-image';
import {
  setCharacterImages,
  setIntroduce,
  setProfileBio,
  setProfileName,
  setProfileNickname,
} from '../redux/slices/user-slice';
import Client from '../data/network/rest/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileSettingScreen({navigation, route}) {
  const userSlice = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(userSlice.profileNickname || ''); // Default to profileNickname if available
  const [hi, setHi] = useState('');
  const {selectedIcon} = route.params;
  console.log('안녕', name);
  const editProfileImageBtn = () => {
    navigation.navigate('MainStack', {screen: 'SelectIconScreen'});
  };
  const navigationSourceSlice = useSelector(
    state => state.navigationSource.profileSettingNavigation,
  ); // Get navigation state from Redux

  const selectedImage = CHARACTER_IMAGE.find(
    item => item.id === selectedIcon.id,
  );

  const imageSource = selectedImage
    ? selectedImage.src
    : require('../assets/character/1.png');

  // handleStartButtonPress에서 createProfile 호출
  const handleStartButtonPress = async () => {
    console.log('프로필 정보:', name, hi, imageSource);

    try {
      const response = await Client.users.createProfile({
        nickname: name,
        bio: hi,
        profileImageNumber: imageSource,
      });

      // 응답이 있는지 확인
      console.log('Profile sent successfully:', response);
      if (response) {
        console.log('Response data:', response.data); // 데이터가 있는 경우
      }

      // Redux state 업데이트
      dispatch(setCharacterImages(imageSource));
      dispatch(setProfileNickname(name));
      dispatch(setProfileBio(hi));
      navigation.navigate('MainStack', {screen: 'MainBottomScreen'});
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request data:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={ProfileSettingStyle.container}>
          <View style={ProfileSettingStyle.imageContainer}>
            <View style={ProfileSettingStyle.imageBorder}>
              <TouchableOpacity onPress={editProfileImageBtn}>
                <Image
                  style={ProfileSettingStyle.characterImage}
                  source={selectedIcon.src}
                />
                <Image
                  style={ProfileSettingStyle.editImage}
                  source={require('../assets/profile-edit.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={ProfileSettingStyle.departmentText}>
              {userSlice.department}
            </Text>
          </View>
          <View style={ProfileSettingStyle.contentContainer}>
            {navigationSourceSlice ? (
              <>
                <Text style={ProfileSettingStyle.titleText}>
                  닉네임 (수정이 불가합니다.)
                </Text>
                <Text style={ProfileSettingStyle.nameText}>
                  {userSlice.profileNickname}
                </Text>
              </>
            ) : (
              <>
                <Text style={ProfileSettingStyle.titleText}>
                  프로필 이름을 설정해주세요!
                </Text>
                <CustomTextInput
                  placeholder={'프로필 이름'}
                  value={name} // Set the initial value as the profileNickname
                  onChangeText={setName} // Update state as user types
                />
              </>
            )}
            {/* <Text style={ProfileSettingStyle.titleText}>
              프로필 이름을 설정해주세요!
            </Text>
            <CustomTextInput
              placeholder={'프로필 이름'}
              onChangeText={setName}
            /> */}
            <Text style={ProfileSettingStyle.titleText}>
              나를 한줄로 소개해 보세요!
            </Text>
            <CustomTextInput
              placeholder={'한줄 소개 작성'}
              onChangeText={setHi}
            />
          </View>
          <View style={ProfileSettingStyle.bottomBarContainer}>
            <BottomBarButton
              title={'시작하기'}
              onPress={handleStartButtonPress}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ProfileSettingScreen;
