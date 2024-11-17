import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButton = ({
    onPress, title,style,  textStyle,color
}) => {
    
        
    
  return (
    <TouchableOpacity onPress={onPress} style={[{backgroundColor: color,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    
    justifyContent: 'center',},style]}>
      <Text style={[{color: '#fff',
    fontWeight:'900',},textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
 }



export default CustomButton

const styles = StyleSheet.create({})