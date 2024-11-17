import { StyleSheet, Text, View,Animated } from 'react-native'
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'; // or another icon library
const CustomToast = ({visible,message,BgColor,duration,IconName,iconColor,iconSize}) => {
    const [showToastMessage,setShowToastMessage] =React.useState(visible);
    const fadeAnim=React.useRef(new Animated.Value(0)).current;


    useEffect(()=>{
        if (visible) {
            setShowToastMessage(true);
            Animated.timing(fadeAnim,{
                toValue:1,
                duration:500,
                useNativeDriver:true,
            }).start(()=>{
                setTimeout(()=>{
                    Animated.timing(fadeAnim,{
                        toValue:0,
                        duration:500,
                        useNativeDriver:true,

                    }).start(()=>setShowToastMessage(false));
                },2000);
            });
        }
    },[visible,fadeAnim]);

    if (!showToastMessage) {
        return null;
        
    }
  return (
    <Animated.View style={[{        position: 'absolute',
      bottom: 50,
      left: '10%',
      right: '10%',
      padding: 20,
      backgroundColor:BgColor,
      flexDirection:'row',
      borderRadius: 10,
      justifyContent:'center',
      alignItems: 'center',
      zIndex: 1000,}, { opacity: fadeAnim }]}>
       <Icon name={IconName} size={iconSize} color={iconColor}/>
      <Text style={styles.text} >  {message}</Text>
    </Animated.View>
  )
}

export default CustomToast

const styles = StyleSheet.create({
    toast: {

      },
      text: {
        color: 'white',
      },
})