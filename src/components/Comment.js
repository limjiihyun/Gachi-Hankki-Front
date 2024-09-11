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
} from 'react-native';
import client from '../data/network/rest/client';
import colors from '../constants/colors/colors';
import {useNavigation} from '@react-navigation/native';
import CHARACTER_IMAGE from '../constants/data/character-image';

const Comments = ({postId, postAuthor, navigate}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [profiles, setProfiles] = useState({}); // 사용자 프로필을 저장할 상태
  const navigation = useNavigation();

  // 댓글 목록 가져오기
  const fetchComments = async () => {
    try {
      const response = await client.users.getComments(postId);
      if (response.data && Array.isArray(response.data)) {
        setComments(response.data); // 서버로부터 받은 댓글 리스트를 상태로 설정
        console.log('댓글입니다', response.data);
        // 각 댓글 작성자의 프로필 가져오기
        response.data.forEach(comment => {
          fetchSingleComment(postId, comment.id);
        });
      } else {
        console.log('댓글 데이터 형식이 올바르지 않습니다:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 404 에러인 경우, 댓글이 없는 게시물로 간주하고 빈 배열 설정
        console.log('댓글이 없는 게시물입니다.');
        setComments([]); // 댓글이 없을 경우 빈 배열로 설정
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

  // 댓글 작성 함수
  const addComment = async () => {
    if (newComment.trim()) {
      try {
        setIsLoading(true); // 댓글 작성 시작 시 로딩 상태 활성화
        const newCommentData = {content: newComment};

        // 서버에 댓글 추가 요청
        await client.users.addComment(postId, newCommentData);

        // 댓글 목록을 다시 가져오기 전에 1초 지연
        setTimeout(() => {
          fetchComments(); // 서버에서 최종적으로 댓글을 가져와 상태 업데이트
          setIsLoading(false); // 댓글 가져온 후 로딩 상태 비활성화
        }, 2000); // 1초(1000ms) 지연 후에 fetchComments 호출

        setNewComment(''); // 입력 필드 초기화
      } catch (error) {
        setIsLoading(false); // 에러 발생 시 로딩 상태 비활성화
        console.error('댓글 작성 실패:', error);
      }
    }
  };

  useEffect(() => {
    fetchComments(); // 컴포넌트가 마운트될 때 댓글 목록을 가져옴
  }, []);

  const formatDate = createdAt => {
    const date = new Date(createdAt); // createdAt을 Date 객체로 변환
    const formattedDate = date.toLocaleDateString(); // 날짜 포맷 (예: 2024-09-11)

    // 시간을 UTC 그대로 사용하여 포맷
    const hours = String(date.getUTCHours()).padStart(2, '0'); // UTC 시간
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // UTC 분

    return `${formattedDate} ${hours}:${minutes}`; // 포맷된 날짜와 UTC 시간 반환
  };

  // 댓글 목록을 렌더링
  const renderItem = ({item}) => {
    const profileImageNumber = item.userProfile?.profileImageNumber;

    const profileImage = CHARACTER_IMAGE.find(
      image => image.id === String(profileImageNumber),
    );
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CommentDetailScreen', {
            postId: postId, // postId 전달
            commentId: item.id, // commentId 전달
          })
        }>
        <View
          style={{
            paddingVertical: 10,
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderBottomColor: colors.grey500,
            paddingBottom: 5,
          }}>
          <Image
            source={
              profileImage
                ? profileImage.src
                : require('../assets/character/1.png')
            } // 프로필 이미지가 존재하면 해당 이미지, 없으면 null
            style={{width: 70, height: 70, borderRadius: 35, marginTop: 12}}
          />
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', color: colors.grey900}}>
                {item.nickname}
              </Text>
              {item.nickname === postAuthor && ( // 댓글 작성자와 게시물 작성자가 동일하면 "작성자" 표시
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
        inverted={true} // 배열을 역순으로 렌더링하여 최신 댓글이 아래에 표시되게 함
        keyExtractor={(item, index) => index.toString()} // index를 key로 사용
        renderItem={renderItem}
      />

      {/* 댓글이 없거나 댓글이 3개 이하일 경우 특정 UI를 보여줌 */}
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

      {/* 댓글이 3개 이하일 때 특정 메시지나 UI 표시 */}
      {comments.length >= 1 && comments.length <= 3 && (
        <View style={{height: 200, width: '100%'}} />
      )}

      {/* 로딩 중일 때 스피너 표시 */}
      {isLoading && (
        <View style={{marginVertical: 10}}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text>댓글을 작성 중입니다...</Text>
        </View>
      )}

      {/* 댓글 입력 폼 */}
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="댓글을 입력하세요"
          style={{
            borderColor: colors.grey300,
            borderWidth: 1,
            borderRadius: 8,
            flex: 1,
            marginRight: 10,
            paddingLeft: 10,
          }}
          multiline={true}
        />
        <TouchableOpacity
          onPress={addComment}
          style={{
            width: 57,
            height: 50,
            backgroundColor: colors.blue,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/icon-create.png')}
            style={{width: 35, height: 30, marginLeft: -3}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
