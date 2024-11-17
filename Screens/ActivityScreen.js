import React, { useEffect, useState, useRef } from 'react';

import { Alert, BackHandler, FlatList, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon6 from 'react-native-vector-icons/FontAwesome6';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import LoadingProcess from '../components/LoadingProcess';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import EditNewEnrty from '../components/EditNewEntry';

const ActivityScreen = () => {
  const [allProjectDetails, setAllProjectDetails] = useState([]);
  const [filteredProjectDetails, setFilteredProjectDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [undoVisible, setUndoVisible] = useState(false);
  const [UserMail, setMail] = useState('');
  const [UserAccessLevel, setUserAccessLevel] = useState('');
  const [UserDept, setUserDept] = useState('');
  const [serviceName, setserviceName] = useState(false);



  const timerRef = useRef(null);

  const ROOT = 'http://192.168.43.247:3000/timesheet/gettimesheetdateprojectinfo/';
  const ROOTDel = 'http://192.168.43.247:3000/timesheet/removetaskdata/';

  const handleDelete = (id) => {
    const itemToDelete = allProjectDetails.find(item => item._id === id);
    setDeletedItem(itemToDelete);
    setAllProjectDetails(prevDetails => prevDetails.filter(item => item._id !== id));
    setFilteredProjectDetails(prevDetails => prevDetails.filter(item => item._id !== id));
  };
 
  const handleRemoveTaskList = async (id) => {
    handleDelete(id);
    setUndoVisible(true);
    timerRef.current = setTimeout(() => {
      setUndoVisible(false);
      setDeletedItem(null);
      finalizeDelete(id);
    }, 5000);
  };

  const finalizeDelete = async (id) => {
    try {
      const removetasklist = `${ROOTDel}${id}`;
      await axios.get(removetasklist);
    } catch (err) {
      console.log(err);
      fetchData();
    }
  };


   


  const handleUndo = () => {
    clearTimeout(timerRef.current);
    setAllProjectDetails(prevDetails => [deletedItem, ...prevDetails]);
    setFilteredProjectDetails(prevDetails => [deletedItem, ...prevDetails]);
    setDeletedItem(null);
    setUndoVisible(false);
  };

  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]
    );
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [])
  );

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
     

      const decoded = jwtDecode(await AsyncStorage.getItem('token'));
      const API_URL = `${ROOT}${decoded.uemail}/${decoded.ulevel}`;
      console.log(API_URL);
      const response = await axios.get(API_URL);
      console.log(response.data);
      const data = response.data.result
        .map(item => ({
          _id: item._id,
          project_name: item.projectname,
          deliverable_name: item.deliverablename,
          subdeliverable_name: item.subdeliverablename,
          start_date: item.date,
          time_spent: item.timespent,
          //actual_hours:item.actual_hours,
          //planned_hours:item.planned_hours,
          //planned_cost:item.planned_cost,
          notes:item.note,
          selected_revision:item.selectedrevision

        }))
        .sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

      setAllProjectDetails(data);
      setFilteredProjectDetails(data);
    } catch (error) {
      setError(error.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const getValues = async () => {
    try {
        
        const decoded = jwtDecode(await AsyncStorage.getItem('token'));
        setMail(decoded.uemail);
        setUserAccessLevel(decoded.ulevel);
        setUserDept(decoded.udept);
        setserviceName(decoded.uservices);

    } catch (error) {
        console.error('Error : ', error); 
    }
};



  useEffect(() => {
    navigation.addListener('focus',async()=>{fetchData();
      getValues();});
    
   
  }, []);

  const navigation = useNavigation();

  const handleChange = (query) => {
    setSearchQuery(query);
    const filteredDetails = allProjectDetails.filter(data =>
      data.project_name.toLowerCase().includes(query.toLowerCase()) ||
      data.deliverable_name.toLowerCase().includes(query.toLowerCase()) ||
      data.subdeliverable_name.toLowerCase().includes(query.toLowerCase()) ||
      new Date(data.start_date).toLocaleDateString().includes(query.toLowerCase()) ||
      data.time_spent.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjectDetails(filteredDetails);
  };

  const renderRightActions = (id) => {
    return (
      <View style={styles.rightAction}>
        <Image source={images.DeleteIcon} style={{ width: 25, height: 25 }} />
      </View>
    );
  };

  const renderLeftActions = (id) => {
    return (
      <View style={styles.leftAction}>
        <Image source={images.EditIcon} style={{ width: 25, height: 25 }} />
      </View>
    );
  };
  
  const handleEditTaskList = async (id,
                                    project,
                                    deliverable,
                                    subdeliverable,
                                    Edit_Start_date,
                                    Edit_timespent,
                                    Edit_actual_hours,
                                    Edit_planned_hours,
                                    Edit_planned_cost,
                                    Edit_note,
                                    Edit_selected_revision) => {
        console.log(id);
        console.log(Edit_note);
  
    navigation.navigate('EditLogNewEntry', { id,
                                             project,
                                             deliverable,
                                             subdeliverable,
                                             Edit_Start_date,
                                             Edit_timespent,
                                             Edit_actual_hours,
                                             Edit_planned_hours,
                                             Edit_planned_cost,
                                             Edit_note,
                                             Edit_selected_revision,
                                             serviceName,
                                             UserDept,
                                             UserAccessLevel, 
                                             UserMail});
   
  };


  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View>
              <Image source={images.noRecordsImg} style={{width:200,height:200}}/>
      </View>
      <Text style={styles.emptyText}>No Records Found</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item._id)}
      onSwipeableRightOpen={() => handleRemoveTaskList(item._id)}
      renderLeftActions={() => renderLeftActions(item._id)}
      onSwipeableLeftOpen={() =>{ handleEditTaskList(item._id,
                                                    item.project_name,
                                                    item.deliverable_name,
                                                    item.subdeliverable_name,
                                                    new Date(item.start_date).toLocaleDateString()||item.start_date,
                                                    item.time_spent,
                                                    item.actual_hours,
                                                    item.planned_hours,
                                                    item.planned_cost,
                                                    item.notes,
                                                    item.selected_revision);
                                                    console.log("Note",item.notes);}}>

      <View>
        <View style={styles.item}>
          <View style={{ width: '70%', justifyContent: 'space-evenly' }}>
            <View>
              <Text numberOfLines={1} style={styles.project}>{item.project_name}</Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.deliverable}>{item.deliverable_name}</Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.subDeliverable}>{item.subdeliverable_name}</Text>
            </View>
          </View>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeRow}>
              <Image source={images.ActivityDateIcon} style={{ width: 10, height: 10 }} />
              <Text style={styles.date}> {new Date(item.start_date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <Image source={images.ActivityTimeIcon} style={{ width: 15.15, height: 12.16 }} />
              <Text style={styles.time}>{item.time_spent}  Hrs</Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  const renderFooter = () => {
    if (!undoVisible) return null;
    return (
      <View> 
                <View style={styles.undoContainer}>
                    <Text>LogTime Delete</Text>
                    <TouchableOpacity onPress={handleUndo}>
                      <Text style={styles.undoText}>UNDO</Text>
                    </TouchableOpacity>
              </View>
      </View>
    );
  };

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
      <GestureHandlerRootView style={{ flex: 1 ,backgroundColor:COLORS.while}}>
       <View style={styles.content}>
        {loading ? (
          <LoadingProcess />
        ) : error ? (
          <View style={styles.emptyContainer}>
          <View>
                  <Image source={images.ServerError} style={{width:400,height:200,marginBottom:40}}/>
          </View>
          <Text style={styles.emptyText}>Server Error</Text>
        </View>
        ) : filteredProjectDetails.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View>
              <Image source={images.noRecordsImg} style={{width:200,height:200}}/>
           </View>
            <Text>No Records Found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProjectDetails}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            onRefresh={fetchData}
            refreshing={loading}
            ListEmptyComponent={ListEmptyComponent}
            renderFooter={renderFooter}
            
          />
        )}
      </View>
    </GestureHandlerRootView>
    
      </>
        
  );
};

