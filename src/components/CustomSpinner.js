import React from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, Text} from 'react-native';
import colors from '../constants/colors/colors';

const CustomSpinner = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../constants/data/login-animation.json')} 
        autoPlay
        loop
        style={{width: 150, height: 150}}
      />
      <Text
        style={{
          fontFamily: 'Doto-Medium',
          fontSize: 21,
          fontWeight: '500',
          color: colors.black,
        }}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white, 
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  loginText: {
    fontFamily: 'Doto-Medium',
    fontSize: 21,
    fontWeight: '500',
    color: colors.black,
  },
});

export default CustomSpinner;
