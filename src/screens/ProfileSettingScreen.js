import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import ProfileSettingStyle from '../styles/ProfileSettingStyle';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import {useSelector} from 'react-redux';
import CHARACTER_IMAGE from '../constants/data/character-image';

function ProfileSettingScreen({navigation}) {
  const editProfileImageBtn = () => {
    navigation.navigate('MainStack', {screen: 'SelectIconScreen'});
  };
  const userSlice = useSelector(state => state.user.characterImages);
  const selectedImage = CHARACTER_IMAGE.find(item => item.id === userSlice.id);

  const imageSource = selectedImage
    ? selectedImage.src
    : require('../assets/character/1.png');

  return (
    <View style={ProfileSettingStyle.container}>
      <View style={ProfileSettingStyle.imageContainer}>
        <View style={ProfileSettingStyle.imageBorder}>
          <TouchableOpacity onPress={editProfileImageBtn}>
            <Image
              style={ProfileSettingStyle.characterImage}
              source={imageSource}
            />
            <Image
              style={ProfileSettingStyle.editImage}
              source={require('../assets/profile-edit.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={ProfileSettingStyle.departmentText}>정보통신</Text>
      </View>
      <View style={ProfileSettingStyle.contentContainer}>
        <Text style={ProfileSettingStyle.titleText}>
          프로필 이름을 설정해주세요!
        </Text>
        <CustomTextInput placeholder={'프로필 이름'} />
        <Text style={ProfileSettingStyle.titleText}>
          나를 한줄로 소개해 보세요!
        </Text>
        <CustomTextInput placeholder={'한줄 소개 작성'} />
      </View>
      <View style={ProfileSettingStyle.bottomBarContainer}>
        <BottomBarButton title={'시작하기'} />
      </View>
    </View>
  );
}

export default ProfileSettingScreen;
