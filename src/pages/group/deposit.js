import {StyleSheet,Text, TextInput, View, Dimensions,Alert, Pressable } from 'react-native'
import{ NavBar, Button, Icon} from 'galio-framework';
import React, { Component, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {insertDepositData} from '../../../database'
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('maindb.db');

const Payment={
  id:'1',
  holder:'TEST',
  bank:'test',
  no:100000000001,
};

function depositMoney(id, gid, amount){
  db.transaction(tx=>{
    insertDepositData(id, gid, amount).
     then(res => {
       console.log("insertion valid",res);
     }).catch(err => {
      console.log("insertion invalid",err);
    });
  })
}

const windowHeight = Dimensions.get('window').height;

const Deposit=({route})=> {// main----------------------------------------------------------------------------------------------------------
  const navigation=useNavigation();
  const groupname=route.params.groupname;
  const gid=route.params.gid
  const limit=2000;
  const [amount,setAmount]=useState(0);
  const [select,setSelect]=useState('');

  const outputAlert=()=>{  
    const x=Payment;
    var method='';
    var no='';
    var date = new Date();
    if(select!='') {
    method=x.bank; no=x.no
  }
    if (amount!=0&&select!=''){
    Alert.alert('Deposit','Group: '+groupname+'\n'+method+': '+no+'\nAmount: $'+amount.toString()+'\nDate: '+date, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {depositMoney(x.id,gid,amount);navigation.goBack()}},
    ]);
    } else if(amount==0){
      Alert.alert('Warning','You have not deposit anything.');
    } else if(select==''){
      Alert.alert('Warning','You have not choose a payment method.');
    }
    
  }

    return (
      <View style={{flexDirection:'column', height:windowHeight}}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Deposit" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View>
          <Text style={styles.name2}>Choose payment method:</Text>
          <View height={'71%'}>
            <Pressable style={styles.container1} flexDirection={'row'} onPress={()=>{select==Payment.id?setSelect(''):setSelect(Payment.id)}}>
              <View margin={5} marginRight={10}>
                <FontAwesome name="bank" size={35} color="dimgrey"/>
              </View>
              <View flexDirection={'row'}>
                <View margin={5} width={'78%'}>
                  <Text style={styles.name}>Bank: {Payment.bank}</Text>
                  <Text style={styles.subtitle}>{Payment.no}</Text>
                </View> 
                <View alignSelf={'center'}>
                  {select==Payment.id?<FontAwesome alignSelf={'center'} name="check-circle-o" size={40} color="green" />:null}
                </View>
              </View>      
            </Pressable>
          </View>
          <View style={styles.container} flexDirection={'row'}>
            <Button round color='red' style={styles.button} onPress={()=>{console.log('Minus '+amount);{amount>=10?setAmount(amount-10):null}}}>-10</Button>
            <Button round color='red' style={styles.button} onPress={()=>{console.log('Minus '+amount);{amount>=100?setAmount(amount-100):null}}}>-100</Button>
            <Text style={{alignSelf:'center', fontSize:20}}>$</Text><TextInput style={styles.textbox} keyboardType="numeric" onChangeText={(text)=>setAmount(parseInt(text))}>{amount}</TextInput>
            <Button round color='green' style={styles.button} onPress={()=>{console.log('Plus '+amount);{(limit-amount)>=100?setAmount(amount+100):null}}}>+100</Button>
            <Button round color='green' style={styles.button} onPress={()=>{console.log('Plus '+amount);{(limit-amount)>=10?setAmount(amount+10):null}}}>+10</Button>
          </View>
          <Button color='success' round style={styles.confirmbutton} onPress={()=>outputAlert()}>Confirm</Button>
        </View>
      </View>
    )
  }


const styles= StyleSheet.create({
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
      fontWeight:'bold'
    },
    name1:{
      alignSelf:'center',
      flex:1,
      fontSize:18,
      fontWeight:'bold'
    },
    name2:{
      margin:10,
      alignSelf:'center',
      fontSize:24,
      fontWeight:'bold'
    },
    subtitle:{
      fontSize:18,
    },
    container:{
      justifyContent:'center',
      marginHorizontal:5,
      marginBottom:5,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
      borderBottomWidth:StyleSheet.hairlineWidth,
    },
    container1:{
      margin:5,
      padding:10,
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
      borderBottomWidth:StyleSheet.hairlineWidth,
    },
    textbox:{
      backgroundColor:'#fff',
      marginHorizontal:5,
      alignSelf:'center', 
      width:100, 
      borderBottomWidth:StyleSheet.hairlineWidth, 
      fontSize:20,
      textAlign:'center'
    },
    button:{
      alignSelf:'center',
      fontSize:20,
      width:50,
      height:30
    },
    confirmbutton:{
      margin:10,
      alignSelf:'center',
    },
    },)

export default Deposit