import { Alert, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme'
import BtnWithIcon from './BtnWithIcon'
import images from '../constants/images'
import axios from 'axios'

const ChangePassDialog = ({ visible, onClose, onSubmit,JBuilder }) => {
  const [Oldpassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmErrorMessage, setConfirmErrorMessage] = useState('');
  const [ApiErrorMessage, setApiErrorMessage] = useState('');
  const root = 'http://172.16.100.152:3000/timesheet/changepassword/';
  console.log("UserUID",JBuilder);
  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setConfirmErrorMessage('Passwords do not match');
      return false;
    } else {
      setConfirmErrorMessage('');
      return true;
    }
  };

  const handlePassChange = async (UserID,OldPass,NewPass) => {
    
    try {
        const PassInfo = `${root}${UserID}/${OldPass}/${NewPass}`;
        console.log(PassInfo);
        const response = await axios.get(PassInfo);
        console.log(response.data);
        if (response.data==="saved") {
          console.log("PassWord Change : ","Saved");
          
        } else if (response.data==="mismatch") {
          console.log("PassWord Change : ","mismatch");
          setApiErrorMessage("Old Password is Wrong");
          
        }else {
          console.log("samething when Wrong");          
        }
    } catch (err) {
        console.log('Error: ', err);
    }
    console.log('Switch is now ', value ? 'On' : 'Off');
};
  const handleChangePassword = () => {
    if (validatePasswords()) {
      // Proceed with your logic, e.g., submitting the form
      handlePassChange(JBuilder,Oldpassword,confirmPassword);
      //onSubmit(password); // Assuming onSubmit is a prop that handles the password change
    }
  };

  return (
    <Modal 
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{width: '100%',
                        borderWidth: 1,
                        borderRadius: 18,
                        borderColor: COLORS.ShadowColor,
                        marginTop: 8,
                        marginBottom: 8,
                        paddingTop:2,
                        paddingBottom:2,
                        paddingStart:2,
                        paddingEnd:160,}}>
            <TextInput
              placeholder='Old Password'
              onChangeText={setOldPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={{width: '100%',
                        borderWidth: 1,
                        borderRadius: 18,
                        borderColor: COLORS.ShadowColor,
                        marginTop: 8,
                        marginBottom: 8,
                        paddingTop:2,
                        paddingBottom:2,
                        paddingStart:2,
                        paddingEnd:160,}}>
            <TextInput
              placeholder='New Password'
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={{width: '100%',
                        borderWidth: 1,
                        borderRadius: 18,
                        borderColor: COLORS.ShadowColor,
                        marginTop: 8,
                        marginBottom: 8,
                        paddingTop:2,
                        paddingBottom:2,
                        paddingStart:2,
                        paddingEnd:140,}}>
            <TextInput
              placeholder='Confirm Password'
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={{alignSelf:'center'}}>
          {confirmErrorMessage ? <Text style={styles.errorText}>{confirmErrorMessage}</Text> : null}
          {ApiErrorMessage ? <Text style={styles.errorText}>{ApiErrorMessage}</Text> : null}
          </View>
          <View style={styles.buttonContainer}>
            <BtnWithIcon
              title={'SAVE'}
              width={23}
              heigth={25}
              source={images.SaveIcon}
              IconColor={COLORS.while}
              borderColor={COLORS.primarycolor}
              color={COLORS.primarycolor}
              onPress={handleChangePassword}
            />
            <View style={{ marginStart: 50 }}>
              <BtnWithIcon
                title={'BACK'}
                width={20}
                heigth={20}
                source={images.BackIcon}
                IconColor={COLORS.primarycolor}
                color={COLORS.while}
                borderColor={COLORS.ShadowColor}
                onPress={onClose}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ChangePassDialog

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add transparency for modal background
  },
  modalView: {
    backgroundColor: COLORS.while,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    
  },
  input: {
    width: '100%',
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
});
