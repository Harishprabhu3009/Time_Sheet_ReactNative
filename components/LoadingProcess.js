import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const LoadingProcess = () => {
  return (
    <View style={{flex:1,
                  alignItems:'center',
                  justifyContent:'center',
                  backgroundColor:'rgba(0, 0, 0, 0.5)'
    }}>
      <Text>Please Wait!</Text>
    </View>
  )
}

export default LoadingProcess

const styles = StyleSheet.create({})