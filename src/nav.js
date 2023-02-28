// 導航頁面 連接頁面在這一頁處理
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from '../src/pages/login';
import home from '../src/pages/home';
import Profile from '../src/pages/profile';
import Editprofile from './pages/editprofile';
import SignUp from './pages/login/signup';
import Group from './pages/group'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" 
      component={home} 
      options={{headerShown:false,
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),}}/>
      <Tab.Screen name="Profile" 
      component={Profile} 
      options={{headerShown:false,
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),}}/>
    </Tab.Navigator>
  );
}

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
        <Stack.Screen name="Home" component={MainTabs}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Editprofile" component={Editprofile}/>
        <Stack.Screen name="Group" component={Group}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Nav;