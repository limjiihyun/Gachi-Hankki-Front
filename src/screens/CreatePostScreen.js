import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import colors from '../constants/colors/colors';
import CreatePostStyle from '../styles/CreatePostStyle';
import DatePicker from 'react-native-date-picker';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import Client from '../data/network/rest/client';

function CreatePostScreen({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [dateSelectOpen, setDateSelectOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeSelectOpen, setTimeSelectOpen] = useState(false);
  const [restaurant, setRestaurant] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [postContent, setPostContent] = useState('');
  const [nickName, setNickName] = useState('');
  const [postTitle, setPostTitle] = useState('');

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
        console.log('Selected image URI: ', response.assets[0].uri);
      }
    });
  };

  const formatDate = date => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = time => {
    return time.toTimeString().split(' ')[0].slice(0, 5);
  };

  const submitBtn = async () => {
    navigation.navigate('MainStack', {screen: 'MainBottomScreen'});
    
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {id: 1, label: '더치페이'},
    {id: 2, label: '사주세요'},
    {id: 3, label: '사드립니다'},
  ];

  return (
    <ScrollView style={CreatePostStyle.container}>
      <View style={CreatePostStyle.horizontalContainer}>
        <TouchableOpacity
          onPress={selectImage}
          style={CreatePostStyle.imageUploadIconContainer}>
          {selectedImage ? (
            <View style={CreatePostStyle.imageRowContainer}>
              <View style={CreatePostStyle.uploadImageContainer}>
                <Image
                  source={require('../assets/upload-food-image-icon.png')}
                  style={CreatePostStyle.uploadIcon}
                />
              </View>
              <Image
                source={{uri: selectedImage}}
                style={CreatePostStyle.image}
              />
            </View>
          ) : (
            <View style={CreatePostStyle.uploadImageContainer}>
              <Image
                source={require('../assets/upload-food-image-icon.png')}
                style={CreatePostStyle.uploadIcon}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text style={CreatePostStyle.titleText}>한끼 하고 싶은 곳</Text>
        <CustomTextInput
          placeholder={'음식점 혹은 메뉴를 입력하세요.'}
          value={restaurant}
          onChangeText={setRestaurant}
        />
        <Text style={CreatePostStyle.titleText}>원하는 날짜</Text>
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
          minimumDate={new Date()}
          onConfirm={date => {
            setDateSelectOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setDateSelectOpen(false);
          }}
        />
        <Text style={CreatePostStyle.titleText}>원하는 시간대</Text>
        <TouchableOpacity
          style={CreatePostStyle.dateImageContainer}
          onPress={() => setTimeSelectOpen(true)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/date-range.png')}
              style={CreatePostStyle.dateImage}
            />
            <Text style={CreatePostStyle.dateText}>{formatTime(time)}</Text>
          </View>
        </TouchableOpacity>
        <DatePicker
          modal
          open={timeSelectOpen}
          date={time}
          mode="time"
          onConfirm={time => {
            setTimeSelectOpen(false);
            setTime(time);
          }}
          onCancel={() => {
            setTimeSelectOpen(false);
          }}
        />
        <Text style={CreatePostStyle.titleText}>모집 명수</Text>
        <CustomTextInput
          placeholder={'모집하려는 인원을 입력해주세요'}
          value={numberOfPeople}
          onChangeText={setNumberOfPeople}
          keyboardType={'numeric'}
        />
        <Text style={CreatePostStyle.titleText}>원하는 정산방식</Text>
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
                onPress={() => setSelectedOption(option.id)}
                style={[
                  CreatePostStyle.threeColumnContainer,
                  {borderColor: isSelected ? colors.brown : colors.grey400},
                ]}>
                <Text
                  style={{color: isSelected ? colors.brown : colors.grey400}}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={CreatePostStyle.titleText}>음식점 소개</Text>
        <CustomTextInput
          placeholder={'음식점에 대한 소개를 입력하세요.'}
          value={restaurantDescription}
          onChangeText={setRestaurantDescription}
        />
        <Text style={CreatePostStyle.titleText}>포스트 내용</Text>
        <CustomTextInput
          placeholder={'포스트 내용을 입력하세요.'}
          value={postContent}
          onChangeText={setPostContent}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 20,
        }}>
        <BottomBarButton title={'작성하기'} onPress={submitBtn} />
      </View>
    </ScrollView>
  );
}

export default CreatePostScreen;
