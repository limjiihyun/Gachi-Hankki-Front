import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import LoginScreenStyle from '../styles/LoginScreenStyle';
import BrownBarButton from '../components/AuthStack/BottomBarButton';
import TextButton from '../components/AuthStack/TextButton';
import colors from '../constants/colors/colors';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import HomeStyle from '../styles/HomeStyle';

function HomeScreen({navigation}) {
  const CreatePost = () => {
    navigation.navigate('MainStack', {screen: 'CreatePostScreen'});
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  return (
    <View style={HomeStyle.container}>
      <View
        style={{
          width: '100%',
          height: 40,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingLeft: 10,
        }}>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={{
            width: 100,
            height: 38,
            backgroundColor: colors.brown,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginRight: '3%',
          }}>
          <Image
            source={require('../assets/array-image.png')}
            style={{width: 17, height: 13}}
          />
          <Text style={styles.buttonText}>{selectedOption}</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => selectOption('최신순')}>
              <Text style={styles.dropdownText}>최신순</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => selectOption('인기순')}>
              <Text style={styles.dropdownText}>인기순</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={HomeStyle.emptyImageContainer}>
        <Image
          source={require('../assets/home-empty.png')}
          style={HomeStyle.emptyImage}
        />
        <Text>현재 등록된 내용이 없습니다.</Text>
        <Text>게시물을 등록해보세요!</Text>
      </View>
      <TouchableOpacity
        onPress={CreatePost}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 50,
          height: 50,
          backgroundColor: colors.brown,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 28,
        }}>
        <Image source={require('../assets/icon-plus.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  button: {
    width: 100,
    height: 38,
    backgroundColor: colors.brown,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: '3%',
  },
  image: {
    width: 17,
    height: 13,
  },
  buttonText: {
    color: colors.white,
    marginLeft: 15,
    fontWeight: '400',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 10,
    width: 100,
    backgroundColor: colors.brown,
    borderRadius: 8,
    zIndex: 1, // Ensure dropdown is above other content
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: colors.white,
  },
  floatingButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 90,
    height: 90,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
