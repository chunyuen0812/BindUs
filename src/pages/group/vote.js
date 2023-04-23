import {StyleSheet,Text, View, TextInput, Alert,Image } from 'react-native'
import{ NavBar, Button, } from 'galio-framework';
import React, { Component, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import {insertVoteData} from '../../../database'

const db = SQLite.openDatabase('maindb.db');
var gid='1';
const username='TEST';
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
  { label: 'New Member', value: '4' },
  { label: 'Time Extention', value: '5' },
  { label: 'Withdrawal', value: '6' },
  ];

 function insertNewvote(gid,votetype,votedetail, memberno ){
  var id=1;
  db.transaction(tx=>{ 
    tx.executeSql('SELECT COUNT( DISTINCT Vote_ID) AS number FROM Vote WHERE Goal_ID=?',
    [gid],
    (tx, result)=>{
      id=result.number+1;
      console.log(id)
    },
    (tx, error)=>{
      console.log(error)
    });
    for(i=0;i<memberno;i++){
      insertVoteData(id, i, gid,votetype,votedetail).
        then(res => {
          console.log("insertion valid",res);
        }).catch(err => {
         console.log("insertion invalid",err);
      });
    }
  })
 }

const Vote=({route})=>{// main program start------------------------------------------------------------------------
  const [label,setLabel]=useState('');
  const [value, setValue] = useState(null);
  const [loan, setLoan]=useState(0);
  const [withdraw,setWithdraw]=useState(0);
  const [goaltype,setGoaltype]=useState('long')
  const navigation=useNavigation();
  const [remain,setRemain]=useState(10000);
  const [target, setTarget]=useState(20000);
  const [goalprogress, setGoalprogress]=useState(9000);
  const [memberno, setMemberno]=useState(1);
  const [userdeposit,setUserdeposit]=useState(1000);
  const [groupinfo,setGroupinfo]=useState({})
  const [endtime,setEndtime]=useState('2024-04-30');

  function itemset(){
    setGoalprogress(groupinfo.GoalProgress)
    setTarget(groupinfo.Goal_amount)
    setEndtime(groupinfo.end_time)
    setRemain(target-goalprogress)
  }

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
          <Text style={styles.subtitle2}>${goalprogress}/ ${target} ({Math.round((goalprogress/target)*100)}%)</Text>
          <Text style={styles.subtitle2}>{endtime}</Text>
          <Text style={styles.subtitle2}>{memberno}</Text>
          <Text style={styles.subtitle2}>{datetime}</Text>
        </View>
      </View>      
    );
  }
  const renderLoan=()=>{
    return(
      <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Text style={styles.subtitle1}>Loan Value:</Text>
        <Text style={{
          borderBottomWidth:0.1,
          borderBottomColor:'dimgrey',
          alignSelf:'center',
            fontSize:15,
            fontWeight:'bold',
            width:70,
            height: 35,
            padding:5}}>${loan}</Text>
        </View>
        <Slider
        style={{alignSelf:'center',width: 360, height: 40}}
        minimumValue={0}
        maximumValue={remain}
        value={remain/2}
        minimumTrackTintColor="green"
        maximumTrackTintColor="grey"
        thumbTintColor='dimgrey'
        onSlidingComplete={n=>setLoan(Math.round(n))}
        />
      </View>
      
    );
  }
  
  const renderMember=()=>{ //----------------------------------------------------------------------<<<<<<<Contact
    return(
      <View>
        <View style={styles.container}>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Text style={styles.subtitle1}>Member:</Text>
            <Button color='#aaa' style={{width:65, height:22}} onPress={()=>console.log('tocontact')}>Add</Button>
          </View>
        </View>
      </View> 
    );
  }
  
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
            const currentDate = selectedDate;
            setShow(false);
            setDate(currentDate);
          };
  const showDatepicker = () => {
            DateTimePickerAndroid.open({
              value: date,
              onChange,
              mode: 'date',
              dateFormat:"dayofweek day month",
            });
          };
  
  const renderExtend=()=>{
    return(
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
                <Text style={{alignSelf:'center', fontSize:15, fontWeight:'bold'}}>New End Date: </Text>
                <Text style={{alignSelf:'center'}}>{date.toDateString()}</Text>
                <Button round style={{alignSelf:'center', height:22, width:65}} color='#aaa' onPress={showDatepicker}>Choose</Button>
                <Button round color='#aaa' style={{alignSelf:'center',width:65, height:22}} onPress={()=>{console.log(date.toDateString())}}>Confirm</Button>
              </View>
      </View>
      );
  }
  
  const renderWithdrawal=()=>{
    return(
      <View>
        <View style={styles.container}>
        <Text style={styles.subtitle2}>Total Deposit: ${userdeposit}</Text>
        <Text style={styles.subtitle2}>Total Contribution: {Math.round(userdeposit/target*100)}%</Text>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Text style={styles.subtitle1}>Withdrawal:</Text>
        <Text style={{
          borderBottomWidth:0.1,
          borderBottomColor:'dimgrey',
          alignSelf:'center',
            fontSize:15,
            fontWeight:'bold',
            width:70,
            height: 35,
            padding:5}}>${withdraw}</Text>
        </View>
        <Slider
        style={{alignSelf:'center',width: 360, height: 40}}
        minimumValue={0}
        maximumValue={userdeposit}
        value={0}
        minimumTrackTintColor="green"
        maximumTrackTintColor="grey"
        thumbTintColor='dimgrey'
        onSlidingComplete={n=>setWithdraw(Math.round(n))}
        />
      </View>
      </View>
      );
  }

