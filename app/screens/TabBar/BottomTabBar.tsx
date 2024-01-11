import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator ,BottomTabBar} from '@react-navigation/bottom-tabs';
import FlightSearch from './TabScreens/FlightSearch';
import { SvgXml } from 'react-native-svg';
import InProgress from '../AppScreens/InProgress';
import { IMAGES } from '../../../assets/Images/images';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator(props:any){
    const renderIcon = (focused: any,activeIcon:any,inActiveIcon:any) => {
        return (
            <>
        <Image source={focused ? activeIcon:inActiveIcon} style={{height:25,width:25}}/>
        </>
        )
    }
    const renderLabel = (focused: any, label:any) => {
        return (
            <Text style={{fontSize:10,fontWeight:focused ? "bold":"normal",color:focused ? "black":"grey" ,marginBottom:10}}>
               {label}
            </Text>
        )
    }
    return(
        <Tab.Navigator
        initialRouteName={'Book'}
        backBehavior="history"
        tabBarOptions={{
            style:{height:60},
            keyboardHidesTabBar:true
        }}
        >
               <Tab.Screen
                name={'Home'}
                component={InProgress}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => renderIcon(focused,IMAGES.activeHome,IMAGES.inactiveHome),
                    tabBarLabel:({ focused }) => renderLabel(focused, "Home"),
                })}
            />
               <Tab.Screen
                name={'Book'}
                component={FlightSearch}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => renderIcon(focused,IMAGES.activeBook,IMAGES.inactiveBook),
                    tabBarLabel:({ focused }) => renderLabel(focused, "Book"),
                })}
            />
            <Tab.Screen
                name={'Check-in'}
                component={InProgress}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => renderIcon(focused,IMAGES.activeCheckIn,IMAGES.inactiveCheckIn),
                    tabBarLabel:({ focused }) => renderLabel(focused, "Check-in"),
                })}
            />
             <Tab.Screen
                name={'Flight Status'}
                component={InProgress}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => renderIcon(focused,IMAGES.activeStatus,IMAGES.inactiveStatus),
                    tabBarLabel:({ focused }) => renderLabel(focused, "Flight Status"),
                })}
            />
             <Tab.Screen
                name={'My Bookings'}
                component={InProgress}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => renderIcon(focused,IMAGES.activeMyBooking,IMAGES.inactiveMyBooking),
                    tabBarLabel:({ focused }) => renderLabel(focused, "My Bookings"),
                })}
            />
            </Tab.Navigator>
    )
}
const styles=StyleSheet.create({

})
