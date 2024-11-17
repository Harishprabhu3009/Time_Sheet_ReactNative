import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Fontisto'; // or another icon library   //
import { COLORS } from '../constants/theme';//arrow-return-left

const BtnWithIcon = ({source,width,heigth,onPress,IconColor,borderColor,textStyle,StyleContainer,color,title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[{borderColor:borderColor,flexDirection:'row',borderWidth:0.5,width:95,height:31,borderRadius: 10,alignItems: 'center',backgroundColor:color,justifyContent: 'center'},StyleContainer]}>
        <Image source={source} style={{width:width,height:heigth}}/>
            <Text style={[{textAlign:'center',fontSize:14,fontWeight:'900',color:IconColor},textStyle]}> {title}</Text>
        
    </TouchableOpacity>            
  )
}

export default BtnWithIcon

const styles = StyleSheet.create({})