import React from 'react';
import {Image, Text, View} from 'react-native';
import RegisterSuccessStyle from '../styles/RegisterSuccessStyle';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import colors from '../constants/colors/colors';

function RegisterSuccessScreen({navigation}) {
  const loginBtn = () => {
    navigation.navigate('AuthStack', {screen: 'LoginScreen'});
  };
  return (
    <>
      <View style={RegisterSuccessStyle.container}>
        <Image
          style={RegisterSuccessStyle.imageContainer}
          source={require('../assets/register-success-img.png')}
        />
        <Text style={RegisterSuccessStyle.mainText}>회원가입 완료</Text>
        <Text style={RegisterSuccessStyle.text1}>프로필을 설정하고,</Text>
        <Text style={RegisterSuccessStyle.text2}>밥 친구를 찾아보세요!</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: colors.white,
          height: '15%',
        }}>
        <BottomBarButton title={'로그인 하러가기'} onPress={loginBtn} />
      </View>
    </>
  );
}

export default RegisterSuccessScreen;
