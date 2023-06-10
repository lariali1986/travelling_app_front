import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const LogoutModal = ({ visible, modalPosition, onCancel, onLogout }) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={[styles.modalContainer, modalPosition]}>
        <View style={styles.modalContent}>
          {/*<Text style={styles.modalMessage}>Are you sure to sign out?</Text>*/}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={onCancel}
            >
              <Text style={styles.modalButtonText}>My Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSignOutButton}
              onPress={onLogout}
            >
              <Text style={styles.modalButtonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    color: 'blue',
  },
  modalButtonContainer: {
    justifyContent: 'space-around',
  },
  modalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderBottomColor: 'black', 
  },
  modalSignOutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'blue',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default LogoutModal;








/*




import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

const ModalExample = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const buttonRef = useRef(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const getButtonPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get('window').height;
        const modalTop = pageY + height + 10;
        const modalHeight = screenHeight - modalTop;
        setModalPosition({ top: modalTop, height: modalHeight });
      });
    }
  };

  const [modalPosition, setModalPosition] = useState({ top: 0, height: 0 });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={buttonRef}
        onPress={() => {
          toggleModal();
          getButtonPosition();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>AL</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={[styles.modalContainer, modalPosition]}>
          <Text style={styles.modalText}>This is the modal content</Text>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ModalExample;

*/