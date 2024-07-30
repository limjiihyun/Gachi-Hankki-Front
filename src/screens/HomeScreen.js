import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import HomeStyle from '../styles/HomeStyle';
import Client from '../data/network/rest/client';

function HomeScreen({navigation}) {
  const CreatePost = () => {
    navigation.navigate('MainStack', {screen: 'CreatePostScreen'});
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Client.users.getBoard();
        console.log('GET 요청 성공:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.log('GET 요청 실패:', error.message);
        Alert.alert('Error', 'GET 요청 실패:home ' + error.message);
      }
    };
    fetchPosts();
  }, []);

  const renderPost = ({item}) => (
    <View style={HomeStyle.postContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', width: '69%'}}>
          <Text style={HomeStyle.postTitle}>
            {item.RestaurantName} / {item.PromiseDate} / {item.PromiseTime}
          </Text>
          <Text style={HomeStyle.postContent}>{item.PostContent}</Text>
        </View>
        <Image
          source={{uri: item.Attachment}}
          style={{width: 100, height: 80, borderRadius: 6, marginTop: 5}}
        />
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
        <Text style={HomeStyle.postDetail}>{item.RestaurantName}</Text>
        <Text style={HomeStyle.postDetail}>{item['모집 인원']}명 모집</Text>
        <Text style={HomeStyle.postDetail}>{item.PatMethod}</Text>
      </View>
    </View>
  );

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
