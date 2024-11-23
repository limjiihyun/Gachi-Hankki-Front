import React from 'react';
import {Image, Text, View} from 'react-native';
import StartScreenStyle from '../styles/StartScreenStyle';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import {useFocusEffect} from '@react-navigation/native';
import Client from '../data/network/rest/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {defaultsHeadersCommon} from '../data/network/rest/client/http-client';

const StartScreen = ({navigation}) => {
  const StartButton = () => {
    navigation.replace('AuthStack', {screen: 'LoginScreen'});
  };

  // AsyncStorage에 AccessToken 을 확인 후,
  // 있는경우, getProfile 이 있으면 main 없으면 seleIconscreen
  // 현재 refresh 가 안되어 유효 토큰이 아님
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const accessToken = await AsyncStorage.getItem('AccessToken');
        if (!accessToken) {
          navigation.replace('AuthStack', {screen: 'LoginScreen'});
          return;
        }
        try {
          await defaultsHeadersCommon(accessToken);
          console.log('Before fetching profile');
          const existingProfileResponse = await Client.users.getProfile();
          console.log('After fetching profile');

          if (existingProfileResponse.status === 404) {
            console.log('No profile found, navigating to SelectIconScreen.');
            navigation.replace('MainStack', {screen: 'SelectIconScreen'});
          } else if (
            existingProfileResponse.status === 200 &&
            existingProfileResponse.data
          ) {
            console.log('Profile exists, navigating to main screen.');
            dispatch(
              setCharacterImages(
                existingProfileResponse.data.profileImageNumber,
              ),
            );
            dispatch(setProfileNickname(existingProfileResponse.data.nickname));
            dispatch(setProfileBio(existingProfileResponse.data.bio));
            dispatch(setDepartment(existingProfileResponse.data.department));
            navigation.replace('MainStack', {screen: 'MainBottomScreen'});
          } else {
            console.log('Unexpected response format');
            navigation.replace('MainStack', {screen: 'SelectIconScreen'});
          }
        } catch (error) {
          navigation.replace('AuthStack', {screen: 'LoginScreen'});
        }
      };

      fetchData();
    }, []),
  );

  return (
    <View style={StartScreenStyle.Container}>
      <View style={StartScreenStyle.LogoContainer}>
        <View style={StartScreenStyle.ImageContainer}>
          <Image
            source={require('../assets/main-logo.png')}
            style={StartScreenStyle.MainLogoView}
          />
          <Text>같이 한끼 하실래요?</Text>
        </View>
        <BottomBarButton onPress={StartButton} title={'시작하기'} />
      </View>
    </View>
  );
};

export default StartScreen;
