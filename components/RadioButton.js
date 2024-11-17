import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';

const RadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => onSelect(option)}
        >
          <View style={styles.radioCircle}>
            {selectedOption === option && <View style={styles.selectedRb} />}
          </View>
          <Text style={styles.radioText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}   

export default RadioButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginStart:10,
        marginTop:10
        
      },
      optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.ShadowColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      },
      selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primarycolor,
      },
      radioText: {
        fontSize: 16,
        paddingStart:1,
        paddingEnd:14
      },
})