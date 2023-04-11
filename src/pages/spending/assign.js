import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { NavBar} from 'galio-framework'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Slider from '@react-native-community/slider'

const Assign = () => {
var state={
    name:'',
    budget:0,
}
const [amount,setAmount]=useState(5000);
const [goods, setGoods]=useState('')
    const navigation=useNavigation();
    const [list, setList]=useState([])
    const newItem=(name,budget)=>{
        state.name=name;
        state.budget=budget;
        setList(...list, state);
    }
  return (
    <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Assign" 
        onLeftPress={()=>navigation.navigate('Spend')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
      <Text>Assign a member to spend</Text>
      <TextInput style={styles.textboxb} onChangeText={(text)=>setGoods(text)}>{goods}</TextInput>
      <View style={{flexDirection:'row'}}>
        <Slider
        style={{alignSelf:'center',width: 300, height: 40}}
        minimumValue={0}
        maximumValue={10000}
        value={amount}
        minimumTrackTintColor="green"
        maximumTrackTintColor="grey"
        thumbTintColor='dimgrey'
        onSlidingComplete={n=>setAmount(Math.round(n))}
        />
        <TextInput style={styles.textbox} keyboardType="numeric" onChangeText={(text)=>setAmount(parseInt(text))}>{amount}</TextInput>
        </View>
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
    width:300, 
    borderBottomWidth:StyleSheet.hairlineWidth, 
    fontSize:24,
    textAlign:'left'
  },
})