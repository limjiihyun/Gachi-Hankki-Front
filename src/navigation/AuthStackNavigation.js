import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {Image, TouchableOpacity, Text} from 'react-native';
import HeaderStyle from '../styles/HeaderStyle';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterSuccessScreen from '../screens/RegisterSuccessScreen';

export default function AuthStackNavigation() {
  const AuthStack = createNativeStackNavigator();

  return (
    <>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({navigation}) => ({
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={HeaderStyle.goBackButtonTouch}
                onPress={() => navigation.goBack()}>
                <Image
                  style={HeaderStyle.headerImage}
                  source={require('../assets/header-left-back-button.png')}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Text style={HeaderStyle.headerTitleText}>시작하기</Text>
            ),
          })}
        />
        <AuthStack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={({navigation}) => ({
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={HeaderStyle.goBackButtonTouch}
                onPress={() => navigation.goBack()}>
                <Image
                  style={HeaderStyle.headerImage}
                  source={require('../assets/header-left-back-button.png')}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Text style={HeaderStyle.headerTitleText}>회원가입</Text>
            ),
          })}
        />
        <AuthStack.Screen
          name="RegisterSuccessScreen"
          component={RegisterSuccessScreen}
          options={({navigation}) => ({
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={HeaderStyle.goBackButtonTouch}
                onPress={() => navigation.goBack()}>
                <Image
                  style={HeaderStyle.headerImage}
                  source={require('../assets/header-left-back-button.png')}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Text style={HeaderStyle.headerTitleText}>회원가입성공</Text>
            ),
          })}
        />
      </AuthStack.Navigator>
    </>
  );
}
