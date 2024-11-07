import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ChatRoomStyle from '../styles/ChatRoomStyle';
import colors from '../constants/colors/colors';

const MessageItem = ({
  item,
  otherUserNickname,
  otherUserProfileImage,
  goToUserProfile,
}) => {
  return (
    <View
      style={{
        flexDirection: item.isSent ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
        paddingHorizontal: 12,
      }}>
      {item.isSent ? (
        <View
          style={{
            padding: 10,
            backgroundColor: colors.lightBrown,
            borderRadius: 10,
            maxWidth: '80%',
          }}>
          <Text style={ChatRoomStyle.messageText}>{item.text}</Text>
          <Text style={ChatRoomStyle.myMessageTimestamp}>
            {new Date(item.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {otherUserProfileImage && (
            <TouchableOpacity onPress={goToUserProfile}>
              <Image
                source={{uri: otherUserProfileImage}}
                style={{
                  width: 80,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          )}
          <View>
            <Text style={{marginBottom: 5, fontWeight: 'bold'}}>
              {otherUserNickname}
            </Text>
            <View
              style={{
                padding: 10,
                backgroundColor: colors.grey200,
                borderRadius: 10,
                maxWidth: '100%',
              }}>
              <Text style={ChatRoomStyle.messageText}>{item.text}</Text>
              <Text style={ChatRoomStyle.messageTimestamp}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MessageItem;
