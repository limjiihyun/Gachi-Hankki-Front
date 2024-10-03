import React from 'react';
import {Modal, TouchableOpacity, View, Text} from 'react-native';

const PostOptionsModal = ({isVisible, closeModal, createRoom, deletePost}) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={closeModal}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            width: '80%',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={createRoom}>
            <Text style={{paddingVertical: 10, fontSize: 16}}>채팅하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('신고하기')}>
            <Text style={{paddingVertical: 10, fontSize: 16}}>신고하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deletePost}>
            <Text style={{paddingVertical: 10, fontSize: 16}}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PostOptionsModal;
