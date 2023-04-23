import { FlatList, Pressable, StyleSheet, Text, View ,Alert} from 'react-native'
import React, { useState } from 'react'
import { NavBar, Button } from 'galio-framework'
import { selectAccountData } from '../../../database'
import * as SQLite from 'expo-sqlite';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const db = SQLite.openDatabase('maindb.db');
var temp = [];
db.transaction(tx=>{
    tx.executeSql(
        // print table info
        'SELECT Account_ID, name, phone FROM Account WHERE Account_ID != 1;',
        [],
        (tx, results) => {
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            console.log(temp);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
})

const Contact = () => {
const navigation=useNavigation();
const [checkedItems, setCheckedItems] = useState([]);
const member=['TEST'];

const confirmMember=()=>{
    var n=checkedItems.length;
    for (i=0; i<n; i++){
        var result=temp.find(item=>item.Account_ID===checkedItems[i]);
        member.push(" "+result.name) 
    }
}

const isChecked = (id) => {
    return checkedItems.includes(id);
  };

const toggleItem = (id) => {
    if (isChecked(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
      console.log(checkedItems);
    } else {
      setCheckedItems([...checkedItems, id]);
      console.log(checkedItems);
    }
  };

const Item=({id, name, phone})=>{
    return(
    <Pressable style={styles.contactCon} onPress={() => toggleItem(id)}>
      <View style={styles.imgCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{name[0]}</Text>
        </View>
      </View>
      <View style={styles.contactDat}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phoneNumber}>{phone}</Text>
      </View>
      <View>
        <Checkbox status={isChecked(id) ? "checked" : "unchecked"} />
      </View>
    </Pressable>
    );
}
const renderItem=({item})=><Item
  phone={item.phone}
  name={item.name}
  id={item.Account_ID}
/>

const outputAlert=()=>{  
    if (checkedItems.length!=0){
    confirmMember();
    Alert.alert('Alert','Group members: '+member, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {console.log(checkedItems); navigation.navigate('CreateGroup',{memberlist:checkedItems})}},
    ]);
    } else{
      Alert.alert('Warning','You have not choose any group members.');
    } 
    
  }

  return (
    <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Contact" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View height={'82%'}>
            <FlatList
            data={temp}
            renderItem={renderItem}
            keyExtractor={(item) => item.Account_ID}
        />
        </View>
        <Button color='success' round style={styles.confirmbutton} onPress={()=>outputAlert()}>Confirm</Button>
    </View>
  )
}

export default Contact

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
contactCon: {
    margin:5,
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  contactDat: {
    margin:10,
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: "#888",
  },
  confirmbutton:{
    margin:10,
    alignSelf:'center',
  },
})