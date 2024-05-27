import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import {View, Image, Text} from 'react-native';
import ProfileSettingScreen from './ProfileSettingScreen';
import colors from '../constants/colors/colors';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

export default function MainBottomScreen() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  return (
    <View style={{height: '100%'}}>
      <Tab.Navigator
        initialRouteName="메인화면"
        screenOptions={({route}) => ({
          tabBarStyle: {height: 64, paddingBottom: 10},
          tabBarIconStyle: {width: 28, height: 28},
          tabBarLabelStyle: ({focused}) => {
            return {
              //   color: focused ? '#E19E52' : '#E19E52',
              fontSize: 12,
              fontFamily: 'Pretendard',
              fontWeight: '600',
            };
          },
        })}>
        <Tab.Screen
          name="채팅"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerTitleStyle: {
              fontSize: 16,
            },
            headerTitleAlign: 'center',
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#E19E52' : '#C0C0C0',
                  fontSize: 12,
                  fontFamily: 'Pretendard',
                  fontWeight: '600',
                }}>
                채팅
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                style={{width: 25, height: 25}}
                source={
                  focused
                    ? require('../assets/bottom-chat-select.png')
                    : require('../assets/bottom-chat.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="지도"
          component={LoginScreen}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 16,
            },
            headerTitleAlign: 'center',
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#E19E52' : '#C0C0C0',
                  fontSize: 12,
                  fontFamily: 'Pretendard',
                  fontWeight: '600',
                }}>
                지도
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                style={{width: 25, height: 25}}
                source={
                  focused
                    ? require('../assets/bottom-map-select.png')
                    : require('../assets/bottom-map.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="메인화면"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 16,
            },
            headerTitleAlign: 'center',
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#E19E52' : '#C0C0C0',
                  fontSize: 10,
                  fontFamily: 'Pretendard',
                  fontWeight: '600',
                }}>
                홈
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                style={{width: 25, height: 25}}
                source={
                  focused
                    ? require('../assets/bottom-home-select.png')
                    : require('../assets/bottom-home.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="프로필"
          component={ProfileSettingScreen}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 16,
            },
            headerTitleAlign: 'center',
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#E19E52' : '#C0C0C0',
                  fontSize: 10,
                  fontFamily: 'Pretendard',
                  fontWeight: '600',
                }}>
                프로필
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                style={{width: 25, height: 25}}
                source={
                  focused
                    ? require('../assets/bottom-profile-select.png')
                    : require('../assets/bottom-profile.png')
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
