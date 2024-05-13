import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const RegisterSuccessStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '85%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  mainText: {
    fontSize: 20,
    fontWeight: '700',
    margin: 15,
    color: colors.grey010,
  },
  text1: {
    color: colors.grey010,
  },
  text2: {
    color: colors.grey010,
    marginTop: 10,
  },
});

export default RegisterSuccessStyle;
