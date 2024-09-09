import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const CreatePostStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  horizontalContainer: {
    marginHorizontal: 16,
  },
  imageUploadIconContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
  },
  imageRowContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    marginLeft: 16,
  },
  uploadImageContainer: {
    width: 90,
    height: 90,
    borderColor: colors.grey100,
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 65,
    height: 65,
  },
  uploadText: {
    color: colors.grey,
    fontSize: 16,
  },
  titleText: {
    fontWeight: '500',
    marginTop: 20,
  },
  dateImageContainer: {
    width: '48%',
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey300,
    justifyContent: 'center',
    marginTop: 12,
  },
  dateImage: {
    width: 25,
    height: 25,
    margin: 12,
  },
  dateText: {
    marginTop: 12,
  },
  threeColumnContainer: {
    width: '32%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default CreatePostStyle;
