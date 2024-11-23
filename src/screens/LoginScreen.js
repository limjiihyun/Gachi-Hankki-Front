import React, {useState} from 'react';
import {Alert, Image, View} from 'react-native';
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
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import CustomSpinner from '../components/CustomSpinner';
import {CommonActions} from '@react-navigation/native';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (!email || !password) {
      Alert.alert('로그인 오류', '아이디 혹은 비밀번호를 확인하세요');
      setLoading(false);
      return;
    }

    try {
      const fireReturn = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log('Firebase authentication successful:', fireReturn);

      const idToken = await fireReturn.user.getIdToken();
      console.log('ID Token:', idToken);
      const response = await Client.users.login({email, password});

      console.log('몬디', response);
      if (response.status === 200) {
        console.log('POST 요청 성공:', response.data);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        if (accessToken && refreshToken) {
          await setAuthToken({access: accessToken, refresh: refreshToken}); // 토큰을 setAuthToken에 전달
        }
        //setAuthToken(response.data.accessToken);
        try {
          const existingProfileResponse = await Client.users.getProfile();

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
            //navigation.replace('MainStack', {screen: 'MainBottomScreen'});
            navigation.reset({
              index: 0, // The index of the active screen
              routes: [
                {name: 'MainStack', params: {screen: 'MainBottomScreen'}},
              ],
            });
          } else {
            console.log('Unexpected response format');
            navigation.replace('MainStack', {screen: 'SelectIconScreen'});
          }
        } catch (error) {
          console.log(
            'Error checking profile: ',
            error.response?.data || error.message,
          );
          navigation.replace('MainStack', {screen: 'SelectIconScreen'});
        }
      }
    } catch (error) {
      console.log('POST 요청 실패: ??', error.message);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={LoginScreenStyle.container}>
      {loading && (
        <View style={LoginScreenStyle.overlay}>
          <CustomSpinner />
        </View>
      )}

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
        {loading ? null : (
          <BottomBarButton title={'시작하기'} onPress={startBtn} />
        )}
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
