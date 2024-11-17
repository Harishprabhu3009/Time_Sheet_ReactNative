import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../constants/theme';
import CustomInput2 from '../components/CustomInput2';
import RadioButton from '../components/RadioButton';
import BtnWithIcon from '../components/BtnWithIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images';
import axios from 'axios';
import CustomToast from '../components/CustomToast';
import TimeInput from '../components/TimeInput';

const LogNewEntryScreen = ({ route }) => {

    const { project, deliverable, subDeliverable, serviceName, UserDept, UserAccessLevel, UserMail } = route.params;
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Internal Revision', 'External Revision', 'No Revision'];
    const plannedHours = '40:00';
    const [inputValue, setInputValue] = useState('');
    const [remainingHours, setRemainingHours] = useState('00:00');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textDate, setTextDate] = useState(getCurrentDate);
    const [DatePickers, setDatePickers] = useState('');
    const [note, setNotes] = useState('');
    const [start_date, setStart_date] = useState('');
    const [selected_revision, setselected_revision] = useState('');
    const [time_spent, settime_spent] = useState('');

    const getCurrentDate = () => {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const [toastVisible, setToastVisible] = useState(false);

    const showToast = () => {
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 2500); // Toast visibility duration
    };

    const ROOT = 'http://172.16.100.152:3000/timesheet/savetaskdata';
  
    const handleSaveData = async () => {
        const data = {
            projectname: project,
            deliverablename: deliverable,
            subdeliverablename: subDeliverable,
            department: UserDept,
            userlevel: UserAccessLevel,
            selectedrevision: selected_revision,
            notes: note,
            timespent: time_spent,
            umail: UserMail,
            serviceName: serviceName,
            date: InputDate() || new Date() 
        };
        console.log('Start : ',start_date)
        //console.log(ROOT, {data});

        try {
            const response = await axios.post(ROOT, data);
            console.log(ROOT,data);
            console.log(response.data);
            
            console.log('Success', 'Log data saved successfully');
            showToast();
            
        } catch (error) {
            console.error(error);
            console.log('Error', 'An error occurred while saving Log data');
        }
    };

    const onChangeHours = (text) => {
     
        console.log("Text : ",text);
        if (text==='') {
            Alert.alert('Please Select the Time Spent');            
        } else {
            setInputValue(text);
            settime_spent(text);

            const [hours, minutes] = text.split(':').map(Number);
            const totalInputMinutes = (hours * 60) + minutes;

            const [plannedHoursStr, plannedMinutesStr] = plannedHours.split(':').map(Number);
            const totalPlannedMinutes = (plannedHoursStr * 60) + plannedMinutesStr;

            const remainingMinutes = totalPlannedMinutes - totalInputMinutes;

            const remainingHours = Math.floor(remainingMinutes / 60);
            const remainingMins = remainingMinutes % 60;
            const formattedRemainingHours = `${remainingHours.toString().padStart(2, '0')}:${remainingMins.toString().padStart(2, '0')}`;

            setRemainingHours(formattedRemainingHours);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        console.log("DataPicker : ",fDate);
        setDatePickers(fDate);
        //setTextDate(fDate);

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const InputDate = () => {

        
        if (show) {
            
            return DatePickers;

        }else if(DatePickers!==null){
            return DatePickers || getCurrentDate();
        }
         else {
            console.log("Date of show",DatePickers);
            return getCurrentDate();
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.while }}>
            <View style={{ paddingTop: 40, width: 'auto', borderBottomStartRadius: 20, borderBottomRightRadius: 20, backgroundColor: COLORS.primarycolor, flexDirection: 'row', alignItems: 'flex-start' }}>
                <Image
                    source={images.LogoInnowellIMG}
                    style={{ width: 35, height: 34.19, marginStart: 15, marginBottom: 20 }}
                />
            </View>
            <ScrollView style={{ margin: 4 }}>
                <View style={{ backgroundColor: COLORS.while, marginTop: 4, marginStart: 12, marginEnd: 12, alignItems: 'stretch' }}>
                    <View>
                        <Text style={{ alignSelf: 'flex-start', textAlignVertical: 'center', textAlign: 'justify', padding: 1, fontSize: 18, fontWeight: '900', color: COLORS.black }}>{project}</Text>
                    </View>
                    <View>
                        <Text style={{ alignSelf: 'flex-start', marginTop: 2, textAlign: 'left', padding: 1, fontSize: 16, fontWeight: '500', color: COLORS.blue }}>{deliverable}</Text>
                    </View>
                    <View>
                        <Text style={{ alignSelf: 'flex-start', marginTop: 2, textAlign: 'left', padding: 1, fontSize: 14, fontWeight: '400', color: COLORS.subDeliverableNameColor }}>{subDeliverable}</Text>
                    </View>
                    <View style={{ marginTop: 8, borderWidth: 1, borderRadius: 6, borderColor: COLORS.ShadowColor, backgroundColor: COLORS.while }}>
                        <View>
                            <Text style={{ fontSize: 16, textAlign: 'left', fontWeight: '500', marginStart: 6 }}>Date<Text style={{ color: COLORS.red }}> *</Text></Text>
                        </View>
                        <View style={{ marginTop: 10 }} >
                            <CustomInput2
                                source={images.CalendarIcon}
                                width={20}
                                height={20}
                                value={InputDate()}
                                onPress={() => showMode('date')}
                            />
                        </View>
                        {show && (
                            <DateTimePicker
                                testID='dateTimePicker'
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display='default'
                                onChange={onChange}
                            />
                        )}
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={{ fontSize: 16, alignItems: 'flex-start', textAlign: 'left', fontWeight: '500', marginStart: 6 }}>
                                    Time Spent 
                                    <Text style={{ color: COLORS.red }}> *</Text>
                                </Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 10, marginStart: 30, marginTop: 5, color: COLORS.red, fontWeight: '500' }}>Planned hours <Text style={{ color: COLORS.primarycolor }}>{plannedHours}</Text> | Actual Hours <Text style={{ color: COLORS.primarycolor }}>{inputValue}</Text></Text>
                            </View>                
                        </View>
                        <View style={{ marginTop: 10 }} >
                            <TimeInput onChange={onChangeHours} remainingHours={`${remainingHours}  Remaining Hours`} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, textAlign: 'left', fontWeight: '500', marginStart: 6, marginTop: 12 }}>Select Revision</Text>
                        </View>
                        <View>
                            <RadioButton
                                options={options}
                                selectedOption={selectedOption}
                                onSelect={(option) => {
                                    setSelectedOption(option);
                                    setselected_revision(option);
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, textAlign: 'left', fontWeight: '500', marginStart: 6, marginTop: 12 }}>Note</Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.textArea}
                                multiline
                                onChangeText={(text) => {
                                    setNotes(text);
                                }}
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 18, marginBottom: 10 }}>
                            <View>
                                <BtnWithIcon
                                    title={'SAVE'}
                                    width={23}
                                    heigth={25}
                                    source={images.SaveIcon}
                                    IconColor={COLORS.while}
                                    borderColor={COLORS.primarycolor}
                                    color={COLORS.primarycolor}
                                    onPress={handleSaveData}
                                />
                            </View>
                            <View style={{ marginStart: 50 }}>
                                <BtnWithIcon
                                    title={'BACK'}
                                    width={20}
                                    heigth={20}
                                    source={images.BackIcon}
                                    IconColor={COLORS.primarycolor}
                                    color={COLORS.while}
                                    borderColor={COLORS.ShadowColor}
                                    onPress={() => navigation.goBack()}
                                />
                            </View>
                        </View>
                        <CustomToast visible={toastVisible} IconName={"checkcircle"} BgColor={'green'} iconSize={20} iconColor={COLORS.while} message="Saved Data Successfully!" />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default LogNewEntryScreen;

const styles = StyleSheet.create({
    textArea: {
        height: 100,
        borderColor: COLORS.ShadowColor,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginStart: 10,
        marginBottom: 10,
        marginEnd: 10,
        borderRadius: 10,
        textAlignVertical: 'top', // Ensure the text is aligned to the top
    },
});
