import React, {useState} from 'react';
import {Image, View} from 'react-native';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import LoginScreenStyle from '../styles/LoginScreenStyle';
import TextButton from '../components/AuthStack/TextButton';
import colors from '../constants/colors/colors';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import Client from '../data/network/rest/client';
import {setAuthToken} from '../data/network/rest/client/http-client';
import {useDispatch} from 'react-redux';
import {
  setCharacterImages,
  setDepartment,
  setProfileBio,
  setProfileNickname,
} from '../redux/slices/user-slice';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const registerButton = () => {
    navigation.navigate('AuthStack', {screen: 'RegisterScreen'});
  };

  const startBtn = async () => {
    console.log('입력내용: ', email, password);
    try {
      const response = await Client.users.login({
        email: email,
        password: password,
      });
      console.log('몬디');
      if (response.status === 200) {
        console.log('POST 요청 성공:', response.data);
        setAuthToken(response.data.accessToken);
        try {
          const existingProfileResponse = await Client.users.getProfile();
          if (existingProfileResponse && existingProfileResponse.data) {
            console.log('Profile exists, navigating to main screen.');

            // Profile 데이터가 존재할 때 추가 처리
            dispatch(
              setCharacterImages(
                existingProfileResponse.data.profileImageNumber,
              ),
            );
            dispatch(setProfileNickname(existingProfileResponse.data.nickname));
            dispatch(setProfileBio(existingProfileResponse.data.bio));
            dispatch(setDepartment(existingProfileResponse.data.department));

            navigation.navigate('MainStack', {screen: 'MainBottomScreen'});
          } else {
            // Profile이 없을 경우 처리
            console.log(
              'Profile does not exist, navigating to SelectIconScreen.',
            );
            navigation.navigate('MainStack', {screen: 'SelectIconScreen'});
          }
        } catch (error) {
          console.log(
            'Error checking profile: ',
            error.response?.data || error.message,
          );
          navigation.navigate('MainStack', {screen: 'SelectIconScreen'});
        }
      }
    } catch (error) {
      console.log('POST요청 실패: ??', error.message);
    }
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
        <CustomTextInput
          placeholder={'아이디'}
          inputValue={email}
          onChangeText={handleEmailChange}
        />
        <CustomTextInput
          placeholder={'비밀번호'}
          secureTextEntry={true}
          inputValue={password}
          onChangeText={handlePasswordChange}
        />
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
