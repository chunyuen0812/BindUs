// 導航頁面 連接頁面在這一頁處理
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from '../src/pages/login';
import home from '../src/pages/home';
import Profile from '../src/pages/profile';
import SignUp from './pages/login/signup';
import GroupshortPage from './pages/group/groupshort';
import GrouplongPage from './pages/group/grouplong';
import Pendinglong from './pages/group/pendinglong';
import Pendingshort from './pages/group/pendingshort';
import Notice from './pages/group/notice';
import CreateGroup from './pages/creategroup';
import Deposit from './pages/group/deposit';
import Vote from './pages/group/vote';
import ContactList from './pages/contact';

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
        <Stack.Screen name="Profile" component={MainTabs}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Groupshort" component={GroupshortPage}/>
        <Stack.Screen name="Grouplong" component={GrouplongPage}/>
        <Stack.Screen name="Pendinglong" component={Pendinglong}/>
        <Stack.Screen name="Pendingshort" component={Pendingshort}/>
        <Stack.Screen name="Notice" component={Notice}/>
        <Stack.Screen name="Deposit" component={Deposit}/>
        <Stack.Screen name="Vote" component={Vote}/>
        <Stack.Screen name="ContactList" component={ContactList}/>
        <Stack.Screen name="CreateGroup" component={CreateGroup}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Nav;