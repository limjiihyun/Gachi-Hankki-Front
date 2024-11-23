import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import AuthStackNavigation from './AuthStackNavigation';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
import {Image, TouchableOpacity} from 'react-native';
import MainStackNavigation from './MainStackNavigation';

export const navigationRef = createNavigationContainerRef();
const AppStack = createNativeStackNavigator();

export function navigate(name, params) {
  if (navigationRef.current.isReady()) {
    navigationRef.current.navigate(name, params);
  } else {
  }
}

export default function AppStackNavigation() {
  const navigation = useNavigation();

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="AuthStack"
        component={AuthStackNavigation}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="MainStack"
        component={MainStackNavigation}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
}
