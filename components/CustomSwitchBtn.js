import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants/theme';

const CustomSwitchButton = ({ onValueChange, value }) => {
  const [isOn, setIsOn] = useState(value);
  const translateX = new Animated.Value(isOn ? 20 : -12);
  
  
  const toggleSwitch = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange(newValue);

    Animated.timing(translateX, {
      toValue: newValue ? 20 : -20,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity onPress={toggleSwitch} style={[{  width: 50,
                                                        height: 30,
                                                        borderRadius: 15,
                                                        borderWidth:1,
                                                        borderColor : COLORS.gray,
                                                        backgroundColor: COLORS.while,
                                                        justifyContent: 'center',
                                                        padding: 2,}, isOn && styles.switchOn]}>
      <Animated.View style={[{width: 26,
                              height: 26,
                              borderRadius: 20,
                              backgroundColor:isOn? COLORS.primarycolor:COLORS.gray
                              ,}, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
  
  },
  switchOn: {
    backgroundColor: COLORS.while,
    borderWidth:1,
    shadowColor:COLORS.primarycolor,
    borderColor:COLORS.primarycolor,
  },
  switchCircle: {

  },
});

export default CustomSwitchButton;
