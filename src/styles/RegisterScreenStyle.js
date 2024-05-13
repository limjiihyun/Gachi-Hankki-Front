import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const RegisterScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  mainHeaderText: {
    fontWeight: '700',
    fontSize: 21,
    color: colors.grey900,
  },
  agreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default RegisterScreenStyle;
