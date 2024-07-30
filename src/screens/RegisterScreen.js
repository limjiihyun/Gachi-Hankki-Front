import React, {useState} from 'react';
import {
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import RegisterScreenStyle from '../styles/RegisterScreenStyle';
import EssentialInputWithTitle from '../components/AuthStack/EssentialTextInputWithTitle';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import BottomBarButton from '../components/AuthStack/BottomBarButton';

function RegisterScreen({navigation}) {
  const [selected, setSelected] = useState(false);
  const [id, setId] = useState('');

  const handleImagePress = () => {
    setSelected(!selected);
  };

  const handleIdChange = text => {
    setId(text);
  };

  const registerSuccessBtn = () => {
    navigation.navigate('AuthStack', {screen: 'RegisterSuccessScreen'});
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={RegisterScreenStyle.container}>
          <View style={RegisterScreenStyle.contentContainer}>
            <Text style={RegisterScreenStyle.mainHeaderText}>
              가치한끼, 더 나은 식사 동행을 찾다.
            </Text>
            <Text style={{marginTop: 20}}>지금 회원가입 하세요!</Text>
            <Text style={{marginTop: 16}}>
              @hanbat.ac.kr로 가입된 이메일만 인증번호를 받을 수 있습니다.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <EssentialInputWithTitle
                title={'아이디'}
                placeholder={'아이디(한밭대 구글이메일)'}
                onChange={handleIdChange}
              />
            </View>
            <CustomTextInput placeholder={'인증번호'} />
            <EssentialInputWithTitle
              title={'비밀번호'}
              placeholder={'비밀번호'}
              secureTextEntry={true}
            />
            <CustomTextInput placeholder={'비밀번호 확인'} />
            <EssentialInputWithTitle title={'이름'} placeholder={'이름'} />
            <EssentialInputWithTitle
              title={'학과(프로필에 표기됩니다.)'}
              placeholder={'학과(프로필에 표기됩니다.)'}
            />
            <EssentialInputWithTitle
              title={'생년월일'}
              placeholder={'생년월일'}
            />
            <EssentialInputWithTitle title={'목적'} placeholder={'목적'} />
            <EssentialInputWithTitle title={'경로'} placeholder={'경로'} />
            <View style={RegisterScreenStyle.agreeContainer}>
              <TouchableOpacity onPress={handleImagePress}>
                <Image
                  style={{width: 30, height: 30}}
                  source={
                    selected
                      ? require('../assets/check-radio-blue-button.png')
                      : require('../assets/checkbox-radio-button.png')
                  }
                />
              </TouchableOpacity>
              <Text style={{width: '85%', marginHorizontal: 5}}>
                [필수] 저는 개인정보 처리 방침에 따른 개인정보 수집 및 활용에
                동의합니다.
              </Text>
              <Image
                style={{width: 6, height: 11}}
                source={require('../assets/right-arrow-button.png')}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <BottomBarButton title={'계정등록'} onPress={registerSuccessBtn} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen;
