// 導航頁面 連接頁面在這一頁處理
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from '../src/pages/login';
import home from '../src/pages/home';
import Profile from '../src/pages/profile';
import BindCard from '../src/pages/profile/bindcard';
import SignUp from './pages/login/signup';
import GroupPage from './pages/group/grouppage';
import Pending from './pages/group/pending';
import Notice from './pages/group/notice';
import CreateGroup from './pages/creategroup';
import Deposit from './pages/group/deposit';
import Vote from './pages/group/vote';
import ContactList from './pages/contact';
import Spending from './pages/spending';
import Assign from './pages/spending/assign';
import Payment from './pages/spending/payment';
import Photo from './pages/spending/photo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home Page" 
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
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
        <Stack.Screen name="Home" component={MainTabs}/>
        <Stack.Screen name="Bind" component={BindCard}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Group" component={GroupPage}/>
        <Stack.Screen name="Pending" component={Pending}/>
        <Stack.Screen name="Notice" component={Notice}/>
        <Stack.Screen name="Deposit" component={Deposit}/>
        <Stack.Screen name="Vote" component={Vote}/>
        <Stack.Screen name='Spend'component={Spending}/>
        <Stack.Screen name='Assign' component={Assign}/>
        <Stack.Screen name='Payment' component={Payment}/>
        <Stack.Screen name='Photo' component={Photo}/>
        <Stack.Screen name="ContactList" component={ContactList}/>
        <Stack.Screen name="CreateGroup" component={CreateGroup}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Nav;