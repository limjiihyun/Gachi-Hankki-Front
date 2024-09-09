import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomTextInput from '../components/AuthStack/CustomTextInput';
import colors from '../constants/colors/colors';
import CreatePostStyle from '../styles/CreatePostStyle';
import DatePicker from 'react-native-date-picker';
import BottomBarButton from '../components/AuthStack/BottomBarButton';
import Client from '../data/network/rest/client';
import {useSelector} from 'react-redux';
import userSlice from '../redux/slices/user-slice';
import CheckBox, {CheckBoxComponent} from '@react-native-community/checkbox'; // 체크박스 컴포넌트 추가

function CreatePostScreen({navigation}) {
  const [postTitle, setPostTitle] = useState('dd');
  const [postDate, setPostDate] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [promiseDate, setPromiseDate] = useState(new Date());
  const now = new Date();
  now.setMinutes(0, 0, 0); // 분, 초, 밀리초를 0으로 설정
  const [promiseTime, setPromiseTime] = useState(now);
  const [timeSelectOpen, setTimeSelectOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [dateSelectOpen, setDateSelectOpen] = useState(false);
  const [isDateNoneChecked, setIsDateNoneChecked] = useState(false); // 원하는 날짜 '상관없음' 체크 여부
  const [isTimeNoneChecked, setIsTimeNoneChecked] = useState(false); // 원하는 시간 '상관없음' 체크 여부

  const [nickName, setNickName] = useState('');

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

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {id: 1, label: '더치페이'},
    {id: 2, label: '사주세요'},
    {id: 3, label: '사드립니다'},
  ];

  const userSliceAll = useSelector(state => state.user);
  const [isDateNoneSelected, setIsDateNoneSelected] = useState(false); // 날짜 "상관없음" 선택 여부
  const [isTimeNoneSelected, setIsTimeNoneSelected] = useState(false); // 시간 "상관없음" 선택 여부
  const [isDatePickerSelected, setIsDatePickerSelected] = useState(false); // DatePicker가 선택되었는지 여부
  const [isTimePickerSelected, setIsTimePickerSelected] = useState(false); // TimePicker가 선택되었는지 여부

  const createBoardBtn = async () => {
    const formData = new FormData();
    formData.append('PostTitle', postTitle);
    formData.append('RestaurantName', restaurantName);
    formData.append('PromiseDate', formatDate(promiseDate));
    formData.append('PromiseTime', formatTime(promiseTime));
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

    const postData = {
      PostTitle: postTitle,
      RestaurantName: restaurantName,
      PromiseDate: formatDate(promiseDate),
      PromiseTime: formatTime(promiseTime),
      PatMethod: paymentMethod,
      NumberOfParticipants: numberOfPeople,
      PostContent: postContent,
    };
    console.log(
      '포스트 하려는거',
      postTitle,
      restaurantName,
      formatDate(promiseDate),
      formatTime(promiseTime),
      paymentMethod,
      numberOfPeople,
      postContent,
      selectedImage.name,
    );

    try {
      const response = await Client.users.createBoard(formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // multipart 형식 명시
        },
      });
      console.log('bb');
      if (response.status === 201) {
        console.log('게시글 POST 요청 성공:', response.data);
        navigation.navigate('MainStack', {screen: 'MainBottomScreen'});
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            value={isTimeNoneChecked}
            onValueChange={setIsTimeNoneChecked}
            tintColors={{true: colors.brown, false: colors.grey400}} // 체크 색상 설정
          />
          <Text style={CreatePostStyle.checkboxText}>상관없음</Text>
        </View>
        {/* <TouchableOpacity
          style={CreatePostStyle.dateImageContainer}
          onPress={() => setDateSelectOpen(true)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/date-range.png')}
              style={CreatePostStyle.dateImage}
            />
            <Text style={CreatePostStyle.dateText}>
              {formatDate(promiseDate)}
            </Text>
          </View>
        </TouchableOpacity>
        <DatePicker
          modal
          open={dateSelectOpen}
          date={promiseDate}
          mode="date"
          minimumDate={new Date()}
          onConfirm={promiseDate => {
            setDateSelectOpen(false);
            setPromiseDate(promiseDate);
          }}
          onCancel={() => {
            setDateSelectOpen(false);
          }}
        /> */}
        <Text style={CreatePostStyle.titleText}>원하는 시간대</Text>
        <TouchableOpacity
          style={CreatePostStyle.dateImageContainer}
          onPress={() => setTimeSelectOpen(true)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/date-range.png')}
              style={CreatePostStyle.dateImage}
            />
            <Text style={CreatePostStyle.dateText}>
              {formatTime(promiseTime)}
            </Text>
          </View>
        </TouchableOpacity>
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
