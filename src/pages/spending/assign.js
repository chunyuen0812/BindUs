import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
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
  var memberlist = [];
db.transaction(tx=>{
    tx.executeSql(
        // print table info
        'SELECT Account_ID, name FROM Account;',
        [],
        (tx, results) => {
            for (let i = 0; i < results.rows.length; ++i)
              memberlist.push(results.rows.item(i));
            console.log(memberlist);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
})

const target=10000;

const Assign = () => {

    
  // const toggleItem = (id) => {
  //     if (isChecked(id)) {
  //       setCheckedItems(checkedItems.filter(item => item !== id));
  //       console.log(checkedItems);
  //     } else {
  //       setCheckedItems([...checkedItems, id]);
  //       console.log(checkedItems);
  //     }
  //   };

var state={
    user:'',
    name:'',
    budget:0,
}
const [username, setUser]=useState('')
const [amount,setAmount]=useState(0);
const [goods, setGoods]=useState('');
const navigation=useNavigation();
const [list, setList]=useState([])
const newItem=()=>{
        for(i=0;i<goods.length;i++){
        state.user=username;
        state.name=goods;
        state.budget=amount;
        setList(...list, state);
        }
        
    }
  return (
    <View height={windowHeight}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Assign" 
        onLeftPress={()=>navigation.navigate('Spend')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View style={{flexDirection:'row',justifyContent:'center', padding:15}}>
          <Text style={{fontSize:20,flex:1}}>Available Fund: </Text>
          <Text style={{fontSize:20}}>${target}</Text>
      </View>
      <View style={styles.container}>
        <Button onlyIcon icon='close'iconFamily='antdesign'iconSize={10} color='red' style={{position:'absolute',width:20, height:20, right:5, top:5}}/>
            <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5, width:350}}>
              <TextInput style={styles.textboxb} onChangeText={(text)=>setGoods(text)} placeholder='Item/ Event'/>
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
                value={memberlist.name}
                onChange={item => {
                  setUser(item.Account_ID);
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
            maximumValue={target}
            value={amount}
            minimumTrackTintColor="green"
            maximumTrackTintColor="grey"
            thumbTintColor='dimgrey'
            onSlidingComplete={n=>setAmount(Math.round(n))}
            />
            <TextInput style={styles.textbox} keyboardType="numeric" onChangeText={(text)=>setAmount(parseInt(text))}>${amount}</TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.container}>
            <AntDesign style={{alignSelf:'center'}}color='#aaa' name='plus' size={30}/>
        </TouchableOpacity>
        <Button color='success' round style={styles.confirmbutton} onPress={()=>navigation.navigate('Spend')}>Confirm</Button>
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