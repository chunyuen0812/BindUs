import {StyleSheet,Text, TextInput, View, Dimensions,Alert } from 'react-native'
import{ NavBar, Button} from 'galio-framework';
import React, { Component, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const Deposit=({route})=> {
  const navigation=useNavigation();
  const groupname=route.params.groupname;
  const limit=2000;
  const [amount,setAmount]=useState(0);

  const outputAlert=()=>{    
    if (amount!=0){
    Alert.alert('Deposit','Group: '+groupname+'\nAmount: $'+amount.toString(), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {navigation.navigate('Home')}},
    ]);
    } else{
      Alert.alert('Warning','You have not deposit anything.');
    }
    
  }

    return (
      <View style={{flexDirection:'column', height:windowHeight}}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Deposit" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View>
          <Text>Choose payment method:</Text>
          <Text>Add new payment method</Text>
          <View style={{height:'65%'}}></View>
          <View style={styles.container} flexDirection={'row'}>
            <Button round color='red' style={styles.button} onPress={()=>{console.log('Minus '+amount);{amount>=10?setAmount(amount-10):null}}}>-10</Button>
            <Button round color='red' style={styles.button} onPress={()=>{console.log('Minus '+amount);{amount>=100?setAmount(amount-100):null}}}>-100</Button>
            <Text style={{alignSelf:'center', fontSize:20}}>$</Text><TextInput style={styles.textbox} keyboardType="numeric" onChangeText={(text)=>setAmount(parseInt(text))}>{amount}</TextInput>
            <Button round color='green' style={styles.button} onPress={()=>{console.log('Plus '+amount);{amount<limit?setAmount(amount+100):null}}}>+100</Button>
            <Button round color='green' style={styles.button} onPress={()=>{console.log('Plus '+amount);{amount<limit?setAmount(amount+10):null}}}>+10</Button>
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
    },
    subtitle:{
      fontsize:18,
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