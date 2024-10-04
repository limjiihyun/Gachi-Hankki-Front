import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
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
import CustomAlert from '../components/CustomAlert';
import ProfileModal from '../components/ProfileModal';
import PostOptionsModal from '../components/PostOptionsModal';
import ReportReasonsModal from '../components/ReportResonsModal';

function PostDetailScreen({route, navigation}) {
  const {post} = route.params;
  const userNickname = post.nickname;
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertModalVisible, setAlertModalVisible] = useState(false);
  const [isReportReasonsVisible, setReportReasonsVisible] = useState(false); 

  const defaultImage = require('../assets/character/1.png');

  const imageUrl =
    post.Attachment && post.Attachment.trim() !== ''
      ? {uri: `${post.Attachment}`}
      : defaultImage;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isImageViewerVisible, setImageViewerVisible] = useState(false);
  const [isPostOptionsModalVisible, setPostOptionsModalVisible] =
    useState(false); // 상태 추가

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
    setPostOptionsModalVisible(true);
  };

  // 옵션 모달 닫기
  const closePostOptionsModal = () => {
    setPostOptionsModalVisible(false);
  };

  const openProfileModal = post => {
    const profileImageNumber = post.userProfile?.profileImageNumber;

    const profileImage = CHARACTER_IMAGE.find(
      image => image.id === profileImageNumber,
    );

    setSelectedProfile({
      nickname: post.nickname,
      bio: post.userProfile?.bio,
      profileImage: profileImage
        ? profileImage.src
        : require('../assets/character/1.png'),
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
        navigation.navigate('ChatRoomScreen', {roomId});
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

  const deletePost = postId => {
    Alert.alert(
      '게시물 삭제',
      '정말로 이 게시물을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: async () => {
            try {
              const response = await client.users.deleteBoard(postId);
              setAlertModalVisible(true);
              console.log('게시물이 삭제되었습니다.');
              navigation.navigate('MainStack', {
                screen: 'MainBottomScreen',
                params: {refresh: true},
              });
            } catch (error) {
              if (error.response) {
                console.error(
                  error.response.data.message || error.response.data.error,
                );
              } else {
                console.error(
                  '게시글 삭제 중 오류가 발생했습니다.',
                  error.message,
                );
              }
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const postReport = reason => {
    const postId = post.id;
    Alert.alert(
      '신고 확인',
      `정말로 이 게시물을 '${reason}' 사유로 신고하시겠습니까?`,
      [
        {text: '취소', style: 'cancel'},
        {
          text: '신고',
          onPress: async () => {
            try {
              const response = await client.users.reportPost(postId, {reason});
              setAlertModalVisible(true);
              console.log('게시물이 신고되었습니다.');
              navigation.navigate('MainStack', {
                screen: 'MainBottomScreen',
                params: {refresh: true},
              });
            } catch (error) {
              if (error.response) {
                const errorMessage =
                  error.response.data.message || error.response.data.error;
                if (errorMessage === '이미 신고한 게시글입니다.') {
                  Alert.alert('알림', '이 게시글은 이미 신고되었습니다.'); // Show alert for already reported
                } else {
                  console.error(errorMessage);
                }
              } else {
                console.error(
                  '게시글 신고 중 오류가 발생했습니다.',
                  error.message,
                );
              }
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const openReportReasonsModal = () => {
    setReportReasonsVisible(true);
  };

  const closeReportReasonsModal = () => {
    setReportReasonsVisible(false);
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
      <ProfileModal
        isVisible={isModalVisible}
        selectedProfile={selectedProfile}
        closeProfileModal={closeProfileModal}
      />
      <PostOptionsModal
        isVisible={isPostOptionsModalVisible}
        closeModal={closePostOptionsModal}
        createRoom={() => createRoom(post.nickname)}
        deletePost={() => deletePost(post.id)}
        postReport={openReportReasonsModal}
      />
      <ReportReasonsModal
        isVisible={isReportReasonsVisible}
        onClose={closeReportReasonsModal}
        onSelect={reason => {
          postReport(reason); 
        }}
      />
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertModalVisible}
        onClose={() => {
          setAlertModalVisible(false);
          setAlertMessage('');
        }}
      />
    </View>
  );
}

export default PostDetailScreen;
