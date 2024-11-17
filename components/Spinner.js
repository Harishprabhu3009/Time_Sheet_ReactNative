import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import images from '../constants/images'

const Spinner = () => {
    <View style={{backgroundColor:'transparent',
    borderWidth:0.5,
    borderRadius:10,
    marginHorizontal:8,
    marginVertical:4,
    marginTop:30,//remove Complete
    height:60,
    justifyContent:'space-around',
    alignItems:'center',
    borderColor:COLORS.ShadowColor,
    flexDirection:'row'}}>

          <View style={{ width:'80%',justifyContent:'space-evenly'}}>
                    <View>
                        <Text numberOfLines={1} 
                              style={{alignSelf:'flex-start',
                              color:COLORS.black,
                              fontSize:18,
                              padding:4,
                              fontWeight:'700' 
                              }}>Mastfsdfjkshfkjhdsjkhfjkdhsjkhdfkjhdsjkhfkjdhsjkhdfjkhsdkjfhdkjshgfdgdgfdfggdfgfdghglhghgjhioidijdihugyugyguighigufdtf erInakkamInakkam</Text>

                          <View style={{flexDirection:'row',padding:2,alignItems:'center',justifyContent:'flex-start',}}>
                              <Image source={images.ActivityTimeIcon} style={{width:10,height:10,}}/>
                              <Text style={{color:COLORS.primarycolor}}> 190.00 Logged Hours</Text>
                          </View>      
                    </View>
                    
                 
          </View>
          <View style={{padding:6}}>
                        <TouchableOpacity>
                           <Image source={images.NewEntryRigthIcon} 
                                  style={{width:15,height:15,tintColor:COLORS.black}}/>
                        </TouchableOpacity>
          </View>

    </View>
  
}

export default Spinner

const styles = StyleSheet.create({})