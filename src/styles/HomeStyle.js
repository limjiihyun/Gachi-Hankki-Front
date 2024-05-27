import {StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const HomeStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
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
});

export default HomeStyle;
