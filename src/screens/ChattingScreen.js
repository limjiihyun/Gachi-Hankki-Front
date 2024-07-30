import React from 'react';
import {Text, View} from 'react-native';

const ChattingScreen = ({navigation}) => {


  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20}}>채팅</Text>
    </View>
  );
};

export default ChattingScreen;
