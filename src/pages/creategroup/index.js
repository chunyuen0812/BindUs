import { Pressable,Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import {NavBar, Input,Button} from 'galio-framework';
import { RadioButton } from 'react-native-paper';
import React, { Component, useState } from 'react';
import DateTimePicker,{ DateTimePickerAndroid,RNDateTimePicker} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { insertGoalData, insertGroupData, selectAccountData } from '../../../database';
import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';

const db = SQLite.openDatabase('maindb.db');
var temp = [];
var goals=[];
var memberlist=[]
db.transaction(tx=>{
    tx.executeSql(
        // print table info
        'SELECT Account_ID, name, phone FROM Account;',
        [],
        (tx, results) => {
            for (let i = 0; i < results.rows.length; i++){
              temp.push(results.rows.item(i));
            }
            console.log('create group')
            console.log(temp.length);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
      tx.executeSql(
        // print table info
        'SELECT Goal_ID FROM Goal;',
        [],
        (tx, results) => {
            for (let i = 0; i < results.rows.length; i++){
              goals.push(results.rows.item(i));
            }
            console.log('Goal IDs:')
            console.log(goals, goals.length);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
})

  const Item = ({id, name,phoneno}) => {
    return(
    <Pressable style={styles.membercontainer} onPress={()=>console.log({name},' profile page')}>
        <Image source={require('../../res/icon.jpeg')} style={styles.image}/>
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

  function insertDATA(goalname, type, target, date, memberlist){
    console.log( goalname, type, target, date, memberlist[0].Account_ID)
    db.transaction(tx=>{
      console.log('Inserting group info')
        tx.executeSql(
          'INSERT INTO Goal (Goal_name, Goal_type, Goal_amount,is_pending, start_time,end_time) VALUES (?,?,?,0,CURRENT_TIMESTAMP,?);',
          [goalname, type, target, date],
          (tx, result)=>{
            console.log('Insert group info')
            console.log(result)
          },
          (tx, error)=>{
            console.log(error)
          });
        for (i=0;i<memberlist.length;i++){
          tx.executeSql(
            'INSERT INTO Goal_Group (Account_ID,Goal_ID) VALUES (?,?);',
            [memberlist[i].Account_ID, goals.length+1],
            (tx, result)=>{
              console.log('Insert group member ',i)
              console.log(result)
            },
            (tx, error)=>{
              console.log(error)
            });
        }
        console.log('Inserted group info')
      })
  }

  const renderItem = ({ item }) => <Item 
    id={item.Account_ID}
    name={item.name}
    phoneno={item.phone} />;
  
const CreateGroup=({route})=> {//main------------------------------------------------------------------------------------

var memberno=['1']
memberlist=[]
 if (route.params){
  memberno=['1'];
  memberlist=[];
  for (i=0; i<route.params.memberlist.length;i++){
    memberno.push(route.params.memberlist[i])
  }
  console.log(memberno)

 }
  for (let j=0;j<memberno.length;j++){
    let flag=0;
    for (let i=0;i<temp.length;i++){
      if (temp[i].Account_ID==memberno[j]&&flag==0){
        memberlist.push(temp[i]);
        flag=1;
        console.log(temp[i])
      }
     }
     console.log('Memberlist', memberlist)
  }  

const navigation=useNavigation();
const [goalname, setGoalname]=useState('')
const [target,setTarget]=useState(0);
const [type, setType]=useState('short')
const [date, setDate] = useState(new Date());
const onChange = (event, selectedDate) => {
          const currentDate = selectedDate;
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
          // if not any input
          if (!goalname || !type || !date || !target) {
            Alert.alert('Error', 'Please enter all.');
            console.log(goalname,type,target,date)
            return;
          } else {
              console.log('Check flags');
              console.log('Input to database');
              Alert.alert('Alert',goalname+'\n Goal Type: '+type+'\n Goal Target: $'+target+'\n Members: '+JSON.stringify(memberlist.map(a=>a.name))+'\n'+date,[
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel'),
                  style: 'cancel',
                },
                {text: 'OK', onPress:()=>{insertDATA(goalname, type, target, date, memberlist);Alert.alert('New Group Formed','',[{text: 'OK', onPress:()=>navigation.goBack()}])}},
              ])
          };};   
  
    return (
    <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Create Group" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View style={styles.container}>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Group Name" onChangeText={(text) =>{setGoalname(text)}}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Goal Target Amount" type={'number-pad'} onChangeText={(text) => { setTarget(parseInt(text))}}/>           
            <View style={{flexDirection:'row', margin:10, justifyContent:'space-around'}}>
              <Text style={{alignSelf:'center', fontSize:15, fontWeight:'bold'}}>Goal type:</Text>
              <Text style={{alignSelf:'center', fontSize:15}}>Long</Text>
              <RadioButton value="Long" color="dimgrey" status={ type == 'long' ? 'checked' : 'unchecked' } onPress={()=>setType('long')}/>
              <Text style={{alignSelf:'center', fontSize:15}}>Short</Text>
              <RadioButton value="Short" color="dimgrey" status={ type=='short' ? 'checked' : 'unchecked' } onPress={()=>setType('short')}/>
            </View>
            <View style={{flexDirection:'row', marginHorizontal:10, justifyContent:'space-around'}}>
              <Text style={{alignSelf:'center', fontSize:15, fontWeight:'bold'}}>Goal End Date: </Text>
              <Text style={{alignSelf:'center'}}>{date.toDateString()}</Text>
              <Button round style={{alignSelf:'center', height:25, width:65}} color='success' onPress={showDatepicker}>Choose</Button>
            </View>
            <View style={{flexDirection:'row', margin:5, justifyContent:'space-around',}}>
                <Text style={styles.subtitle}>Members:</Text>
                <Button onPress={()=>{console.log('To Contact list');navigation.navigate('ContactList')}} size={'small'}> Add </Button>
            </View>
            <View style={{borderWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey', height:'52%'}}>
              <FlatList 
              data={memberlist}
              renderItem={renderItem}
              keyExtractor={item => item.Account_ID}/>  
            </View>     
            <View style={{alignItems:'center'}}>
                <Button color="#5BC0DE" round style={{width:"40%"}} onPress={SignUp}>Submit</Button>
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