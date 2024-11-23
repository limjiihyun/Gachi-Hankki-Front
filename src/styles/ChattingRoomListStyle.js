import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const ChattingRoomListStyle = StyleSheet.create({
  roomItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
  },
  roomMembers: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey800,
  },
  roomLastMessage: {
    color: colors.grey700,
    marginTop: 10,
  },
  roomLastUpdated: {
    color: colors.grey400,
    fontSize: 12,
    marginTop: 10,
  },
  emptyText: {
    fontSize: 14,
    color: colors.grey400,
    marginTop: 20,
  },
});

export default ChattingRoomListStyle;
