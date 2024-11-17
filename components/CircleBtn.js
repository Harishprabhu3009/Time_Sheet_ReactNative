import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // or another icon library

const CircleBtn = ({source,width,height,bgColor,borderColor,IconSize,IconColor,onPress}) => {
  return (
    <TouchableOpacity style={{        height: 26,
        width: 26,
        
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor:bgColor,
        borderColor: borderColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
}} onPress={onPress}>
     <Image source={source} style={{backgroundColor:IconColor,width:width,height:height}} />
    </TouchableOpacity>
  )
}

export default CircleBtn

const styles = StyleSheet.create({
   
})