import React from 'react';
import {Modal, TouchableOpacity, View, Text, Image} from 'react-native';
import colors from '../constants/colors/colors';

const ProfileModal = ({isVisible, selectedProfile, closeProfileModal}) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={closeProfileModal}>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 30,
            paddingHorizontal: 30,
            width: '80%',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderColor: colors.grey400,
                borderWidth: 1,
                borderRadius: 50,
                width: 90,
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  selectedProfile?.profileImage ||
                  require('../assets/character/1.png')
                }
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  color: colors.grey800,
                  marginVertical: 10,
                }}>
                {selectedProfile?.nickname}
              </Text>
              <Text style={{fontSize: 16, textAlign: 'left', marginBottom: 10}}>
                학과: {selectedProfile?.department}
              </Text>
              <Text style={{textAlign: 'left', marginBottom: 10}}>
                한 줄 소개: {selectedProfile?.bio}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProfileModal;
