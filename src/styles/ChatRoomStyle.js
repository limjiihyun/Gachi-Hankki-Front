import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const ChatRoomStyle = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: colors.lightBrown,
    alignSelf: 'flex-end',
  },
  messageText: {
    color: colors.black,
    fontSize: 12,
  },
  myMessageTimestamp: {
    fontSize: 10,
    color: colors.grey200,
    marginTop: 2,
  },
  messageTimestamp: {
    fontSize: 10,
    color: 'gray',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.grey400,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.grey500,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: colors.white,
  },
});

export default ChatRoomStyle;
