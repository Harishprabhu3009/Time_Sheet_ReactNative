import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const TimeInput = ({ onChange,remainingHours }) => {
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
  
    const updateTime = (newHours, newMinutes) => {
      const formattedHours = newHours.toString().padStart(2, '0');
      const formattedMinutes = newMinutes.toString().padStart(2, '0');
      setHours(formattedHours);
      setMinutes(formattedMinutes);
      onChange(`${formattedHours}:${formattedMinutes}`);
    };
  
    const incrementHours = () => {
      const newHours = (parseInt(hours, 10) + 1) % 24;
      updateTime(newHours, parseInt(minutes, 10));
    };
  
    const decrementHours = () => {
      const newHours = (parseInt(hours, 10) - 1 + 24) % 24;
      updateTime(newHours, parseInt(minutes, 10));
    };
  
    const incrementMinutes = () => {
      const newMinutes = (parseInt(minutes, 10) + 1) % 60;
      if (newMinutes === 0) {
        incrementHours();
      } else {
        updateTime(parseInt(hours, 10), newMinutes);
      }
    };
  
    const decrementMinutes = () => {
      const newMinutes = (parseInt(minutes, 10) - 1 + 60) % 60;
      if (newMinutes === 59) {
        decrementHours();
      } else {
        updateTime(parseInt(hours, 10), newMinutes);
      }
    };
  
    const handleHoursChange = (text) => {
      const value = text.replace(/[^0-9]/g, '');
      if (value.length <= 2) {
        const newHours = value ? Math.min(parseInt(value, 10), 23) : 0;
        updateTime(newHours, parseInt(minutes, 10));
      }
    };
  
    const handleMinutesChange = (text) => {
      const value = text.replace(/[^0-9]/g, '');
      if (value.length <= 2) {
        const newMinutes = value ? Math.min(parseInt(value, 10), 59) : 0;
        updateTime(parseInt(hours, 10), newMinutes);
      }
    };
  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.ShadowColor,
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginStart:15,
        marginEnd:15,
        marginVertical: 6,
        backgroundColor:COLORS.while,
        justifyContent:'space-around'
    }}>
        <View>
        <View style={{ flexDirection: 'row',}}>
            <View style={{ flexDirection: 'row' }}>

                <View>
                    <TextInput
                        style={{
                            width: 40,
                            height: 40,
                            textAlign: 'center',
                            fontSize: 14,
                        }}
                        value={hours}
                        onChangeText={handleHoursChange}
                        keyboardType="numeric"
                        maxLength={2}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={incrementHours} style={{
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{ fontSize: 12, }}>▲</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={decrementHours} style={{
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{ fontSize: 12, }}>▼</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{
                    fontSize: 20,
                    marginHorizontal: 10,
                }}>:</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <View>
                    <TextInput
                        style={{
                            width: 40,
                            height: 40,
                            textAlign: 'center',
                            fontSize: 14,
                        }}
                        value={minutes}
                        onChangeText={handleMinutesChange}
                        keyboardType="numeric"
                        maxLength={2}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={incrementMinutes} style={{
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{ fontSize: 12, }}>▲</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={decrementMinutes} style={{
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{ fontSize: 12, }}>▼</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </View>
        <View >
            <Text style={{color:COLORS.red,fontWeight:'500',fontSize:10}}>{remainingHours}</Text>
        </View>
    </View>

  );
};

const styles = StyleSheet.create({})
export default TimeInput;
