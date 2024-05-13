import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const ProfileSettingStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: '10%',
  },
  imageBorder: {
    borderRadius: 13,
    borderWidth: 1,
    width: 120,
    height: 120,
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
  contentContainer: {
    marginHorizontal: 16,
  },
});

export default ProfileSettingStyle;
