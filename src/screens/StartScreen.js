import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import StartScreenStyle from '../styles/StartScreenStyle';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
const StartScreen = ({navigation}) => {
  const StartButton = () => {
    navigation.navigate('AuthStack', {screen: 'LoginScreen'});
  };

  const ProfileBtn = () => {
    navigation.navigate('MainStack', {screen: 'ProfileScreen'});
  };

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
        <BottomBarButton onPress={ProfileBtn} title={'프로필'} />
      </View>
    </View>
  );
};

export default StartScreen;
