import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import colors from '../constants/colors/colors';

const {width} = Dimensions.get('window');

const PostDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: 360,
    width: '100%',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  nickNameText: {
    fontSize: 16,
    color: colors.grey900,
    fontWeight: '700',
  },
  departmentText: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  threeDotContainer: {
    marginTop: -20,
  },
  threeDotImage: {
    width: 20,
    height: 20,
  },
  postTitleText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: '5%',
    marginHorizontal: 4,
    color: colors.grey900,
  },
  labelTextStyle: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    color: colors.grey500,
  },
  labelContentTextStyle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
    color: colors.grey900,
    fontWeight: '700',
  },
  valueTextStyle: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    color: colors.grey900,
    fontWeight: '500',
  },
  content: {
    color: colors.grey900,
    fontSize: 14,
    marginTop: 14,
    flexDirection: 'column',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1, // 버튼이 항상 최상단에 있도록 설정
  },
  closeButtonImage: {
    width: 24, // 닫기 버튼 이미지 너비
    height: 24, // 닫기 버튼 이미지 높이
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default PostDetailStyle;
