import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, ROUTENAMES } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images';
import axios from 'axios';

import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingProcess from '../components/LoadingProcess';

const ROOT = 'https://backend.innowellgroup.com/timesheet/getalluserproject/';


const NewEntryScreen = () => {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [allProjectDetails, setAllProjectDetails] = useState([]);
    const [allPassProjectDetails, setPassProjectDetails] = useState([]);
    const [filteredProjectDetails, setFilteredProjectDetails] = useState([]);
    const [time_spentData, settime_spentData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [plannedHours, setPlannedHours] = useState('');
    const [actualHours, setActualHours] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [UserMail, setUserMail] = useState('');
    const [UserAccessLevel, setUserAccessLevel] = useState('');
    const [UserDept, setUserDept] = useState('');

    const [expanded, setExpanded] = useState({});
    const [itemLoading, setItemLoading] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();


    const transformDataPass = (data) => {
        return data.result.flatMap(project =>
          project.task_list.flatMap(task =>
            task.deliverable_info.map(deliverable => ({
              projectName: project.project_name,
              deliverable_id: deliverable._id,
              deliverable_name: deliverable.deliverable_name,
              planned_hours: deliverable.planned_hours,
              actual_hours: deliverable.actual_hours,
              planned_cost: deliverable.planned_cost
            }))
          )
        );
      };

    
    const transformData = (data) => {
//        console.log("Raw Data:", data); // Log the raw data




        return data.result.map((project, index) => {
            const deliverables = project.task_list.flatMap(task =>
                task.deliverable_info.map(deliverable => ({
                    deliverableName: deliverable.deliverable_name,
                    plannedHours: deliverable.planned_hours,
                    actualHours: deliverable.actual_hours,
                    plannedCost: deliverable.planned_cost,
                    timeSpent: deliverable.time_spent,
                    subDeliverables: deliverable.sub_deliverable_info.map(sub => ({
                        subDeliverableName: sub.sub_deliverable_name,
                        plannedHours: sub.planned_hours,
                        actualHours: sub.actual_hours,
                        plannedCost: sub.planned_cost,
                        timeSpent: sub.time_spent
                    }))
                }))
            );
    
            return {
                id: (index + 1).toString(),
                project: project.project_name,
                deliverables: deliverables,
            };
        });
    };
    
    





    const fetchData = async () => {
        try {
            const decoded = jwtDecode(await AsyncStorage.getItem('token'));
            console.log(decoded);
            console.log(decoded.uemail);
            console.log(decoded.ulevel);

            //const API_URL = ROOT + decoded.jbmail + '/' + decoded.jblevel;
            const API_URL = 'http://172.16.100.152:3000/timesheet/getalluserprojectinfo/harishpraharshu@gmail.com/User';
            console.log(API_URL);
            const response = await axios.get(API_URL);
            console.log(response.data);

            settime_spentData(response.data.projectList.map(time=>({ProjectTimeData : time.project_name,TimeSpent:time.time_spent})));
            const data =response.data;
            const transformedData = transformData(data);
            const PassData=transformDataPass(data);
            setPassProjectDetails(PassData);
            //console.log("Pass",PassData);
            setAllProjectDetails(transformedData);
            setLoading(false);
            console.log("Get Data Successfully");
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const getValues = async () => {
        try {
            const decoded = jwtDecode(await AsyncStorage.getItem('token'));
            console.log(decoded.ulevel);
            setUserMail(decoded.uemail);
            setUserAccessLevel(decoded.ulevel);
            setUserDept(decoded.udept);
            setServiceName(decoded.uservices);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        navigation.addListener('focus',async()=>{    fetchData();
            getValues();});
        
    }, []);

    const handleLogTime = (project, deliverable, subDeliverable, plannedHours, actualHours, plannedCost, timeSpent) => {
        
        
        console.log("Project: ", project);
        console.log("Deliverable: ", deliverable);
        console.log("SubDeliverable: ", subDeliverable);
        console.log("Planned Hours: ", plannedHours);
        console.log("Actual Hours: ", actualHours);

        console.log(allPassProjectDetails.flatMap(data=>data.deliverable_name===project?data.planned_hours:null));
        console.log("Planned Cost: ", plannedCost);
        console.log("Time Spent: ", timeSpent);
        navigation.navigate('LogNewEntry', { project, deliverable, subDeliverable, plannedHours, actualHours, plannedCost, timeSpent, serviceName, UserDept, UserAccessLevel, UserMail });
    };
    
    

    const toggleExpand = useCallback((id) => {
        setItemLoading(prevState => ({
            ...prevState,
            [id]: true,
        }));

        setTimeout(() => {
            setExpanded((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }));

            setItemLoading(prevState => ({
                ...prevState,
                [id]: false,
            }));
        }, 0.0); // Simulate loading time
    }, []);

    const handleChange = (query) => {
        setSearchQuery(query);
        const filtered = allProjectDetails.filter(data =>
            data.project.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProjectDetails(filtered);
    };

    const renderSubItem = useCallback((subDeliverable, deliverableName, project) => (
        <View style={styles.subItemContainer} key={subDeliverable.subDeliverableName}>
            <View style={styles.subItemTextContainer}>
                <Text style={styles.deliverableName} numberOfLines={1} ellipsizeMode="tail">
                    {deliverableName}
                </Text>
               
                <Text style={styles.subDeliverableName} numberOfLines={1} ellipsizeMode="tail">
                    {subDeliverable.subDeliverableName}
                </Text>
            </View>
            <View style={styles.logTimeButtonContainer}>
                <TouchableOpacity
                    style={styles.logTimeButton}
                    onPress={() => {handleLogTime(
                        project,
                        deliverableName,
                        subDeliverable.subDeliverableName,
                        
                        deliverableName.plannedHours,
                        deliverableName.actualHours,
                        deliverableName.plannedCost,
                        deliverableName.timeSpent
                    );
                    }}>
                    <Text style={styles.logTimeButtonText}>Log Time</Text>
                </TouchableOpacity>
            </View>
        </View>
    ), [handleLogTime]);
    
    
    
    const renderItem = useCallback(({ item }) => (
        
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <View style={styles.projectInfo}>
                    <Text style={styles.projectName} numberOfLines={1}>{item.project}</Text>
                    <View style={styles.loggedHours}>
                        <Image source={images.ActivityTimeIcon} style={styles.activityIcon} />
                        <Text style={styles.loggedHoursText}> {time_spentData.flatMap(data=>data.ProjectTimeData===item.project?data.TimeSpent:null)} Logged Hours</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.expandButton} onPress={() => toggleExpand(item.id)}>
                    {itemLoading[item.id] ? (
                        <ActivityIndicator size="small" color={COLORS.primarycolor} />
                    ) : (
                        <Icon 
                            name={expanded[item.id] ? 'chevron-right' : 'chevron-down'} 
                            size={20} 
                            color={COLORS.black} 
                        />
                    )}
                </TouchableOpacity>
            </View>
            {expanded[item.id] && item.deliverables.map(deliverable => (
                deliverable.subDeliverables.map(subDeliverable =>
                    renderSubItem(subDeliverable, deliverable.deliverableName, item.project)
                )
            ))}
        </View>
    ), [expanded, itemLoading, renderSubItem, toggleExpand]);
    
    

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    if (loading) {
        return <LoadingProcess />;
    }

    if (error) {
        return           <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.while}}>
        <View>
                <Image source={images.ServerError} style={{width:400,height:200,marginBottom:40}}/>
        </View>
        <Text style={styles.emptyText}>Server Error</Text>
      </View>;
    }

    const dataToDisplay = searchQuery.length > 0 ? filteredProjectDetails : allProjectDetails;

    return (
        <>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={images.LogoInnowellIMG} style={styles.logo} />
                    <View style={styles.searchInputContainer}>
                        <Icon name='search' size={20} color={COLORS.gray} />
                        <TextInput placeholder='Enter to Search....' onChangeText={handleChange} value={searchQuery} style={styles.searchInput} />
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                {dataToDisplay.length > 0 ? (
                    <FlatList
                        data={dataToDisplay}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        initialNumToRender={5}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                         <View>
                             <Image source={images.noRecordsImg} style={{width:200,height:200}}/>
                        </View>
                        <Text style={styles.noRecordsText}>No Records found</Text>
                    </View>
                )}
            </View>
        </>
    );
};

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
    searchContainer: {
        marginStart: 10,
        marginEnd: 20,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: COLORS.primarycolor,
        borderRadius: 20,
    },
    searchInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginStart: 10,
        marginEnd: 20,
        marginBottom: 22,
        backgroundColor: COLORS.while,
        borderWidth: 1,
        borderColor: COLORS.primarycolor,
        borderRadius: 20,
        paddingTop: 8,
        paddingBottom: 8,
        paddingStart: 8,
        paddingEnd: 100,
    },
    searchInput: {
        marginStart: 8,
    },
    content: {
        flex: 1,
        marginTop: 2,
        paddingBottom: 50,
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: COLORS.while,
        marginVertical: 2,
        marginHorizontal: 2,
        
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 2,
        marginHorizontal: 6,
        paddingStart:10,
        height: 60,
        borderColor: COLORS.ShadowColor,
        borderWidth: 0.5,
        borderRadius: 10,
    
    },
    projectInfo: {
        width: '80%',
        justifyContent: 'space-evenly',
        padding: 4
    },
    projectName: {
        alignSelf: 'flex-start',
        color: COLORS.black,
        fontSize: 16,
        fontWeight: '700'
    },
    loggedHours: {
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    activityIcon: {
        width: 10,
        height: 10
    },
    loggedHoursText: {
        color: COLORS.primarycolor,
        fontSize: 12
    },
    expandButton: {
        padding: 6
    },
    subItemContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        marginVertical: 2,
        marginHorizontal: 6,
        borderColor: COLORS.ShadowColor,
        shadowOpacity:20,
        shadowOffset:COLORS.ShadowColor,
        borderRadius: 10
    },
    subItemTextContainer: {
        width: '70%',
        justifyContent: 'space-evenly'
    },
    deliverableName: {
        marginTop: 2,
        textAlign: 'left',
        fontWeight: '600',
        marginEnd: 10,
        padding: 2,
        color: COLORS.blue,
        fontSize: 14
    },
    subDeliverableName: {
        marginTop: 2,
        flex: 2,
        marginEnd: 10,
        padding: 2,
        color: COLORS.subDeliverableNameColor, 
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 12
    },
    logTimeButtonContainer: {
        flex: 1,
        marginTop: 12,
        marginBottom: 10,
        marginEnd: 8,
        alignItems: 'flex-end',
        borderRadius: 5
    },
    logTimeButton: {
        backgroundColor: COLORS.primarycolor,
        width: 86.3,
        height: 27.74,
        padding: 4,
        borderRadius: 8.53
    },
    logTimeButtonText: {
        color: COLORS.while,
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 13,
    },
    noRecordsContainer: {
    },
    noRecordsText: {
        fontSize: 18,
        color: COLORS.black,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyText: {
        fontSize: 18,
        color: COLORS.gray,
      },
});

export default React.memo(NewEntryScreen);
