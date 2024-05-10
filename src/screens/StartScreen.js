import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import StartScreenStyle from '../styles/StartScreenStyle';
const StartScreen = ({ navigation }) => {
  const StartButton = () => {
    navigation.navigate('AuthStack', { screen: 'LoginScreen' });
  };

  return (
    <View style={StartScreenStyle.Container}>
      <View style={StartScreenStyle.LogoContainer}>
        <View style={StartScreenStyle.ImageContainer}>
          <Image source={require('../assets/main-logo.png')} style={StartScreenStyle.MainLogoView} />
          <Text>같이 한끼 하실래요?</Text>
        </View>
        <TouchableOpacity onPress={StartButton} style={StartScreenStyle.StartButton}>
          <Text style={StartScreenStyle.StartButtonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartScreen;