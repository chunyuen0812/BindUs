import {StyleSheet,Text, View } from 'react-native'
import{ NavBar, Button} from 'galio-framework';
import React, { Component, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + ' - '  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

const longdata= [  
{ label: 'Disband', value: '1' },
{ label: 'Early Completion', value: '2' },
{ label: 'Loan', value: '3' },
{ label: 'New Member', value: '4' },
{ label: 'Time Extention', value: '5' },
{ label: 'Withdrawal', value: '6' },
];

const shortdata= [  
  { label: 'Disband', value: '1' },
  { label: 'Early Completion', value: '2' },
  { label: 'New Member', value: '3' },
  { label: 'Time Extention', value: '4' },
  { label: 'Withdrawal', value: '6' },
  ];

const Vote=({route})=>{// main program start---------------------------------------------
  const [value, setValue] = useState(null);
  const navigation=useNavigation();
  const goaltype=route.params.goaltype;
  
const voteType =()=> {
  if (goaltype=='long'){
    return longdata;
  }else{
    return shortdata;
  }
  
  ;}
  const renderGroupinfo=()=>{
    return(
      <View style={{flexDirection:'row',justifyContent:'center', padding:15}}>
        <View style={{flexDirection:'column', flex:1}}>
          <Text style={styles.subtitle1}>Current progress: </Text>
          <Text style={styles.subtitle1}>Goal Final End Date: </Text>
          <Text style={styles.subtitle1}>Number of members: </Text>
          <Text style={styles.subtitle1}>Last Sync: </Text>
        </View>
        <View style={{flexDirection:'column'}}>
          <Text style={styles.subtitle2}>${route.params.progress}/ ${route.params.target} ({Math.round(route.params.progress/route.params.target*100)}%)</Text>
          <Text style={styles.subtitle2}>{route.params.endDate}</Text>
          <Text style={styles.subtitle2}>{route.params.memberCount}</Text>
          <Text style={styles.subtitle2}>{datetime}</Text>
        </View>
      </View>      
    );
  }
    return (
      <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Vote" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
      <Text style={styles.subtitle1}>Vote Type:</Text>
      
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={voteType()}
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder="Vote Type"
        activeColor='lightgrey'
        value={voteType().value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="purple" name="form" size={20} />
        )}
      />
      {value>=1&&value<=5?renderGroupinfo():null}
      <Button color='success' round style={styles.confirmbutton} onPress={()=>console.log(value+datetime)}>Confirm</Button>
      </View>
    )
  }


const styles= StyleSheet.create({
  confirmbutton:{
    alignSelf:'center',
  },
    header:{
      marginTop:25,
      backgroundColor:'lightgrey',
    },
    title:{
      fontSize: 32,
      color:'black',
      fontWeight:'bold'
    },
    name:{
      fontSize:18,
    },
    subtitle:{
      fontsize:20,
    },
    subtitle1:{
      marginHorizontal:10,
      marginVertical:5,
      fontsize:24,
      fontWeight:'bold',
    },
    subtitle2:{
      marginHorizontal:10,
      marginVertical:5,
      fontsize:24,
    },
    dropdown: {
      marginHorizontal: 15,
      marginVertical:5,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    },)

export default Vote