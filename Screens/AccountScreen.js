import { Alert, BackHandler, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { COLORS } from '../constants/theme';
import images from '../constants/images';
import CustomSwitchButton from '../components/CustomSwitchBtn';
import {jwtDecode} from 'jwt-decode';
import BtnWithIcon from '../components/BtnWithIcon';
import { CustomInputBox } from '../components';
import CustomToast from '../components/CustomToast';
import ChangePassDialog from '../components/ChangePassDialog';

const AccountScreen = () => {
    const navigation = useNavigation();
    const [UserName, setUserName] = useState('');
    const [UserMail, setMail] = useState('');
    const [UserAccessLevel, setUserAccessLevel] = useState('');
    const [UserDept, setUserDept] = useState('');
    const [UserTFA, setUserTFA] = useState(false);
    const [UserBuildID, setUserBuildID] = useState('');
    const [ChangePass, SetChangePass] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastVisibleOFF, setToastVisibleOFF] = useState(false);
    
    const root = 'http://172.16.100.152:3000/timesheet/changetfa/';

    const handleOpenDialog = () => {
        SetChangePass(true);
    };

    const handleCloseDialog = () => {
        SetChangePass(false);
    };

    const SignOut = async () => {
        await AsyncStorage.setItem('LoggedIn', '');
        await AsyncStorage.setItem('token', '');
        navigation.navigate('NavSignout');
    };


    const selectedPhoto=()=>{
        console.log("ImagePress");
        
    };
    const getValues = async () => {
        try {
            
            const decoded = jwtDecode(await AsyncStorage.getItem('token'));
            setMail(decoded.uemail);
            setUserName(decoded.uname);
            setUserAccessLevel(decoded.ulevel);
            setUserDept(decoded.udept);
            setUserTFA(decoded.utfa);
            setUserBuildID(decoded.BuildID);
            //setSwitchValue(UserTFA);
            if (decoded.utfa===true) {
                setSwitchValue(true);
            } else if (decoded.utfa===false) {
                setSwitchValue(false);
            } 

        } catch (error) {
            console.error('Error : ', error);
        }
    };

    
    const handleSwitchChange = async (value) => {
        setSwitchValue(value);
        try {
            const SwitchInfo = `${root}${UserBuildID}/${value}`;
            const response = await axios.get(SwitchInfo);
            console.log(response.data.tfa_status);

            if (response.data.tfa_status === true) {
                showToastON();
                console.log("Status : ",true);

            } else if(response.data.tfa_status === false) {
                showToastOFF();
                console.log("Status : ",false);
            }else{
                console.log("SwitchApi : ",false);
                setSwitchValue(false);
            }
        } catch (err) {
            console.log('Error: ', err);
        }
        console.log('Switch is now ', value ? 'On' : 'Off');
    };

    useEffect(() => {
        getValues();

    }, []);

    const [switchValue, setSwitchValue] = useState(true);

    const showToastON = () => {
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 2500);
    };

    const showToastOFF = () => {
        setToastVisibleOFF(true);
        setTimeout(() => {
            setToastVisibleOFF(false);
        }, 2500);
    };

    return (
        <>
        <View style={{ paddingTop: 40,
                        height:101,
                        width: 'auto',
                        borderBottomStartRadius: 20,
                        borderBottomEndRadius: 20,
                        backgroundColor: COLORS.primarycolor,
                        flexDirection: 'row',
                        alignItems: 'flex-start',}}>
                <View style={{flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',}}>
                        <Image
                                source={images.LogoInnowellIMG}
                                style={{     width: 35,
                                        height: 34.19,
                                        marginStart: 15,
                                        marginBottom: 20, }}
                        />
                </View>
        </View>



        <View style={{
                flex: 1,
                backgroundColor:COLORS.while,
        }}>


                <View style={{
                        alignItems: 'center',
                        alignSelf: 'center'
                }}>
                        <View style={{ marginTop: 20 }}>
                                <View style={{
                                        height: 140,
                                        width: 140,
                                        borderRadius: 80,
                                        borderWidth: 1,
                                        backgroundColor: COLORS.while,
                                        borderColor: COLORS.blue,
                                        alignItems: 'center',
                                        marginRight: 10,
                                }}>
                                
                                <TouchableOpacity   onPress={()=>selectedPhoto}
                                                    style={{marginTop:1,borderRadius: 80,backgroundColor:COLORS.red}}> 
                                    <Image source={images.defaultProfile}  style={{height:136,
                                                                                  width:136,
                                                                                  borderRadius:65,
                                                                                  borderWidth:1,
                                                                                
                                    }}/>
                                </TouchableOpacity>

                                </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                                <Text style={{
                                        textAlign: 'center',
                                        fontSize: 16,
                                        fontWeight: '500',
                                        color: COLORS.black
                                }} >{UserMail}</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                                <Text style={{
                                        textAlign: 'center',
                                        fontSize: 16,
                                        fontWeight: '500',
                                        color: COLORS.red
                                }} >{UserName}</Text>
                        </View>
                </View>
                <View>
                        <View>
                                <TouchableOpacity onPress={handleOpenDialog}
                                        style={{ marginTop: 26, backgroundColor: 'transparent', padding: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <View style={{ width: '75%', }}>
                                                <Text style={{
                                                        textAlign: 'left',
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        color: COLORS.black
                                                }} >Change Password</Text>
                                        </View>
                                        <View style={{ padding: 3 }}>
                                                <Image source={images.ChangePassIcon} style={{ width: 20, height: 20 }} />
                                        </View>
                                </TouchableOpacity>
                        </View>
                        <View>
                                <View style={{ marginTop: 10, backgroundColor: 'transparent', padding: 14, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <View style={{ width: '75%', }}>
                                                <Text style={{
                                                        textAlign: 'left',
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        color: COLORS.black
                                                }} >Two Factor Authentication</Text>
                                        </View>
                                        <View style={{ padding: 1 }}>
                                                <CustomSwitchButton value={switchValue} onValueChange={handleSwitchChange}/>
                                        </View>
                                </View>
                        </View>





                        <ChangePassDialog
                                visible={ChangePass}
                                onClose={handleCloseDialog}
                                JBuilder={UserBuildID}
                        />



                        <View>
                                <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'transparent', padding: 8, flexDirection: 'row', justifyContent: 'space-around' }}
                                        onPress={() => SignOut()}>
                                        <View style={{ width: '75%', }}>
                                                <Text style={{
                                                        textAlign: 'left',
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        color: COLORS.black
                                                }} >Log Out</Text>
                                        </View>
                                        <View style={{ padding: 3 }}>
                                                <Image source={images.LogOutIcon} style={{ width: 20, height: 20 }} />
                                        </View>
                                </TouchableOpacity>
                        </View>

                        <View style={{marginTop:200}}>
                                                
                                <CustomToast visible={toastVisible} IconName={"checkcircle"} BgColor={'green'} iconSize={20} iconColor={COLORS.while} message="Two Factor is Turn ON !" />
                                <CustomToast visible={toastVisibleOFF} IconName={"closecircle"} BgColor={'red'} iconSize={20} iconColor={COLORS.while} message="Two Factor is Turn OFF !" />
                        </View>
                
                </View>


                

        </View>
</>

    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    header: {
        paddingTop: 40,
        height: 101,
        width: 'auto',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        backgroundColor: COLORS.primarycolor,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    logo: {
        width: 35,
        height: 34.19,
        marginStart: 15,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.while,
    },
    profileContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    profileImage: {
        height: 124.08,
        width: 125,
        borderRadius: 65,
        borderWidth: 1,
        backgroundColor: COLORS.blue,
        borderColor: COLORS.blue,
        alignItems: 'center',
        marginRight: 10,
    },
    emailText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.black,
        marginTop: 10,
    },
    userNameText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.red,
        marginTop: 10,
    },
    optionContainer: {
        marginTop: 26,
        backgroundColor: 'transparent',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionTextContainer: {
        width: '75%',
    },
    optionText: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.black,
    },
    optionIconContainer: {
        padding: 3,
    },
    optionIcon: {
        width: 20,
        height: 20,
    },
    toastContainer: {
        marginTop: 200,
    },
});
