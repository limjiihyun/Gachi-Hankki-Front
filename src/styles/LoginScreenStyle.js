import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const LoginScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  loginContainer: {
    marginHorizontal: 16,
  },
  mainLogoImage: {
    width: 166,
    height: 134,
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
  },
  line: {
    width: 1,
    height: '90%',
    backgroundColor: colors.grey300,
    marginHorizontal: 13,
  },
  textColor: {
    color: colors.brown,
  },
});

export default LoginScreenStyle;
