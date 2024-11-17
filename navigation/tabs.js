import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import { ActivityScreen, ProjectScreen, NewEntryScreen, AccountScreen } from '../Screens';
import { COLORS, animate1, animate2, circle1, circle2 } from '../constants/theme';
import images from '../constants/images';


const TabArr = [
  { route: 'Activity', label: 'Activity', icon: images.activity, component: ActivityScreen },
  { route: 'New Entry', label: 'New Entry', icon: images.NewEntry, component: NewEntryScreen },
  { route: 'Account', label: 'Account', icon: images.Account, component: AccountScreen },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(animate1);
      circleRef.current?.animate(circle1);
      textRef.current?.transitionTo({ scale: 1 });
    } else {
      viewRef.current?.animate(animate2);
      circleRef.current?.animate(circle2);
      textRef.current?.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={1}>
      <Animatable.View ref={viewRef} duration={900} style={styles.container}>
        <View
          style={[
            styles.btn,
            {
              borderBottomColor: focused ? COLORS.while : COLORS.primarycolor,
              borderStartColor: focused ? COLORS.while : COLORS.primarycolor,
              borderEndColor: focused ? COLORS.while : COLORS.primarycolor,
              borderTopColor: focused ? COLORS.while: COLORS.primarycolor,
            },
          ]}
        >
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Image
            resizeMode="contain"
            source={item.icon}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.while,
            }}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle: {
          position: 'absolute',
          height: 67,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: COLORS.primarycolor,
          
        },
      }}
    >
      
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius:50,
    backgroundColor: COLORS.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.while,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primarycolor,
    borderRadius: 25,
    
  },
});

