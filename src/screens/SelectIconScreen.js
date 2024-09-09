import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity, FlatList} from 'react-native';
import SelectIconStyle from '../styles/SelectIconStyle';
import {useDispatch} from 'react-redux';
import {setCharacterImages} from '../redux/slices/user-slice';
import CHARACTER_IMAGE from '../constants/data/character-image';

function SelectIconScreen({navigation}) {
  const selectCharacterIcon = icon => {
    navigation.navigate('MainStack', {
      screen: 'ProfileSettingScreen',
      params: {selectedIcon: icon},
    });
  };

  const renderShapeItem = ({item}) => {
    if (parseInt(item.id) >= 1 && parseInt(item.id) <= 7) {
      return (
        <TouchableOpacity
          style={SelectIconStyle.iconContainer}
          onPress={() => selectCharacterIcon(item)}>
          <Image source={item.src} style={SelectIconStyle.icon} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  const renderFoodItem = ({item}) => {
    if (parseInt(item.id) >= 8 && parseInt(item.id) <= 16) {
      return (
        <TouchableOpacity
          style={SelectIconStyle.iconContainer}
          onPress={() => selectCharacterIcon(item)}>
          <Image source={item.src} style={SelectIconStyle.icon} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <View style={SelectIconStyle.container}>
        <View>
          <Text style={SelectIconStyle.titleText}>대표 아이콘</Text>
          <FlatList
            data={CHARACTER_IMAGE}
            renderItem={renderShapeItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={SelectIconStyle.flatListContentContainer}
          />
        </View>
        <View>
          <Text style={SelectIconStyle.titleText}>식재료 아이콘</Text>
          <FlatList
            data={CHARACTER_IMAGE}
            renderItem={renderFoodItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={SelectIconStyle.flatListContentContainer}
          />
        </View>
      </View>
    </>
  );
}
export default SelectIconScreen;
