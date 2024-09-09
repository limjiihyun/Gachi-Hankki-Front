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
          const existingProfileResponse = await Client.users.getProfile(); // Replace with actual API call
          console.log('안녕하세용', existingProfileResponse.data);
          if (
            existingProfileResponse &&
            existingProfileResponse.status === 200
          ) {
            console.log('Profile exists, navigating to main screen.');
            // dispatch(
            //   setCharacterImages(
            //     existingProfileResponse.data.profileImageNumber,
            //   ),
            // );
            // dispatch(setProfileNickname(existingProfileResponse.data.nickname));
            // dispatch(setProfileBio(existingProfileResponse.data.bio));
            // dispatch(setDepartment(existingProfileResponse.data.department));
            navigation.navigate('MainStack', {screen: 'MainBottomScreen'});
          }
        } catch (error) {
          console.log('Error checking profile: ', error);
          navigation.navigate('MainStack', {screen: 'ProfileSettingScreen'});
        }
      }
    } catch (error) {
      console.log('POST요청 실패: ', error.message);
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