useEffect(()=>{
  if(route.params){
    gid=route.params.gid
  }
  console.log(gid)
  db.transaction(tx=>{
    tx.executeSql(
      'SELECT Goal_amount, SUM(Deposit_amount) AS GoalProgress, Goal_name, end_time, Goal_type FROM Goal INNER JOIN Deposit ON Goal.Goal_ID=Deposit.Goal_ID WHERE Goal.Goal_ID=?',
      [gid],
      (tx, result)=>{
        setGroupinfo(result.rows.item(0))
        setGoaltype(groupinfo.Goal_type)
        console.log(groupinfo,goaltype)
      },
      (tx, error)=>{
        console.log(error)
      });
    tx.executeSql(
      'SELECT COUNT(Account_ID) AS Number FROM Goal_Group WHERE Goal_ID=?',
      [gid],
      (tx, result)=>{
        setMemberno(result.rows.item(0).Number)
        console.log(memberno)
      },
      (tx, error)=>{
        console.log(error)
      });
    tx.executeSql(
      'SELECT SUM(Deposit_amount) AS depositsum FROM Deposit WHERE Goal_ID=? AND Account_ID=?',
      [gid, '1'],
      (tx, result)=>{
        setUserdeposit(result.rows.item(0).depositsum)
        console.log(userdeposit)
      },
      (tx, error)=>{
        console.log(error)
      });
  })
},[])

const voteType =()=> {
  if (goaltype=='long'){
    return longdata;
  }else{
    return shortdata;
  }}

const outputAlert=()=>{
  var votedetail=label;
   if (value!=null){
    switch(value){
    case '3':
      votedetail='Loan amount: $'+loan;
      break;
    case '4':
      votedetail='New member: '+'John Smith';
      break;
    case '5':
      votedetail='End Date extend to: '+date.toDateString();
      break;
    case '6':
      votedetail='Withdraw amount: $'+withdraw;
      break;
  }
    Alert.alert('Vote Initiated: '+label,votedetail, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {insertNewvote(gid, label, votedetail, memberno);navigation.navigate('Notice',{gid:gid})}},
  ]);
  } else{
    Alert.alert('Warning','The vote is empty.');
  }
}
  return (// main render---------------------------------------------------------------------------------------
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
          itemset();
          setLabel(item.label);
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="purple" name="form" size={20} />
        )}
      />
      {value>=1&&value<=5?renderGroupinfo():null}
      {value==3?renderLoan():null} 
      {value==4?renderMember():null} 
      {value==5?renderExtend():null} 
      {value==6?renderWithdrawal():null} 
      <Button color='success' round style={styles.confirmbutton} onPress={()=>outputAlert()}>Confirm</Button>
      </View>
    )
  };


const styles= StyleSheet.create({
  container:{
    marginHorizontal:10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  confirmbutton:{
    margin:10,
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
      flex: 1,
      fontWeight:"bold",
      fontSize: 18,
      alignSelf:'center'
    },
    subtitle:{
      fontSize:18,
    },
    subtitle1:{
      flex:1,
      marginHorizontal:10,
      marginVertical:5,
      fontSize:18,
      fontWeight:'bold',
    },
    subtitle2:{
      marginHorizontal:10,
      marginVertical:5,
      fontSize:18,
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
    image:{
      alignSelf:'flex-start',
      width: 60,
      height: 60,
      borderRadius: 30,
      marginVertical: 3,
      marginRight: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor:"lightgray",
      resizeMode: "center",
    },
    },)

export default Vote