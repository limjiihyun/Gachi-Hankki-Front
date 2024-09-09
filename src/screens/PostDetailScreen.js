import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import HomeStyle from '../styles/HomeStyle';
import {useSelector} from 'react-redux';

function PostDetailScreen({route}) {
  const {post} = route.params;

  const defaultImage = require('../assets/character/1.png');

  const imageUrl =
    post.Attachment && post.Attachment.trim() !== ''
      ? {uri: `${post.Attachment}`}
      : defaultImage;

  const userSlice = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <View>
        <Text>{userSlice.profileNickname}</Text>
      </View>
      <Text style={styles.title}>{post.RestaurantName}</Text>
      <Image source={imageUrl} style={styles.image} resizeMode="cover" />
      <Text style={styles.detailText}>약속 날짜: {post.PromiseDate}</Text>
      <Text style={styles.detailText}>약속 시간: {post.PromiseTime}</Text>
      <Text style={styles.detailText}>
        참가자 모집: {post.NumberOfParticipants}명
      </Text>
      <Text style={styles.detailText}>결제 방식: {post.PatMethod}</Text>
      <Text style={styles.content}>{post.PostContent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginTop: 12,
  },
});

export default PostDetailScreen;
