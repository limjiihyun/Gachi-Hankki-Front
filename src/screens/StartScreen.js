import React from 'react';
import {Image, Text, View} from 'react-native';
import StartScreenStyle from '../styles/StartScreenStyle';
import BottomBarButton from '../components/AuthStack/BottomBarButton';

const StartScreen = ({navigation}) => {
  const StartButton = () => {
    navigation.navigate('AuthStack', {screen: 'LoginScreen'});
  };

  const MainButton = () => {
    navigation.navigate('MainStack', {screen: 'MainBottomScreen'});
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
      </View>
    </View>
  );
};

export default StartScreen;
