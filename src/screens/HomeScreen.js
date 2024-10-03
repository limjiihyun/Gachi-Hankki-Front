import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import HomeStyle from '../styles/HomeStyle';
import Client from '../data/network/rest/client';
import colors from '../constants/colors/colors';
import {timeSince} from '../utils/timeSince';
import {useFocusEffect} from '@react-navigation/native';

function HomeScreen({navigation, route}) {
  const CreatePost = () => {
    navigation.navigate('MainStack', {screen: 'CreatePostScreen'});
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const fetchPosts = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setIsLoading(true);
      }
      const response = await Client.users.getBoard();
      setPosts(response.data);
    } catch (error) {
      console.log('GET 요청 실패:', error.message);
      Alert.alert('Error', 'GET 요청 실패:home ' + error.message);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();

      if (route.params?.refresh) {
        fetchPosts();
      }
    }, [route.params?.refresh]), 
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts(false);
  };

  const renderPost = ({item}) => {
    const defaultImage = require('../assets/character/1.png');

    const imageUrl =
      item.Attachment && item.Attachment.trim() !== ''
        ? {uri: `${item.Attachment}`}
        : defaultImage;

    const handlePostPress = () => {
      if (!item.userProfile) {
        Alert.alert(
          '  ',
          '작성자가 계정을 비활성화했기 때문에 이 콘텐츠는 더 이상 사용할 수 없습니다.',
        );
      } else {
        navigation.navigate('PostDetailScreen', {post: item});
      }
    };

    return (
      <TouchableOpacity
        onPress={handlePostPress}
        style={HomeStyle.postContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={imageUrl}
            style={{width: 120, height: 120, borderRadius: 6}}
            resizeMode="cover"
          />
          <View
            style={{flexDirection: 'column', width: '65%', marginLeft: '4%'}}>
            <Text style={HomeStyle.postTitle}>{item.RestaurantName}</Text>
            <View style={{flexDirection: 'row', marginTop: '2%'}}>
              <Text style={HomeStyle.postServe}>
                날짜 : {item.PromiseDate} /
              </Text>
              <Text style={HomeStyle.postServe}>시간 : {item.PromiseTime}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: '10%',
              }}>
              <Text style={HomeStyle.postDetail}>
                {item.NumberOfParticipants}명 모집
              </Text>
              <Text style={HomeStyle.postDetail}>{item.PatMethod}</Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{color: 'grey', fontSize: 12, color: colors.grey500}}>
            {timeSince(item.PostDate)}
          </Text>
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
        {/* {dropdownVisible && (
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
        )} */}
      </View>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) => item.id + index}
          contentContainerStyle={HomeStyle.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
