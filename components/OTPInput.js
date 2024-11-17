//OTPInput.js
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/theme';

const OTPInput = ({ length, onOTPChange, onSubmit }) => {
  const [otp, setOTP] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    onOTPChange(newOTP.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOTP.join('').length === length) {
      onSubmit(newOTP.join(''));
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length).fill(0).map((_, i) => (
        <TextInput
          key={i}
          ref={ref => inputs.current[i] = ref}
          style={styles.input}
          keyboardType='name-phone-pad'
          autoCapitalize='none'
          maxLength={1}
          onChangeText={text => handleChange(text, i)}
          onKeyPress={e => handleKeyPress(e, i)}
          value={otp[i]}
        />
      ))}
      <Text style={styles.error} id="error-message"></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  
  },
  input: {
    width: 46,
    height: 46,
    margin: 5,
    fontSize: 32,
    textAlign: 'center',
    color:COLORS.red,
    borderColor: COLORS.primarycolor,
    borderWidth: 1,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OTPInput;
