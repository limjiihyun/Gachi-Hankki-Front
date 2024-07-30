import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ProfileSettingStyle from '../styles/ProfileSettingStyle';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import {useDispatch, useSelector} from 'react-redux';
import CHARACTER_IMAGE from '../constants/data/character-image';
import {
  setIntroduce,
  setProfileName,
} from '../redux/slices/user-slice';

function ProfileSettingScreen({navigation}) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [hi, setHi] = useState('');

  const editProfileImageBtn = () => {
    navigation.navigate('MainStack', {screen: 'SelectIconScreen'});
  };
  const userSlice = useSelector(state => state.user.characterImages);
  console.log('??', userSlice);
  const selectedImage = CHARACTER_IMAGE.find(item => item.id === userSlice.id);

  const imageSource = selectedImage
    ? selectedImage.src
    : require('../assets/character/1.png');

  const handleStartButtonPress = () => {
    dispatch(setProfileName(name));
    dispatch(setIntroduce(hi));
    navigation.navigate('MainStack', {screen: 'MainBottomScreen'});
  };
  const userSliceAll = useSelector(state => state.user);
  console.log('??222', userSliceAll.characterImages.id);

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
            <CustomTextInput
              placeholder={'프로필 이름'}
              onChangeText={setName}
            />
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
