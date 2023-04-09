import {StyleSheet,Text, TextInput, View, Dimensions,Alert, Pressable } from 'react-native'
import{ NavBar, Button, Icon} from 'galio-framework';
import React, { Component, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Payment=[{
  id:'1',
  holder:'TEST',
  bank:'TESTING BANK',
  no:123789456321,
},
{
  id:'2',
  holder:'TEST',
  bank:'',
  no:1234567809876543,
}
];


const windowHeight = Dimensions.get('window').height;

const Deposit=({route})=> {
  const navigation=useNavigation();
  const groupname=route.params.groupname;
  const limit=2000;
  const [amount,setAmount]=useState(0);

const renderItem=({item})=><Item
  bank={item.bank}
  no={item.no}
  id={item.id}
/>
const [select,setSelect]=useState('');

const Item=({bank, no, id})=>{
  return(
    <Pressable style={styles.container1} flexDirection={'row'} onPress={()=>setSelect(id)}>
      <View margin={5} marginRight={10}>
        {bank!=''?<FontAwesome name="bank" size={35} color="dimgrey"/>:
        <FontAwesome name="credit-card" size={35} color="dimgrey" />}
      </View>
      <View flexDirection={'row'}>
        <View margin={5} width={'78%'}>
        {bank!=''?<Text style={styles.name}>{bank}</Text>:<Text style={styles.name}>Credit Card</Text>}
        {bank!=''?<Text style={styles.subtitle}>********{no%10000}</Text>:<Text style={styles.subtitle}>************{no%10000}</Text>}
        </View> 
        <View alignSelf={'center'}>
          {select==id?<FontAwesome alignSelf={'center'} name="check-circle-o" size={40} color="green" />:null}
        </View>
      </View>      
    </Pressable>
  );
}

  const outputAlert=()=>{    
    const x=Payment[parseInt(select)-1];
    var method='';
    var no='';
    if (x.bank==''){method='Credit card'; no='************'+(x.no%10000)} else{method=x.bank; no='********'+(x.no%10000)}
    if (amount!=0&&select!=''){
    Alert.alert('Deposit','Group: '+groupname+'\n'+method+': '+no+'\nAmount: $'+amount.toString(), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {navigation.navigate('Home')}},
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
            <View style={styles.container1} flexDirection={'row'}>
              <Text style={styles.name1}>Add new payment method</Text>
              <Button onlyIcon icon="plus" iconFamily="antdesign" iconSize={30} color="#ddd" iconColor="#222" style={{ width: 35, height: 35}} onPress={()=>console.log('add method')}/>
            </View>
            <FlatList
             data={Payment}
             renderItem={renderItem}
             keyExtractor={(item) => item.bid}
            />
          </View>
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