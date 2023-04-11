import { Pressable,Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import {NavBar, Input,Button} from 'galio-framework';
import { RadioButton } from 'react-native-paper';
import React, { Component, useState } from 'react';
import DateTimePicker,{ DateTimePickerAndroid,RNDateTimePicker} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { insertGoalData } from '../../../database';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('maindb.db');

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      profpic: require('../../res/profilepic.jpg'),
      name: 'User 1',
      phoneno:'12345678',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      profpic: require('../../res/profilepic.jpg'),
      name: 'User 2',
      phoneno:'12345678',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      profpic: require('../../res/profilepic.jpg'),
      name: 'User 3',
      phoneno:'12345678',
    },
  ];

  const Item = ({id, name, profpic, phoneno}) => {
    return(
    <Pressable style={styles.membercontainer} onPress={()=>console.log({name},' profile page')}>
        <Image source={profpic} style={styles.image}/>
        <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row',flex:1, width:300}}>
                <Text style={styles.name}>{name}</Text>
                <Text style={{alignSelf:'center'}}>{phoneno}</Text>
            </View>
            <Text numberOfLines={1} style={{fontSize:15, color:'grey'}}>{id}</Text>
        </View>
    </Pressable>
    );
    
  };


  const renderItem = ({ item }) => <Item 
    id={item.id}
    profpic={item.profpic} 
    name={item.name}
    phoneno={item.phoneno} />;

  const state = { 
      GrpName: "",
	    Grptype: "",
	    GoalTarget:0,
	    GoalTimeLimit: new Date(),
     };
    
function CreateGroup () {    

const navigation=useNavigation();
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
            dateFormat:"day month time",
          });
        };
const SignUp = () => {
          // 註冊帳號
          
          state.Grptype=type;
          const { GrpName,Grptype,GoalTarget,GoalTimeLimit} = state;
          // if not any input
          if (!GrpName || !Grptype || !GoalTimeLimit || !GoalTarget) {
            Alert.alert('Error', 'Please enter all.');
            console.log(GrpName,Grptype,GoalTarget,GoalTimeLimit)
            return;
          } else {
              console.log('Check flags');
              console.log('Input to database');
              Alert.alert('Alert',GrpName+'\n'+Grptype+'\n'+GoalTarget+'\n'+GoalTimeLimit,[
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => {insertGoalData(GrpName,Grptype,GoalTarget,GoalTimeLimit),navigation.goBack()}},
              ])
          };};   


const [type, setType]=useState('short')
  
    return (
    <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Create Group" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View style={styles.container}>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Group Name" onChangeText={(text) =>{state.GrpName=text}}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Goal Target Amount" type={'number-pad'} onChangeText={(text) => { state.GoalTarget=parseInt(text) }}/>           
            <View style={{flexDirection:'row', margin:10, justifyContent:'space-around'}}>
              <Text style={{alignSelf:'center', fontSize:15, fontWeight:'bold'}}>Goal type:</Text>
              <Text style={{alignSelf:'center', fontSize:15}}>Long</Text>
              <RadioButton value="Long" color="dimgrey" status={ type == 'long' ? 'checked' : 'unchecked' } onPress={()=>setType('long')}/>
              <Text style={{alignSelf:'center', fontSize:15}}>Short</Text>
              <RadioButton value="Short" color="dimgrey" status={ type=='short' ? 'checked' : 'unchecked' } onPress={()=>setType('short')}/>
            </View>
            <View style={{flexDirection:'row', marginHorizontal:10}}>
              <Text style={{alignSelf:'center', fontSize:15, fontWeight:'bold'}}>Goal End Date: </Text>
              <Text style={{alignSelf:'center'}}>{date.toDateString()}</Text>
              <Button round style={{alignSelf:'center', height:25, width:65}} color='success' onPress={showDatepicker}>Choose</Button>
              <Button round color='success' style={{alignSelf:'center',width:65, height:25}} onPress={()=>{state.GoalTimeLimit=date}}>Confirm</Button>
            </View>
            <View style={{flexDirection:'row', margin:5, justifyContent:'space-around',}}>
                <Text style={styles.subtitle}>Members:</Text>
                <Button onPress={()=>{ state.Members+=1; console.log('To Contact list');navigation.navigate('ContactList')}} size={'small'}> Add </Button>
            </View>
            <View style={{borderWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey', height:'48%'}}>
              <FlatList 
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}/>  
            </View>     
            <View style={{alignItems:'center'}}>
                <Button color="#5BC0DE" round style={{width:"40%"}} onPress={()=>SignUp}>Submit</Button>
            </View>
        </View>
    </View>
    )
  }


const styles= StyleSheet.create({
    membercontainer:{
        margin:5,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor:"lightgray",
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
      name:{
        flex: 1,
        fontWeight:"bold",
        fontSize: 18,
        alignSelf:'center'
      },
    container: {
        marginTop:5,
        flexDirection: "column",
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
    subtitle:{
        alignSelf:'center',
        fontSize: 18,
    },
  })

export default CreateGroup