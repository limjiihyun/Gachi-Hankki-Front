import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileSettingScreen from '../screens/ProfileSettingScreen';
import {Image, Text, TouchableOpacity} from 'react-native';
import HeaderStyle from '../styles/HeaderStyle';
import SelectIconScreen from '../screens/SelectIconScreen';
import HomeScreen from '../screens/HomeScreen';
import MainBottomScreen from '../screens/MainBottomScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ChattingRoomListScreen from '../screens/ChattingRoomListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CommentDetailScreen from '../screens/CommentDetail';
import ChatRoomScreen from '../screens/ChatRoomScreen';

export default function MainStackNavigation() {
  const MainStack = createNativeStackNavigator();

  return (
    <>
      <MainStack.Navigator>
        <MainStack.Screen
          name="MainBottomScreen"
          component={MainBottomScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="ProfileSettingScreen"
          component={ProfileSettingScreen}
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
              <Text style={HeaderStyle.headerTitleText}>프로필 설정</Text>
            ),
          })}
        />
        <MainStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
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
              <Text style={HeaderStyle.headerTitleText}>프로필</Text>
            ),
          })}
        />
        <MainStack.Screen
          name="SelectIconScreen"
          component={SelectIconScreen}
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
              <Text style={HeaderStyle.headerTitleText}>
                프로필 아이콘 설정
              </Text>
            ),
          })}
        />
        <MainStack.Screen
          name="HomeScreen"
          component={HomeScreen}
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
              <Text style={HeaderStyle.headerTitleText}>메인화면</Text>
            ),
          })}
        />
        <MainStack.Screen
          name="CreatePostScreen"
          component={CreatePostScreen}
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
              <Text style={HeaderStyle.headerTitleText}>글 작성</Text>
            ),
          })}
        />
        <MainStack.Screen
          name="PostDetailScreen"
          component={PostDetailScreen}
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
              <Text style={HeaderStyle.headerTitleText}>글 보기</Text>
            ),
          })}
        />
        <MainStack.Screen
          name="CommentDetailScreen"
          component={CommentDetailScreen}
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
              <Text style={HeaderStyle.headerTitleText}>프로필 조회</Text>
            ),
          })}
        />
        <MainStack.Screen
          name="ChattingRoomListScreen"
          component={ChattingRoomListScreen}
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
              <Text style={HeaderStyle.headerTitleText}>채팅</Text>
            ),
          })}
        />
        <MainStack.Screen
          name="ChatRoomScreen"
          component={ChatRoomScreen}
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
              <Text style={HeaderStyle.headerTitleText}>채팅</Text>
            ),
          })}
        />
      </MainStack.Navigator>
    </>
  );
}
