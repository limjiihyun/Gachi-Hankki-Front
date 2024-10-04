import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../constants/colors/colors';

const ReportReasonsModal = ({isVisible, onClose, onSelect}) => {
  const reasons = ['부적절한 콘텐츠', '스팸', '괴롭힘', '기타'];

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>게시물 신고 사유 선택</Text>
          {reasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reasonButton}
              onPress={() => {
                onSelect(reason);
                onClose();
              }}>
              <Text style={styles.reasonText}>{reason}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reasonButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    width: '100%',
    alignItems: 'center',
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
  },
  cancelButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.lightBrown,
    width: '100%',
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ReportReasonsModal;
