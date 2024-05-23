import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const SelectIconStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 110,
    height: 110,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.grey500,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 16,
    marginTop: 16,
    color: colors.grey010,
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
  },
});

export default SelectIconStyle;
