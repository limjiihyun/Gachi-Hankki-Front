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
  button: {
    backgroundColor: colors.grey001,
    borderRadius: 10,
    height: '78%',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: colors.black,
    fontSize: 14,
  },
  twoColumnContainer: {
    width: '49%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default RegisterScreenStyle;
