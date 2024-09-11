import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native'; // Route에서 파라미터를 가져옴
import client from '../data/network/rest/client'; // API 호출 클라이언트
import colors from '../constants/colors/colors'; // 색상 상수
import CHARACTER_IMAGE from '../constants/data/character-image';
import HorizontalLine from '../components/HorizontalLine';

const CommentDetailScreen = () => {
  const route = useRoute();
  const {postId, commentId} = route.params; // 전달된 postId와 commentId 받음
  const [comment, setComment] = useState(null); // 댓글 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  // 특정 댓글과 작성자 프로필을 가져오는 함수
  const fetchCommentWithProfile = async () => {
    try {
      setIsLoading(true);
      const response = await client.users.getSingleComment(postId, commentId); // 서버 API 호출
      setComment(response.data.comment); // 댓글 데이터 상태로 저장
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('댓글 및 프로필 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchCommentWithProfile(); // 컴포넌트가 마운트될 때 댓글 데이터 가져오기
  }, []);

  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const profileImage = CHARACTER_IMAGE.find(
    item => item.id === String(comment.userProfile.profileImageNumber),
  );

  return (
    <View
      style={{
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
      }}>
      <View style={{margin: 16}}>
        {comment ? (
          <View>
            <View style={{flexDirection: 'row', marginBottom: 16}}>
              <Image
                source={
                  profileImage
                    ? profileImage.src
                    : require('../assets/character/1.png')
                } // 프로필 이미지가 존재하면 해당 이미지, 없으면 null
                style={{width: 70, height: 70, borderRadius: 35, marginTop: 12}}
              />
              <View style={{marginLeft: 16}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: colors.grey900,
                  }}>
                  {comment.userProfile.nickname}
                </Text>
                <Text
                  style={{marginTop: 16, fontSize: 14, color: colors.grey700}}>
                  학과 : {comment.department}
                </Text>
                <Text
                  style={{
                    marginBottom: 16,
                    fontSize: 14,
                    color: colors.grey700,
                  }}>
                  한줄소개 : {comment.userProfile.bio}
                </Text>
              </View>
            </View>
            <HorizontalLine />
            <View
              style={{
                width: '100%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.grey300,
                padding: 12,
                marginTop: 16,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.grey900,
                }}>
                해당 댓글을 단 사람의 프로필 입니다.
              </Text>
              <Text
                style={{
                  marginBottom: 16,
                  fontSize: 16,
                  color: colors.grey900,
                  marginTop: 10,
                }}>
                {comment.content}
              </Text>

              <Text style={{color: colors.grey400}}>
                {new Date(comment.createdAt).toLocaleDateString()}{' '}
                {new Date(comment.createdAt).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        ) : (
          <Text>댓글 정보를 가져올 수 없습니다.</Text>
        )}
      </View>
    </View>
  );
};

export default CommentDetailScreen;
