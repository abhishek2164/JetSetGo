import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import Splash from '../AppScreens/Splash';
import BottomTabNavigator from '../TabBar/BottomTabBar';
import PassengersDetail from '../AppScreens/PassengersDetail';
import SearchResult from '../AppScreens/SearchResult';
const Stack = createStackNavigator();
const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Splash'}
            screenOptions={{ headerShown: false }}>
                <Stack.Screen name={'Splash'} component={Splash} />
                <Stack.Screen name={'TabScreens'} component={BottomTabNavigator} />
                <Stack.Screen name={'PassengersDetail'} component={PassengersDetail}/>
                <Stack.Screen name={'SearchResult'} component={SearchResult}/>
            </Stack.Navigator>
    )
  }
export default function Navigator() {
  return (
    <View
      style={{
        flex: 1
      }}>
     <AppStack/>
    </View>
  );
};