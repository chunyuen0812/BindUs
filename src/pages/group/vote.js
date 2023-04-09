import {StyleSheet,Text, View, TextInput, Alert } from 'react-native'
import{ NavBar, Button, } from 'galio-framework';
import React, { Component, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const username='TEST';
const userdeposit=1000;
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

const Vote=({route})=>{// main program start---------------------------------------------
  const [label,setLabel]=useState('');
  const [value, setValue] = useState(null);
  const [loan, setLoan]=useState((route.params.target-route.params.progress)/2);
  const [withdraw,setWithdraw]=useState(0);
  const navigation=useNavigation();
  const goaltype=route.params.goaltype;
  
const voteType =()=> {
  if (goaltype=='long'){
    return longdata;
  }else{
    return shortdata;
  }
  
  ;}


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
      maximumValue={route.params.target-route.params.progress}
      value={(route.params.target-route.params.progress)/2}
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
    <View style={styles.container}>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
      <Text style={styles.subtitle1}>Member:</Text>
      <Button color='#aaa' style={{width:65, height:22}} onPress={()=>console.log('tocontact')}>Add</Button>
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
      <Text style={styles.subtitle2}>Total Contribution: {Math.round(userdeposit/route.params.target*100)}%</Text>
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

const outputAlert=()=>{
  var votedetail=label;
  
  if (value!=null){
    switch(value){
    case '3':
      votedetail='Loan amount: $'+loan;
      break;
    case '4':
      votedetail='New member: '+'member name';
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
    {text: 'OK', onPress: () => {navigation.navigate('Notice', {votetype:label,votedetail:votedetail,inituser:username})}},
  ]);
  } else{
    Alert.alert('Warning','The vote is empty.');
  }
  
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
  }


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
      fontSize:18,
    },
    subtitle:{
      fontsize:20,
    },
    subtitle1:{
      flex:1,
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