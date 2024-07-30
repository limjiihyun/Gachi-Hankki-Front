import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ProfileSettingStyle from '../styles/ProfileSettingStyle';
import {useDispatch, useSelector} from 'react-redux';
import CHARACTER_IMAGE from '../constants/data/character-image';
import {setIntroduce, setProfileName} from '../redux/slices/user-slice';
import colors from '../constants/colors/colors';

function ProfileScreen({navigation}) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [hi, setHi] = useState('');

  const editProfileImageBtn = () => {
    navigation.navigate('MainStack', {screen: 'SelectIconScreen'});
  };
  const userSlice = useSelector(state => state.user);

  const selectedImage = CHARACTER_IMAGE.find(
    item => item.id === userSlice.characterImages.id,
  );

  const imageSource = selectedImage
    ? selectedImage.src
    : require('../assets/character/1.png');

  const handleStartButtonPress = () => {
    console.log('Dispatching Profile Name:', name);
    console.log('Dispatching Introduction:', hi);
    dispatch(setProfileName(name));
    dispatch(setIntroduce(hi));
  };

  const userSliceAll = useSelector(state => state.user);
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.brown,
                marginTop: 25,
              }}>
              정보통신
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.grey010,
                marginTop: 15,
              }}>
              {userSliceAll.profileName}
            </Text>
            <View
              style={{
                width: '100%',
                height: 130,
                backgroundColor: '#EFE4D8',
                borderRadius: 12,
                marginTop: 20,
                paddingHorizontal: 16,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.grey700,
                  marginTop: 15,
                }}>
                한줄 소개
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: colors.brown,
                  marginTop: 15,
                }}>
                {userSliceAll.introduce}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: colors.grey300,
                marginTop: 25,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={require('../assets/profile-edit.png')}
                  style={{width: 35, height: 35}}
                />
                <Text style={{marginLeft: 5, color: colors.grey010}}>
                  프로필 수정
                </Text>
              </View>
              <Image
                source={require('../assets/right-arrow-button.png')}
                style={{width: 12, height: 17}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
