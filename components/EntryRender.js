import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLORS, ROUTENAMES } from '../constants/theme';
import { TouchableOpacity } from 'react-native';
import images from '../constants/images';

const EntryRender = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [projectDetails,setProjectDetails] =useState([]);

  
  
  return (
          <View>
                            <FlatList 
          
            data={NewEntryData}
            renderItem={(element)=>{
              
              return(  <View style={{backgroundColor:'transparent',
              borderWidth:0.5,
              borderRadius:10,
              marginHorizontal:8,
              marginVertical:4,
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
                                        }}>{element.item.project}</Text>
          
                                    <View style={{flexDirection:'row',padding:2,alignItems:'center',justifyContent:'flex-start',}}>
                                        <Image source={images.ActivityTimeIcon} style={{width:10,height:10,}}/>
                                        <Text style={{color:COLORS.primarycolor}}> 190.00 Logged Hours</Text>
                                    </View>      
                              </View>
                              
                          
                    </View>
                    <TouchableOpacity style={{padding:6}} onPress={()=>{setSelectedIndex(element.index);console.log(selectedIndex)}}>
                                  <View>
                                    
                                      {selectedIndex ===element.index ? (
                                        <Image source={ images.NewEntryRigthIcon} 
                                                style={{width:15,height:15,tintColor:COLORS.black}}/>
                                      ):( <Image source={ images.NewEntryDownIcon} 
                                                style={{width:15,height:15,tintColor:COLORS.black}}/>)}

                                  </View>
                    </TouchableOpacity>
          
              </View>)
            }}
            />

          </View>
  )
}

export default EntryRender

const styles = StyleSheet.create({})