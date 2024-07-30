import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const ProfileSettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: '10%',
    marginHorizontal: 16,
  },
  imageBorder: {
    borderRadius: 10,
    borderWidth: 1,
    width: 120,
    height: 120,
    borderColor: colors.grey600,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  characterImage: {
    width: 110,
    height: 110,
  },
  editImage: {
    position: 'absolute',
    bottom: 7,
    right: 5,
    width: 24,
    height: 24,
  },
  departmentText: {
    margin: 14,
    fontWeight: '700',
    color: colors.grey010,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  titleText: {
    marginTop: 20,
    fontWeight: '500',
    color: colors.grey010,
  },
  bottomBarContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
});

export default ProfileSettingStyle;
