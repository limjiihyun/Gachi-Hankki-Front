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

function ProfileSettingScreen({navigation, route}) {
  const userSlice = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(userSlice.profileNickname || '');
  const [hi, setHi] = useState('');
  const {selectedIcon} = route.params;
  const editProfileImageBtn = () => {
    navigation.navigate('MainStack', {screen: 'SelectIconScreen'});
  };
  const navigationSourceSlice = useSelector(
    state => state.navigationSource.profileSettingNavigation,
  );

  const selectedImage = CHARACTER_IMAGE.find(
    item => item.id === selectedIcon.id,
  );

  const imageSource = selectedImage
    ? selectedImage.src
    : require('../assets/character/1.png');

  const handleStartButtonPress = async () => {
    console.log('프로필 정보:', name, hi, imageSource);

    try {
      let response;

      if (navigationSourceSlice) {
        // navigationSourceSlice가 true일 때 patchProfile 호출
        let responseBio = await Client.users.patchProfileBio({
          bio: hi,
        });
        let responseImage = await Client.users.patchProfileImage({
          profileImageNumber: imageSource,
        });
        console.log(
          'Profile updated successfully:',
          responseBio,
          responseImage,
        );
      } else {
        // navigationSourceSlice가 false일 때 createProfile 호출
        response = await Client.users.createProfile({
          nickname: name,
          bio: hi,
          profileImageNumber: imageSource,
        });
        console.log('Profile created successfully:', response);
      }

      // 응답이 있는지 확인
      if (response) {
        console.log('Response data:', response.data);
      }

      // Redux state 업데이트
      dispatch(setCharacterImages(imageSource));
      dispatch(setProfileNickname(name));
      dispatch(setProfileBio(hi));

      // 메인 화면으로 이동
      navigation.navigate('MainStack', {
        screen: 'MainBottomScreen',
        params: {refresh: true},
      });
    } catch (error) {
      console.log('Error config:', error);
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
                  value={name}
                  onChangeText={setName}
                />
              </>
            )}
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
