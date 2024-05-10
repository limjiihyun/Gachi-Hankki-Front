import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {Image, TouchableOpacity, Text} from 'react-native';
import HeaderStyle from '../styles/HeaderStyle';

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
              <TouchableOpacity onPress={() => navigation.goBack()}>
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
      </AuthStack.Navigator>
    </>
  );
}