export default ActivityScreen;

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
    marginEnd: 12,
    marginBottom: 22,
    backgroundColor: COLORS.while,
    borderWidth: 1,
    borderColor: COLORS.primarycolor,
    borderRadius: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginStart: 10,
    marginEnd: 80,
    marginBottom: 22,
    backgroundColor: COLORS.while,
    borderWidth: 1,
    borderColor: COLORS.primarycolor,
    borderRadius: 20,
    
    paddingTop: 8,
    paddingBottom: 2,
    paddingStart: 8,
    paddingEnd: 100,
  },
  searchInput: {
    marginStart: 8,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.while,
    marginTop: 1,
    paddingTop: 4,
    paddingBottom: 20,
    marginBottom: 56,
  },
  item: {
    backgroundColor: COLORS.while,
    borderWidth: 0.5,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: COLORS.ShadowColor,
    flexDirection: 'row',
  },
  project: {
    alignSelf: 'flex-start',
    color: COLORS.black,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: 4,
    paddingEnd: 4,
    fontWeight: '700',
  },
  deliverable: {
    alignSelf: 'flex-start',
    color: COLORS.blue,
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: 4,
    paddingEnd: 4,
    fontWeight: '400',
  },
  subDeliverable: {
    alignSelf: 'flex-start',
    color: COLORS.subDeliverableNameColor,
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 8,
    paddingStart: 4,
    paddingEnd: 4,
    fontWeight: '400',
  },
  dateTimeContainer: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    justifyContent: 'space-around',
  },
  icon: {
    width: 10,
    height: 10,
  },
  date: {
    color: COLORS.blue,
    fontSize: 12,
  },
  time: {
    color: COLORS.blue,
    fontSize: 12,
  },
  circleBtnContainer: {
    flexDirection: 'row',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  undoContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  undoText: {
    color: COLORS.blue,
    fontWeight: 'bold',
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 6,
    marginStart: 10,
    marginEnd: 10,
    width: 60,
    height: '92%',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  leftAction: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
    marginStart: 10,
    marginEnd: 10,
    width: 60,
    height: '92%',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
});
