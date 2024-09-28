import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PostDetailStyle from '../styles/PostDetailStyle';
import HorizontalLine from '../components/HorizontalLine';
import Comments from '../components/Comment';
import CHARACTER_IMAGE from '../constants/data/character-image';
import client from '../data/network/rest/client';

function PostDetailScreen({route, navigation}) {
  const {post} = route.params;
  console.log('gg', post);
  const userNickname = post.nickname; // Access nickname
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const defaultImage = require('../assets/character/1.png');
  const closeButtonImage = require('../assets/icon-cancle.png'); // 닫기 버튼 이미지 경로

  const imageUrl =
    post.Attachment && post.Attachment.trim() !== ''
      ? {uri: `${post.Attachment}`}
      : defaultImage;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isImageViewerVisible, setImageViewerVisible] = useState(false);
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false); // 상태 추가

  // 스크롤에 따른 이미지 확대 조절
  const imageScale = scrollY.interpolate({
    inputRange: [-200, 0], // 스크롤 범위 (스크롤을 아래로 내릴수록 음수 값이 나옵니다)
    outputRange: [2, 1], // 스크롤을 내릴 때 이미지가 점점 커짐
    extrapolate: 'clamp', // 범위를 벗어나면 값을 고정
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [-100, 0], // 이미지가 확대되며 위로 살짝 이동
    extrapolate: 'clamp',
  });

  // 이미지 클릭 시 전체 화면에서 확대하여 보기 위한 함수
  const openImageViewer = () => {
    setImageViewerVisible(true);
  };

  const closeImageViewer = () => {
    setImageViewerVisible(false);
  };

  // 옵션 모달 열기
  const openOptionsModal = () => {
    setOptionsModalVisible(true);
  };

  // 옵션 모달 닫기
  const closeOptionsModal = () => {
    setOptionsModalVisible(false);
  };

  const openProfileModal = post => {
    const profileImageNumber = post.userProfile?.profileImageNumber;

    console.log('Profile Image Number:', profileImageNumber);

    // Convert profileImageNumber to an integer for comparison
    const profileImage = CHARACTER_IMAGE.find(
      image => image.id === profileImageNumber,
    );

    console.log('Profile Image:', profileImage);

    setSelectedProfile({
      nickname: post.nickname,
      bio: post.userProfile?.bio,
      profileImage: profileImage
        ? profileImage.src
        : require('../assets/character/1.png'), // Default image if none found
      department: post.department,
      commentContent: post.content,
    });

    setModalVisible(true);
  };

  const closeProfileModal = () => {
    setModalVisible(false);
    setSelectedProfile(null);
  };

  const images = [{url: post.Attachment}]; // ImageViewer용 이미지 배열

  const profileImage = CHARACTER_IMAGE.find(
    item => item.id === post?.userProfile?.profileImageNumber,
  );

  const createRoom = async () => {
    try {
      const response = await client.users.createChattingRoom({
        receiverNickname: userNickname,
      });

      const roomId = response.data.roomId;

      if (response.data.success) {
        Alert.alert('Success', 'Chat room created successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ChatRoomScreen', {roomId}),
          },
        ]);
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to create or retrieve chat room',
        );
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          'An error occurred while processing your request.';
        Alert.alert('Error', errorMessage);
      } else if (error.request) {
        console.error('Request error:', error.request);
        Alert.alert('Error', 'No response received from server');
      } else {
        console.error('Axios error:', error.message);
        Alert.alert('Error', 'An error occurred while setting up the request');
      }
    }
  };

  const renderHeader = () => (
    <View>
      {/* 이미지 확대 */}
      <TouchableOpacity onPress={openImageViewer}>
        <Animated.View
          style={[
            PostDetailStyle.imageContainer,
            {
              transform: [
                {scale: imageScale}, // 스크롤에 따라 이미지 크기 조절
                {translateY: imageTranslateY}, // 위아래로 이동
              ],
            },
          ]}>
          <Image source={imageUrl} style={PostDetailStyle.postImage} />
        </Animated.View>
      </TouchableOpacity>
      <View style={PostDetailStyle.contentContainer}>
        <TouchableOpacity onPress={() => openProfileModal(post)}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  profileImage && profileImage.src
                    ? profileImage.src
                    : require('../assets/character/1.png')
                }
                style={PostDetailStyle.profileImage}
              />
              <View style={{flexDirection: 'column', marginLeft: 10}}>
                <Text style={PostDetailStyle.nickNameText}>
                  {post.nickname}
                </Text>
                <Text style={PostDetailStyle.departmentText}>
                  {post.department}
                </Text>
                <Text style={PostDetailStyle.departmentText}>
                  {post.userProfile.bio}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={PostDetailStyle.threeDotContainer}
              onPress={openOptionsModal}>
              <Image
                source={require('../assets/three-dot.png')}
                style={PostDetailStyle.threeDotImage}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <HorizontalLine />
        <Text style={PostDetailStyle.postTitleText}>{post.PostTitle}</Text>
        <View style={{marginTop: '4%', marginHorizontal: 4}}>
          <Text style={PostDetailStyle.labelContentTextStyle}>모집 내용</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={PostDetailStyle.labelTextStyle}>약속 날짜:</Text>
            <Text style={PostDetailStyle.valueTextStyle}>
              {post.PromiseDate}
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={PostDetailStyle.labelTextStyle}>약속 시간:</Text>
            <Text style={PostDetailStyle.valueTextStyle}>
              {post.PromiseTime}
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={PostDetailStyle.labelTextStyle}>모집 명수:</Text>
            <Text style={PostDetailStyle.valueTextStyle}>
              {post.NumberOfParticipants}명
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={PostDetailStyle.labelTextStyle}>결제 방식:</Text>
            <Text style={PostDetailStyle.valueTextStyle}>{post.PatMethod}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
            <Text style={PostDetailStyle.labelTextStyle}>음식점 이름:</Text>
            <Text style={PostDetailStyle.valueTextStyle}>
              {post.RestaurantName}
            </Text>
          </View>

          <HorizontalLine />

          <View style={PostDetailStyle.content}>
            <Text style={PostDetailStyle.labelContentTextStyle}>
              음식점 소개
            </Text>
            <Text style={PostDetailStyle.valueTextStyle}>
              {post.PostContent}
            </Text>
          </View>
        </View>
      </View>
      <Image
        source={require('../assets/banner2.png')}
        style={{width: '100%', height: 90, marginTop: '10%'}}
      />
    </View>
  );

  return (
    <View style={PostDetailStyle.container}>
      {/* FlatList로 전체 화면 구성 */}
      <FlatList
        data={Comments} // 빈 배열 대신 comments 상태를 전달
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          <Comments postId={post.id} postAuthor={post.nickname} />
        } // postAuthor 전달
        keyExtractor={(item, index) => index.toString()}
      />

      {/* 이미지 전체 보기 모달 */}
      {isImageViewerVisible && (
        <Modal visible={isImageViewerVisible} transparent={true}>
          <View style={PostDetailStyle.modalContainer}>
            {/* 닫기 버튼 (사용자 이미지로 대체) */}
            <TouchableOpacity
              style={PostDetailStyle.closeButton}
              onPress={closeImageViewer}>
              <Image
                source={require('../assets/icon-cancle.png')}
                style={PostDetailStyle.closeButtonImage}
              />
            </TouchableOpacity>

            {/* 이미지 뷰어 */}
            <ImageViewer
              imageUrls={images}
              onCancel={closeImageViewer}
              enableSwipeDown={true} // 아래로 스와이프 시 닫기 기능
              renderIndicator={() => null} // 이미지 인디케이터 숨김
              backgroundColor="black"
            />
          </View>
        </Modal>
      )}

      {/* Profile Modal */}
      <Modal visible={isModalVisible} transparent={true}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={closeProfileModal}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              width: '80%',
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Image
              source={
                selectedProfile?.profileImage ||
                require('../assets/character/1.png')
              }
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 10,
              }}>
              {post.userProfile.nickname}
            </Text>
            <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 10}}>
              학과: {post.department}
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 10}}>
              한 줄 소개: {post.userProfile.bio}
            </Text>
            <TouchableOpacity
              onPress={closeProfileModal}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>닫기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={isOptionsModalVisible} transparent={true}>
        <TouchableOpacity
          style={PostDetailStyle.modalBackground}
          onPress={closeOptionsModal}>
          <View style={PostDetailStyle.optionsContainer}>
            <TouchableOpacity onPress={() => createRoom(post.nickname)}>
              <Text style={PostDetailStyle.optionText}>채팅하기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('신고하기')}>
              <Text style={PostDetailStyle.optionText}>신고하기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default PostDetailScreen;
