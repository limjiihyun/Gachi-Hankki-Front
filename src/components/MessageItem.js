import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ChatRoomStyle from '../styles/ChatRoomStyle';
import colors from '../constants/colors/colors';

const MessageItem = memo(
  ({item, otherUserNickname, otherUserProfileImage, goToUserProfile}) => {
    const isSent = item.isSent;
    const messageTimestamp = new Date(item.timestamp).toLocaleTimeString();

    return (
      <View
        style={{
          flexDirection: isSent ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          marginVertical: 5,
          paddingHorizontal: 12,
        }}>
        {isSent ? (
          <View
            style={{
              padding: 10,
              backgroundColor: colors.lightBrown,
              borderRadius: 10,
              maxWidth: '80%',
            }}>
            <Text style={ChatRoomStyle.messageText}>{item.text}</Text>
            <Text style={ChatRoomStyle.myMessageTimestamp}>
              {messageTimestamp}
            </Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {
              <TouchableOpacity onPress={goToUserProfile}>
                <Image
                  source={
                    otherUserProfileImage
                      ? otherUserProfileImage
                      : require('../assets/character/1.png')
                  }
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                />
              </TouchableOpacity>
            }
            <View>
              <Text style={{fontSize: 13, marginBottom: 4}}>
                {otherUserNickname}
              </Text>
              <View
                style={{
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                  backgroundColor: colors.grey200,
                  borderRadius: 6,
                  maxWidth: '100%',
                }}>
                <Text style={ChatRoomStyle.messageText}>{item.text}</Text>
                <Text style={ChatRoomStyle.messageTimestamp}>
                  {messageTimestamp}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  },
);

export default MessageItem;
