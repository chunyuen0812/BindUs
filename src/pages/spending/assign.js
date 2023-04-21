import { StyleSheet, Text, View,TextInput, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Button, NavBar} from 'galio-framework'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Slider from '@react-native-community/slider'
import * as SQLite from 'expo-sqlite';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from '@rneui/base'
import { TouchableOpacity, Dimensions } from 'react-native'

const windowHeight=Dimensions.get('window').height;
const db = SQLite.openDatabase('maindb.db');
var allmember = [];
var allgroup=[];
var gid='1';
var pointer=1;

const Assign = ({route}) => {// main program---------------------------------------------------------------------------------------
if (route.params){
  gid=route.params.gid;
}

const navigation=useNavigation();
const [groupinfo, setGroupinfo]=useState({})
const [memberlist, setMemberlist]=useState([])
const [box, setBox]=useState([]);
const [username, setUser]=useState([])
const [amount,setAmount]=useState([]);
const [goods, setGoods]=useState([]);

const newbox=()=>{
  setBox([...box, pointer]);
  setAmount([...amount,0])
  setGoods([...goods,''])
  setUser([...username,''])
  console.log('add', pointer,box)
  pointer++;
}

const deleteBox=()=>{
  var arr=[];
  for(i=0; i<box.length-1;i++){
    arr[i]=i+1;
  }
  setBox(arr);
  if (amount.length<=1){
    arr=[]
    setAmount(arr)
    setGoods(arr)
    setUser(arr)
  }else{
    arr=amount.splice(-1)
    setAmount(arr)
    arr=goods.splice(-1)
    setGoods(arr)
    arr=username.splice(-1)
    setUser(arr)
  }
  if (pointer>1){
  pointer--;
  }
  console.log('delete',pointer,box)
}

const confirmButton=()=>{
  var list=[]
  var eventflag=(goods.every(item => item != 0)&&goods.length>0);
  var userflag=(username.every(item => item != 0)&&username.length>0);
  var budgetflag=(amount.every(item => item != 0)&&amount.length>0);
  if ( eventflag && userflag && budgetflag ){
    for (i=0;i<goods.length;i++){
      var obj={};
      obj['User']=username[i];
      obj['Event']=goods[i];
      obj['Budget']=amount[i];
      list.push(obj);
    }
    if (amount.reduce((a, b) => a + b, 0)>groupinfo.Goal_amount){
      Alert.alert('Warning!!','The total budget exceeds the available funds.')
    }else if(amount.reduce((a, b) => a + b, 0)<groupinfo.Goal_amount){
      Alert.alert('Warning!!','The total budget is less than the available funds.')
    }else{
      Alert.alert('Items assign: ', JSON.stringify(list), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.navigate('Spend',{list:list, gid:gid})},
      ])
    }
    
  } else if (box.length>0) {
    Alert.alert('Warning!!','Please fill in all the detail.')
  } else {
    Alert.alert('Warning!!','You need to have at least one item.')
  }
}

const Item=({title, index})=>{
  return(
    <View style={styles.container}>
      <Button onlyIcon icon='close'iconFamily='antdesign'iconSize={15} color='red' style={{position:'absolute',width:20, height:20, right:5, top:5}}
      onPress={deleteBox}/>
      <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, width:350}}>
        <Text>{index}</Text>
        <TextInput style={styles.textboxb} onChangeText={(text)=>{
          var arr=goods;
          arr[index]=text;
          setGoods(arr);
        }} placeholder='Item/ Event'/>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={memberlist}
          maxHeight={150}
          labelField="name"
          valueField="Account_ID"
          placeholder="Person in Charge"
          activeColor='lightgrey'
          value={item=>item.name}
          onChange={item => {
            var arr=username;
          arr[index]=item.aid;
          setUser(arr);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="lightblue" name="user" size={20} />
          )}
        />
      </View>
      <View style={{flexDirection:'row'}}>
        <Slider
        style={{alignSelf:'center',width: 280, height: 40}}
        minimumValue={0}
        maximumValue={groupinfo.Goal_amount}
        value={amount[index]}
        minimumTrackTintColor="green"
        maximumTrackTintColor="grey"
        thumbTintColor='dimgrey'
        onSlidingComplete={n=>{
          var arr=amount;
          arr[index]=Math.round(n);
          setAmount(arr);
        }}
        />
        <TextInput style={styles.textbox} keyboardType="numeric" onChangeText={(text)=>{
          var arr=amount;
          arr[index]=parseInt(text);
          setAmount(arr);
        }}>{amount[index]}</TextInput>
      </View>
    </View>
  );
}
useEffect(()=>{
  db.transaction(tx=>{
    tx.executeSql(
        // print table info
        'SELECT Goal_ID, Goal_Group.Account_ID AS aid, name FROM Goal_Group INNER JOIN Account ON Goal_Group.Account_ID= Account.Account_ID WHERE Goal_ID=?;',
        [gid],
        (tx, results) => {
            for (let i = 0; i < results.rows.length; ++i)
              allmember.push(results.rows.item(i));
            console.log('allmember',allmember);
            setMemberlist(allmember)
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
    tx.executeSql(
        // print table info
        'SELECT Goal_name, Goal_ID, Goal_amount FROM Goal WHERE Goal_ID=?;',
        [gid],
        (tx, results) => {
            allgroup.push(results.rows.item(0));
          console.log('allgroup',allgroup);
          setGroupinfo(allgroup[0])
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
  })
},[])
console.log('test 1', groupinfo);
console.log('test 2', memberlist.map(x=>x.name));

  return (
    <View height={windowHeight}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Assign" 
        onLeftPress={()=>navigation.navigate('Spend')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View style={{flexDirection:'row',justifyContent:'center', paddingHorizontal:15}}>
          <Text style={{fontSize:20,flex:1}}>Goal name: </Text>
          <Text style={{fontSize:20}}>{groupinfo.Goal_name}</Text>
      </View>
        <View style={{flexDirection:'row',justifyContent:'center', padding:15}}>
          <Text style={{fontSize:20,flex:1}}>Available Fund: </Text>
          <Text style={{fontSize:20}}>${groupinfo.Goal_amount}</Text>
      </View>
      <TouchableOpacity style={styles.container} onPress={newbox}>
        <AntDesign style={{alignSelf:'center'}}color='#aaa' name='plus' size={30}/>
      </TouchableOpacity>
      <FlatList 
        style={{height:300}}
        data={box}
        renderItem={({item, index}) => <Item title={item} index={index}/>}
        keyExtractor={({item,index})=>index}/>
        <Button color='success' round style={styles.confirmbutton} onPress={confirmButton}>Confirm</Button>
    </View>
  )
}

export default Assign

const styles = StyleSheet.create({
header:{
    marginTop:25,
    backgroundColor:'lightgrey',
},
title:{
    fontSize: 32,
    color:'black',
    fontWeight:'bold'
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
  textboxb:{
    backgroundColor:'#fff',
    marginHorizontal:5,
    width:155, 
    borderBottomWidth:StyleSheet.hairlineWidth, 
    fontSize:18,
    textAlign:'left'
  },
  dropdown: {
    width:180,
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
  confirmbutton:{
    position:'absolute',
    bottom:10,
    margin:10,
    alignSelf:'center',
  },
})