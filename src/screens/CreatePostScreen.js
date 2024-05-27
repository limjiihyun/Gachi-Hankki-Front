import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import colors from '../constants/colors/colors';
import CreatePostStyle from '../styles/CreatePostStyle';
import DatePicker from 'react-native-date-picker';

function CreatePostScreen({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [dateSelectOpen, setDateSelectOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeSelectOpen, setTimeSelectOpen] = useState(false);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
        console.log('ㅎㅇ', response.assets[0].uri);
      }
    });
  };
  const formatDate = date => {
    return date.toLocaleDateString();
  };

  const formatTime = time => {
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };
  return (
    <View style={CreatePostStyle.container}>
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
        <CustomTextInput placeholder={'음식점 혹은 메뉴를 입력하세요.'} />
        <Text style={CreatePostStyle.titleText}>원하는 날짜</Text>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 48,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.grey300,
            justifyContent: 'center',
          }}
          onPress={() => setDateSelectOpen(true)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/date-range.png')}
              style={{width: 25, height: 25, margin: 12}}
            />
            <Text style={{marginTop: 12}}>{formatDate(date)}</Text>
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
          style={{
            width: '100%',
            height: 48,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.grey300,
            justifyContent: 'center',
          }}
          onPress={() => setTimeSelectOpen(true)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/date-range.png')}
              style={{width: 25, height: 25, margin: 12}}
            />
            <Text style={{marginTop: 12}}>{formatTime(time)}</Text>
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
        <CustomTextInput placeholder={'모집하려는 인원을 입력해주세요'} />
        <Text style={CreatePostStyle.titleText}>원하는 정산방식</Text>
        <CustomTextInput placeholder={'음식점 혹은 메뉴를 입력하세요.'} />
        <Text style={CreatePostStyle.titleText}>음식점 소개</Text>
        <CustomTextInput placeholder={'음식점에 대한 소개를 입력하세요.'} />
      </View>
    </View>
  );
}

export default CreatePostScreen;
