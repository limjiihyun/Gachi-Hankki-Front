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
  const [postTitle, setPostTitle] = useState('');
  const [postDate, setPostDate] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [promiseDate, setPromiseDate] = useState(new Date());
  const now = new Date();
  now.setMinutes(0, 0, 0); // 분, 초, 밀리초를 0으로 설정
  const [promiseTime, setPromiseTime] = useState(now);
  const [timeSelectOpen, setTimeSelectOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('더치페이'); // 기본값 설정
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [dateSelectOpen, setDateSelectOpen] = useState(false);

  // 이미지 선택 함수 수정
  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        const imageType = response.assets[0].type || 'image/jpeg';

        // 파일 이름을 타임스탬프 기반으로 생성
        const timestamp = Date.now();
        const fileExtension = imageType.split('/')[1] || 'jpg'; // 확장자 추출 (기본값: jpg)
        const formattedDate = new Date().toISOString().replace(/:/g, '-'); // 날짜를 'yyyy-MM-ddThh-mm-ss' 형식으로 변환

        // 파일명 형식: timestamp_화면캡처_yyyy-MM-ddThh-mm-ss
        const imageName = `${timestamp}_화면캡처_${formattedDate}.${fileExtension}`;

        // 업로드 URL 생성 (필수값 추가)
        const uploadUrl = `https://storage.googleapis.com/hanbat-capstone-d4979.appspot.com/${imageName}`;

        // 생성한 업로드 URL을 selectedImage에 저장
        setSelectedImage({
          uri: imageUri,
          name: imageName,
          type: imageType,
          uploadUrl, // 필수값이 포함된 URL
        });

        console.log('Image selected:', {
          uri: imageUri,
          name: imageName,
          type: imageType,
          uploadUrl,
        });
      }
    });
  };

  const formatDate = date => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = time => {
    return time.toTimeString().split(' ')[0].slice(0, 5);
  };

  const [selectedOption, setSelectedOption] = useState(1);

  const options = [
    {id: 1, label: '더치페이'},
    {id: 2, label: '사주세요'},
    {id: 3, label: '사드립니다'},
  ];

  const [isDateNoneSelected, setIsDateNoneSelected] = useState(true); // 날짜 "상관없음" 선택 여부
  const [isTimeNoneSelected, setIsTimeNoneSelected] = useState(true); // 시간 "상관없음" 선택 여부
  const [isDatePickerSelected, setIsDatePickerSelected] = useState(false); // DatePicker가 선택되었는지 여부
  const [isTimePickerSelected, setIsTimePickerSelected] = useState(false); // TimePicker가 선택되었는지 여부

  const createBoardBtn = async () => {
    const formData = new FormData();
    formData.append('PostTitle', postTitle);
    formData.append('RestaurantName', restaurantName);
    // 날짜와 시간대 처리
    if (isDateNoneSelected) {
      formData.append('PromiseDate', '상관없음');
    } else {
      formData.append('PromiseDate', formatDate(promiseDate));
    }

    if (isTimeNoneSelected) {
      formData.append('PromiseTime', '상관없음');
    } else {
      formData.append('PromiseTime', formatTime(promiseTime));
    }
    formData.append('PatMethod', paymentMethod);
    formData.append('NumberOfParticipants', numberOfPeople);
    formData.append('PostContent', postContent);
    formData.append('UserNum', 'hi');
    formData.append('NickName', 'hey');

    // 이미지가 선택된 경우 FormData에 추가
    if (selectedImage && selectedImage.uri) {
      formData.append('image', {
        uri: selectedImage.uri,
        name: selectedImage.name, // 생성한 파일 이름
        type: selectedImage.type, // 이미지 타입
      });
    }

    try {
      const response = await Client.users.createBoard(formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // multipart 형식 명시
        },
      });
      if (response.status === 201) {
        console.log('게시글 POST 요청 성공:', response.data);
        navigation.navigate('MainStack', {
          screen: 'MainBottomScreen',
          params: {refresh: true},
        });
      } else {
        console.log('게시글 POST 요청 실패:', response.data);
      }
    } catch (error) {
      console.log('게시글 POST 요청 실패2: ', error.message);
    }
  };

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
                source={{uri: selectedImage.uri}}
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
        <Text style={CreatePostStyle.titleText}>제목을 입력하세요</Text>
        <CustomTextInput
          placeholder={'제목을 입력하세요'}
          value={postTitle}
          onChangeText={setPostTitle}
        />
        {/* 원하는 날짜 UI */}
        <Text style={CreatePostStyle.titleText}>원하는 날짜</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={[
              {
                flexDirection: 'row',
                width: '48%',
                height: 48,
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'center',
                marginTop: 12,
              },
              {borderColor: isDateNoneSelected ? colors.brown : colors.grey300}, // 선택에 따른 테두리 색상 변경
            ]}
            onPress={() => {
              setIsDatePickerSelected(false); // DatePicker 선택 시
              setIsDateNoneSelected(true); // "상관없음" 선택 해제
            }} // "상관없음"을 선택할 때 상태 변경
          >
            <Text
              style={[
                CreatePostStyle.checkboxText,
                {color: isDateNoneSelected ? colors.brown : colors.grey400}, // 선택에 따른 텍스트 색상 변경
              ]}>
              상관없음
            </Text>
          </TouchableOpacity>

          {/* 날짜 선택 UI */}
          <TouchableOpacity
            style={[
              CreatePostStyle.dateImageContainer,
              {
                borderColor: isDatePickerSelected
                  ? colors.brown
                  : colors.grey300, // DatePicker 선택에 따라 테두리 색상 변경
              },
            ]}
            onPress={() => {
              setDateSelectOpen(true);
              setIsDatePickerSelected(true); // DatePicker 선택 시
              setIsDateNoneSelected(false); // "상관없음" 선택 해제
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/date-range.png')}
                style={CreatePostStyle.dateImage}
              />
              <Text
                style={[
                  CreatePostStyle.dateText,
                  {color: isDatePickerSelected ? colors.brown : colors.grey400}, // DatePicker 선택에 따라 텍스트 색상 변경
                ]}>
                {formatDate(promiseDate)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={dateSelectOpen}
          date={promiseDate}
          mode="date"
          minimumDate={new Date()}
          onConfirm={promiseDate => {
            setDateSelectOpen(false);
            setPromiseDate(promiseDate);
            setIsDatePickerSelected(true); // 날짜 선택 완료 시 DatePicker 선택 상태 유지
            setIsDateNoneSelected(false); // "상관없음" 선택 해제
          }}
          onCancel={() => {
            setDateSelectOpen(false);
          }}
        />

        {/* 원하는 시간 UI */}
        <Text style={CreatePostStyle.titleText}>원하는 시간대</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={[
              {
                flexDirection: 'row',
                width: '48%',
                height: 48,
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'center',
                marginTop: 12,
              },
              {borderColor: isTimeNoneSelected ? colors.brown : colors.grey300}, // 선택에 따른 테두리 색상 변경
            ]}
            onPress={() => {
              setIsTimePickerSelected(false); // DatePicker 선택 시
              setIsTimeNoneSelected(true); // "상관없음" 선택 해제
            }} // "상관없음"을 선택할 때 상태 변경
          >
            <Text
              style={[
                CreatePostStyle.checkboxText,
                {color: isTimeNoneSelected ? colors.brown : colors.grey400}, // 선택에 따른 텍스트 색상 변경
              ]}>
              상관없음
            </Text>
          </TouchableOpacity>
          {/* 시간 선택 UI */}
          <TouchableOpacity
            style={[
              CreatePostStyle.dateImageContainer,
              {
                borderColor: isTimePickerSelected
                  ? colors.brown
                  : colors.grey300, // DatePicker 선택에 따라 테두리 색상 변경
              },
            ]}
            onPress={() => {
              setTimeSelectOpen(true);
              setIsTimePickerSelected(true); // DatePicker 선택 시
              setIsTimeNoneSelected(false); // "상관없음" 선택 해제
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/date-range.png')}
                style={CreatePostStyle.dateImage}
              />
              <Text
                style={[
                  CreatePostStyle.dateText,
                  {color: isTimePickerSelected ? colors.brown : colors.grey400}, // DatePicker 선택에 따라 텍스트 색상 변경
                ]}>
                {formatTime(promiseTime)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={timeSelectOpen}
          date={promiseTime}
          mode="time"
          minuteInterval={60} // 분을 60분 단위로 설정하여 항상 00분이 선택되도록
          onConfirm={selectedTime => {
            const adjustedTime = new Date(selectedTime);
            adjustedTime.setMinutes(0); // 분을 항상 0으로 설정
            setTimeSelectOpen(false);
            setPromiseTime(adjustedTime);
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
                onPress={() => {
                  setSelectedOption(option.id);
                  setPaymentMethod(option.label);
                }}
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
        <Text style={CreatePostStyle.titleText}>음식점 이름</Text>
        <CustomTextInput
          placeholder={'음식점 이름을 입력하세요.'}
          value={restaurantName}
          onChangeText={setRestaurantName}
        />
        <Text style={CreatePostStyle.titleText}>음식점 소개</Text>
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
        <BottomBarButton title={'작성하기'} onPress={createBoardBtn} />
      </View>
    </ScrollView>
  );
}

export default CreatePostScreen;
