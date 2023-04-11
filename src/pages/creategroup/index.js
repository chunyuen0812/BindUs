import { Pressable,Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import {NavBar, Input,Button} from 'galio-framework';
import { RadioButton } from 'react-native-paper';
import React, { Component, useState } from 'react';
import DateTimePicker,{ DateTimePickerAndroid,RNDateTimePicker} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { insertGoalData, selectAccountData } from '../../../database';
import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';

const db = SQLite.openDatabase('maindb.db');
var temp = [];
db.transaction(tx=>{
    tx.executeSql(
        // print table info
        'SELECT Account_ID, name, phone FROM Account WHERE Account_ID != 1;',
        [],
        (tx, results) => {
            for (let i = 0; i < results.rows.length; i++)
              temp.push(results.rows.item(i));
            console.log(temp);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
})

  const Item = ({id, name,phoneno}) => {
    return(
    <Pressable style={styles.membercontainer} onPress={()=>console.log({name},' profile page')}>
        <Image source={require('../../res/profilepic.jpg')} style={styles.image}/>
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
    id={item.Account_ID}
    name={item.name}
    phoneno={item.phone} />;

  const state = { 
      GrpName: "",
	    Grptype: "",
	    GoalTarget:0,
	    GoalTimeLimit: new Date(),
     };   
const CreateGroup=({route})=> {
// useEffect(()=>{
//
//  if (route.params){
//    memberlist=route.params.memberlist;
//    for (i=0;i<memberlist.lenght;i++){
//      db.transaction(tx=>{
//        tx.executeSql(
//          // print table info
//          'SELECT * FROM Account WHERE Account_ID =?;',
//          [memberlist[i]],
//          (tx, results) => {
//              for (let i = 0; i < results.rows.length; ++i)
//                temp.push(results.rows.item(i));
//              console.log(temp);
//          },
//          (tx, error) => {
//            console.error('Error selecting data', error);
//          }
//        );
//      })
//    }}
//  })   

   //   selectAccountData(memberlist[i]).
   //   then(res => {
   //     setTemp(temp=>[...temp, res]);
   //     console.log(temp)
   //   }).catch(err => {
   //    console.log("select invalid",err);
   //  });
    
const insertDATA=()=>{
  const { GrpName,Grptype,GoalTarget,GoalTimeLimit} = state;
  insertGoalData(GrpName,Grptype,GoalTarget,GoalTimeLimit)
}


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
                {text: 'OK', onPress: () => {insertDATA; navigation.goBack()}},
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
            <View style={{borderWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey', height:'52%'}}>
              <Pressable style={styles.membercontainer} onPress={()=>console.log('TEST',' profile page')}>
                <Image source={require('../../res/profilepic.jpg')} style={styles.image}/>
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row',flex:1, width:300}}>
                      <Text style={styles.name}>TEST</Text>
                      <Text style={{alignSelf:'center'}}>98123456</Text>
                    </View>
                    <Text numberOfLines={1} style={{fontSize:15, color:'grey'}}>1</Text>
                </View>
              </Pressable>
              <FlatList 
              data={temp}
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