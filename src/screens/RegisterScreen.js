import React, {useState} from 'react';
import {
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import RegisterScreenStyle from '../styles/RegisterScreenStyle';
import EssentialInputWithTitle from '../components/AuthStack/EssentialTextInputWithTitle';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import CreatePostStyle from '../styles/CreatePostStyle';
import DatePicker from 'react-native-date-picker';
import TitleWithRequiredText from '../components/AuthStack/TitleWithRequiredText';
import Client from '../data/network/rest/client';
import CustomShortTextInput from '../components/AuthStack/CustomShortTextInput';
import colors from '../constants/colors/colors';
import CustomAlert from '../components/CustomAlert';

function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState(new Date());
  const [purpose, setPurpose] = useState('');
  const [route, setRoute] = useState('');
  const [dateSelectOpen, setDateSelectOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selected, setSelected] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const options = [
    {id: 1, label: '남자'},
    {id: 2, label: '여자'},
  ];

  const handleImagePress = () => {
    setSelected(!selected);
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handleVerificationCode = text => {
    setVerificationCode(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
  };

  const handleNameChange = text => {
    setName(text);
  };

  const handleGenderChange = options => {
    setSelectedOption(options.id);
    setGender(options.label);
  };

  const handleDepartmentChange = text => {
    setDepartment(text);
  };

  const handlePurposeChange = text => {
    setPurpose(text);
  };

  const handleRouteChange = text => {
    setRoute(text);
  };

  const formatDate = date => {
    return date.toISOString().split('T')[0];
  };

  const handleSendCode = async () => {
    setLoading(true); // 로딩 상태 시작
    try {
      const response = await Client.users.emailSendCode({
        email: email,
      });
      if (response.status === 200) {
        setAlertMessage('이메일이 성공적으로 전송되었습니다!');
        setModalVisible(true);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setAlertMessage('이미 가입된 이메일입니다.');
        } else if (error.response.status === 422) {
          setAlertMessage('한밭대 이메일 주소를 입력하세요.');
        } else {
          setAlertMessage(
            '이메일 전송에 실패했습니다. 이메일 형식이 맞는지 확인해주세요.',
          );
        }
      } else {
        setAlertMessage('네트워크 오류가 발생했습니다.');
      }
      setModalVisible(true);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  const registerSuccessBtn = async () => {
    if (
      !email ||
      !verificationCode ||
      !password ||
      !confirmPassword ||
      !name ||
      !gender ||
      !department ||
      !date ||
      !purpose ||
      !route ||
      !selected
    ) {
      setAlertMessage('모든 필드를 채워주세요.');
      setModalVisible(true);
    } else {
      if (password.length < 6) {
        setAlertMessage('비밀번호는 최소 6자 이상이어야 합니다.');
        setModalVisible(true);
        return;
      }

      if (password !== confirmPassword) {
        setAlertMessage('비밀번호가 일치하지 않습니다.');
        setModalVisible(true);
        return;
      }

      try {
        const response = await Client.users.signUp({
          email: email,
          verificationCode: verificationCode,
          password: password,
          confirmPassword: confirmPassword,
          name: name,
          gender: gender,
          department: department,
          birthdate: formatDate(date),
          purpose: purpose,
          path: '/some/path',
        });
        if (response.status === 200) {
          console.log('register성공', response.data);
          navigation.navigate('AuthStack', {screen: 'RegisterSuccessScreen'});
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            setAlertMessage('이미 가입된 이메일입니다.');
          } else if (error.response.status === 422) {
            setAlertMessage('한밭대 이메일 주소를 입력하세요.');
          }
        } else {
          setAlertMessage('네트워크 오류가 발생했습니다.');
        }
        setModalVisible(true);
      }
    }
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
              @edu.hanbat.ac.kr로 가입된 이메일만 인증번호를 받을 수 있습니다.
            </Text>
            <TitleWithRequiredText title={'아이디'} />
            <View style={{flexDirection: 'row', marginRight: 16}}>
              <CustomShortTextInput
                title={'아이디'}
                placeholder={'아이디(한밭대 구글이메일)'}
                value={email}
                onChangeText={handleEmailChange}
              />
              <TouchableOpacity
                style={RegisterScreenStyle.button}
                onPress={handleSendCode}>
                <Text style={RegisterScreenStyle.buttonText}>전송</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginRight: 16}}>
              <CustomShortTextInput
                title={'인증번호'}
                placeholder={'인증번호'}
                value={verificationCode}
                onChangeText={handleVerificationCode}
              />
              <TouchableOpacity
                style={RegisterScreenStyle.button}
                onPress={handleVerificationCode}>
                <Text style={RegisterScreenStyle.buttonText}>확인</Text>
              </TouchableOpacity>
            </View>
            <EssentialInputWithTitle
              title={'비밀번호'}
              placeholder={'비밀번호'}
              secureTextEntry={true}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <CustomTextInput
              placeholder={'비밀번호 확인'}
              inputValue={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            <EssentialInputWithTitle
              title={'이름'}
              placeholder={'이름'}
              value={name}
              onChangeText={handleNameChange}
            />
            <TitleWithRequiredText title={'성별'} />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              {options.map(option => {
                const isSelected = selectedOption === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => handleGenderChange(option)}
                    style={[
                      RegisterScreenStyle.twoColumnContainer,
                      {borderColor: isSelected ? colors.brown : colors.grey400},
                    ]}>
                    <Text
                      style={{
                        color: isSelected ? colors.brown : colors.grey400,
                      }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <EssentialInputWithTitle
              title={'학과(프로필에 표기됩니다.)'}
              placeholder={'학과(프로필에 표기됩니다.)'}
              value={department}
              onChangeText={handleDepartmentChange}
            />
            <TitleWithRequiredText title={'생년월일'} />
            <TouchableOpacity
              style={CreatePostStyle.dateImageContainer}
              onPress={() => setDateSelectOpen(true)}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/date-range.png')}
                  style={CreatePostStyle.dateImage}
                />
                <Text style={CreatePostStyle.dateText}>{formatDate(date)}</Text>
              </View>
            </TouchableOpacity>
            <DatePicker
              modal
              open={dateSelectOpen}
              date={date}
              mode="date"
              onConfirm={date => {
                setDateSelectOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setDateSelectOpen(false);
              }}
            />
            <EssentialInputWithTitle
              title={'목적'}
              placeholder={'목적'}
              value={purpose}
              onChangeText={handlePurposeChange}
            />
            <EssentialInputWithTitle
              title={'경로'}
              placeholder={'경로'}
              value={route}
              onChangeText={handleRouteChange}
            />
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
        <CustomAlert
          message={alertMessage}
          isVisible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
            setAlertMessage('');
          }}
        />
      </ScrollView>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)', // 반투명한 배경으로 비활성화 효과
          }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </SafeAreaView>
  );
}

export default RegisterScreen;
