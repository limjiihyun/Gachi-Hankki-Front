import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import client from '../data/network/rest/client';
import colors from '../constants/colors/colors';
import {useNavigation} from '@react-navigation/native';
import CHARACTER_IMAGE from '../constants/data/character-image';

const Comments = ({postId, postAuthor}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
  const navigation = useNavigation();

  const fetchComments = async () => {
    try {
      const response = await client.users.getComments(postId);
      if (response.data && Array.isArray(response.data)) {
        setComments(response.data);
        response.data.forEach(comment => {
          fetchSingleComment(postId, comment.id);
        });
      } else {
        console.log('댓글 데이터 형식이 올바르지 않습니다:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('댓글이 없는 게시물입니다.');
        setComments([]);
      } else {
        console.error('댓글 가져오기 실패:', error);
      }
    }
  };

  const fetchSingleComment = async (postId, commentId) => {
    try {
      const response = await client.users.getSingleComment(postId, commentId);
      console.log('댓글 정보:', response.data);
    } catch (error) {
      console.error('댓글 조회 실패:', error.message);
    }
  };

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        setIsLoading(true);
        const newCommentData = {content: newComment};
        await client.users.addComment(postId, newCommentData);

        setTimeout(() => {
          fetchComments();
          setIsLoading(false);
        }, 2000);

        setNewComment('');
      } catch (error) {
        setIsLoading(false);
        console.error('댓글 작성 실패:', error);
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const formatDate = createdAt => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${formattedDate} ${hours}:${minutes}`;
  };

  const openProfileModal = comment => {
    const profileImageNumber = comment.userProfile?.profileImageNumber;
    const profileImage = CHARACTER_IMAGE.find(
      image => image.id === profileImageNumber,
    );

    setSelectedProfile({
      nickname: comment.nickname,
      bio: comment.userProfile?.bio,
      profileImage: profileImage ? profileImage.src : null,
      department: comment.department,
      commentContent: comment.content,
      commentId: comment.id,
    });
    setModalVisible(true);
  };

  const closeProfileModal = () => {
    setModalVisible(false);
    setSelectedProfile(null);
  };

  // 옵션 모달 열기
  const openOptionsModal = () => {
    setOptionsModalVisible(true);
  };

  // 옵션 모달 닫기
  const closeOptionsModal = () => {
    setOptionsModalVisible(false);
  };

  const createRoom = async receiverNickname => {
    console.log('Creating chat room with:', receiverNickname);
    try {
      const response = await client.users.createChattingRoom({
        receiverNickname,
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
          error.response.data.message || 'An error occurred.';
        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert('Error', '3An error occurred while setting up the request');
      }
    }
  };

  const deleteComment = (postId, commentId) => {
    Alert.alert(
      '댓글 삭제',
      '정말로 이 댓글을 삭제하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: async () => {
            console.log('Post ID:', postId);
            console.log('Comment ID:', commentId);
            try {
              const response = await client.users.deleteComment(
                postId,
                commentId,
              );
              console.log('댓글이 삭제되었습니다.', response.data);
              fetchComments();
            } catch (error) {
              if (error.response) {
                const errorMessage =
                  error.response.data.message || error.response.data.error;
                console.error(errorMessage);

                if (errorMessage.includes('권한이 없습니다')) {
                  Alert.alert(
                    '권한 오류',
                    '이 댓글을 삭제할 수 있는 권한이 없습니다.',
                  );
                } else {
                  Alert.alert('오류', errorMessage);
                }
              } else {
                Alert.alert('오류', '댓글 삭제 중 오류가 발생했습니다.');
              }
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => {
    const profileImageNumber = item.userProfile?.profileImageNumber;
    const profileImage = CHARACTER_IMAGE.find(
      image => image.id === profileImageNumber,
    );

    return (
      <TouchableOpacity onPress={() => openProfileModal(item)}>
        <View
          style={{
            paddingVertical: 10,
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderBottomColor: colors.grey500,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={
                profileImage
                  ? profileImage.src
                  : require('../assets/character/1.png')
              }
              style={{width: 70, height: 70, borderRadius: 35, marginTop: 12}}
            />
            <View style={{flexDirection: 'column', marginLeft: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold', color: colors.grey900}}>
                  {item.nickname}
                </Text>
                {item.nickname === postAuthor && (
                  <Text style={{marginLeft: 5, color: colors.blue}}>
                    (글쓴이)
                  </Text>
                )}
              </View>
              <Text style={{marginTop: 3, color: colors.grey600}}>
                {item.content}
              </Text>
              <Text style={{color: colors.grey400, marginTop: 3}}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectedProfile(item);
              setOptionsModalVisible(true);
            }}
            style={{
              marginTop: -40,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/three-dot.png')}
              style={{width: 17, height: 17}}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginHorizontal: 16, marginTop: 16}}>
      <Text style={{fontWeight: '700', fontSize: 18, color: colors.grey900}}>
        댓글
      </Text>

      <FlatList
        data={comments}
        inverted={true} // 최신 댓글이 아래에 표시
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      {comments.length === 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <Image
            source={require('../assets/icon-no-content.png')}
            style={{width: '80%', height: 240}}
          />
        </View>
      )}
      {comments.length === 1 && (
        <View
          style={{
            height: 150,
          }}
        />
      )}
      {comments.length === 2 && (
        <View
          style={{
            height: 75,
          }}
        />
      )}

      {isLoading && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <ActivityIndicator size="large" color={colors.grey500} />
          <Text>댓글을 등록 중입니다...</Text>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="댓글 작성하기..."
          style={{
            padding: 10,
            flex: 1,
            marginRight: 5,
            borderColor: colors.grey400,
            borderWidth: 1,
            borderRadius: 10,
          }}
          multiline={true}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.lightBrown,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}
          onPress={addComment}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '500',
            }}>
            작성
          </Text>
        </TouchableOpacity>
      </View>

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
              {selectedProfile?.nickname}
            </Text>
            <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 10}}>
              학과: {selectedProfile?.department}
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 10}}>
              한 줄 소개: {selectedProfile?.bio}
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
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={closeOptionsModal}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              width: '80%',
            }}>
            <TouchableOpacity
              onPress={() => createRoom(selectedProfile.nickname)}>
              <Text
                style={{
                  fontSize: 16,
                  paddingVertical: 10,
                  textAlign: 'center',
                }}>
                채팅하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('신고하기')}>
              <Text
                style={{
                  fontSize: 16,
                  paddingVertical: 10,
                  textAlign: 'center',
                }}>
                신고하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteComment(postId, selectedProfile.id)}>
              <Text
                style={{
                  fontSize: 16,
                  paddingVertical: 10,
                  textAlign: 'center',
                }}>
                삭제하기
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Comments;
