import React from 'react';
import {Image, View} from 'react-native';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import LoginScreenStyle from '../styles/LoginScreenStyle';
import TextButton from '../components/AuthStack/TextButton';
import colors from '../constants/colors/colors';
import BottomBarButton from '../components/AuthStack/BottomBarButton';

function LoginScreen({navigation}) {
  const registerButton = () => {
    navigation.navigate('AuthStack', {screen: 'RegisterScreen'});
  };

  const startBtn = () => {
    navigation.navigate('MainStack', {screen: 'ProfileSettingScreen'});
  };

  return (
    <View style={LoginScreenStyle.container}>
      <View style={LoginScreenStyle.loginContainer}>
        <View style={LoginScreenStyle.imageContainer}>
          <Image
            source={require('../assets/main-logo.png')}
            style={LoginScreenStyle.mainLogoImage}
          />
        </View>
        <CustomTextInput placeholder={'아이디'} />
        <CustomTextInput placeholder={'비밀번호'} secureTextEntry={true} />
        <BottomBarButton title={'시작하기'} onPress={startBtn} />
        <View style={LoginScreenStyle.rowContainer}>
          <TextButton title={'비밀번호 찾기'} />
          <View style={LoginScreenStyle.line} />
          <TextButton
            title={'회원가입'}
            textColor={colors.brown}
            onPress={registerButton}
          />  
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
