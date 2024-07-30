import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const HomeStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  toggleContainer: {
    width: 100,
    height: 38,
    backgroundColor: colors.brown,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: '5%',
  },
  toggleImage: {
    width: 17,
    height: 13,
  },
  emptyImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  emptyImage: {
    width: '27%',
    height: '25%',
    marginTop: -100,
  },
  postContainer: {
    marginHorizontal: 16,
    padding: 15,
    borderWidth: 1,
    marginVertical: 5,
    borderColor: colors.grey300,
    borderRadius: 8,
    marginTop: 10,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.grey010,
    marginRight: 5,
  },
  postContent: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
    marginTop: 15,
  },
  postDetail: {
    width: 100,
    height: 30,
    fontSize: 12,
    padding: 5,
    backgroundColor: colors.grey200,
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    textAlign: 'center', 
    textAlignVertical: 'center', 
  },
  listContent: {
    paddingBottom: 100, // 플로팅 버튼에 의해 가려지지 않도록 여유 공간 추가
  },
  buttonText: {
    color: colors.white,
    marginLeft: 15,
    fontWeight: '400',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 10,
    width: 100,
    backgroundColor: colors.brown,
    borderRadius: 8,
    marginRight: '2.5%',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: colors.white,
  },
  floatingButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 50,
    height: 50,
    backgroundColor: colors.brown,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 28,
  },
  plusIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 50,
    height: 50,
    backgroundColor: colors.brown,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 28,
  },
});

export default HomeStyle;
