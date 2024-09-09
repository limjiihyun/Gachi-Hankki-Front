import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import HomeStyle from '../styles/HomeStyle';
import Client from '../data/network/rest/client';

function HomeScreen({navigation}) {
  const CreatePost = () => {
    navigation.navigate('MainStack', {screen: 'CreatePostScreen'});
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Track refreshing state

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await Client.users.getBoard();
      setPosts(response.data);
      console.log('게시물 목록', response.data);
    } catch (error) {
      console.log('GET 요청 실패:', error.message);
      Alert.alert('Error', 'GET 요청 실패:home ' + error.message);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on initial render
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts(); // Fetch new data
    setRefreshing(false); // Stop the refreshing animation
  };

  // 게시물 작성 시간이 몇 시간, 며칠 전인지 계산하는 함수
  const timeSince = postDate => {
    const now = new Date(); // 현재 시간
    const postTime = new Date(postDate); // 게시물 작성 시간

    const timeDiff = now - postTime; // 시간 차이 (밀리초 단위)
    const minutes = Math.floor(timeDiff / (1000 * 60)); // 분 단위로 변환
    const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // 시간 단위로 변환
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 일 단위로 변환

    if (days > 0) {
      // 24시간이 넘으면 일 단위로 표시
      return `${days}일 전`;
    } else if (hours > 0) {
      // 1시간 이상 24시간 미만이면 시간 단위로 표시
      return `${hours}시간 전`;
    } else {
      // 1시간 미만이면 분 단위로 표시
      return `${minutes}분 전`;
    }
  };

  const renderPost = ({item}) => {
    const defaultImage = require('../assets/character/1.png');

    const imageUrl =
      item.Attachment && item.Attachment.trim() !== ''
        ? {uri: `${item.Attachment}`}
        : defaultImage;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetailScreen', {post: item})}
        style={HomeStyle.postContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', width: '69%'}}>
            <Text style={HomeStyle.postTitle}>
              {item.RestaurantName} / {item.PromiseDate} / {item.PromiseTime}
            </Text>
            <Text style={HomeStyle.postContent}>{item.PostContent}</Text>
            <Text>
              {timeSince(item.PostDate)} {/* 작성된 시간 표시 */}
            </Text>
          </View>
          <Image
            source={imageUrl}
            style={{width: 100, height: 80, borderRadius: 6, marginTop: 5}}
            resizeMode="cover"
          />
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
          <Text style={HomeStyle.postDetail}>{item.RestaurantName}</Text>
          <Text style={HomeStyle.postDetail}>
            {item.NumberOfParticipants}명 모집
          </Text>
          <Text style={HomeStyle.postDetail}>{item.PatMethod}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={HomeStyle.container}>
      <View style={HomeStyle.headerContainer}>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={HomeStyle.toggleContainer}>
          <Image
            source={require('../assets/array-image.png')}
            style={HomeStyle.toggleImage}
          />
          <Text style={HomeStyle.buttonText}>{selectedOption}</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={HomeStyle.dropdown}>
            <TouchableOpacity
              style={HomeStyle.dropdownItem}
              onPress={() => selectOption('최신순')}>
              <Text style={HomeStyle.dropdownText}>최신순</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={HomeStyle.dropdownItem}
              onPress={() => selectOption('인기순')}>
              <Text style={HomeStyle.dropdownText}>인기순</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) => item.id + index}
          contentContainerStyle={HomeStyle.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } // Add pull-to-refresh here
        />
      ) : (
        <View style={HomeStyle.emptyImageContainer}>
          <Image
            source={require('../assets/home-empty.png')}
            style={HomeStyle.emptyImage}
          />
          <Text>현재 등록된 내용이 없습니다.</Text>
          <Text>게시물을 등록해보세요!</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={CreatePost}
        style={HomeStyle.plusIconContainer}>
        <Image source={require('../assets/icon-plus.png')} />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
